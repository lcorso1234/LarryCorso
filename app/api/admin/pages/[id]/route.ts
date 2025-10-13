import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuthFromRequest } from '@/lib/auth';
import { getPage } from '@/lib/content';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdminAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const page = getPage(id);
    
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ page });
  } catch (error) {
    console.error('Get page error:', error);
    return NextResponse.json({ error: 'Failed to get page' }, { status: 500 });
  }
}