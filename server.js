require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { plan, currency = 'brl' } = req.body; // Aceita moeda, padrão BRL
    const prices = { Básico: 9900, Premium: 29900, Bilionário: 99900 };
    const paymentIntent = await stripe.paymentIntents.create({
      amount: prices[plan] || 9900,
      currency: currency.toLowerCase(),
      automatic_payment_methods: { enabled: true },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test';
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Erro: ${err.message}`);
  }
  if (event.type === 'invoice.payment_succeeded') {
    console.log('Pagamento recebido! Dinheiro na conta.');
    // Aqui você pode enviar email ou salvar no banco
  }
  res.json({ received: true });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
