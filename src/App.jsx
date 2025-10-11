import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Header from './components/Header';
import AnimatedText from './components/AnimatedText';
import AboutSection from './components/AboutSection';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <AnimatedText />
      <AboutSection />
      
      {/* Scrollable content to enable scroll animation */}
      <div style={{ height: '200vh', background: 'transparent' }}></div>
    </>
  )
}

export default App