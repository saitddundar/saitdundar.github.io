import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'

// Geçici basit test component
function TestApp() {
  return (
    <div style={{padding: '20px', textAlign: 'center', background: '#0d1117', color: '#c9d1d9', minHeight: '100vh'}}>
      <h1>the site is working!</h1>
      <p>React has been successfully loaded!</p>
      <p>Now we will gradually add the real components to the site...</p>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TestApp />
  </StrictMode>,
)