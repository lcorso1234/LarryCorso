// Removed blog-posts API — no-op placeholder to prevent module not found during incremental builds.
// The blog feature was intentionally removed.
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ error: 'Blog API removed' }, { status: 410 });
}