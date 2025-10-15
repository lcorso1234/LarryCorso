import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Manifesto() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="absolute inset-0 opacity-30 animate-pulse" 
             style={{
               backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      {/* Laser Beam Effects */}
      <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-cyan-400 via-transparent to-cyan-400 opacity-60 animate-pulse"></div>
      <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-orange-400 via-transparent to-orange-400 opacity-60 animate-pulse"></div>
      <div className="absolute top-1/3 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-transparent to-purple-400 opacity-60 animate-pulse"></div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <section className="pt-16 pb-8 px-8 text-center">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-8">
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_20px_rgba(255,165,0,0.8)]">
              MY MANIFESTO
            </span>
          </h1>
          
          {/* Love First Declaration */}
          <div className="mb-8">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-4">
              <span className="bg-gradient-to-r from-pink-400 via-red-500 to-orange-400 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_30px_rgba(255,20,147,1)]">
                LOVE FIRST
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-pink-400 font-bold drop-shadow-[0_0_15px_rgba(255,20,147,0.8)] max-w-3xl mx-auto">
              In everything I do, every decision I make, every line of code I write - love comes first. 
              Love for the craft, love for the people, love for the vision.
            </p>
          </div>
        </section>

        {/* Manifesto Content */}
        <section className="px-8 pb-32">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Core Principles */}
            <div className="bg-black/80 border border-cyan-400/50 rounded-[18px] p-8 shadow-[0_0_30px_rgba(0,255,255,0.3)] backdrop-blur-sm">
              <h2 className="text-2xl sm:text-3xl font-black mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  CORE PRINCIPLES
                </span>
              </h2>
              <div className="space-y-4 text-lg sm:text-xl font-bold">
                <p className="text-pink-400 drop-shadow-[0_0_10px_rgba(255,20,147,0.8)] text-xl font-black">
                  → LOVE FIRST, ALWAYS
                </p>
                <p className="text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                  → I DON&apos;T WORK FOR YOU - I WORK FOR ME
                </p>
                <p className="text-orange-400 drop-shadow-[0_0_10px_rgba(255,165,0,0.5)]">
                  → I EXPRESS MYSELF THROUGH YOUR WORK
                </p>
                <p className="text-purple-400 drop-shadow-[0_0_10px_rgba(147,51,234,0.5)]">
                  → I AM A MAN WITH A PLAN
                </p>
                <p className="text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                  → I TAKE CARE OF PEOPLE I LOVE
                </p>
              </div>
            </div>

            {/* My Vision */}
            <div className="bg-black/80 border border-orange-400/50 rounded-[18px] p-8 shadow-[0_0_30px_rgba(255,165,0,0.3)] backdrop-blur-sm">
              <h2 className="text-2xl sm:text-3xl font-black mb-6">
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  MY VISION
                </span>
              </h2>
              <div className="space-y-4 text-lg sm:text-xl text-white/90">
                <p className="text-pink-400 drop-shadow-[0_0_10px_rgba(255,20,147,0.8)] text-xl font-bold">
                  Love is the foundation of everything I create.
                </p>
                <p>
                  I create not for approval, but for expression. Every project is a canvas where I paint my vision, 
                  my passion, my relentless drive to push boundaries and challenge the status quo - all rooted in love.
                </p>
                <p>
                  When you work with me, you&apos;re not hiring a contractor - you&apos;re partnering with a visionary 
                  who will transform your ideas into something extraordinary, something that carries my signature 
                  of excellence, innovation, and most importantly, love.
                </p>
              </div>
            </div>

            {/* Family of the World */}
            <div className="bg-black/80 border border-green-400/50 rounded-[18px] p-8 shadow-[0_0_30px_rgba(0,255,0,0.3)] backdrop-blur-sm">
              <h2 className="text-2xl sm:text-3xl font-black mb-6">
                <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  FAMILY OF THE WORLD
                </span>
              </h2>
              <div className="space-y-4 text-lg sm:text-xl">
                <p className="text-green-400 drop-shadow-[0_0_10px_rgba(0,255,0,0.5)] text-xl font-bold">
                  I LOVE EVERY LIVING SOUL HERE
                </p>
                <p className="text-white/90">
                  Despite my fierce independence, my heart is open to all. Every person I encounter 
                  is part of this global family, deserving of respect, love, and the opportunity to witness 
                  greatness in action.
                </p>
                <p className="text-white/90">
                  My work is not just for me - it&apos;s my gift to the world, my way of showing love 
                  through creation, innovation, and unwavering commitment to excellence.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-black/80 border border-purple-400/50 rounded-[18px] p-8 shadow-[0_0_30px_rgba(147,51,234,0.3)] backdrop-blur-sm text-center">
              <h2 className="text-2xl sm:text-3xl font-black mb-8">
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  READY TO EXPERIENCE THE VISION?
                </span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  href="/portfolio"
                  className="px-12 py-6 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-black text-xl rounded-[18px] border-2 border-purple-400 hover:shadow-[0_0_30px_rgba(147,51,234,0.8)] transition-all duration-300 transform hover:scale-105"
                >
                  SEE MY WORK
                </Link>
                <Link
                  href="/connect"
                  className="px-12 py-6 bg-transparent border-2 border-pink-400 text-pink-400 font-black text-xl rounded-[18px] hover:bg-pink-400 hover:text-white hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] transition-all duration-300 transform hover:scale-105"
                >
                  JOIN THE FAMILY
                </Link>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* Navigation */}
      <Navigation theme="purple" leftIcon="MANI" />
    </div>
  );
}
