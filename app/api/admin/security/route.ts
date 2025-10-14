import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ error: 'This API has been removed' }, { status: 410 });
}