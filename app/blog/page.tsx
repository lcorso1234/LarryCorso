import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return [];
}

export default async function Blog() {
  // Permanently removed
  notFound();
}