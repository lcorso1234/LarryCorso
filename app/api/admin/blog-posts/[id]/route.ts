import { NextResponse } from 'next/server';

// Blog API removed. Return 410 Gone for any requests to this route.
export async function GET() {
  return NextResponse.json({ error: 'Blog API removed' }, { status: 410 });
}