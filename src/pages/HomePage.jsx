import React from 'react';
import Section1 from '../components/Sections/Section1/Section1';
import Education from '../components/Sections/Education/Education';
import About from '../components/Sections/About/About';
import Section3 from '../components/Sections/Section3/Section3';
import Skills from '../components/Sections/Skills/Skills';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Section1 />
      <Education />
      <About />
      <Section3 />
      <Skills />
    </div>
  );
};

export default HomePage;
