import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');

export interface Subscriber {
  email: string;
  createdAt: string;
}

function ensureStorage(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(SUBSCRIBERS_FILE)) {
    const initialData: Subscriber[] = [];
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(initialData, null, 2));
  }
}

export function getSubscribers(): Subscriber[] {
  try {
    ensureStorage();
    const raw = fs.readFileSync(SUBSCRIBERS_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as Subscriber[];
    }
    return [];
  } catch (error) {
    console.error('Error reading subscribers:', error);
    return [];
  }
}

export function addSubscriber(email: string): { subscriber: Subscriber; isNew: boolean } {
  ensureStorage();
  const subscribers = getSubscribers();
  const existing = subscribers.find(
    (subscriber) => subscriber.email.toLowerCase() === email.toLowerCase()
  );

  if (existing) {
    return { subscriber: existing, isNew: false };
  }

  const subscriber: Subscriber = {
    email,
    createdAt: new Date().toISOString(),
  };

  subscribers.push(subscriber);
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));

  return { subscriber, isNew: true };
}
