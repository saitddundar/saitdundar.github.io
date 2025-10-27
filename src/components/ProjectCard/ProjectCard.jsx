import React from 'react';
import './ProjectCard.css';

const GithubIcon = ({ className = '' }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.02c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.343-3.369-1.343-.454-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.112-4.555-4.945 0-1.091.39-1.983 1.03-2.681-.103-.254-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.908-1.295 2.747-1.025 2.747-1.025.547 1.378.203 2.396.1 2.65.64.698 1.03 1.59 1.03 2.681 0 3.842-2.338 4.688-4.566 4.937.359.31.679.92.679 1.854 0 1.337-.012 2.419-.012 2.749 0 .268.18.58.688.481C19.137 20.197 22 16.446 22 12.02 22 6.484 17.523 2 12 2z" />
  </svg>
);

const ProjectCard = ({ title, description, link, image, tags = [], github }) => {
  return (
    <article className="project-card">
      {image && (
        <div className="project-image">
          <img src={image} alt={title} draggable={false} />
        </div>
      )}

      <div className="project-body">
        <div className="project-head">
          <h3 className="project-title">{title}</h3>
          {github && (
            <a className="github-btn" href={github} target="_blank" rel="noreferrer" aria-label={`Open ${title} on GitHub`}>
              <GithubIcon />
            </a>
          )}
        </div>

        <p className="project-desc">{description}</p>

        {tags && tags.length > 0 && (
          <div className="project-tags">
            {tags.map((t, i) => (
              <span key={i} className="tag">{t}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
