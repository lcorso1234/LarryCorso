import Link from "next/link";

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
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
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
              <Link
                href="/portfolio"
                className="px-12 py-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-black text-xl border-2 border-yellow-400 hover:shadow-[0_0_30px_rgba(255,255,0,0.8)] transition-all duration-300 transform hover:scale-105 text-center"
              >
                WITNESS THE DARKNESS
              </Link>
              <Link
                href="/connect"
                className="px-12 py-6 bg-transparent border-2 border-gray-400 text-gray-300 font-black text-xl hover:bg-gray-400 hover:text-black hover:shadow-[0_0_30px_rgba(156,163,175,0.8)] transition-all duration-300 transform hover:scale-105 text-center"
              >
                SIGNAL THE BAT
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Retro Tron Bottom Menu - 8px margin */}
      <div className="fixed bottom-0 left-0 right-0 mb-2 z-50">
        <div className="bg-black border-2 border-pink-400 shadow-[0_0_30px_rgba(255,20,147,0.6)] mx-auto mb-2 max-w-5xl relative overflow-hidden">
          {/* Tron Grid Pattern Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full" style={{
              backgroundImage: `
                linear-gradient(rgb(244, 114, 182) 1px, transparent 1px),
                linear-gradient(90deg, rgb(244, 114, 182) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          {/* Animated Border Glow */}
          <div className="absolute inset-0 border-2 border-pink-400 animate-pulse"></div>
          
          <div className="relative flex items-center justify-between px-6 py-3">
            <div className="flex items-center">
              <div className="h-12 w-12 border-2 border-pink-400 rounded-full flex items-center justify-center bg-black shadow-[0_0_15px_rgba(255,20,147,0.8)]">
                <div className="text-pink-400 font-bold text-xs">LOVE</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className="px-6 py-3 border border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-black transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(255,20,147,0.5)] hover:shadow-[0_0_20px_rgba(255,20,147,1)]"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 border border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-black transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(255,20,147,0.5)] hover:shadow-[0_0_20px_rgba(255,20,147,1)]"
              >
                About
              </Link>
              <Link
                href="/portfolio"
                className="px-6 py-3 border border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-black transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(255,20,147,0.5)] hover:shadow-[0_0_20px_rgba(255,20,147,1)]"
              >
                Portfolio
              </Link>
              {/* Blog removed */}
              <Link
                href="/connect"
                className="px-6 py-3 border border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-black transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(255,20,147,0.5)] hover:shadow-[0_0_20px_rgba(255,20,147,1)]"
              >
                Connect
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link
                href="/manifesto"
                className="h-12 w-12 border-2 border-red-400 bg-black flex items-center justify-center hover:bg-red-400 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.8)] hover:shadow-[0_0_25px_rgba(239,68,68,1)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 hover:text-black" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="/connect"
                className="h-12 w-12 border-2 border-purple-400 bg-black flex items-center justify-center hover:bg-purple-400 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(147,51,234,0.8)] hover:shadow-[0_0_25px_rgba(147,51,234,1)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 hover:text-black" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Scanning Line Effect */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
