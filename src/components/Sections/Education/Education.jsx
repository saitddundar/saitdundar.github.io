import React from 'react';
import Timeline from '../../Timeline/Timeline';
import education from '../../../data/education';

const entries = education.map((e) => ({ ...e, title: e.university, subtitle: e.degree }));

const Education = () => {
  return (
    <section className="section section-flush" id="education">
      <h2 className="section-title">Education</h2>
      <Timeline entries={entries} />
    </section>
  );
};

export default Education;
