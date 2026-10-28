import React from 'react';
import './Timeline.css';

const Timeline = ({ entries }) => {
  return (
    <div className="timeline">
      {entries.map((entry, index) => (
        <div className="timeline-entry" key={index}>
          <span className="timeline-date">{entry.date}</span>
          <span className="timeline-dot" />
          <div className="timeline-content">
            <img
              src={`${import.meta.env.BASE_URL}photos/${entry.logo}`}
              alt={`${entry.title} logo`}
              className="timeline-logo"
            />
            <div className="timeline-text">
              <p className="timeline-title">{entry.title}</p>
              <p className="timeline-subtitle">{entry.subtitle}</p>
              <p className="timeline-location">{entry.location}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
