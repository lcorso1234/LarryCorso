import { NextRequest, NextResponse } from 'next/server';
import { addSubscriber, getSubscribers } from '@/lib/subscribers';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim() : '';

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const { subscriber, isNew } = addSubscriber(email.toLowerCase());

    return NextResponse.json(
      {
        success: true,
        subscriber,
        message: isNew ? 'Thanks for subscribing!' : 'You are already on the list.',
      },
      { status: isNew ? 201 : 200 }
    );
  } catch (error) {
    console.error('Failed to store subscriber:', error);
    return NextResponse.json(
      { success: false, error: 'Unable to process your request right now.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subscribers = getSubscribers();
    return NextResponse.json({ success: true, subscribers }, { status: 200 });
  } catch (error) {
    console.error('Failed to read subscribers:', error);
    return NextResponse.json(
      { success: false, error: 'Unable to load subscribers.' },
      { status: 500 }
    );
  }
}
