import React, { useState, useEffect } from 'react';
import './SectionNav.css';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'education', label: 'Education' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
];

const SectionNav = () => {
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topmost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(topmost.target.id);
        }
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="section-nav">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          className={`section-nav-line ${activeId === id ? 'active' : ''}`}
          onClick={() => scrollTo(id)}
          aria-label={label}
        >
          <span className="section-nav-bar" />
        </button>
      ))}
    </nav>
  );
};

export default SectionNav;
