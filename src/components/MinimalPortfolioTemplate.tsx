import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

interface MinimalPortfolioTemplateProps {
  personalInfo: {
    name: string;
    title: string;
    bio: string;
    profileImage: string;
    location?: string;
    email?: string;
  };
  skills: Array<{
    category: string;
    items: Array<{ name: string; level: number }>;
  }>;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    imageUrl?: string;
    link?: string;
  }>;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const MinimalPortfolioTemplate: React.FC<MinimalPortfolioTemplateProps> = ({
  personalInfo,
  skills,
  experience,
  projects,
  socialLinks,
}) => {
  const [headerRef, headerInView] = useInView({ triggerOnce: true });
  const [skillsRef, skillsInView] = useInView({ triggerOnce: true });
  const [experienceRef, experienceInView] = useInView({ triggerOnce: true });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true });

  return (
    <div className="minimal-portfolio">
      <motion.header
        ref={headerRef}
        className="minimal-hero"
        initial={{ opacity: 0 }}
        animate={headerInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="minimal-container">
          <div className="minimal-hero-content">
            <motion.div
              className="minimal-profile-image"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={headerInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <img src={personalInfo.profileImage} alt={personalInfo.name} />
            </motion.div>
            <motion.div
              className="minimal-hero-text"
              initial={{ y: 20, opacity: 0 }}
              animate={headerInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <h1>{personalInfo.name}</h1>
              <h2>{personalInfo.title}</h2>
              {personalInfo.location && (
                <p className="minimal-location">{personalInfo.location}</p>
              )}
              <div className="minimal-social-links">
                {socialLinks.github && (
                  <motion.a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
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
                    whileTap={{ scale: 0.95 }}
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
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTwitter />
                  </motion.a>
                )}
                {socialLinks.email && (
                  <motion.a
                    href={`mailto:${socialLinks.email}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaEnvelope />
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>
          <motion.p
            className="minimal-bio"
            initial={{ y: 20, opacity: 0 }}
            animate={headerInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            {personalInfo.bio}
          </motion.p>
        </div>
      </motion.header>

      <motion.section
        ref={skillsRef}
        className="minimal-skills"
        initial={{ opacity: 0 }}
        animate={skillsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="minimal-container">
          <h3>Skills</h3>
          <div className="minimal-skills-grid">
            {skills.map((category, index) => (
              <motion.div
                key={category.category}
                className="minimal-skill-category"
                initial={{ x: -20, opacity: 0 }}
                animate={skillsInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <h4>{category.category}</h4>
                <div className="minimal-skill-items">
                  {category.items.map((skill) => (
                    <div key={skill.name} className="minimal-skill-item">
                      <span>{skill.name}</span>
                      <div className="minimal-skill-level">
                        <motion.div
                          className="minimal-skill-progress"
                          initial={{ width: 0 }}
                          animate={skillsInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={experienceRef}
        className="minimal-experience"
        initial={{ opacity: 0 }}
        animate={experienceInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="minimal-container">
          <h3>Experience</h3>
          <div className="minimal-timeline">
            {experience.map((job, index) => (
              <motion.div
                key={`${job.company}-${index}`}
                className="minimal-timeline-item"
                initial={{ x: -20, opacity: 0 }}
                animate={experienceInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: index * 0.2 }}
              >
                <div className="minimal-timeline-content">
                  <h4>{job.position}</h4>
                  <h5>{job.company}</h5>
                  <span className="minimal-duration">{job.duration}</span>
                  <p>{job.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={projectsRef}
        className="minimal-projects"
        initial={{ opacity: 0 }}
        animate={projectsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="minimal-container">
          <h3>Projects</h3>
          <div className="minimal-projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="minimal-project-card"
                initial={{ y: 20, opacity: 0 }}
                animate={projectsInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                {project.imageUrl && (
                  <div className="minimal-project-image">
                    <img src={project.imageUrl} alt={project.title} />
                  </div>
                )}
                <div className="minimal-project-content">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="minimal-tech-stack">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="minimal-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="minimal-project-link"
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

export default MinimalPortfolioTemplate;
