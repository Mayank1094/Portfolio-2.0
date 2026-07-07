import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, ArrowRight, Award, X } from 'lucide-react';
import { Github } from './SocialIcons';
import { db, collection } from '../firebase';
import { getDocs } from 'firebase/firestore';

import './Projects.css';

const projectData = [
  {
    id: 1,
    title: 'Clickzz',
    category: 'Full Stack',
    image: '/projects/clickzz-preview.png',
    description: 'A modern, high-performance web application built with React and Tailwind CSS. It features a sleek, cinematic dark-themed UI and an immersive, highly interactive user experience.',
    tech: ['React', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/Mayank1094/cinematic-clickzz',
    live: 'https://clickzz.in',
    featured: true,
  },
];

export default function Projects() {
  const [certificates, setCertificates] = useState([]);
  const [showCertificates, setShowCertificates] = useState(false);
  const [loadingCerts, setLoadingCerts] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  const fetchCertificates = async () => {
    if (certificates.length > 0) {
      setShowCertificates(true);
      return;
    }
    setLoadingCerts(true);
    setShowCertificates(true);
    try {
      const certCollection = collection(db, "certificates");
      const snapshot = await getDocs(certCollection);
      const data = snapshot.docs.map(doc => doc.data());
      
      setCertificates(data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoadingCerts(false);
    }
  };

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-label">Selected Work</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-description">
                A curated selection of my recent engineering work, demonstrating a focus on modern design, scalable architecture, and impactful user experiences.
              </p>
            </div>
            <button 
              className="btn-primary" 
              onClick={fetchCertificates}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Award size={18} /> View Certifications
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projectData.map((project, index) => (
            <div
              key={project.id}
              className={`project-card glass-card reveal ${project.featured ? 'featured' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-image-wrapper">
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link-icon" aria-label="Live Demo">
                      <ExternalLink size={20} />
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-icon" aria-label="GitHub Repo">
                      <Github size={20} />
                    </a>
                  </div>
                </div>
                <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
                <span className="project-category-badge">{project.category}</span>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-more reveal">
          <a href="https://github.com/Mayank1094" target="_blank" rel="noopener noreferrer" className="btn-secondary view-all-btn">
            View All on GitHub <ArrowRight size={18} />
          </a>
        </div>

        {/* Certificates Modal */}
        {showCertificates && createPortal(
          <div className="certificates-modal-overlay" onClick={() => setShowCertificates(false)}>
            <div className="certificates-modal glass-card" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>My Certifications</h3>
                <button className="close-btn" onClick={() => setShowCertificates(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="modal-content">
                {loadingCerts ? (
                  <div className="loader">Loading...</div>
                ) : certificates.length > 0 ? (
                  <div className="certificates-grid">
                    {certificates.map((cert, idx) => (
                      <div 
                        key={idx} 
                        className="certificate-card"
                        onClick={() => setSelectedCert(cert.Img || cert.imgSertif)}
                        style={{ cursor: 'pointer' }}
                      >
                        <img src={cert.Img || cert.imgSertif} alt={`Certificate ${idx + 1}`} loading="lazy" />
                        <div className="zoom-hint">Click to enlarge</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No certificates found.</p>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}

        {/* Fullscreen Certificate Viewer */}
        {selectedCert && createPortal(
          <div className="cert-viewer-overlay" onClick={() => setSelectedCert(null)}>
            <button className="close-viewer-btn" onClick={() => setSelectedCert(null)}>
              <X size={32} />
            </button>
            <div className="cert-viewer-content" onClick={e => e.stopPropagation()}>
              <img src={selectedCert} alt="Enlarged Certificate" className="enlarged-cert-image" />
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
}

