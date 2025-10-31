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
      <ProjectCard
        title="Spring-Gallerist-App"
        image="/spring-gallerist-app.png"
        description="A modern and scalable RESTful API application built with Spring Boot for managing car gallery operations, including gallerist management, car inventory, customer records, and sales transactions."
        link="#"
        github="https://github.com/saitddundar/spring-gallerist-app"
        tags={["Java", "Spring Boot", "Hibernate", "RESTful API", "PostgreSQL"]}
      />
      <ProjectCard
        title="Dante"
        description="Interactive charts and data exploration tools using D3 and canvas optimizations."
        link="#"
        github="https://github.com/yusufkrnz/LabProjectBackendNest"
        tags={["NestJS","FastAPI","TypeScript", "GraphQL", "MongoDB","..."]}
      />

      <ProjectCard
        title="My Own Website"
        image="/my-website.png"
        description="Personal portfolio with smooth animations and responsive design."
        link="#"
        github="#"
        tags={["React", "Framer Motion", "SVG"]}
      />

      
    </div>
  );
}
