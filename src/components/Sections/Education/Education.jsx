import React from 'react';
import './Education.css';

const entries = [
  {
    university: 'Fırat University',
    degree: 'Bachelor of Computer Engineering',
    date: '09/2023 — 06/2027',
    location: 'Elazığ, Turkey',
    logo: 'fırat-logo.png',
  },
  {
    university: 'University of Maribor',
    degree: 'Erasmus+ Exchange Program',
    date: '02/2025 — 07/2025',
    location: 'Maribor, Slovenia',
    logo: 'uni-maribor-logo.png',
  },
  {
    university: 'Kadıköy Anadolu İmam Hatip Lisesi',
    degree: 'High School — Spanish Preparatory Program',
    date: '09/2018 — 06/2023',
    location: 'Istanbul, Turkey',
    logo: 'kadıköy-logo.jpg',
  },
];

const Education = () => {
  return (
    <section className="education-section" id="education">
      <h2 className="education-title">Education</h2>
      <div className="timeline">
        {entries.map((entry, index) => (
          <div className="timeline-entry" key={index}>
            <span className="timeline-date">{entry.date}</span>
            <span className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-content-inner">
                <img
                  src={`${import.meta.env.BASE_URL}photos/${entry.logo}`}
                  alt={`${entry.university} logo`}
                  className="edu-logo"
                />
                <div className="edu-text">
                  <p className="timeline-uni">{entry.university}</p>
                  <p className="timeline-degree">{entry.degree}</p>
                  <p className="timeline-location">{entry.location}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
