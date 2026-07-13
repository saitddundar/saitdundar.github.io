import React from 'react';
import './Section1.css';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 2C6.477 2 2 6.484 2 12.02c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.343-3.369-1.343-.454-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.112-4.555-4.945 0-1.091.39-1.983 1.03-2.681-.103-.254-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.908-1.295 2.747-1.025 2.747-1.025.547 1.378.203 2.396.1 2.65.64.698 1.03 1.59 1.03 2.681 0 3.842-2.338 4.688-4.566 4.937.359.31.679.92.679 1.854 0 1.337-.012 2.419-.012 2.749 0 .268.18.58.688.481C19.137 20.197 22 16.446 22 12.02 22 6.484 17.523 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.39v-1.2h-2.84v8.37h2.84v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.84M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const ResumeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-1 8l-3-3 1.41-1.41L11 14.17V11h2v3.17l1.59-1.59L16 14l-4 4z"/>
  </svg>
);

const Section1 = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <div className="hero-photo-wrapper">
          <img
            src={`${import.meta.env.BASE_URL}photos/profile-pic.jpg`}
            alt="Mehmet Sait Dündar"
            className="hero-photo"
          />
        </div>
        <div className="hero-info">
          <h1 className="hero-name">Mehmet Sait Dündar</h1>
          <p className="hero-title">Computer Science Student</p>
          <p className="hero-desc">
            Passionate about backend development, cloud computing, and solving complex problems.
          </p>
          <div className="hero-links">
            <a href="https://github.com/saitddundar" target="_blank" rel="noopener noreferrer" className="hero-link">
              <GithubIcon />
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/sait-d%C3%BCndar-267533202/" target="_blank" rel="noopener noreferrer" className="hero-link">
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
            <a href="mailto:saitdndr51@gmail.com" className="hero-link">
              <EmailIcon />
              <span>Email</span>
            </a>
            <a
              href={`${import.meta.env.BASE_URL}docs/001_MehmetSaitDündarCV.docx`}
              download
              className="hero-link"
            >
              <ResumeIcon />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </div>
      <div className="github-graph">
        <a href="https://github.com/saitddundar" target="_blank" rel="noopener noreferrer">
          <img
            src="https://ghchart.rshah.org/1b5e20/saitddundar"
            alt="GitHub Contribution Graph"
            className="github-graph-img"
          />
        </a>
      </div>
      <div className="hero-divider" />
    </section>
  );
};

export default Section1;
