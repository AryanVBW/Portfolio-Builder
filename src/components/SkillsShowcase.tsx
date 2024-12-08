import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
}

interface SkillsShowcaseProps {
  skills: Skill[];
}

const SkillsShowcase: React.FC<SkillsShowcaseProps> = ({ skills }) => {
  return (
    <motion.div 
      className="skills-showcase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Skills</h3>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <motion.div 
            key={skill.name}
            className="skill-item"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="skill-name">{skill.name}</span>
            <div className="skill-bar-container">
              <motion.div 
                className="skill-bar"
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillsShowcase;
