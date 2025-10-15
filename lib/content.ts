import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const PAGES_FILE = path.join(DATA_DIR, 'pages.json');

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}


// Page management functions
export function getPages(): Record<string, Page> {
  try {
    // Ensure the data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    if (!fs.existsSync(PAGES_FILE)) {
      // Create default pages.json if it doesn't exist
      const defaultPages = {
        pages: {
          about: {
            id: "about",
            title: "About",
            slug: "about", 
            content: "<p>About page content</p>",
            published: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        }
      };
      fs.writeFileSync(PAGES_FILE, JSON.stringify(defaultPages, null, 2));
      return defaultPages.pages;
    }
    
    const data = fs.readFileSync(PAGES_FILE, 'utf8');
    const parsed = JSON.parse(data);
    return parsed.pages || {};
  } catch (error) {
    console.error('Error reading pages.json:', error);
    return {};
  }
}

export function savePage(page: Page): void {
  const pages = getPages();
  pages[page.id] = {
    ...page,
    updatedAt: new Date().toISOString(),
  };
  
  const data = { pages };
  fs.writeFileSync(PAGES_FILE, JSON.stringify(data, null, 2));
}

export function deletePage(pageId: string): void {
  const pages = getPages();
  delete pages[pageId];
  
  const data = { pages };
  fs.writeFileSync(PAGES_FILE, JSON.stringify(data, null, 2));
}

export function getPage(pageId: string): Page | null {
  const pages = getPages();
  return pages[pageId] || null;
}

// Blog functionality removed

// Utility functions
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
