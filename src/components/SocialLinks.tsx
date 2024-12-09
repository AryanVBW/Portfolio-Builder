import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { SocialLinks as SocialLinksType } from '../types/portfolio';

interface SocialLinksProps {
  socialLinks: SocialLinksType;
  onUpdate: (links: SocialLinksType) => void;
}

export function SocialLinks({ socialLinks, onUpdate }: SocialLinksProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
      
      <div className="grid gap-4">
        <div className="flex items-center space-x-2">
          <Github className="w-5 h-5 text-gray-500" />
          <input
            type="url"
            placeholder="GitHub Profile URL"
            value={socialLinks.github || ''}
            onChange={(e) => onUpdate({ ...socialLinks, github: e.target.value })}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Linkedin className="w-5 h-5 text-gray-500" />
          <input
            type="url"
            placeholder="LinkedIn Profile URL"
            value={socialLinks.linkedin || ''}
            onChange={(e) => onUpdate({ ...socialLinks, linkedin: e.target.value })}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Twitter className="w-5 h-5 text-gray-500" />
          <input
            type="url"
            placeholder="Twitter Profile URL"
            value={socialLinks.twitter || ''}
            onChange={(e) => onUpdate({ ...socialLinks, twitter: e.target.value })}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5 text-gray-500" />
          <input
            type="email"
            placeholder="Email Address"
            value={socialLinks.email || ''}
            onChange={(e) => onUpdate({ ...socialLinks, email: e.target.value })}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}