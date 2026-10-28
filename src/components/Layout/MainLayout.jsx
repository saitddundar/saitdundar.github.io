import React from 'react';
import SectionNav from '../SectionNav/SectionNav';
import KoiPond from '../KoiPond/KoiPond';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <KoiPond />
      <SectionNav />
      <main className="main-content">
        {children}
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Mehmet Sait Dündar</span>
        <span className="footer-koi" aria-hidden="true">&gt;&lt;(((°&gt;</span>
        <a href="mailto:saitdndr51@gmail.com">saitdndr51@gmail.com</a>
      </footer>
    </div>
  );
};

export default MainLayout;
