import React, { useRef, useState } from 'react';
import './Section3.css';
import ProjectCard from '../../ProjectCard/ProjectCard';

const Section3 = () => {
  return (
    <section className="section3" id="section3">
      <div className="section3-content">
        <h2 className="section-title">Projects</h2>
        <ProjectsGrid />
      </div>
    </section>
  );
};

export default Section3;

function ProjectsGrid() {
  const scrollerRef = useRef(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const onPointerDown = (e) => {
    // Only start drag if not clicking a link or button
    if (e.target.closest('a, button')) {
      return;
    }
    const el = scrollerRef.current;
    if (!el) return;
    isDownRef.current = true;
    setIsDragging(true);
    el.setPointerCapture(e.pointerId);
    startXRef.current = e.clientX;
    scrollLeftRef.current = el.scrollLeft;
    e.preventDefault();
  };

  const onPointerMove = (e) => {
    const el = scrollerRef.current;
    if (!el || !isDownRef.current) return;
    const dx = e.clientX - startXRef.current;
    el.scrollLeft = scrollLeftRef.current - dx;
  };

  const onPointerUp = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    isDownRef.current = false;
    setIsDragging(false);
    try { el.releasePointerCapture && el.releasePointerCapture(e.pointerId); } catch (err) {}
  };

  // Define projects and sort by status: completed -> active -> in-progress -> archived
  const projects = [
    {
      title: 'Spring-Gallerist-App',
      image: '/photos/spring-gallerist-app.png',
      description:
        'A modern and scalable RESTful API application built with Spring Boot for managing car gallery operations, including gallerist management, car inventory, customer records, and sales transactions.',
      link: '#',
      github: 'https://github.com/saitddundar/spring-gallerist-app',
      tags: ['Java', 'Spring Boot', 'Hibernate', 'RESTful API', 'PostgreSQL'],
      status: 'completed',
    },
    {
      title: 'Dante',
      description:
        'An Algorithm-as-a-Service (AaaS) application designed to act as a bridge, intelligently connecting project owners with the most suitable developers/contributors.',
      link: '#',
      github: 'https://github.com/yusufkrnz/LabProjectBackendNest',
      tags: ['NestJS', 'FastAPI', 'GraphQL', 'Grafana', 'MongoDB', '...'],
      status: 'active',
    },
    {
      title: 'My Own Website',
      image: '/photos/my-website.png',
      description: 'Personal portfolio with smooth animations and responsive design.',
      link: '#',
      github: '#',
      tags: ['React', 'JavaScript', 'HTML', 'CSS'],
      status: 'completed',
    },
  ];

  const statusOrder = { completed: 0, active: 1, 'in-progress': 2, archived: 3 };
  const sortedProjects = [...projects].sort(
    (a, b) => (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99)
  );

  return (
    <div
      ref={scrollerRef}
      role="list"
      aria-label="Projects"
      className={`projects-grid ${isDragging ? 'grabbing' : ''}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      tabIndex={0}
    >
      {sortedProjects.map((p) => (
        <ProjectCard key={p.title} {...p} />
      ))}
    </div>
  );
}
