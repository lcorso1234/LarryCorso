import { NextResponse } from 'next/server';

// Admin login API removed. Use external auth provider or re-enable backend.
export async function POST() {
  return NextResponse.json({ error: 'This API has been removed' }, { status: 410 });
}