import React, { useEffect, useRef } from 'react';
import './Visitors.css';

// The d= code from the mapmyvisitors.com embed snippet. The section stays hidden while it is empty.
const MMV_CODE = 'llpqD_awHwiygfVZfsnGC2jHmgdzqqdD_1bM43Pvnj0';

const Visitors = () => {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!MMV_CODE) return;

    const loadMap = () => {
      if (mapRef.current.querySelector('#mapmyvisitors')) return;
      const s = document.createElement('script');
      s.id = 'mapmyvisitors'; // the widget finds itself by this id and draws right after it
      // co = ocean, cl = land, ct = text, cmo = markers; w=a fills the column
      s.src = 'https://mapmyvisitors.com/map.js?d=' + encodeURIComponent(MMV_CODE) +
        '&co=111111&cl=333333&ct=b0b0b0&cmo=cd7b4f&w=a';
      mapRef.current.append(s);
    };

    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        loadMap();
      }
    }, { rootMargin: '400px 0px' });
    io.observe(sectionRef.current);

    return () => io.disconnect();
  }, []);

  if (!MMV_CODE) return null;

  return (
    <section className="section" id="visitors" ref={sectionRef}>
      <h2 className="section-title">Visitors</h2>
      <p className="visitors-note">Where people have viewed this site from.</p>
      <div className="visitor-map" ref={mapRef} />
    </section>
  );
};

export default Visitors;
