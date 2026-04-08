import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useSearchParams } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { supabase } from './supabaseClient'
import { useTranslation } from 'react-i18next'
import './i18n'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

// --- Componentes de Página ---

const SuccessPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', color: 'white' }}>
      <h1 style={{ fontSize: '3rem', color: '#4ade80' }}>💰 Pagamento Confirmado!</h1>
      <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>Seu acesso Elite foi liberado com sucesso.</p>
      <button onClick={() => navigate('/')} style={{ padding: '12px 24px', background: '#6366f1', border: 'none', borderRadius: '12px', color: 'white', cursor: 'pointer' }}>
        Voltar ao Dashboard
      </button>
    </div>
  )
}

const CancelPage = () => {
  const navigate = useNavigate()
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', color: 'white' }}>
      <h1 style={{ fontSize: '3rem', color: '#ef4444' }}>❌ Pagamento Cancelado</h1>
      <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>Ocorreu um erro ou você cancelou o checkout.</p>
      <button onClick={() => navigate('/')} style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '12px', color: 'white', cursor: 'pointer' }}>
        Tentar Novamente
      </button>
    </div>
  )
}

const Dashboard = () => {
  const { t, i18n } = useTranslation()
  const [isAutonomous, setIsAutonomous] = useState(false)
  const [dailyRevenue, setDailyRevenue] = useState(24567)
  const [loading, setLoading] = useState(false)

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'pt' : 'en'
    i18n.changeLanguage(nextLang)
  }

  const handleCheckout = async (plan) => {
    setLoading(true)
    try {
      // Pega o ID do usuário logado no Supabase (se houver)
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
      if (session.url) {
        window.location.href = session.url // Redireciona para o checkout real do Stripe
      }
    } catch (err) {
      console.error('Erro ao iniciar checkout:', err)
      alert('Erro ao conectar com o servidor de pagamentos.')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', color: 'white', padding: '20px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <nav style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button onClick={toggleLanguage} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
            {i18n.language.toUpperCase()}
          </button>
        </nav>

        <header style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '20px', lineHeight: '1.2' }}>{t('heroTitle')}</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>{t('heroSubtitle')}</p>
        </header>
        
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '32px', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap', gap: '30px' }}>
            <div>
              <p style={{ fontSize: '1.1rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>{t('dashboard')}</p>
              <p style={{ fontSize: '4rem', fontWeight: 'bold', margin: '10px 0', color: '#818cf8' }}>${dailyRevenue.toLocaleString()}</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', minWidth: '250px' }}>
              <button onClick={() => setIsAutonomous(!isAutonomous)} style={{ background: isAutonomous ? '#10b981' : '#f43f5e', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '16px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold', boxShadow: isAutonomous ? '0 0 20px rgba(16,185,129,0.4)' : '0 0 20px rgba(244,63,94,0.4)', transition: 'all 0.3s ease' }}>
                {isAutonomous ? '✅ ' + t('feature1').split('–')[0].toUpperCase() : '🔴 ' + t('feature1').split('–')[0].toUpperCase()}
              </button>

              <button onClick={() => handleCheckout('Elite')} disabled={loading} style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '16px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s ease' }}>
                {loading ? '...' : t('subscribe').toUpperCase()}
              </button>
            </div>
          </div>
          
          <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>{t('features')}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{t(`feature${i}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
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
