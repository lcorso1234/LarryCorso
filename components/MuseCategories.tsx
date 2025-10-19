'use client';

import { useMemo, useState } from 'react';
import MuseCategoryModal from '@/components/MuseCategoryModal';

type QuoteEntry = {
  body: string[];
  author: string;
};

type QuoteCollection = {
  title: string;
  accent: string;
  quotes: QuoteEntry[];
};

const neonCardPalette = [
  {
    bg: 'bg-[#FFE48F]',
    border: 'border-[#FFD166]',
    text: 'text-[#2F2A40]',
    label: 'text-[#B45309]',
  },
  {
    bg: 'bg-[#87CBFF]',
    border: 'border-[#60A5FA]',
    text: 'text-[#0B1221]',
    label: 'text-[#1D4ED8]',
  },
  {
    bg: 'bg-[#FF8FB3]',
    border: 'border-[#FB7185]',
    text: 'text-white',
    label: 'text-white',
  },
  {
    bg: 'bg-[#FFFFFF]',
    border: 'border-[#F97316]',
    text: 'text-[#1F2937]',
    label: 'text-[#F97316]',
  },
];

interface MuseCategoriesProps {
  collections: QuoteCollection[];
}

export default function MuseCategories({ collections }: MuseCategoriesProps) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);

  const openRandomCategory = () => {
    const randomIndex = Math.floor(Math.random() * collections.length);
    setActiveCategoryIndex(randomIndex);
  };

  const activeCollection = useMemo(() => {
    if (activeCategoryIndex === null) return null;
    return collections[activeCategoryIndex];
  }, [activeCategoryIndex, collections]);

  return (
    <section className="px-6 sm:px-10 md:px-14 pb-24">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.6em] text-[#F97316]">
            Choose a Chamber
          </p>
          <button
            onClick={openRandomCategory}
            className="rounded-[48px] border-4 border-[#F472B6] bg-[#FFE48F] px-10 py-5 text-base sm:text-lg font-black uppercase tracking-[0.45em] text-[#1D4ED8] shadow-[0_18px_0_rgba(244,114,182,0.35)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_0_rgba(244,114,182,0.5)]"
          >
            Your Wish Is My Command
          </button>
          <span className="text-xs uppercase tracking-[0.4em] text-[#0F172A]">
            or pick a category below
          </span>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <button
              key={collection.title}
              onClick={() => setActiveCategoryIndex(index)}
              className={`relative h-full rounded-[40px] border-4 border-[#60A5FA] bg-gradient-to-r ${collection.accent} px-8 py-10 text-left shadow-[0_18px_0_rgba(96,165,250,0.35)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_0_rgba(96,165,250,0.45)]`}
            >
              <span className="text-[0.65rem] sm:text-xs uppercase tracking-[0.6em] text-[#0F172A] opacity-80">
                Category
              </span>
              <h3 className="mt-4 text-xl font-black uppercase tracking-[0.35em] text-[#1D4ED8] drop-shadow-[0_4px_0_rgba(29,78,216,0.25)]">
                {collection.title}
              </h3>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-[#1F2937]">
                {collection.quotes.length} quotes
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.4em] text-[#1D4ED8]">
                Enter
                <span className="text-lg text-[#F472B6]">➹</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeCollection && (
        <MuseCategoryModal
          open
          title={activeCollection.title}
          accent={activeCollection.accent}
          onClose={() => setActiveCategoryIndex(null)}
        >
          {activeCollection.quotes.map((quote, index) => {
            const palette = neonCardPalette[(activeCategoryIndex! + index) % neonCardPalette.length];
            return (
              <article
                key={`${activeCollection.title}-${index}`}
                className={`flex h-full flex-col justify-between rounded-[28px] border-4 ${palette.border} ${palette.bg} p-6 shadow-[0_12px_0_rgba(0,0,0,0.08)]`}
              >
                <div className={`space-y-3 text-sm sm:text-base leading-relaxed font-medium ${palette.text}`}>
                  {quote.body.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
                <span className={`mt-6 text-[0.65rem] uppercase tracking-[0.4em] ${palette.label}`}>
                  — {quote.author}
                </span>
              </article>
            );
          })}
        </MuseCategoryModal>
      )}
    </section>
  );
}
