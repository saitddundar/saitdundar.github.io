import React from 'react';
import './Skills.css';

const skillGroups = [
  {
    category: 'Languages',
    skills: [
      { name: 'Go', icon: 'https://cdn.simpleicons.org/go/00ADD8' },
      { name: 'Java', icon: 'https://cdn.simpleicons.org/openjdk/ED8B00' },
      { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
    ],
  },
  {
    category: 'Backend & Frameworks',
    skills: [
      { name: 'Spring Boot', icon: 'https://cdn.simpleicons.org/springboot/6DB33F' },
      { name: 'NestJS', icon: 'https://cdn.simpleicons.org/nestjs/E0234E' },
      { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/009688' },
      { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
    ],
  },
  {
    category: 'Infrastructure & DevOps',
    skills: [
      { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
      { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes/326CE5' },
      { name: 'Prometheus', icon: 'https://cdn.simpleicons.org/prometheus/E6522C' },
      { name: 'Grafana', icon: 'https://cdn.simpleicons.org/grafana/F46800' },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
      { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
      { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/DC382D' },
    ],
  },
  {
    category: 'Tools & Other',
    skills: [
      { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
      { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux/FCC624' },
      { name: 'WireGuard', icon: 'https://cdn.simpleicons.org/wireguard/88171A' },
    ],
  },
];

const Skills = () => {
  return (
    <section className="skills-section" id="skills">
      <h2 className="skills-title">Skills</h2>
      <div className="skills-groups">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.category}>
            <h3 className="skill-category">{group.category}</h3>
            <div className="skill-items">
              {group.skills.map((skill) => (
                <div className="skill-item" key={skill.name}>
                  <img src={skill.icon} alt={skill.name} className="skill-icon" />
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
