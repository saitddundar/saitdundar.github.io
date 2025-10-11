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

  useEffect(() => {
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const delayBetweenPhrases = 2500;

    const handleTyping = () => {
      const currentPhrase = texts[phraseIndex];
      
      if (isDeleting) {
        // Silme işlemi
        setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
      } else {
        // Yazma işlemi
        setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
      }

      // Durum değiştirme mantığı
      if (!isDeleting && displayedText === currentPhrase) {
        // Yazma bitti, silmeye başlamadan önce bekle
        setTimeout(() => setIsDeleting(true), delayBetweenPhrases);
      } else if (isDeleting && displayedText === '') {
        // Silme bitti, bir sonraki cümleye geç
        setIsDeleting(false);
        setPhraseIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    };

    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex, texts]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      // Hide text completely when scrolling down
      if (scrollTop > 50) {
        setShowText(false);
      } else {
        setShowText(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`animated-text-container ${showText ? 'show' : 'hide'}`}>
      <h1 className="animated-text">
        {displayedText}
      </h1>
    </div>
  );
};

export default AnimatedText;
