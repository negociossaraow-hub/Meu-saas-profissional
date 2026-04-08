require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

const app = express();
app.use(cors());

// Webhook precisa de body raw para verificação de assinatura do Stripe
app.post('/api/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`❌ Erro no Webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Lógica de Autonomia: Quando o pagamento é confirmado
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const plan = session.metadata.plan;

    console.log(`💰 Pagamento confirmado para o usuário: ${userId} - Plano: ${plan}`);

    // Atualiza o Supabase automaticamente
    const { error } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: userId,
        stripe_customer_id: session.customer,
        stripe_subscription_id: session.subscription,
        plan_type: plan,
        status: 'active',
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // +30 dias
      });

    if (error) console.error('❌ Erro ao atualizar Supabase:', error);
    else console.log('✅ Acesso liberado no Supabase com sucesso!');
  }

  res.json({ received: true });
});

// Rota para criar a sessão de checkout do Stripe
app.use(bodyParser.json());
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { plan, userId, successUrl, cancelUrl } = req.body;
    const prices = { 
      'Starter': 'price_placeholder_1', // Substitua pelos IDs de preço reais do seu Stripe
      'Professional': 'price_placeholder_2',
      'Elite': 'price_placeholder_3'
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: { name: `Plano ${plan} - Meu SaaS Profissional` },
            unit_amount: plan === 'Elite' ? 99900 : (plan === 'Professional' ? 29900 : 9900),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: { userId, plan },
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor de Elite rodando na porta ${PORT}`));
