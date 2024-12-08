import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface SocialLinksProps {
  github?: string;
  linkedin?: string;
  twitter?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ github, linkedin, twitter }) => {
  return (
    <motion.div 
      className="social-links"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Connect With Me</h3>
      <div className="social-icons">
        {github && (
          <motion.a 
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub size={30} />
          </motion.a>
        )}
        {linkedin && (
          <motion.a 
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin size={30} />
          </motion.a>
        )}
        {twitter && (
          <motion.a 
            href={twitter}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTwitter size={30} />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

export default SocialLinks;
