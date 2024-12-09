import JSZip from 'jszip';
import { UserData } from '../types/portfolio';
import { generateTemplateFiles } from './templateGenerator';

export async function generatePortfolioZip(
  userData: UserData,
  templateId: string
): Promise<Blob> {
  try {
    // Generate template files
    const files = await generateTemplateFiles(userData, templateId);
    const zip = new JSZip();
    
    // Add files to zip
    Object.entries(files).forEach(([path, content]) => {
      zip.file(path, content);
    });

    // Generate zip file
    return await zip.generateAsync({ type: 'blob' });
  } catch (error) {
    console.error('Error generating portfolio zip:', error);
    throw new Error('Failed to generate portfolio zip');
  }
}

export function downloadZip(blob: Blob, fileName: string) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}