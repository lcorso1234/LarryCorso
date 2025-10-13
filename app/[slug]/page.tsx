import { getPages } from '@/lib/content';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pages = getPages();
  // Exclude pages that have dedicated static routes
  const excludedSlugs = ['about', 'blog', 'connect', 'manifesto', 'portfolio', 'admin', 'api', 'api-test'];
  
  return Object.values(pages)
    .filter(page => page.published && !excludedSlugs.includes(page.slug))
    .map(page => ({
      slug: page.slug,
    }));
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const pages = getPages();
  const page = Object.values(pages).find(p => p.slug === slug && p.published);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-gray-300 bg-clip-text text-transparent">
          {page.title}
        </h1>
        
        <div 
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            Last updated: {new Date(page.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}