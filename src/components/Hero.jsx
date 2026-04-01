import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Download, ArrowDown, Mail, Code2 } from 'lucide-react';
import { Github, Linkedin, Instagram, Whatsapp } from './SocialIcons';

import './Hero.css';

const roles = ['Web Developer', 'Tech Enthusiast', 'Full Stack Developer', 'React Specialist'];

// ---- Staggered Text Reveal ----
function StaggeredText({ text, className }) {
  const letters = text.split('');
  return (
    <span className={className}>
      {letters.map((char, i) => (
        <span
          key={i}
          className="stagger-letter"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

// ---- Magnetic Hover Button ----
function MagneticWrap({ children, className, ...props }) {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0, 0)';
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`magnetic-wrap ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}

// ---- Animated Counter ----
function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 1500;
          const startTime = performance.now();

          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            start = Math.round(eased * target);
            setCount(start);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="stat-number">
      {count}{suffix}
    </span>
  );
}

export default function Hero() {
  const roleRef = useRef(null);
  const indexRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    let timeout;
    const type = () => {
      const current = roles[indexRef.current];
      if (!deletingRef.current) {
        charRef.current++;
        if (charRef.current > current.length) {
          deletingRef.current = true;
          timeout = setTimeout(type, 1800);
          return;
        }
      } else {
        charRef.current--;
        if (charRef.current === 0) {
          deletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % roles.length;
          timeout = setTimeout(type, 400);
          return;
        }
      }
      if (roleRef.current) {
        roleRef.current.textContent = current.slice(0, charRef.current);
      }
      timeout = setTimeout(type, deletingRef.current ? 50 : 80);
    };
    timeout = setTimeout(type, 600);
    return () => clearTimeout(timeout);
  }, []);

  const handleScroll = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      {/* Animated background orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Grid overlay */}
      <div className="hero-grid" />

      {/* Floating code snippets */}
      <div className="floating-snippet snippet-1">
        <span className="snip-keyword">const</span> <span className="snip-var">dev</span> = <span className="snip-string">'passionate'</span><span className="snip-punct">;</span>
      </div>
      <div className="floating-snippet snippet-2">
        <span className="snip-func">useState</span><span className="snip-punct">(</span><span className="snip-string">'building'</span><span className="snip-punct">)</span>
      </div>
      <div className="floating-snippet snippet-3">
        <span className="snip-keyword">await</span> <span className="snip-func">ship</span><span className="snip-punct">(</span><span className="snip-var">product</span><span className="snip-punct">)</span>
      </div>

      <div className="hero-content container">
        <div className="hero-text">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Available for opportunities
          </div>

          <h1 className="hero-title">
            <span className="hero-greeting">Hi, I'm</span>
            <StaggeredText text="A S Mayank" className="hero-name" />
            <span className="hero-role-line">
              <span className="hero-role-prefix">I build </span>
              <span className="hero-role-typed" ref={roleRef}>Web Apps</span>
              <span className="hero-cursor">|</span>
            </span>
          </h1>

          <p className="hero-description">
            Creating Innovative, Functional, and User-Friendly Websites for Digital Solutions.
            Passionate about clean code, great UX, and scalable architectures.
          </p>

          <div className="hero-actions">
            <button
              id="hero-cta-projects"
              className="btn-primary"
              onClick={() => handleScroll('#projects')}
            >
              <Code2 size={18} />
              View My Work
            </button>
            <a
              id="hero-cta-resume"
              href="/resume.pdf"
              className="btn-secondary"
              download
            >
              <Download size={18} />
              Download Resume
            </a>
          </div>

          <div className="hero-socials">
            <MagneticWrap>
              <a id="hero-social-github" href="https://github.com/Mayank1094" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
                <Github size={20} />
              </a>
            </MagneticWrap>
            <MagneticWrap>
              <a id="hero-social-linkedin" href="https://www.mayankkamble.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Website">
                <Linkedin size={20} />
              </a>
            </MagneticWrap>
            <MagneticWrap>
              <a id="hero-social-instagram" href="https://www.instagram.com/__mayank._02/?__pwa=1" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </MagneticWrap>
            <MagneticWrap>
              <a id="hero-social-whatsapp" href="mailto:mayankkamble1094@gmail.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="WhatsApp">
                <Whatsapp size={20} />
              </a>
            </MagneticWrap>
            <MagneticWrap>
              <a id="hero-social-email" href="mailto:mayankkamble1094@gmail.com" className="social-btn" aria-label="Email">
                <Mail size={20} />
              </a>
            </MagneticWrap>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-avatar-wrapper">
            <div className="avatar-ring" />
            <div className="avatar-ring avatar-ring-2" />
            <div className="hero-avatar">
              <div className="avatar-initials">AS</div>
              <div className="avatar-glow" />
            </div>
            {/* Floating tech badges */}
            <div className="tech-badge tb-react">⚛ React</div>
            <div className="tech-badge tb-node">⬢ Node.js</div>
            <div className="tech-badge tb-ts">JS</div>
            <div className="tech-badge tb-db">🎨 Tailwind</div>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <AnimatedCounter target={20} suffix="+" />
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-card">
              <AnimatedCounter target={10} suffix="+" />
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>
        </div>
      </div>

      <button
        id="hero-scroll-down"
        className="scroll-indicator"
        onClick={() => handleScroll('#about')}
        aria-label="Scroll to about section"
      >
        <ArrowDown size={20} />
      </button>
    </section>
  );
}
