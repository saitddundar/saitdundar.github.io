import React from 'react';
import './Section3.css';

const projects = [
  {
    title: 'Vinctum Core',
    description: 'A decentralized data courier platform enabling secure file transfers between devices using encrypted channels with multi-hop relay capabilities and automatic rerouting — no central cloud storage required.',
    github: 'https://github.com/saitddundar/vinctum-core',
    tags: ['Go', 'gRPC', 'libp2p', 'PostgreSQL', 'Redis', 'Docker'],
    status: 'Completed',
  },
  {
    title: 'Gordion VPN',
    description: 'A self-hosted, peer-to-peer mesh VPN built with Go. Connects devices securely across NAT boundaries using WireGuard tunnels transported over libp2p.',
    github: 'https://github.com/saitddundar/gordion-vpn',
    tags: ['Go', 'WireGuard', 'libp2p', 'gRPC', 'Docker', 'Prometheus'],
    status: 'Completed',
  },
  {
    title: 'EANN Car',
    description: 'A self-driving car simulation powered by Evolutionary Artificial Neural Networks. Cars learn to navigate complex tracks through natural selection and mutation — no backpropagation, just pure evolution.',
    github: 'https://github.com/saitddundar/eann-car',
    tags: ['Go', 'Ebitengine', 'Neural Networks', 'Genetic Algorithms'],
    status: 'Completed',
  },
  {
    title: 'Spring-Gallerist-App',
    description: 'A RESTful API built with Spring Boot for managing car gallery operations — gallerist management, car inventory, customer records, and sales transactions.',
    github: 'https://github.com/saitddundar/spring-gallerist-app',
    tags: ['Java', 'Spring Boot', 'Hibernate', 'PostgreSQL'],
    status: 'Completed',
  },
  {
    title: 'Personal Website',
    description: 'This portfolio site — minimal, clean, built with React.',
    github: 'https://github.com/saitddundar/saitdundar.github.io',
    tags: ['React', 'JavaScript', 'CSS'],
    status: 'Completed',
  },
];

const Section3 = () => {
  return (
    <section className="projects-section" id="projects">
      <h2 className="projects-title">Projects</h2>
      <div className="projects-list">
        {projects.map((project) => (
          <div className="project-item" key={project.title}>
            <div className="project-item-header">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-item-name">
                {project.title}
                <svg className="project-external-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3.5 3.5h5v5M8.5 3.5L3 9" />
                </svg>
              </a>
              <span className={`project-status ${project.status.toLowerCase()}`}>{project.status}</span>
            </div>
            <p className="project-item-desc">{project.description}</p>
            <div className="project-item-tags">
              {project.tags.map((tag) => (
                <span className="project-tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section3;
