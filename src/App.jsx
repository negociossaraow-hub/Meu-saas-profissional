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

// --- Componentes de Página de Luxo ---

const SuccessPage = () => {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '500px', textAlign: 'center', background: theme.glass, padding: '50px', borderRadius: '32px', border: theme.border, backdropFilter: 'blur(20px)' }}>
        <div style={{ fontSize: '5rem', marginBottom: '20px' }}>💎</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '15px' }}>Transação Concluída</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.7, marginBottom: '30px', lineHeight: '1.6' }}>Seu acesso à plataforma de elite foi liberado. Bem-vindo ao futuro da automação financeira.</p>
        <button onClick={() => navigate('/')} style={{ width: '100%', padding: '16px', background: theme.primary, border: 'none', borderRadius: '16px', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>Acessar Painel Executivo</button>
      </div>
    </div>
  )
}

const CancelPage = () => {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '500px', textAlign: 'center', background: theme.glass, padding: '50px', borderRadius: '32px', border: theme.border, backdropFilter: 'blur(20px)' }}>
        <div style={{ fontSize: '5rem', marginBottom: '20px' }}>⚠️</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '15px' }}>Operação Cancelada</h1>
        <button onClick={() => navigate('/')} style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '16px', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>Voltar para Planos</button>
      </div>
    </div>
  )
}

const Dashboard = () => {
  const { t, i18n } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [trafficData, setTrafficData] = useState({ paid: 0, organic: 0, status: 'IA Ociosa' })
  const [isIAActive, setIsIAActive] = useState(false)

  // Simulação de Tráfego Autônomo IA
  useEffect(() => {
    let interval;
    if (isIAActive) {
      setTrafficData(prev => ({ ...prev, status: 'IA TRABALHANDO 24/7' }));
      interval = setInterval(() => {
        setTrafficData(prev => ({
          paid: prev.paid + Math.floor(Math.random() * 50) + 10,
          organic: prev.organic + Math.floor(Math.random() * 30) + 5,
          status: 'IA TRABALHANDO 24/7'
        }));
      }, 3000);
    } else {
      setTrafficData(prev => ({ ...prev, status: 'IA OCIOSA' }));
    }
    return () => clearInterval(interval);
  }, [isIAActive]);

  const handleCheckout = async (plan) => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const userId = user?.id || 'anonymous_user'
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, userId, successUrl: window.location.origin + '/success', cancelUrl: window.location.origin + '/cancel' })
      })
      const session = await response.json()
      if (session.url) window.location.href = session.url
    } catch (err) {
      alert('Erro na conexão com o gateway de pagamento.')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, color: 'white', fontFamily: 'Inter, sans-serif', paddingBottom: '100px' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px 5%', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-1px' }}>MEU SAAS <span style={{ color: theme.primary }}>ELITE</span></div>
        <button onClick={() => setIsIAActive(!isIAActive)} style={{ background: isIAActive ? theme.accent : 'rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '100px', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '10px', height: '10px', background: isIAActive ? '#fff' : '#ef4444', borderRadius: '50%', display: 'inline-block', animation: isIAActive ? 'pulse 1.5s infinite' : 'none' }}></span>
          {isIAActive ? 'MOTOR IA ATIVO' : 'ATIVAR EQUIPE IA'}
        </button>
      </nav>

      {/* Hero Section */}
      <header style={{ textAlign: 'center', padding: '60px 5%', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '20px', letterSpacing: '-2px' }}>
          Domine o Mercado com <span style={{ background: 'linear-gradient(to right, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tráfego Autônomo</span>
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.6, marginBottom: '40px' }}>Sua equipe de IA gera visitantes e vendas enquanto você foca no que importa.</p>
      </header>

      {/* IA Traffic Monitor Dashboard */}
      <section style={{ padding: '0 5%', maxWidth: '1200px', margin: '0 auto 80px' }}>
        <div style={{ background: theme.glass, padding: '40px', borderRadius: '32px', border: theme.border, backdropFilter: 'blur(40px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Monitor de Tráfego Autônomo (IA)</h2>
            <div style={{ fontSize: '0.9rem', color: isIAActive ? theme.accent : '#ef4444', fontWeight: 'bold', letterSpacing: '1px' }}>{trafficData.status}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.5, marginBottom: '10px' }}>TRÁFEGO PAGO (ADS)</p>
              <p style={{ fontSize: '2.5rem', fontWeight: '900', color: theme.primary }}>{trafficData.paid.toLocaleString()}</p>
              <p style={{ fontSize: '0.8rem', color: theme.accent }}>+ IA Otimizando ROI</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.5, marginBottom: '10px' }}>TRÁFEGO ORGÂNICO (SEO)</p>
              <p style={{ fontSize: '2.5rem', fontWeight: '900', color: theme.secondary }}>{trafficData.organic.toLocaleString()}</p>
              <p style={{ fontSize: '0.8rem', color: theme.accent }}>+ IA Criando Conteúdo</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.5, marginBottom: '10px' }}>CONVERSÃO MÉDIA</p>
              <p style={{ fontSize: '2.5rem', fontWeight: '900', color: theme.accent }}>4.8%</p>
              <p style={{ fontSize: '0.8rem', color: theme.accent }}>+ Acima da Média Global</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section style={{ padding: '0 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {[
            { name: 'Starter', price: 'R$ 99', desc: 'Ideal para validar sua ideia.', features: ['SEO Básico IA', 'Monitor de Tráfego', '1 Campanha Ads'] },
            { name: 'Professional', price: 'R$ 299', desc: 'Escala real para seu negócio.', features: ['SEO Avançado IA', 'Ads Multicanal', 'Copywriting IA', 'Suporte 24/7'], popular: true },
            { name: 'Elite', price: 'R$ 999', desc: 'Dominação total do mercado.', features: ['Equipe IA Completa', 'Tráfego Ilimitado', 'Gerente de IA Dedicado', 'ROI Garantido'] }
          ].map((p) => (
            <div key={p.name} style={{ background: theme.glass, padding: '40px', borderRadius: '32px', border: p.popular ? `2px solid ${theme.primary}` : theme.border, backdropFilter: 'blur(40px)', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>{p.name}</h3>
              <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '10px' }}>{p.price}<span style={{ fontSize: '1rem', opacity: 0.5 }}>/mês</span></div>
              <p style={{ opacity: 0.6, marginBottom: '30px', height: '50px' }}>{p.desc}</p>
              <div style={{ flex: 1, marginBottom: '40px' }}>
                {p.features.map(f => <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', opacity: 0.8 }}><span style={{ color: theme.accent }}>✓</span> {f}</div>)}
              </div>
              <button onClick={() => handleCheckout(p.name)} disabled={loading} style={{ width: '100%', padding: '18px', background: p.popular ? theme.primary : 'white', color: p.popular ? 'white' : 'black', border: 'none', borderRadius: '16px', fontWeight: '900', cursor: 'pointer', fontSize: '1.1rem' }}>{loading ? '...' : 'Assinar Agora'}</button>
            </div>
          ))}
        </div>
      </section>
      <style>{`@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }`}</style>
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
