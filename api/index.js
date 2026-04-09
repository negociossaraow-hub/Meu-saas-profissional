require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''
);

const app = express();
app.use(cors());

// Rota de Teste de Saúde do Sistema
app.get('/api/health', (req, res) => {
  res.json({ status: 'SaaS Elite Online', time: new Date().toISOString() });
});

// --- Webhook Blindado (Stripe -> Supabase) ---
app.post('/api/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  if (!endpointSecret) {
    console.error('❌ Erro: STRIPE_WEBHOOK_SECRET não configurado.');
    return res.status(500).send('Webhook Secret missing');
  }

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`❌ Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { userId, plan } = session.metadata;

    const { error } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: userId,
        stripe_customer_id: session.customer,
        stripe_subscription_id: session.subscription,
        plan_type: plan,
        status: 'active',
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      });

    if (error) console.error('❌ Erro Supabase:', error);
    else console.log(`✅ FATURAMENTO: Renda gerada para ${userId} no plano ${plan}`);
  }

  res.json({ received: true });
});

// --- Checkout Session ---
app.use(bodyParser.json());
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { plan, userId, successUrl, cancelUrl } = req.body;
    const prices = { 'Starter': 9900, 'Professional': 29900, 'Elite': 99900 };

    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY não configurado na Vercel.');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'brl',
          product_data: { 
            name: `Assinatura ${plan} - Meu SaaS Elite`,
            description: `Acesso VIP + Equipe de IA Autônoma Ativada.`
          },
          unit_amount: prices[plan] || 9900,
        },
        quantity: 1,
      }],
      mode: 'payment',
      metadata: { userId, plan },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('❌ Erro Checkout:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Sistema de Faturamento Online na porta ${PORT}`));
