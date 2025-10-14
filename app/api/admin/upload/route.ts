import { NextResponse } from 'next/server';

// API disabled — backend removed by request. Returns 410 Gone for all requests.
export async function POST() {
  return NextResponse.json({ error: 'This API has been removed' }, { status: 410 });
}