import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage.jsx';
import About from './sections/Section2/Section2.jsx';
import Projects from './sections/Section3/Section3.jsx';
import Contact from './footer/Footer.jsx';

function App() {
  return (
      <Routes>
        <Route path="/saitdundar.github.io/" element={<Home />} />
        <Route path="/saitdundar.github.io/about" element={<About />} />
        <Route path="/saitdundar.github.io/projects" element={<Projects />} />
        <Route path="/saitdundar.github.io/contact" element={<Contact />} />
      </Routes>
  );
}

export default App;