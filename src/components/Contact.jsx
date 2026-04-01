import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact-grid">
          {/* Info Side */}
          <div className="contact-info reveal">
            <p className="section-label">Get in Touch</p>
            <h2 className="section-title">Let's Build Something<br />Amazing Together</h2>
            <p className="contact-desc">
              Whether you have a question, a project idea, or just want to say hi,
              I'll try my best to get back to you!
            </p>

            <div className="contact-methods">
              <div className="contact-method-card glass-card">
                <div className="method-icon">
                  <Mail size={24} />
                </div>
                <div className="method-details">
                  <h4>Email Me</h4>
                  <a href="mailto:mayankkamble1094@gmail.com">mayankkamble1094@gmail.com</a>
                </div>
              </div>

              <div className="contact-method-card glass-card mt-4">
                <div className="method-icon">
                  <MessageSquare size={24} />
                </div>
                <div className="method-details">
                  <h4>Social Profiles</h4>
                  <div className="social-links-small">
                    <a href="https://github.com/Mayank1094" target="_blank" rel="noreferrer">GitHub</a>
                    <span>•</span>
                    <a href="https://www.mayankkamble.com" target="_blank" rel="noreferrer">Website</a>
                    <span>•</span>
                    <a href="https://www.instagram.com/__mayank._02/?__pwa=1" target="_blank" rel="noreferrer">Instagram</a>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="contact-form-wrapper glass-card reveal">
            <h3 className="form-title">Send a Message</h3>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  required
                  rows="5"
                  placeholder="How can I help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className={`btn-primary submit-btn ${status}`}
                disabled={status !== 'idle'}
              >
                {status === 'idle' && <><Send size={18} /> Send Message</>}
                {status === 'sending' && <span className="loader">Sending...</span>}
                {status === 'success' && <><CheckCircle2 size={18} /> Message Sent!</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
