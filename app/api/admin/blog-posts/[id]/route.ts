import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuthFromRequest } from '@/lib/auth';
import { getBlogPost } from '@/lib/content';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdminAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const post = getBlogPost(id);
    
    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Get blog post error:', error);
    return NextResponse.json({ error: 'Failed to get blog post' }, { status: 500 });
  }
}