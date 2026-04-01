import React from 'react';
import { Heart, Coffee, Zap, Globe } from 'lucide-react';
import './About.css';

const values = [
  { icon: <Zap size={20} />, title: 'Performance First', desc: 'Every millisecond matters. I write code that scales and performs.' },
  { icon: <Heart size={20} />, title: 'User-Centric', desc: 'Beautiful interfaces backed by intuitive, accessible experiences.' },
  { icon: <Coffee size={20} />, title: 'Clean Code', desc: 'Readable, maintainable, and well-documented — every time.' },
  { icon: <Globe size={20} />, title: 'Full Stack', desc: 'From database schema to UI polish — I own the entire stack.' },
];

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Text Content */}
          <div className="about-content reveal">
            <p className="section-label">About Me</p>
            <h2 className="section-title">Turning Ideas Into<br />Digital Reality</h2>

            <div className="about-bio">
              <p>
                I'm <strong>A S Mayank</strong>, a passionate Full Stack Web Developer
                focusing on creating attractive and responsive user interfaces. I thrive at the intersection
                of clean engineering and great design.
              </p>
              <p>
                My journey started with a burning curiosity about how websites work, and evolved
                into a love for crafting end-to-end solutions — from optimized REST APIs to
                pixel-perfect React interfaces.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new tech, contributing to open source.
              </p>
            </div>

            <div className="about-quick-facts">
              <div className="quick-fact">
                <span className="fact-label">📍 Location</span>
                <span className="fact-value">India</span>
              </div>
              <div className="quick-fact">
                <span className="fact-label">🎓 Education</span>
                <span className="fact-value">Full Stack Web Developer</span>
              </div>
              <div className="quick-fact">
                <span className="fact-label">💼 Status</span>
                <span className="fact-value status-available">Open to work</span>
              </div>
              <div className="quick-fact">
                <span className="fact-label">🌐 Languages</span>
                <span className="fact-value">English, Hindi, Kannada</span>
              </div>
            </div>
          </div>

          {/* Values Cards */}
          <div className="about-values reveal">
            <div className="values-grid">
              {values.map((v, i) => (
                <div className="value-card glass-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="value-icon">{v.icon}</div>
                  <h3 className="value-title">{v.title}</h3>
                  <p className="value-desc">{v.desc}</p>
                </div>
              ))}
            </div>

            <div className="about-journey glass-card">
              <h3 className="journey-title">My Journey</h3>
              <div className="journey-timeline">
                <div className="journey-item">
                  <span className="journey-year">2025</span>
                  <span className="journey-event">Full Stack Web Developer</span>
                </div>
                <div className="journey-item active">
                  <span className="journey-year">Now</span>
                  <span className="journey-event">Building exciting products & exploring AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
