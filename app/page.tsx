import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10">
        <section className="min-h-screen flex flex-col justify-center items-center px-8 text-center pb-32">
          <div className="max-w-6xl mx-auto">
            {/* Main Title */}
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black mb-8">
              <span className="bg-gradient-to-r from-yellow-400 via-gray-300 to-black bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,0,0.8)]">
                I DON&apos;T WORK FOR YOU
              </span>
            </h1>

            {/* Night Work Declaration */}
            <div className="mb-12">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6">
                <span className="bg-gradient-to-r from-yellow-400 to-gray-600 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_15px_rgba(255,255,0,0.6)]">
                  I WORK AT NIGHT
                </span>
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-gray-300 drop-shadow-[0_0_10px_rgba(255,255,0,0.3)]">
                🦇 WHEN THE CITY SLEEPS, THE VISIONARY AWAKENS 🦇
              </p>
            </div>

            {/* Manifesto */}
            <div className="space-y-6 mb-12 text-xl sm:text-2xl lg:text-3xl font-bold">
              <p className="text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] animate-pulse">
                I WORK FOR ME.
              </p>
              <p className="text-orange-400 drop-shadow-[0_0_10px_rgba(255,165,0,0.5)] animate-pulse">
                I EXPRESS MYSELF THROUGH YOUR WORK.
              </p>
              <p className="text-purple-400 drop-shadow-[0_0_10px_rgba(147,51,234,0.5)] animate-pulse">
                I AM A MAN WITH A PLAN.
              </p>
              <p className="text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)] animate-pulse">
                I TAKE CARE OF PEOPLE I LOVE.
              </p>
            </div>

            {/* Guardian Declaration */}
            <div className="relative mb-16">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
                <span className="bg-gradient-to-r from-yellow-400 via-gray-300 to-yellow-500 bg-clip-text text-transparent">
                  GUARDIAN OF THE NIGHT
                </span>
              </h3>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">\
                <span className="bg-gradient-to-r from-gray-300 via-yellow-400 to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,0,0.5)]">
                  I PROTECT WHAT MATTERS MOST
                </span>
              </p>
              <p className="text-lg sm:text-xl text-gray-400 font-medium">
                💛 While others sleep, I craft digital justice 💛
              </p>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="/portfolio" className="px-12 py-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-black text-xl border-2 border-yellow-400 hover:shadow-[0_0_30px_rgba(255,255,0,0.8)] transition-all duration-300 transform hover:scale-105 text-center">
                WITNESS THE DARKNESS
              </a>
              <a href="/connect" className="px-12 py-6 bg-transparent border-2 border-gray-400 text-gray-300 font-black text-xl hover:bg-gray-400 hover:text-black hover:shadow-[0_0_30px_rgba(156,163,175,0.8)] transition-all duration-300 transform hover:scale-105 text-center">
                SIGNAL THE BAT
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <Navigation theme="pink" />
    </div>
  );
}
