import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const PAGES_FILE = path.join(DATA_DIR, 'pages.json');
const BLOG_POSTS_FILE = path.join(DATA_DIR, 'blog-posts.json');

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
  images: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Page management functions
export function getPages(): Record<string, Page> {
  try {
    if (!fs.existsSync(PAGES_FILE)) {
      return {};
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

// Blog post management functions
export function getBlogPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(BLOG_POSTS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(BLOG_POSTS_FILE, 'utf8');
    const parsed = JSON.parse(data);
    return parsed.posts || [];
  } catch (error) {
    console.error('Error reading blog-posts.json:', error);
    return [];
  }
}

export function saveBlogPost(post: BlogPost): void {
  const posts = getBlogPosts();
  const existingIndex = posts.findIndex(p => p.id === post.id);
  
  const updatedPost = {
    ...post,
    updatedAt: new Date().toISOString(),
  };
  
  if (existingIndex >= 0) {
    posts[existingIndex] = updatedPost;
  } else {
    posts.push(updatedPost);
  }
  
  const data = { posts };
  fs.writeFileSync(BLOG_POSTS_FILE, JSON.stringify(data, null, 2));
}

export function deleteBlogPost(postId: string): void {
  const posts = getBlogPosts();
  const filteredPosts = posts.filter(p => p.id !== postId);
  
  const data = { posts: filteredPosts };
  fs.writeFileSync(BLOG_POSTS_FILE, JSON.stringify(data, null, 2));
}

export function getBlogPost(postId: string): BlogPost | null {
  const posts = getBlogPosts();
  return posts.find(p => p.id === postId) || null;
}

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