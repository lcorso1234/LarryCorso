import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuthFromRequest } from '@/lib/auth';
import { getBlogPosts, saveBlogPost, deleteBlogPost, generateId, createSlug } from '@/lib/content';

export async function GET(request: NextRequest) {
  if (!verifyAdminAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const posts = getBlogPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Get blog posts error:', error);
    return NextResponse.json({ error: 'Failed to get blog posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdminAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, content, youtubeUrl, spotifyUrl, images = [], published = true } = await request.json();
    
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const post = {
      id: generateId(),
      title,
      slug: createSlug(title),
      content: content || '',
      youtubeUrl: youtubeUrl || undefined,
      spotifyUrl: spotifyUrl || undefined,
      images: images || [],
      published,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveBlogPost(post);
    return NextResponse.json({ post });
  } catch (error) {
    console.error('Create blog post error:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!verifyAdminAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, title, content, youtubeUrl, spotifyUrl, images, published } = await request.json();
    
    if (!id || !title) {
      return NextResponse.json({ error: 'ID and title are required' }, { status: 400 });
    }

    const existingPosts = getBlogPosts();
    const existingPost = existingPosts.find(p => p.id === id);
    
    if (!existingPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    const updatedPost = {
      ...existingPost,
      title,
      slug: createSlug(title),
      content: content || '',
      youtubeUrl: youtubeUrl || undefined,
      spotifyUrl: spotifyUrl || undefined,
      images: images || existingPost.images,
      published: published !== undefined ? published : existingPost.published,
      updatedAt: new Date().toISOString(),
    };

    saveBlogPost(updatedPost);
    return NextResponse.json({ post: updatedPost });
  } catch (error) {
    console.error('Update blog post error:', error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdminAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Blog post ID is required' }, { status: 400 });
    }

    deleteBlogPost(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete blog post error:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}