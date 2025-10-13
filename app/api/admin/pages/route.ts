import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuthFromRequest } from '@/lib/auth';
import { getPages, savePage, deletePage, generateId, createSlug } from '@/lib/content';

export async function GET(request: NextRequest) {
  if (!verifyAdminAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const pages = getPages();
    return NextResponse.json({ pages: Object.values(pages) });
  } catch (error) {
    console.error('Get pages error:', error);
    return NextResponse.json({ error: 'Failed to get pages' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdminAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, content, published = true } = await request.json();
    
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const page = {
      id: generateId(),
      title,
      slug: createSlug(title),
      content: content || '',
      published,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    savePage(page);
    return NextResponse.json({ page });
  } catch (error) {
    console.error('Create page error:', error);
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!verifyAdminAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, title, content, published } = await request.json();
    
    if (!id || !title) {
      return NextResponse.json({ error: 'ID and title are required' }, { status: 400 });
    }

    const existingPages = getPages();
    const existingPage = existingPages[id];
    
    if (!existingPage) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    const updatedPage = {
      ...existingPage,
      title,
      slug: createSlug(title),
      content: content || '',
      published: published !== undefined ? published : existingPage.published,
      updatedAt: new Date().toISOString(),
    };

    savePage(updatedPage);
    return NextResponse.json({ page: updatedPage });
  } catch (error) {
    console.error('Update page error:', error);
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
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
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 });
    }

    deletePage(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete page error:', error);
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
  }
}