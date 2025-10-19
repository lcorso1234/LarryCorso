'use client';

import { useEffect } from 'react';

interface MuseCategoryModalProps {
  open: boolean;
  title: string;
  accent: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function MuseCategoryModal({ open, title, accent, onClose, children }: MuseCategoryModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} aria-label="Close" />
      <div className={`relative z-10 max-h-[90vh] w-11/12 max-w-4xl overflow-y-auto rounded-[40px] border-4 border-[#FFE48F] bg-[#FFF9DD] p-8 shadow-[0_24px_0_rgba(96,165,250,0.45)]`}>
        <div className="flex items-center justify-between">
          <div className={`inline-flex items-center gap-3 rounded-full border-4 border-[#60A5FA] bg-gradient-to-r ${accent} px-6 py-2 text-xs font-black uppercase tracking-[0.4em] text-[#1D4ED8] shadow-[0_8px_0_rgba(96,165,250,0.3)]`}> 
            {title}
          </div>
          <button
            onClick={onClose}
            className="rounded-full border-2 border-[#F97316] px-4 py-2 text-xs font-black uppercase tracking-[0.4em] text-[#F97316] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_8px_0_rgba(249,115,22,0.4)]"
          >
            Close
          </button>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {children}
        </div>
      </div>
    </div>
  );
}
