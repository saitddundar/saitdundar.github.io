import React from 'react'

// MainLayout'u import et ama basit tut
function SimpleMainLayout({ children }) {
  return (
    <div style={{background: '#0d1117', color: '#c9d1d9', minHeight: '100vh'}}>
      <div style={{padding: '20px'}}>
        <h2> MainLayout Test</h2>
        {children}
      </div>
    </div>
  )
}

function App() {
  return (
    <SimpleMainLayout>
      <h1> App + MainLayout is working</h1>
      <p>If this works, we can move on to the original components...</p>
    </SimpleMainLayout>
  )
}

export default App