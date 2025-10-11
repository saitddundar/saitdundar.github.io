import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Header from './components/Header';
import AnimatedText from './components/AnimatedText';
import ScrollImage from './components/ScrollImage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <AnimatedText />
      <ScrollImage 
        imagePath="/kim-busik.jpg" 
        alt="Kim Busik" 
      />
      
      {/* Scrollable content to enable scroll animation */}
      <div style={{ height: '200vh', background: 'transparent' }}></div>
    </>
  )
}

export default App