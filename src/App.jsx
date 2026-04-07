import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { supabase } from './supabaseClient'
import { useTranslation } from 'react-i18next'
import './i18n'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

function App() {
  const { t, i18n } = useTranslation()
  const [isAutonomous, setIsAutonomous] = useState(false)
  const [dailyRevenue, setDailyRevenue] = useState(24567)
  const [loading, setLoading] = useState(false)

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'pt' : 'en'
    i18n.changeLanguage(nextLang)
  }

  const toggleAutonomous = () => {
    setIsAutonomous(!isAutonomous)
    if (!isAutonomous) {
      setDailyRevenue(Math.floor(Math.random() * 10000) + 20000)
    }
  }

  const handleCheckout = async () => {
    setLoading(true)
    const stripe = await stripePromise
    if (stripe) {
      alert(t('subscribe') + '!')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      color: 'white',
      padding: '20px',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <nav style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button 
            onClick={toggleLanguage}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            {i18n.language.toUpperCase()}
          </button>
        </nav>

        <header style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '20px', lineHeight: '1.2' }}>
            {t('heroTitle')}
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            {t('heroSubtitle')}
          </p>
        </header>
        
        <div style={{ 
          background: 'rgba(255,255,255,0.03)', 
          padding: '40px', 
          borderRadius: '32px',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '30px'
          }}>
            <div>
              <p style={{ fontSize: '1.1rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {t('dashboard')}
              </p>
              <p style={{ fontSize: '4rem', fontWeight: 'bold', margin: '10px 0', color: '#818cf8' }}>
                ${dailyRevenue.toLocaleString()}
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', minWidth: '250px' }}>
              <button 
                onClick={toggleAutonomous}
                style={{
                  background: isAutonomous ? '#10b981' : '#f43f5e',
                  color: 'white',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '16px',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: isAutonomous ? '0 0 20px rgba(16,185,129,0.4)' : '0 0 20px rgba(244,63,94,0.4)',
                  transition: 'all 0.3s ease'
                }}
              >
                {isAutonomous ? '✅ ' + t('feature1').split('–')[0].toUpperCase() : '🔴 ' + t('feature1').split('–')[0].toUpperCase()}
              </button>

              <button 
                onClick={handleCheckout}
                disabled={loading}
                style={{
                  background: '#4f46e5',
                  color: 'white',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '16px',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
              >
                {loading ? '...' : t('subscribe').toUpperCase()}
              </button>
            </div>
          </div>
          
          <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>{t('features')}</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ 
                background: 'rgba(255,255,255,0.05)', 
                padding: '24px', 
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{t(`feature${i}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
