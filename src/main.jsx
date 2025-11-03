import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'

// Basit App component testi
function SimpleApp() {
  return (
    <div style={{padding: '20px', background: '#0d1117', color: '#c9d1d9', minHeight: '100vh'}}>
      <h1>Simple App</h1>
      <p>If this works, we can move on to components</p>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SimpleApp />
  </StrictMode>,
)