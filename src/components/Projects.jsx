import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Github } from './SocialIcons';

import './Projects.css';

const projectData = [
  {
    id: 1,
    title: 'Clickzz',
    category: 'Full Stack',
    image: '/projects/clickzz-preview.png',
    description: 'A modern, cinematic website built with React and Tailwind CSS, featuring a sleek dark-themed UI and immersive user experience.',
    tech: ['React', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/Mayank1094/cinematic-clickzz',
    live: 'https://clickzz.in',
    featured: true,
  },
];

export default function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-label">Selected Work</p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-description">
            A selection of my recent work focusing on modern design,
            smooth animations, and impactful user experiences.
          </p>
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
      </div>
    </section>
  );
}

