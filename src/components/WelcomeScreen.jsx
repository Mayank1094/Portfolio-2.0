import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Globe, User, ExternalLink } from "lucide-react";
import { Github } from "./SocialIcons";
import AOS from "aos";
import "aos/dist/aos.css";
import "./WelcomeScreen.css";

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 260);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="ws-typewriter">
      {displayText}
      <span className="ws-cursor">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="ws-bg-effect">
    <div className="ws-bg-gradient-1" />
    <div className="ws-bg-gradient-2" />
  </div>
);

const IconButton = ({ Icon }) => (
  <div className="ws-icon-btn-wrapper">
    <div className="ws-icon-glow" />
    <div className="ws-icon-btn">
      <Icon className="ws-icon" />
    </div>
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const icons = [Code2, User, Github];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="ws-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />

          <div className="ws-content">
            <div className="ws-inner">
              {/* Icons */}
              <motion.div className="ws-icons-row" variants={childVariants}>
                {icons.map((Icon, index) => (
                  <div
                    key={index}
                    data-aos="fade-down"
                    data-aos-delay={index * 200}
                  >
                    <IconButton Icon={Icon} />
                  </div>
                ))}
              </motion.div>

              {/* Welcome Text */}
              <motion.div className="ws-text-center" variants={childVariants}>
                <h1 className="ws-title">
                  <div className="ws-title-line-1">
                    <span
                      data-aos="fade-right"
                      data-aos-delay="200"
                      className="ws-word ws-word-light"
                    >
                      Welcome
                    </span>{" "}
                    <span
                      data-aos="fade-right"
                      data-aos-delay="400"
                      className="ws-word ws-word-light"
                    >
                      To
                    </span>{" "}
                    <span
                      data-aos="fade-right"
                      data-aos-delay="600"
                      className="ws-word ws-word-light"
                    >
                      My
                    </span>
                  </div>
                  <div className="ws-title-line-2">
                    <span
                      data-aos="fade-up"
                      data-aos-delay="800"
                      className="ws-word ws-word-accent"
                    >
                      Portfolio
                    </span>{" "}
                    <span
                      data-aos="fade-up"
                      data-aos-delay="1000"
                      className="ws-word ws-word-accent"
                    >
                      Website
                    </span>
                  </div>
                </h1>
              </motion.div>

              {/* Website Link */}
              <motion.div
                className="ws-link-row"
                variants={childVariants}
                data-aos="fade-up"
                data-aos-delay="1200"
              >
                <a
                  href="https://www.mayankkamble.com"
                  className="ws-visit-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="ws-visit-icon" />
                  <span className="ws-visit-text">Visit Website</span>
                </a>
              </motion.div>
            </div>
          </div>

          <div className="ws-bottom-bar">
            <div className="ws-bottom-inner">
              <div className="ws-divider" />
              <div className="ws-status-row">
                <span>System Status:</span>
                <span className="ws-status-online">
                  <span className="ws-status-dot" />
                  Online
                </span>
                <span className="ws-status-sep">|</span>
                <TypewriterEffect text="www.mayankkamble.com" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
