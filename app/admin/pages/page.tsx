'use client';

import { useState, useEffect } from 'react';
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

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
'use client';

import { notFound } from 'next/navigation';

export default function AdminPages() {
  notFound();
}