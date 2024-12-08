import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { useInView } from 'react-intersection-observer';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  link?: string;
}

interface ModernPortfolioTemplateProps {
  name: string;
  title: string;
  bio: string;
  profileImage: string;
  skills: { name: string; level: number }[];
  projects: Project[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const ModernPortfolioTemplate: React.FC<ModernPortfolioTemplateProps> = ({
  name,
  title,
  bio,
  profileImage,
  skills,
  projects,
  socialLinks,
}) => {
  const [headerRef, headerInView] = useInView({ triggerOnce: true });
  const [bioRef, bioInView] = useInView({ triggerOnce: true });
  const [skillsRef, skillsInView] = useInView({ triggerOnce: true });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true });

  return (
    <div className="modern-portfolio">
      {/* Hero Section */}
      <motion.header
        ref={headerRef}
        className="hero-section"
        initial={{ opacity: 0, y: 50 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.div
            className="profile-image-container"
            initial={{ scale: 0 }}
            animate={headerInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <img src={profileImage} alt={name} className="profile-image" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {name}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {title}
          </motion.h2>
          <motion.div
            className="social-links"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {socialLinks.github && (
              <motion.a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub />
              </motion.a>
            )}
            {socialLinks.linkedin && (
              <motion.a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin />
              </motion.a>
            )}
            {socialLinks.twitter && (
              <motion.a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTwitter />
              </motion.a>
            )}
            {socialLinks.email && (
              <motion.a
                href={`mailto:${socialLinks.email}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HiOutlineMail />
              </motion.a>
            )}
          </motion.div>
        </div>
      </motion.header>

      {/* Bio Section */}
      <motion.section
        ref={bioRef}
        className="bio-section"
        initial={{ opacity: 0, y: 30 }}
        animate={bioInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <h3>About Me</h3>
          <p>{bio}</p>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        ref={skillsRef}
        className="skills-section"
        initial={{ opacity: 0, y: 30 }}
        animate={skillsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <h3>Skills</h3>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-item"
                initial={{ opacity: 0, x: -20 }}
                animate={skillsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <span className="skill-name">{skill.name}</span>
                <div className="skill-bar-container">
                  <motion.div
                    className="skill-bar"
                    initial={{ width: 0 }}
                    animate={skillsInView ? { width: `${skill.level}%` } : {}}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        ref={projectsRef}
        className="projects-section"
        initial={{ opacity: 0, y: 30 }}
        animate={projectsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <h3>Projects</h3>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="project-card"
                initial={{ opacity: 0, y: 20 }}
                animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                {project.imageUrl && (
                  <div className="project-image">
                    <img src={project.imageUrl} alt={project.title} />
                  </div>
                )}
                <div className="project-content">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      View Project
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ModernPortfolioTemplate;
