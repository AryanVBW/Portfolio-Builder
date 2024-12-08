import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <p>Made with ❤️ by Vivek W</p>
      <div className="social-icons" style={{ marginTop: '1rem' }}>
        <motion.a 
          href="https://github.com/AryanVBW"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaGithub size={24} />
        </motion.a>
        <motion.a 
          href="mailto:vivek.aryanvbw@gmail.com"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaEnvelope size={24} />
        </motion.a>
      </div>
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
        © {new Date().getFullYear()} All rights reserved
      </p>
    </motion.footer>
  );
};

export default Footer;
