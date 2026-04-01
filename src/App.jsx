import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LiquidEther from './components/LiquidEther';
import WelcomeScreen from './components/WelcomeScreen';
import CustomCursor from './components/CustomCursor';

import './App.css';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const lenisRef = useRef(null);

  // Lenis smooth scroll
  useEffect(() => {
    if (!showWelcome) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, [showWelcome]);

  // Intersection Observer for scroll reveal
  useEffect(() => {
    if (!showWelcome) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      });

      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }
  }, [showWelcome]);

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <div className="bg-fluid">
            <LiquidEther 
              colors={['#5227FF', '#FF9FFC', '#B19EEF']}
              autoDemo={true}
              resolution={0.4}
            />
          </div>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
