import React, { useRef, useEffect } from 'react';
import VariableProximity from '../../VariableProximity/VariableProximity';
import './Section2.css';

const Section2 = () => {
  const containerRef = useRef(null);
  const profilePicRef = useRef(null);

  useEffect(() => {
    const profilePic = profilePicRef.current;
    if (!profilePic) return;

    const handleMouseMove = (event) => {
      const rect = profilePic.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      const centerX = offsetX - rect.width / 2;
      const centerY = offsetY - rect.height / 2;

      const rotateX = -(centerY / rect.height) * 15;
      const rotateY = (centerX / rect.width) * 15;

      profilePic.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      profilePic.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    profilePic.addEventListener('mousemove', handleMouseMove);
    profilePic.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      profilePic.removeEventListener('mousemove', handleMouseMove);
      profilePic.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="section2" id="about">
      <div className="section2-content" ref={containerRef}>
        <div className="profile-and-content">
          <div className="profile-container">
            <img ref={profilePicRef} src="/profile_pic.jpg" alt="Profile" className="profile-pic" style={{ height: 'auto', maxHeight: '100%' }} />
          </div>
          <div className="content-container">
            <h2 className="about-section-title left-align">*About Me</h2>
            <div className="main-text" style={{ textAlign: 'left', maxWidth: '1000px', margin: '0 auto' }}>
              <p>I’m a computer science student specializing in backend development, microservices, and cloud computing. I enjoy designing scalable, maintainable server-side systems and building resilient, well-documented APIs that power distributed applications. I focus on architecting microservice-based solutions that run reliably in the cloud, leveraging containerization, orchestration (e.g., Kubernetes), and cloud-native patterns to ensure fault tolerance, observability, and smooth deployments.</p>
              <p>Solving complex problems is one of my core motivations — I like breaking down hard engineering challenges into manageable components, applying algorithmic thinking, and iterating on elegant, efficient solutions. I take particular pleasure in developing my own algorithms and heuristics to optimize performance, reduce latency, and improve resource utilization in real-world systems. Performance tuning, capacity planning, and designing for scalability are regular parts of my workflow.</p>
              <p>I regularly work with relational and NoSQL databases, caching layers, message brokers, and distributed-system primitives (consensus, sharding, replication). I’m comfortable building CI/CD pipelines, writing infrastructure-as-code, and instrumenting systems for monitoring and alerting so production issues can be diagnosed and resolved quickly. I also value writing clear tests, documentation, and clean code to make systems easier to maintain and evolve.</p>
              <p>Outside of hands-on engineering, I enjoy exploring new cloud services, contributing to open-source projects, and collaborating with teams to deliver production-ready features. I’m committed to continuous learning — reading research papers, experimenting with new tools, and refining my technical craft — and I aim to build robust, efficient systems that solve real problems and deliver measurable impact.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
