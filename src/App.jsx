import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
// Diğer sayfaları veya bölümleri de ekleyebilirsiniz.
// import AboutPage from './pages/AboutPage'; 
// import ProjectsPage from './pages/ProjectsPage';
// import ContactPage from './pages/ContactPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Diğer sayfalar için yolları buraya ekleyebilirsiniz */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* <Route path="/projects" element={<ProjectsPage />} /> */}
        {/* <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </MainLayout>
  );
}

export default App;
