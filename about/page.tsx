import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Larry Corso",
  description:
    "Meet Larry Corso, the cosmic developer guarding night missions with human-centered design, bold activism, and relentless creativity.",
  keywords: [
    "about Larry Corso",
    "digital guardian",
    "night worker",
    "mission statement",
    "retro manifesto",
  ],
};

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Batman Signal Spotlight Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Spotlight circle */}
        <div className="absolute w-96 h-96 rounded-full bg-gradient-radial from-yellow-200/30 via-yellow-300/20 to-transparent animate-pulse"></div>
        
        {/* Batman Signal */}
        <div className="relative z-10 w-64 h-64">
          <svg viewBox="0 0 100 100" className="w-full h-full text-black/80">
            {/* Batman symbol */}
            <path
              d="M50 15 
                 C45 15, 40 18, 35 25
                 C30 32, 25 40, 25 50
                 C25 55, 27 60, 30 65
                 C35 70, 40 75, 45 80
                 L50 85
                 L55 80
                 C60 75, 65 70, 70 65
                 C73 60, 75 55, 75 50
                 C75 40, 70 32, 65 25
                 C60 18, 55 15, 50 15
                 Z
                 M50 25
                 L45 35
                 L40 45
                 L35 50
                 L40 55
                 L45 65
                 L50 70
                 L55 65
                 L60 55
                 L65 50
                 L60 45
                 L55 35
                 L50 25
                 Z"
              fill="currentColor"
              className="drop-shadow-2xl"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-8">
        <div className="max-w-4xl mx-auto space-y-12 text-center pb-32">
          
          {/* Main Title */}
          <div className="space-y-6">
            <h1 className="text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                THE MISSION
              </span>
            </h1>
            <p className="text-2xl font-bold text-yellow-400 uppercase tracking-wider">
              Working for Earth • Its People • The Weirdos • The Underdogs
            </p>
          </div>

          {/* Pluto Smoke Introduction */}
          <div className="bg-black/60 border border-purple-400/50 rounded-[24px] p-8 backdrop-blur-sm shadow-[0_0_50px_rgba(147,51,234,0.3)] flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/3 flex justify-center">
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-2 border-purple-400/50 shadow-[0_0_30px_rgba(147,51,234,0.5)]">
                <div className="w-full h-full bg-gradient-to-br from-purple-600 via-purple-800 to-purple-900 relative">
                  {/* Recreating the geometric pattern from the image */}
                  <div className="absolute inset-0">
                    <div className="absolute top-8 left-8 w-32 h-32 bg-purple-400/30 rounded-3xl transform rotate-12"></div>
                    <div className="absolute bottom-12 right-8 w-40 h-40 bg-purple-300/40 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-purple-200/50 rounded-full"></div>
                  </div>
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-purple-600/40"></div>
                </div>
              </div>
            </div>
            <div className="lg:w-2/3 text-center lg:text-left">
              <h2 className="text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                  LARRY CORSO
                </span>
              </h2>
              <p className="text-xl font-bold text-purple-400 mb-4">
                Digital Guardian • Night Worker • Visionary
              </p>
              <p className="text-lg text-white/90 leading-relaxed">
                From the outer edges of conventional thinking, I bring cosmic perspective to earthly problems. 
                A developer who flows through barriers others see as walls, operating in the shadows 
                where real transformation happens.
              </p>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-black/60 border border-yellow-400/50 rounded-[24px] p-12 backdrop-blur-sm shadow-[0_0_50px_rgba(255,255,0,0.2)]">
            <h2 className="text-4xl font-black mb-8 text-yellow-400">
              LARRY CORSO&apos;S MANIFESTO
            </h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-white/90">
                In the shadows of corporate greed and digital conformity, I, <span className="text-purple-400 font-bold">Larry Corso</span>, stand as a guardian for those who dare to be different. 
                <span className="text-yellow-400 font-bold"> This planet needs protectors</span>, not exploiters.
              </p>
              <p className="text-white/90">
                I don&apos;t build for the suits in boardrooms. Breaking through the barriers of convention, I create for the 
                <span className="text-cyan-400 font-bold"> misfits, the dreamers, the rebels</span> who see the world 
                not as it is, but as it could be.
              </p>
              <p className="text-white/90">
                Every line of code is a signal in the dark - a beacon for 
                <span className="text-pink-400 font-bold"> the underdogs fighting for change</span>, 
                the weirdos embracing their truth, and the people working to heal our wounded earth. From the outer edges of digital space, I bring cosmic perspective to earthly problems.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/40 border border-cyan-400/40 rounded-[20px] p-8 hover:bg-cyan-400/10 transition-all duration-300">
              <h3 className="text-2xl font-black text-cyan-400 mb-4">FOR THE EARTH</h3>
              <p className="text-white/80">
                Technology that heals instead of harms. Solutions that protect our planet&apos;s future, 
                not exploit its resources.
              </p>
            </div>
            
            <div className="bg-black/40 border border-pink-400/40 rounded-[20px] p-8 hover:bg-pink-400/10 transition-all duration-300">
              <h3 className="text-2xl font-black text-pink-400 mb-4">FOR THE PEOPLE</h3>
              <p className="text-white/80">
                Human-centered design that empowers communities, amplifies voices, 
                and builds bridges instead of walls.
              </p>
            </div>
            
            <div className="bg-black/40 border border-purple-400/40 rounded-[20px] p-8 hover:bg-purple-400/10 transition-all duration-300">
              <h3 className="text-2xl font-black text-purple-400 mb-4">FOR THE WEIRDOS</h3>
              <p className="text-white/80">
                Celebrating the unconventional, the artistic, the beautifully strange souls 
                who color outside the lines.
              </p>
            </div>
            
            <div className="bg-black/40 border border-orange-400/40 rounded-[20px] p-8 hover:bg-orange-400/10 transition-all duration-300">
              <h3 className="text-2xl font-black text-orange-400 mb-4">FOR THE UNDERDOGS</h3>
              <p className="text-white/80">
                Leveling the playing field for small businesses, startups, and changemakers 
                who refuse to give up.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20 border border-yellow-400/50 rounded-[24px] p-10 backdrop-blur-sm">
              <h3 className="text-3xl font-black text-yellow-400 mb-6">
              READY TO WORK WITH LARRY CORSO?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              If you&apos;re fighting for something bigger than profit, if you&apos;re building for the future, 
              if you&apos;re one of the weirdos and underdogs - let&apos;s create cosmic change together. From the outer edges of possibility to the heart of transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/connect"
                className="px-12 py-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-black text-xl rounded-[18px] hover:shadow-[0_0_30px_rgba(147,51,234,0.8)] transition-all duration-300 transform hover:scale-105"
              >
                CONTACT LARRY CORSO
              </Link>
              <Link
                href="/portfolio"
                className="px-12 py-4 bg-transparent border-2 border-purple-400 text-purple-400 font-black text-xl rounded-[18px] hover:bg-purple-400 hover:text-black hover:shadow-[0_0_30px_rgba(147,51,234,0.8)] transition-all duration-300 transform hover:scale-105"
              >
                SEE THE COSMIC WORK
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Retro Tron Bottom Menu - 8px margin */}
      <div className="fixed bottom-0 left-0 right-0 mb-2 z-50">
        <div className="bg-black border-2 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.6)] mx-auto mb-2 max-w-5xl relative overflow-hidden">
          {/* Tron Grid Pattern Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full" style={{
              backgroundImage: `
                linear-gradient(rgb(250, 204, 21) 1px, transparent 1px),
                linear-gradient(90deg, rgb(250, 204, 21) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          {/* Animated Border Glow */}
          <div className="absolute inset-0 border-2 border-yellow-400 animate-pulse"></div>
          
          <div className="relative flex items-center justify-between px-6 py-3">
            <div className="flex items-center">
              <div className="h-12 w-12 border-2 border-yellow-400 rounded-full flex items-center justify-center bg-black shadow-[0_0_15px_rgba(250,204,21,0.8)]">
                <div className="text-yellow-400 font-bold text-xs">LARRY</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className="px-6 py-3 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(250,204,21,0.5)] hover:shadow-[0_0_20px_rgba(250,204,21,1)]"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 border border-yellow-400 text-black bg-yellow-400 transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(250,204,21,0.5)]"
              >
                About
              </Link>
              <Link
                href="/portfolio"
                className="px-6 py-3 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(250,204,21,0.5)] hover:shadow-[0_0_20px_rgba(250,204,21,1)]"
              >
                Portfolio
              </Link>
              {/* Blog removed */}
              <Link
                href="/connect"
                className="px-6 py-3 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(250,204,21,0.5)] hover:shadow-[0_0_20px_rgba(250,204,21,1)]"
              >
                Connect
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link
                href="/manifesto"
                className="h-12 w-12 border-2 border-orange-400 bg-black flex items-center justify-center hover:bg-orange-400 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(251,146,60,0.8)] hover:shadow-[0_0_25px_rgba(251,146,60,1)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400 hover:text-black" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="/connect"
                className="h-12 w-12 border-2 border-red-400 bg-black flex items-center justify-center hover:bg-red-400 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(248,113,113,0.8)] hover:shadow-[0_0_25px_rgba(248,113,113,1)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 hover:text-black" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Scanning Line Effect */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
