import React from 'react';
import Timeline from '../../Timeline/Timeline';
import experience from '../../../data/experience';

const entries = experience.map((e) => ({ ...e, title: e.company, subtitle: e.role }));

const Experience = () => {
  return (
    <section className="section section-flush" id="experience">
      <h2 className="section-title">Experience</h2>
      <Timeline entries={entries} />
    </section>
  );
};

export default Experience;
