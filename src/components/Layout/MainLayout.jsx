import React from 'react';
import SectionNav from '../SectionNav/SectionNav';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <SectionNav />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
