import React from 'react';
import skillGroups from '../../../data/skills';
import './Skills.css';

const Skills = () => {
  return (
    <section className="section" id="skills">
      <h2 className="section-title">Skills</h2>
      <dl className="skills-list">
        {skillGroups.map((group) => (
          <div className="skill-row" key={group.category}>
            <dt className="skill-category">{group.category}</dt>
            <dd className="skill-items">
              {group.skills.map((skill) => (
                <span className="skill-item" key={skill.name}>
                  {skill.icon && <img src={skill.icon} alt="" className="skill-icon" />}
                  {skill.name}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Skills;
