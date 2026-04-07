import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { supabase } from './supabaseClient'

// Carrega o Stripe com a chave pública fornecida
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

function App() {
  const [isAutonomous, setIsAutonomous] = useState(false)
  const [dailyRevenue, setDailyRevenue] = useState(24567)
  const [loading, setLoading] = useState(false)

  const toggleAutonomous = () => {
    setIsAutonomous(!isAutonomous)
    if (!isAutonomous) {
      setDailyRevenue(Math.floor(Math.random() * 10000) + 20000)
    }
  }

  const handleCheckout = async () => {
    setLoading(true)
    // Aqui seria a chamada para o seu backend para criar uma sessão de checkout
    // Por enquanto, apenas simulamos a inicialização do Stripe
    const stripe = await stripePromise
    if (stripe) {
      alert('Integração com Stripe iniciada! No ambiente real, você seria redirecionado para o checkout.')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      color: 'white',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '10px' }}>
          Meu SaaS Profissional
        </h1>
        <p style={{ textAlign: 'center', marginBottom: '30px', opacity: 0.7 }}>
          Integrado com Supabase & Stripe
        </p>
        
        <div style={{ 
          background: 'rgba(255,255,255,0.05)', 
          padding: '30px', 
          borderRadius: '24px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>
            Dashboard de Receita
          </h2>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <p style={{ fontSize: '1.1rem', opacity: 0.6 }}>Receita Diária (Simulada)</p>
              <p style={{ fontSize: '3rem', fontWeight: 'bold', margin: '10px 0' }}>
                ${dailyRevenue.toLocaleString()}
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={toggleAutonomous}
                style={{
                  background: isAutonomous ? '#22c55e' : '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '14px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
              >
                {isAutonomous ? '✅ AUTÔNOMO ATIVO' : '🔴 ATIVAR AUTÔNOMO'}
              </button>

              <button 
                onClick={handleCheckout}
                disabled={loading}
                style={{
                  background: '#6366f1',
                  color: 'white',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '14px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? 'PROCESSANDO...' : 'TESTAR CHECKOUT STRIPE'}
              </button>
            </div>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '30px'
          }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '18px', textAlign: 'center' }}>
              <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0' }}>1,247</p>
              <p style={{ margin: '5px 0 0', opacity: 0.6 }}>Vendas via Stripe</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '18px', textAlign: 'center' }}>
              <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0' }}>98.7%</p>
              <p style={{ margin: '5px 0 0', opacity: 0.6 }}>Uptime Supabase</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '18px', textAlign: 'center' }}>
              <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0' }}>Vercel</p>
              <p style={{ margin: '5px 0 0', opacity: 0.6 }}>Pronto para Deploy</p>
            </div>
          </div>
        </div>
        
        <div style={{ 
          marginTop: '40px', 
          textAlign: 'center', 
          fontSize: '1rem',
          opacity: 0.7,
          lineHeight: '1.6'
        }}>
          <p>Seu SaaS está integrado com as melhores tecnologias do mercado.</p>
          <p>O Supabase cuidará dos seus dados e o Stripe cuidará dos seus pagamentos! 🚀</p>
        </div>
      </div>
    </div>
  )
}

export default App
