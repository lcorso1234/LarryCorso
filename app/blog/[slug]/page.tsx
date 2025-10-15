import { notFound } from 'next/navigation';

// Blog was removed; always return notFound for blog post routes.
export async function generateStaticParams() {
  // No blog posts available
  return [];
}

export default async function BlogPost() {
  notFound();
}