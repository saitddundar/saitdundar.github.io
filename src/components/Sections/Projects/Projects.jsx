import React from 'react';
import projects from '../../../data/projects';
import './Projects.css';

const Projects = () => {
  return (
    <section className="section" id="projects">
      <h2 className="section-title">Projects</h2>
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

export default Projects;
