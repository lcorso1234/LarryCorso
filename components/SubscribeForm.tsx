'use client';

import { FormEvent, useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setMessage('Drop your email first.');
      return;
    }

    try {
      setStatus('loading');
      setMessage('');

      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Something went wrong');
      }

      setStatus('success');
      setMessage(data?.message || 'You are on the list.');
      setEmail('');
    } catch (error) {
      console.error('Subscribe failed:', error);
      setStatus('error');
      setMessage(
        error instanceof Error ? error.message : 'Unable to subscribe right now.'
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center"
    >
      <label htmlFor="muse-subscribe-email" className="sr-only">
        Email address
      </label>
      <input
        id="muse-subscribe-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="your@email.com"
        required
        className="w-full max-w-md rounded-full border-2 border-[#FFE48F] bg-[#FFF9DD] px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#1D4ED8] placeholder-[#94A3B8] shadow-[0_8px_0_rgba(255,228,143,0.4)] focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
        disabled={status === 'loading'}
      />
      <button
        type="submit"
        className="rounded-full bg-[#FFE48F] px-10 py-3 text-sm font-black uppercase tracking-[0.4em] text-[#1D4ED8] border-2 border-[#1D4ED8] shadow-[0_8px_0_rgba(29,78,216,0.35)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_0_rgba(29,78,216,0.45)] disabled:cursor-not-allowed disabled:opacity-70"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'SENDING…' : 'SIGN ME UP'}
      </button>
      {message && (
        <p
          className={`w-full text-center text-xs font-semibold uppercase tracking-[0.3em] sm:mt-0 sm:w-auto ${
            status === 'error' ? 'text-[#DC2626]' : 'text-[#0F172A]'
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
