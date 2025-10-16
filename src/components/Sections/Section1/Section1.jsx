import React from 'react';
import './Section1.css';

const Section1 = () => {
  return (
    <section className="section1" id="home">
      <div className="section1-content">
        <div className="text-content">
          <h1 className="main-title">
            <div className="name-line">Mehmet Sait</div>
            <div className="name-line">Dündar</div>
          </h1>
          <p className="subtitle">A computer science student passionate about backend development, cloud, and solving complex problems.</p>
        </div>
        
        <div className="image-content">
          <img src="/kim-busik.webp" alt="Profile" className="profile-image" />
        </div>
      </div>
    </section>
  );
};

export default Section1;
