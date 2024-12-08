import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfilePhotoUploadProps {
  onPhotoUpload: (file: File) => void;
  currentPhoto?: string;
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({ onPhotoUpload, currentPhoto }) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentPhoto);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
      onPhotoUpload(file);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <motion.div 
      className="profile-photo-upload"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className={`upload-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <AnimatePresence>
          {previewUrl ? (
            <motion.img 
              src={previewUrl} 
              alt="Profile Preview"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            />
          ) : (
            <motion.div className="placeholder">
              <p>Drag & Drop or Click to Upload</p>
            </motion.div>
          )}
        </AnimatePresence>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
          className="file-input"
        />
      </div>
    </motion.div>
  );
};

export default ProfilePhotoUpload;
