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
    </div>
  );
};

export default MainLayout;
