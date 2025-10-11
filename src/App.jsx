import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Header from './components/Header';
import AnimatedText from './components/AnimatedText';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <AnimatedText />
    </>
  )
}

export default App