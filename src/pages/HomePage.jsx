import React from 'react';
import Hero from '../components/Sections/Hero/Hero';
import Experience from '../components/Sections/Experience/Experience';
import Education from '../components/Sections/Education/Education';
import About from '../components/Sections/About/About';
import Projects from '../components/Sections/Projects/Projects';
import Skills from '../components/Sections/Skills/Skills';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <Experience />
      <Education />
      <About />
      <Projects />
      <Skills />
    </div>
  );
};

export default HomePage;
