'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const [page, setPage] = useState<Page | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (resolvedParams?.id) {
      fetchPage(resolvedParams.id);
    }
  }, [resolvedParams]);

  const fetchPage = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/pages/${id}`);
      if (response.ok) {
        const data = await response.json();
        const pageData = data.page;
        setPage(pageData);
        setTitle(pageData.title);
        setContent(pageData.content);
        setPublished(pageData.published);
      } else {
        alert('Page not found');
        router.push('/admin/pages');
      }
    } catch (error) {
      console.error('Error fetching page:', error);
      alert('Failed to load page');
    'use client';

    import { notFound } from 'next/navigation';

    export default function EditPage({ params }: { params: { id: string } }) {
      notFound();
    }