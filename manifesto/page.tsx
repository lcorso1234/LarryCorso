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

      {/* Retro Tron Bottom Menu */}
      <div className="fixed bottom-0 left-0 right-0 mb-2 z-50">
        <div className="bg-black border-2 border-orange-400 shadow-[0_0_30px_rgba(251,146,60,0.6)] mx-auto mb-2 max-w-5xl relative overflow-hidden">
          {/* Tron Grid Pattern Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full" style={{
              backgroundImage: `
                linear-gradient(rgb(251, 146, 60) 1px, transparent 1px),
                linear-gradient(90deg, rgb(251, 146, 60) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          {/* Animated Border Glow */}
          <div className="absolute inset-0 border-2 border-orange-400 animate-pulse"></div>
          
          <div className="relative flex items-center justify-between px-6 py-3">
            <div className="flex items-center">
              <div className="h-12 w-12 border-2 border-orange-400 rounded-full flex items-center justify-center bg-black shadow-[0_0_15px_rgba(251,146,60,0.8)]">
                <div className="text-orange-400 font-bold text-xs">MANI</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className="px-6 py-3 border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(251,146,60,0.5)] hover:shadow-[0_0_20px_rgba(251,146,60,1)]"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(251,146,60,0.5)] hover:shadow-[0_0_20px_rgba(251,146,60,1)]"
              >
                About
              </Link>
              <Link
                href="/portfolio"
                className="px-6 py-3 border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(251,146,60,0.5)] hover:shadow-[0_0_20px_rgba(251,146,60,1)]"
              >
                Portfolio
              </Link>
              {/* Blog removed */}
              <Link
                href="/manifesto"
                className="px-6 py-3 border border-orange-400 text-black bg-orange-400 transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(251,146,60,0.5)]"
              >
                Manifesto
              </Link>
              <Link
                href="/connect"
                className="px-6 py-3 border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(251,146,60,0.5)] hover:shadow-[0_0_20px_rgba(251,146,60,1)]"
              >
                Connect
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link
                href="/about"
                className="h-12 w-12 border-2 border-red-400 bg-black flex items-center justify-center hover:bg-red-400 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(248,113,113,0.8)] hover:shadow-[0_0_25px_rgba(248,113,113,1)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 hover:text-black" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="/connect"
                className="h-12 w-12 border-2 border-yellow-400 bg-black flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(250,204,21,0.8)] hover:shadow-[0_0_25px_rgba(250,204,21,1)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 hover:text-black" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Scanning Line Effect */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
