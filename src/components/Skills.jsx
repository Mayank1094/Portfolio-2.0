import React, { useState } from 'react';
import './Skills.css';

const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    emoji: '🎨',
    skills: [
      { name: 'React', level: 95, color: '#61dafb' },
      { name: 'TypeScript', level: 88, color: '#3178c6' },
      { name: 'Next.js', level: 85, color: '#ffffff' },
      { name: 'CSS / Tailwind', level: 90, color: '#38bdf8' },
      { name: 'HTML', level: 80, color: '#764abc' },
      { name: 'Framer Motion', level: 75, color: '#ff0055' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    emoji: '⚙️',
    skills: [
      { name: 'Node.js', level: 92, color: '#68a063' },
      { name: 'Express.js', level: 90, color: '#cccccc' },
      { name: 'Python', level: 78, color: '#3572A5' },
      { name: 'REST APIs', level: 93, color: '#06b6d4' },
      { name: 'MySQL', level: 72, color: '#e535ab' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    emoji: '🗄️',
    skills: [
      { name: 'PostgreSQL', level: 85, color: '#336791' },
      { name: 'MongoDB', level: 88, color: '#4fa94d' },
      { name: 'MySQL', level: 80, color: '#00758f' },
      { name: 'Firebase', level: 78, color: '#ffca28' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Tools',
    emoji: '🛠️',
    skills: [
      { name: 'Docker', level: 80, color: '#2496ed' },
      { name: 'AWS', level: 72, color: '#ff9900' },
      { name: 'Git / GitHub', level: 95, color: '#f05033' },
      { name: 'Linux', level: 82, color: '#f5a623' },
    ],
  },
];

const techIcons = [
  { name: 'React', color: '#61dafb', symbol: '⚛' },
  { name: 'Node.js', color: '#68a063', symbol: '⬢' },
  { name: 'TypeScript', color: '#3178c6', symbol: 'TS' },
  { name: 'Python', color: '#3572A5', symbol: '🐍' },
  { name: 'MySQL', color: '#336791', symbol: '🐘' },
  { name: 'MongoDB', color: '#4fa94d', symbol: '🍃' },
  { name: 'Docker', color: '#2496ed', symbol: '🐳' },
  { name: 'AWS', color: '#ff9900', symbol: '☁️' },
  { name: 'Next.js', color: '#ffffff', symbol: 'N' },
  { name: 'Redis', color: '#ff4438', symbol: '🔥' },
  { name: 'GraphQL', color: '#e535ab', symbol: '◈' },
  { name: 'Git', color: '#f05033', symbol: '🔀' },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend');
  const active = skillCategories.find(c => c.id === activeTab);

  return (
    <section className="section skills" id="skills">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-label">Technical Skills</p>
          <h2 className="section-title">My Tech Arsenal</h2>
          <p className="section-description">
            A comprehensive toolkit honed through real-world projects
            across the full stack.
          </p>
        </div>

        {/* Tech icon cloud */}
        <div className="tech-cloud reveal">
          {techIcons.map((tech, i) => (
            <div
              key={tech.name}
              className="tech-pill"
              style={{
                '--tech-color': tech.color,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              <span className="tech-symbol">{tech.symbol}</span>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Category tabs */}
        <div className="skills-panel glass-card reveal">
          <div className="skills-tabs">
            {skillCategories.map(cat => (
              <button
                key={cat.id}
                id={`skill-tab-${cat.id}`}
                className={`skill-tab ${activeTab === cat.id ? 'active' : ''}`}
                onClick={() => setActiveTab(cat.id)}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="skills-content">
            {active.skills.map((skill, i) => (
              <div className="skill-row" key={skill.name} style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percent">{skill.level}%</span>
                </div>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    style={{
                      '--fill-width': `${skill.level}%`,
                      '--fill-color': skill.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
