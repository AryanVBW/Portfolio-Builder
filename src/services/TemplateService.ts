import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Octokit } from '@octokit/rest';

export interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  files: {
    [key: string]: string;
  };
}

export class TemplateService {
  private octokit: Octokit | null = null;

  constructor(githubToken?: string) {
    if (githubToken) {
      this.octokit = new Octokit({ auth: githubToken });
    }
  }

  async generateSpriteTemplate(geminiApiKey: string, prompt: string): Promise<Template> {
    // Implementation for Gemini API integration
    // This is a placeholder - actual implementation would use the Gemini API
    throw new Error('Not implemented');
  }

  async downloadTemplate(template: Template): Promise<void> {
    const zip = new JSZip();

    // Add all template files to the zip
    Object.entries(template.files).forEach(([filename, content]) => {
      zip.file(filename, content);
    });

    // Generate and download the zip file
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${template.name.toLowerCase().replace(/\s+/g, '-')}.zip`);
  }

  async pushToGithub(
    template: Template,
    repoName: string,
    description: string
  ): Promise<string> {
    if (!this.octokit) {
      throw new Error('GitHub token not provided');
    }

    try {
      // Create a new repository
      const { data: repo } = await this.octokit.repos.createForAuthenticatedUser({
        name: repoName,
        description,
        auto_init: true,
      });

      // Push template files to the repository
      for (const [filename, content] of Object.entries(template.files)) {
        await this.octokit.repos.createOrUpdateFileContents({
          owner: repo.owner.login,
          repo: repoName,
          path: filename,
          message: `Add ${filename}`,
          content: Buffer.from(content).toString('base64'),
        });
      }

      return repo.html_url;
    } catch (error) {
      console.error('Error pushing to GitHub:', error);
      throw error;
    }
  }
}

export const templateService = new TemplateService();
