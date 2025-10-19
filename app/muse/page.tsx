import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import SubscribeForm from '@/components/SubscribeForm';
import MuseCategories from '@/components/MuseCategories';

type QuoteEntry = {
  body: string[];
  author: string;
};

type QuoteCollection = {
  title: string;
  accent: string;
  quotes: QuoteEntry[];
};


const quoteCollections: QuoteCollection[] = [
  {
    title: "Dreamer's Odyssey",
    accent: 'from-cyan-400 via-teal-400 to-blue-500',
    quotes: [
      {
        body: [
          'Find joy in the fear of losing. Because you are feeling you are losing something you are living.',
          'For life is an adventure and to lose is to live.',
        ],
        author: 'Larry Corso',
      },
      {
        body: [
          'To let it go, to leave it behind, to give it away, to trust the process.',
          'To hold only a pencil and paper in your possession.',
          'To give your soul all the way. To lose your life. To find it amongst the pits and rubble.',
          'To see beyond the world unknown by looking in!',
          'To create magic out of nothingness. To fall. Oh what it is like to fall from great heights.',
        ],
        author: 'Larry Corso',
      },
      {
        body: ['Dreams are my currency and wherever I go, they follow.'],
        author: 'Larry Corso',
      },
      {
        body: [
          'This life is but a wild ride. It\'s filled with ups and downs, swings and turns.',
          'I hold the wheel carefully as I move to the other side.',
        ],
        author: 'Larry Corso',
      },
      {
        body: [
          'A true entrepreneur walks a pathless path. Follows the Will of the Supreme.',
          'When the wind blows, he goes with it. From the turmoil, the bird sheds old feathers.',
          'Reawakened to light up the sky.',
        ],
        author: 'Larry Corso',
      },
      {
        body: [
          'A free bird flies high and flows with the winds of life.',
          'Learn to soar in this world. If resistance comes from the left, take the lighter path...go right.',
        ],
        author: 'Larry Corso',
      },
      {
        body: [
          'Life goes on, it moves to the next most beautiful thing, right on time.',
          'From second to second, day to day, lifetime to lifetime.',
          'A new sweet song for the soul.',
        ],
        author: 'Larry Corso',
      },
      {
        body: ['And just like that....We\'re back.'],
        author: 'Larry Corso',
      },
      {
        body: ["I'm a dreamer without a cause."],
        author: 'Larry Corso',
      },
      {
        body: ['To say it, is to lose it.'],
        author: 'Larry Corso',
      },
    ],
  },
  {
    title: 'Divine Dialogues',
    accent: 'from-purple-400 via-pink-500 to-indigo-500',
    quotes: [
      {
        body: [
          'I wanted to become God, so I meditated 3 hours per day until I became him.',
          'I went to save the world with the visions given to me.',
          'I met prison, torture, death, face to face.',
          'I lost hope in being a friend, a son, a brother, a partner.',
          'God showed me how hard it was to be him.',
        ],
        author: 'Larry Corso',
      },
      {
        body: [
          'All my pain and suffering on the path of the bodhisattva came from the ego fighting the spirit.',
          'The spirit took control a long time ago. In coming back in the world...the ego fought with all it had left.',
          'The spirit let the ego fight itself to death, until being in the world and out of the world became the same.',
        ],
        author: 'Larry Corso',
      },
      {
        body: [
          'God show me the way. Light up my path. Bring me back to you.',
          'Allow me to be encompassed by your warmth. Let me dissolve in you and become you.',
        ],
        author: 'Larry Corso',
      },
      {
        body: [
          'God favors the fool.',
          'The one flying blind.',
          'Knowing that the lost journey will bring him back to the heavens.',
        ],
        author: 'Larry Corso',
      },
      {
        body: [
          'To draw closer, to see behind walls, to love with self-abandon.',
          'No matter the scars, we keep our hearts on fire and light the way for those around us.',
          'This is the way.',
          'Although we may have faltered or doubted, we keep moving towards the Supreme, pure love and joy on earth.',
          'Rebels in love, OutCasts of passion. The one\'s who don\'t conform no matter how hard it gets because they follow their Spirit above all things....Keep Moving in whatever direction lights you up!',
        ],
        author: 'Larry Corso',
      },
      {
        body: ["It's the light in us, it cannot be contained."],
        author: 'Larry Corso',
      },
    ],
  },
  {
    title: 'Heartfire Letters',
    accent: 'from-pink-400 via-rose-400 to-red-400',
    quotes: [
      {
        body: [
          'What is this overwhelming sense of love taking over me? Love for all things.',
          'The books I read guide me, the people I am with show me love, the blue sky gives me comfort.',
          'I marvel at the birds singing, the trees in the sunlight.',
        ],
        author: 'Larry Corso',
      },
      {
        body: ['When you fall for me, the whole world will learn to fall in love again.'],
        author: 'Larry Corso',
      },
      {
        body: ['To see a thousand faces in one woman.'],
        author: 'Larry Corso',
      },
      {
        body: ["I'm in love wherever I go. The earth is my home."],
        author: 'Larry Corso',
      },
      {
        body: [
          'A bright light with a sinister glare, I was the moon she was the sun.',
          'We were wrapped up in one.',
          'We tried to escape fate far too late.',
          'The bridges came burning down, the floods swallowed our world.',
          "I'm just a drunken sailor man, at the bottom of the ocean, In love with a star.",
        ],
        author: 'Larry Corso',
      },
    ],
  },
  {
    title: 'Stormbound Love',
    accent: 'from-orange-400 via-pink-500 to-purple-500',
    quotes: [
      {
        body: ['Love is a temporary madness and I get it out of my system in the most reckless and undisciplined manner possible.'],
        author: 'Larry Corso',
      },
      {
        body: [
          'I love her always, still. I had to let her go. It was the only way she could be free.',
          'She deserves a life of magic and laughter, not one of sadness and screams.',
        ],
        author: 'Larry Corso',
      },
      {
        body: [
          'I saw through the glass wall.',
          'I shifted to the unknown places to stay hidden from her.',
          'My mind went free, my feet rooted in earth.',
          'I slow danced with the sounds of love. There in the kitchen, she waited and watched.',
          'Effortlessly puzzled of the changes he was going through.',
        ],
        author: 'Larry Corso',
      },
      {
        body: [
          'She waits and despises me as I talk to other woman. She answers he prayers in the bathroom as she bleeds her heart out to me.',
          'She speaks softly to her loved ones in her polish tongue. Sweet sounds of sadness pour through me to her.',
          "I cramp her style with foolish games I play. She's weak, but true. She's always been. She fears nothing.",
        ],
        author: 'Larry Corso',
      },
      {
        body: ['Do you want to fight? Or do you want to fall in love. Again and again and again and again.'],
        author: 'Larry Corso',
      },
    ],
  },
  {
    title: 'Warrior Psalms',
    accent: 'from-red-500 via-orange-500 to-pink-500',
    quotes: [
      {
        body: [
          'To face a thousand enemies. To have the whole world go against you.',
          'To face it with a smile. To keep your lamp lit amidst your darkness.',
          'To maintain your inner glory despite the wreckage and rubble.',
        ],
        author: 'Larry Corso',
      },
      {
        body: [
          'This world tried to break my spirit, now this spirit wants to give the world a fight back.',
          'My heart is my weapon, my mind is my shield.',
          'I mount the scaffold with perfect coolness.',
          'Indeed, a God.',
        ],
        author: 'Larry Corso',
      },
      {
        body: ['Freed from the shackles of my past. I climb.'],
        author: 'Larry Corso',
      },
      {
        body: [
          'You cannot beat me. I dwell in places that cannot be found.',
          'I surrendered everything to the Flow of the Supreme. I don\'t exist, yet I am everywhere.',
          'I am focused like a laser, yet I am a wanderer.',
          'I have no home, but wherever I go I am home. I seek the twilight, the never ending riddle.',
        ],
        author: 'Larry Corso',
      },
      {
        body: ['The world raised me. The trees nourished me. A woman saved me.'],
        author: 'Larry Corso',
      },
    ],
  },
  {
    title: 'Ascension Trials',
    accent: 'from-emerald-400 via-cyan-400 to-blue-500',
    quotes: [
      {
        body: [
          'I walk alone through the forest of my mind. The rapture that carries me despite obstacles envelopes my spirit.',
          'Alone, but free. Calm, but wild.',
          'I pierce into the forgotten sun that dwells in me. The shadows, I become them and they disappear.',
          'The waves crash, but I am unmoved.',
          'Stillness in the hurricane of the my thoughts. I move on to the great awakening.',
        ],
        author: 'Larry Corso',
      },
      {
        body: [
          'I fell off the mountain straight unto the feather bed. I traveled the world.',
          'I lived where I feared to live. I destroyed my reputation. I\'ve had a face off with death several times.',
          "I've given myself to God.",
          'Through it all I became broke and depressed, but I now know the strength of my spirit and the power of my heart.',
          'I met countless others just like me, fighting their way to the promise land.',
        ],
        author: 'Larry Corso',
      },
      {
        body: [
          'From pit to pit, of what light used to cover me. Buried in the depths of silence of my own mind.',
          'A roar came through. Shook the trees and scattered the birds. The winds turned.',
          'Heaven was sent below to lend a hand to an old friend. Pulled from the dirt, I rose quietly.',
          'Night time became morning with laughter in my heart. I smiled at the world once more.',
        ],
        author: 'Larry Corso',
      },
      {
        body: [
          'I know pain of being betrayed by everyone I love.',
          'I know what it\'s like to give a relationship everything I\'ve got and end up broke and depressed.',
          "I'm chasing a vision that no understands, but me and have been ostracized for it.",
          'Amongst it all, I have become my own master.',
        ],
        author: 'Larry Corso',
      },
      {
        body: [
          'My wild heart hits my crazy mind and I get lost in delusion.',
          'Waiting for lightning to strike and light up my bones to direct me to the promise land.',
          'I ride a wave and arrive safely to shore. I spent 5 years so certain of a false light.',
          'It makes it hard to be sure of my next moves. I\'m all out of decisions and whims.',
          "I've seen some of the darkest corners of the world. Lessons from gang members in prison, you gotta stand on your own two.",
        ],
        author: 'Larry Corso',
      },
      {
        body: [
          'The slings and arrows cast by others are unhealed wounds. The earth is a place of healing, and healing is a messy business.',
          'I\'ve played cards with a man without teeth trying to get even with someone sexually abusing his grandson.',
          "I've met a vigilante fighting bad guys to grieve his daughter getting killed by one.",
          'A hooker getting clean from the life on a ketamaine trip speaking to God and God told her, "there is no truth, just the truth you want to believe."',
          'A man traveling hundreds of miles on foot with a shotgun to secure his families estate asking me for anything.',
          'All I had was a lemon picked from a strangers tree. He was delighted.',
          'When they arrested me all I repeated was, "The earth is dying. The earth is dying."',
        ],
        author: 'Larry Corso',
      },
    ],
  },
];

export const metadata: Metadata = {
  title: 'Muse • Electric Wisdom Chamber',
  description:
    'Step into the Muse chamber where Larry Corso arranges quotes, rituals, and radiant mantras to ignite the spirit and invite bold creation.',
  keywords: [
    'Larry Corso muse',
    'creative quotes',
    'spirit ignition',
    'digital wisdom',
    'ritual of innovation',
  ],
};

export default function Muse() {
  const heroDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());
  const footerYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#FFF9DD] text-[#20193A] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#FDE68A] via-transparent to-transparent opacity-80"></div>
      <div className="hidden md:flex items-center justify-center pointer-events-none absolute right-6 top-44 origin-center rotate-90">
        <span className="tracking-[0.6em] text-xs font-black text-[#F472B6]">SUBSCRIBE</span>
      </div>

      <section className="px-6 py-20 sm:py-24 flex justify-center">
        <div className="max-w-5xl w-full">
          <div className="relative rounded-[52px] border-4 border-[#60A5FA] bg-[#FFE48F] px-8 sm:px-14 py-16 shadow-[0_24px_0_rgba(96,165,250,0.55)]">
            <p className="text-xs sm:text-sm uppercase tracking-[0.5em] text-[#F97316]">{heroDate}</p>
            <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-black text-[#1D4ED8] tracking-tight drop-shadow-[0_6px_0_rgba(29,78,216,0.35)]">
              ON BECOMING TRANSFORMED
            </h1>
            <div className="mt-10 space-y-3 text-lg sm:text-xl leading-relaxed font-semibold text-[#2F2A40]">
              <p>“I want war within, wine without.”</p>
              <p>“My bones hold the secrets to the answers you seek. All my power comes from them.”</p>
              <p>“I am true as my sword, as swift as my pen.”</p>
              <p>“I devote my life to my specialty and purpose.”</p>
            </div>
            <div className="mt-10 flex justify-center">
              <span className="text-3xl text-[#F472B6] drop-shadow-[0_4px_0_rgba(244,114,182,0.4)]">➷</span>
            </div>
          </div>
        </div>
      </section>

      <MuseCategories collections={quoteCollections} />

      <section className="px-6 sm:px-10 md:px-16 pb-24">
        <div className="max-w-5xl mx-auto rounded-[52px] border-4 border-[#FFE48F] bg-[#63B3FF] px-8 sm:px-16 py-16 text-center text-[#FFE48F] shadow-[0_26px_0_rgba(99,179,255,0.55)]">
          <p className="text-xs sm:text-sm uppercase tracking-[0.5em] text-[#0F172A]">FOR RAW INSPIRATION</p>
          <h2 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.35em] drop-shadow-[0_6px_0_rgba(15,23,42,0.35)]">
            SUBSCRIBE.
          </h2>
          <p className="mt-6 text-xs sm:text-sm uppercase tracking-[0.35em] text-[#0F172A]">
            Fresh drops, midnight musings, and the next move before it hits the feed.
          </p>
          <SubscribeForm />
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="/portfolio"
              className="px-8 py-3 rounded-full border-2 border-[#FFE48F] text-[#FFE48F] uppercase tracking-[0.35em] font-bold transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_0_rgba(255,228,143,0.4)]"
            >
              EXPLORE
            </a>
            <a
              href="/connect"
              className="px-8 py-3 rounded-full bg-[#FFE48F] text-[#1D4ED8] font-bold uppercase tracking-[0.35em] border-2 border-[#1D4ED8] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_0_rgba(29,78,216,0.35)]"
            >
              SIGNAL ME
            </a>
          </div>
        </div>
      </section>

      <footer className="pb-32 text-center text-[0.65rem] uppercase tracking-[0.45em] text-[#9CA3AF]">
        © {footerYear} Larry Corso · Muse Edition
      </footer>

      <Navigation theme="blue" leftIcon="MUSE" />
    </div>
  );
}
