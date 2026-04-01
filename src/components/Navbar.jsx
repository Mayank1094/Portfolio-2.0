import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },

];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Highlight active nav section
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <nav className="navbar-inner container">
        <a href="#home" className="navbar-logo" onClick={e => handleNavClick(e, '#home')}>
          <span className="logo-name">A S</span>
          <span className="logo-role"> Mayank</span>
        </a>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                id={`nav-${link.label.toLowerCase()}`}
                className={`nav-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                onClick={e => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              id="nav-cta"
              className="btn-primary nav-cta-btn"
              onClick={e => handleNavClick(e, '#contact')}
            >
              Hire Me
            </a>
          </li>
        </ul>

        <button
          id="navbar-mobile-toggle"
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
    </header>
  );
}
