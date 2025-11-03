import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';

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