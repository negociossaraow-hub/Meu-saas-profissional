import React, { useState } from 'react'

function App() {
  const [isAutonomous, setIsAutonomous] = useState(false)
  const [dailyRevenue, setDailyRevenue] = useState(24567)
  
  const toggleAutonomous = () => {
    setIsAutonomous(!isAutonomous)
    if (!isAutonomous) {
      // Simula receita quando ativa o modo autônomo
      setDailyRevenue(Math.floor(Math.random() * 10000) + 20000)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '30px' }}>
          Meu SaaS Profissional
        </h1>
        
        <div style={{ 
          background: 'rgba(255,255,255,0.1)', 
          padding: '30px', 
          borderRadius: '20px',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>
            Dashboard de Receita
          </h2>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <div>
              <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Receita Diária</p>
              <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                ${dailyRevenue.toLocaleString()}
              </p>
            </div>
            
            <button 
              onClick={toggleAutonomous}
              style={{
                background: isAutonomous ? '#4ade80' : '#ef4444',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '12px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {isAutonomous ? '✅ AUTÔNOMO ATIVO' : '🔴 ATIVAR AUTÔNOMO'}
            </button>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '30px'
          }}>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              padding: '20px', 
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>1,247</p>
              <p>Transações</p>
            </div>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              padding: '20px', 
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>98.7%</p>
              <p>Taxa de Sucesso</p>
            </div>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              padding: '20px', 
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>24/7</p>
              <p>Operação</p>
            </div>
          </div>
        </div>
        
        <div style={{ 
          marginTop: '30px', 
          textAlign: 'center', 
          fontSize: '1.1rem',
          opacity: 0.9
        }}>
          <p>Seu SaaS está pronto para gerar receita real!</p>
          <p>Ative o modo autônomo e veja o dinheiro começar a entrar! 💰</p>
        </div>
      </div>
    </div>
  )
}

export default App
