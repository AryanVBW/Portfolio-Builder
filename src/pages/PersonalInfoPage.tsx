import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaUpload } from 'react-icons/fa';
import '../styles/PersonalInfoPage.css';

interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  profileImage?: File;
  skills: { name: string; level: number }[];
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

const PersonalInfoPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [previewImage, setPreviewImage] = useState<string>('');
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    title: '',
    bio: '',
    email: '',
    location: '',
    skills: [{ name: '', level: 50 }],
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: ''
    }
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setPersonalInfo(prev => ({ ...prev, profileImage: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Handle form submission
      navigate(`/preview?template=${templateId}`);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate('/templates');
    }
  };

  const stepVariants = {
    enter: {
      x: 300,
      opacity: 0
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: -300,
      opacity: 0
    }
  };

  return (
    <div className="personal-info-page">
      <motion.div 
        className="progress-bar"
        initial={{ width: '0%' }}
        animate={{ width: `${(currentStep / 4) * 100}%` }}
        transition={{ duration: 0.5 }}
      />

      <div className="form-container">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              className="form-step"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <h2>Basic Information</h2>
              <div className="profile-upload">
                <div 
                  className="image-upload-area"
                  onClick={() => document.getElementById('profile-image')?.click()}
                >
                  {previewImage ? (
                    <img src={previewImage} alt="Profile Preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <FaUpload size={24} />
                      <p>Upload Profile Picture</p>
                    </div>
                  )}
                </div>
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  hidden
                />
              </div>
              <input
                type="text"
                placeholder="Your Name"
                value={personalInfo.name}
                onChange={e => setPersonalInfo(prev => ({ ...prev, name: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Professional Title"
                value={personalInfo.title}
                onChange={e => setPersonalInfo(prev => ({ ...prev, title: e.target.value }))}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              className="form-step"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <h2>About You</h2>
              <textarea
                placeholder="Tell us about yourself..."
                value={personalInfo.bio}
                onChange={e => setPersonalInfo(prev => ({ ...prev, bio: e.target.value }))}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={personalInfo.email}
                onChange={e => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Location"
                value={personalInfo.location}
                onChange={e => setPersonalInfo(prev => ({ ...prev, location: e.target.value }))}
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              className="form-step"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <h2>Skills</h2>
              {personalInfo.skills.map((skill, index) => (
                <div key={index} className="skill-input">
                  <input
                    type="text"
                    placeholder="Skill Name"
                    value={skill.name}
                    onChange={e => {
                      const newSkills = [...personalInfo.skills];
                      newSkills[index].name = e.target.value;
                      setPersonalInfo(prev => ({ ...prev, skills: newSkills }));
                    }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={e => {
                      const newSkills = [...personalInfo.skills];
                      newSkills[index].level = Number(e.target.value);
                      setPersonalInfo(prev => ({ ...prev, skills: newSkills }));
                    }}
                  />
                  <span>{skill.level}%</span>
                </div>
              ))}
              <button
                className="add-skill-btn"
                onClick={() => setPersonalInfo(prev => ({
                  ...prev,
                  skills: [...prev.skills, { name: '', level: 50 }]
                }))}
              >
                Add Skill
              </button>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              className="form-step"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <h2>Social Links</h2>
              <div className="social-input">
                <FaGithub />
                <input
                  type="text"
                  placeholder="GitHub Profile URL"
                  value={personalInfo.socialLinks.github}
                  onChange={e => setPersonalInfo(prev => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, github: e.target.value }
                  }))}
                />
              </div>
              <div className="social-input">
                <FaLinkedin />
                <input
                  type="text"
                  placeholder="LinkedIn Profile URL"
                  value={personalInfo.socialLinks.linkedin}
                  onChange={e => setPersonalInfo(prev => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                  }))}
                />
              </div>
              <div className="social-input">
                <FaTwitter />
                <input
                  type="text"
                  placeholder="Twitter Profile URL"
                  value={personalInfo.socialLinks.twitter}
                  onChange={e => setPersonalInfo(prev => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                  }))}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="form-actions">
          <motion.button
            className="back-btn"
            onClick={handleBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back
          </motion.button>
          <motion.button
            className="next-btn"
            onClick={handleNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentStep === 4 ? 'Preview' : 'Next'}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
