import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useSearchParams } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { supabase } from './supabaseClient'
import { useTranslation } from 'react-i18next'
import './i18n'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

// --- Estilos Globais e Temas (Simulados via Inline) ---
const theme = {
  bg: 'radial-gradient(circle at top, #111827 0%, #000000 100%)',
  primary: '#6366f1',
  secondary: '#818cf8',
  accent: '#4ade80',
  error: '#f43f5e',
  glass: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}

// --- Componentes de Página de Luxo ---

const SuccessPage = () => {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '500px', textAlign: 'center', background: theme.glass, padding: '50px', borderRadius: '32px', border: theme.border, backdropFilter: 'blur(20px)' }}>
        <div style={{ fontSize: '5rem', marginBottom: '20px' }}>💎</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '15px' }}>Transação Concluída</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.7, marginBottom: '30px', lineHeight: '1.6' }}>
          Seu acesso à plataforma de elite foi liberado. Bem-vindo ao futuro da automação financeira.
        </p>
        <button onClick={() => navigate('/')} style={{ width: '100%', padding: '16px', background: theme.primary, border: 'none', borderRadius: '16px', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem', boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)' }}>
          Acessar Painel Executivo
        </button>
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
        <p style={{ fontSize: '1.1rem', opacity: 0.7, marginBottom: '30px', lineHeight: '1.6' }}>
          O processo de pagamento não foi concluído. Nenhuma cobrança foi realizada em sua conta.
        </p>
        <button onClick={() => navigate('/')} style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '16px', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>
          Voltar para Planos
        </button>
      </div>
    </div>
  )
}

const Dashboard = () => {
  const { t, i18n } = useTranslation()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async (plan) => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const userId = user?.id || 'anonymous_user'
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          userId,
          successUrl: window.location.origin + '/success',
          cancelUrl: window.location.origin + '/cancel'
        })
      })
      const session = await response.json()
      if (session.url) window.location.href = session.url
    } catch (err) {
      alert('Erro na conexão com o gateway de pagamento.')
    }
    setLoading(false)
  }

  const plans = [
    { name: 'Starter', price: 'R$ 99', desc: 'Ideal para iniciantes na automação.', features: ['Relatórios Básicos', '1 Canal de Renda', 'Suporte via Email'] },
    { name: 'Professional', price: 'R$ 299', desc: 'A escolha dos profissionais.', features: ['Relatórios Avançados', '5 Canais de Renda', 'Suporte Prioritário', 'Insights IA'], popular: true },
    { name: 'Elite', price: 'R$ 999', desc: 'O ápice da tecnologia financeira.', features: ['Canais Ilimitados', 'Gerente de Conta', 'Segurança Bancária', 'Acesso Antecipado'] }
  ]

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, color: 'white', fontFamily: 'Inter, system-ui, sans-serif', paddingBottom: '100px' }}>
      {/* Navbar de Luxo */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px 5%', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-1px' }}>MEU SAAS <span style={{ color: theme.primary }}>ELITE</span></div>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <button onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'pt' : 'en')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontWeight: '600' }}>{i18n.language.toUpperCase()}</button>
          <button style={{ background: theme.primary, padding: '10px 24px', borderRadius: '12px', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Login</button>
        </div>
      </nav>

      {/* Hero Section Mundial */}
      <header style={{ textAlign: 'center', padding: '100px 5%', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '100px', color: theme.secondary, fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '24px' }}>
          ✨ NOVA VERSÃO 2.0 DISPONÍVEL
        </div>
        <h1 style={{ fontSize: '4.5rem', fontWeight: '900', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-2px' }}>
          A Próxima Geração da <span style={{ background: 'linear-gradient(to right, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Renda Autônoma</span>
        </h1>
        <p style={{ fontSize: '1.4rem', opacity: 0.6, lineHeight: '1.6', marginBottom: '40px' }}>
          Uma plataforma mundial desenhada para quem busca seriedade, segurança e resultados reais. Automatize seu fluxo de caixa com tecnologia de elite.
        </p>
      </header>

      {/* Seção de Preços Profissional */}
      <section style={{ padding: '0 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: '900', marginBottom: '60px' }}>Escolha sua Categoria de Investimento</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {plans.map((p) => (
            <div key={p.name} style={{ background: theme.glass, padding: '40px', borderRadius: '32px', border: p.popular ? `2px solid ${theme.primary}` : theme.border, backdropFilter: 'blur(40px)', position: 'relative', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease' }}>
              {p.popular && <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: theme.primary, padding: '4px 16px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 'bold' }}>MAIS ESCOLHIDO</div>}
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>{p.name}</h3>
              <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '10px' }}>{p.price}<span style={{ fontSize: '1rem', opacity: 0.5 }}>/mês</span></div>
              <p style={{ opacity: 0.6, marginBottom: '30px', fontSize: '1rem', height: '50px' }}>{p.desc}</p>
              <div style={{ flex: 1, marginBottom: '40px' }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '1rem', opacity: 0.8 }}>
                    <span style={{ color: theme.accent }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <button onClick={() => handleCheckout(p.name)} disabled={loading} style={{ width: '100%', padding: '18px', background: p.popular ? theme.primary : 'white', color: p.popular ? 'white' : 'black', border: 'none', borderRadius: '16px', fontWeight: '900', cursor: 'pointer', fontSize: '1.1rem', transition: 'opacity 0.2s' }}>
                {loading ? 'Processando...' : 'Assinar Agora'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Signals Mundiais */}
      <section style={{ marginTop: '100px', textAlign: 'center', opacity: 0.5 }}>
        <p style={{ fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '30px' }}>TECNOLOGIAS QUE GARANTEM SUA SEGURANÇA</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap', fontSize: '1.2rem', fontWeight: 'bold' }}>
          <span>STRIPE PAYMENTS</span>
          <span>SUPABASE DATABASE</span>
          <span>VERCEL EDGE</span>
          <span>AES-256 ENCRYPTION</span>
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
