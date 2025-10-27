import React from 'react';
import Section1 from '../components/Sections/Section1/Section1';
import Section2 from '../components/Sections/Section2/Section2';
import Section3 from '../components/Sections/Section3/Section3';
import Footer from '../components/Footer/Footer';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Section1 />
      <Section2 />
      <Section3 />
      <Footer />
    </div>
  );
};

export default HomePage;
