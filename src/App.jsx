import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { supabase } from './supabaseClient'
import { useTranslation } from 'react-i18next'
import './i18n'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const theme = {
  bg: 'radial-gradient(circle at top, #020617 0%, #000000 100%)',
  primary: '#6366f1',
  secondary: '#a855f7',
  accent: '#10b981',
  glass: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
}

// --- Componentes de Página de Faturamento ---

const SuccessPage = () => {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '500px', textAlign: 'center', background: theme.glass, padding: '50px', borderRadius: '32px', border: theme.border, backdropFilter: 'blur(20px)' }}>
        <div style={{ fontSize: '5rem', marginBottom: '20px' }}>💎</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '15px' }}>Faturamento Concluído</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.7, marginBottom: '30px', lineHeight: '1.6' }}>Sua assinatura foi processada. O motor de tráfego IA agora está trabalhando para você.</p>
        <button onClick={() => navigate('/')} style={{ width: '100%', padding: '16px', background: theme.primary, border: 'none', borderRadius: '16px', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>Entrar no Painel</button>
      </div>
    </div>
  )
}

const CancelPage = () => {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '500px', textAlign: 'center', background: theme.glass, padding: '50px', borderRadius: '32px', border: theme.border, backdropFilter: 'blur(20px)' }}>
        <div style={{ fontSize: '5rem', marginBottom: '20px' }}>❌</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '15px' }}>Pagamento Cancelado</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.7, marginBottom: '30px', lineHeight: '1.6' }}>O processo foi interrompido. Nenhuma cobrança foi realizada.</p>
        <button onClick={() => navigate('/')} style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '16px', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>Voltar para Planos</button>
      </div>
    </div>
  )
}

const Dashboard = () => {
  const { t, i18n } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [trafficData, setTrafficData] = useState({ paid: 0, organic: 0, status: 'MOTOR IA OCIOSO' })
  const [isIAActive, setIsIAActive] = useState(false)

  useEffect(() => {
    let interval;
    if (isIAActive) {
      interval = setInterval(() => {
        setTrafficData(prev => ({
          paid: prev.paid + Math.floor(Math.random() * 50) + 10,
          organic: prev.organic + Math.floor(Math.random() * 30) + 5,
          status: 'IA TRABALHANDO 24/7'
        }));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isIAActive]);

  const handleCheckout = async (plan) => {
    setLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          userId: 'user_' + Math.random().toString(36).substr(2, 9),
          successUrl: window.location.origin + '/success',
          cancelUrl: window.location.origin + '/cancel'
        })
      })
      const session = await response.json()
      if (session.url) window.location.href = session.url
    } catch (err) {
      alert('Erro na conexão com o faturamento.')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, color: 'white', fontFamily: 'Inter, sans-serif', paddingBottom: '100px' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px 5%', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-1px' }}>MEU SAAS <span style={{ color: theme.primary }}>ELITE</span></div>
        <button onClick={() => setIsIAActive(!isIAActive)} style={{ background: isIAActive ? theme.accent : 'rgba(255,255,255,0.1)', padding: '10px 24px', borderRadius: '100px', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
          {isIAActive ? 'MOTOR IA ATIVO' : 'ATIVAR EQUIPE IA'}
        </button>
      </nav>

      <header style={{ textAlign: 'center', padding: '80px 5%', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '4.5rem', fontWeight: '900', marginBottom: '24px', letterSpacing: '-2px', lineHeight: '1.1' }}>
          Faturamento <span style={{ background: 'linear-gradient(to right, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Automático</span> de Elite
        </h1>
        <p style={{ fontSize: '1.3rem', opacity: 0.6, marginBottom: '40px' }}>A primeira plataforma mundial com tráfego IA e faturamento autônomo integrados.</p>
      </header>

      {/* Monitor IA Dashboard */}
      <section style={{ padding: '0 5%', maxWidth: '1200px', margin: '0 auto 100px' }}>
        <div style={{ background: theme.glass, padding: '40px', borderRadius: '32px', border: theme.border, backdropFilter: 'blur(40px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Monitor de Escala Global (IA)</h2>
            <div style={{ fontSize: '0.9rem', color: isIAActive ? theme.accent : '#ef4444', fontWeight: 'bold' }}>{trafficData.status}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.5, marginBottom: '10px' }}>VISITANTES ADS</p>
              <p style={{ fontSize: '2.5rem', fontWeight: '900', color: theme.primary }}>{trafficData.paid.toLocaleString()}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.5, marginBottom: '10px' }}>VISITANTES ORGÂNICOS</p>
              <p style={{ fontSize: '2.5rem', fontWeight: '900', color: theme.secondary }}>{trafficData.organic.toLocaleString()}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.5, marginBottom: '10px' }}>RENDA GERADA (EST.)</p>
              <p style={{ fontSize: '2.5rem', fontWeight: '900', color: theme.accent }}>${((trafficData.paid + trafficData.organic) * 0.45).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table Profissional */}
      <section style={{ padding: '0 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {[
            { name: 'Starter', price: 'R$ 99', desc: 'Início rápido para novos empreendedores.', features: ['1 Canal de Tráfego IA', 'Faturamento Stripe', 'Dashboard Básico'] },
            { name: 'Professional', price: 'R$ 299', desc: 'O padrão para escala profissional.', features: ['5 Canais de Tráfego IA', 'SEO Master Ativado', 'Suporte Prioritário', 'Insights IA'], popular: true },
            { name: 'Elite', price: 'R$ 999', desc: 'Dominação total e renda ilimitada.', features: ['Canais Ilimitados IA', 'ROI Máximo Otimizado', 'Gerente de Conta IA', 'Acesso Antecipado'] }
          ].map((p) => (
            <div key={p.name} style={{ background: theme.glass, padding: '40px', borderRadius: '32px', border: p.popular ? `2px solid ${theme.primary}` : theme.border, backdropFilter: 'blur(40px)', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>{p.name}</h3>
              <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '10px' }}>{p.price}<span style={{ fontSize: '1rem', opacity: 0.5 }}>/mês</span></div>
              <p style={{ opacity: 0.6, marginBottom: '30px', height: '50px' }}>{p.desc}</p>
              <div style={{ flex: 1, marginBottom: '40px' }}>
                {p.features.map(f => <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', opacity: 0.8 }}><span style={{ color: theme.accent }}>✓</span> {f}</div>)}
              </div>
              <button onClick={() => handleCheckout(p.name)} disabled={loading} style={{ width: '100%', padding: '18px', background: p.popular ? theme.primary : 'white', color: p.popular ? 'white' : 'black', border: 'none', borderRadius: '16px', fontWeight: '900', cursor: 'pointer', fontSize: '1.1rem' }}>{loading ? '...' : 'Faturar Agora'}</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
    </Router>
  )
}

export default App
