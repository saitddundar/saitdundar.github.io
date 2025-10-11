import React, { useState, useEffect } from 'react';
import './AnimatedText.css';

const AnimatedText = () => {
  const texts = [
    "Hi, I am Sait Dündar.",
    "Hola, yo soy Sait Dündar.",
    "Merhaba, ben Sait Dündar."
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showText, setShowText] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const delayBetweenPhrases = 2500;

    const handleTyping = () => {
      const currentPhrase = texts[phraseIndex];
      
      if (isDeleting) {
        setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
      } else {
        setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
      }

      if (!isDeleting && displayedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), delayBetweenPhrases);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setPhraseIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    };

    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex, texts]);

  // Scroll olayını dinle ve hangi bölümde olduğunu belirle
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      // Hangi bölümde olduğumuzu belirle
      const currentSectionIndex = Math.round(scrollTop / windowHeight);
      setCurrentSection(currentSectionIndex);
      
      // İlk sayfada değilsek text'i gizle
      if (scrollTop > windowHeight / 2) {
        setShowText(false);
      } else {
        setShowText(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Herhangi bir bölüme gitme fonksiyonu
  const scrollToSection = (sectionIndex) => {
    window.scrollTo({
      top: window.innerHeight * sectionIndex,
      behavior: 'smooth'
    });
  };

  // About bölümüne gitme fonksiyonu - AboutSection'ı görünür yapacak
  const showAboutSection = () => {
    // About sayfasına git
    scrollToSection(1);
    
    // About bileşenini görünür yap - bileşenler arası iletişim için
    const aboutEvent = new CustomEvent('showAboutSection', { detail: { visible: true } });
    window.dispatchEvent(aboutEvent);
  };

  return (
    <div className="full-page-layout">
      {/* SAYFA 1: Hello Section */}
      <section className="page-section hero-section">
        <div className={`animated-text-container ${showText ? 'show' : 'hide'}`}>
          <div className="text-wrapper">
            <h1 className="animated-text">{displayedText}</h1>
            <p className="subtitle">
              A computer science student passionate about backend development, cloud, and solving complex problems.
            </p>
            
            <button 
              onClick={showAboutSection} 
              className="section-nav-button"
            >
              About Me →
            </button>
          </div>
        </div>
      </section>

      {/* SAYFA 3: Boş Section - About kaldırıldı, About yerine 2. sayfa AboutSection bileşeni kullanılacak */}
      <section className="page-section empty-section" id="empty-section">
        <div className="section-content">
          <h2>Coming Soon</h2>
          <p>This section is under development</p>
          
          <button 
            onClick={() => scrollToSection(0)} 
            className="section-nav-button back-button"
          >
            ← Back to Top
          </button>
        </div>
      </section>
    </div>
  );
};

export default AnimatedText;
