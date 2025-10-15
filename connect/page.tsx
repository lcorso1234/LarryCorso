import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Connect with Larry Corso",
  description:
    "Open a direct channel to Larry Corso. Send transmissions, collaborate on visionary projects, and join the retro-futuristic movement.",
  keywords: [
    "contact Larry Corso",
    "connect",
    "transmission",
    "hire night developer",
    "retro contact page",
  ],
};

export default function Connect() {
  const emailLink = 'mailto:lawrence@rumidesign.tech?subject=Digital Vision Project&body=Hello Lawrence,%0A%0AI have a project vision I\'d like to discuss.%0A%0ABest regards';

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <section className="text-center py-16">
          <div className="max-w-4xl mx-auto px-8">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-8">
              <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]">
                LET&apos;S CONNECT
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl font-bold text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
              JOIN THE DIGITAL REVOLUTION
            </p>
          </div>
        </section>

        <section className="flex-1 flex items-center justify-center px-8 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <h2 className="text-4xl font-black text-cyan-400 mb-6">
                TRANSMIT YOUR VISION
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Ready to build something extraordinary? Click the transmission button below to open your email client and send your vision directly.
              </p>
            </div>

            <div className="mb-12">
              <a 
                href={emailLink}
                className="inline-block px-12 py-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-2xl border-2 border-pink-400 hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] transition-all duration-300 transform hover:scale-105 animate-pulse"
              >
                📡 SEND TRANSMISSION
              </a>
            </div>

            <div className="bg-gray-900/50 border border-cyan-400/30 p-8 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                DIRECT CONTACT CHANNEL
              </h3>
              <div className="space-y-3">
                <p className="text-lg">
                  <span className="text-gray-400">Email:</span> 
                  <span className="text-white font-mono ml-2">lawrence@rumidesign.tech</span>
                </p>
                <p className="text-sm text-gray-400">
                  �� Communication channels are ONLINE and ready to receive your vision
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Retro Tron Bottom Menu */}
      <div className="fixed bottom-0 left-0 right-0 mb-2 z-50">
        <div className="bg-black border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.6)] mx-auto mb-2 max-w-5xl relative overflow-hidden">
          {/* Tron Grid Pattern Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full" style={{
              backgroundImage: `
                linear-gradient(rgb(6, 182, 212) 1px, transparent 1px),
                linear-gradient(90deg, rgb(6, 182, 212) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          {/* Animated Border Glow */}
          <div className="absolute inset-0 border-2 border-cyan-400 animate-pulse"></div>
          
          <div className="relative flex items-center justify-between px-6 py-3">
            <div className="flex items-center">
              <div className="h-12 w-12 border-2 border-cyan-400 rounded-full flex items-center justify-center bg-black shadow-[0_0_15px_rgba(6,182,212,0.8)]">
                <div className="text-cyan-400 font-bold text-xs">CONN</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className="px-6 py-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(6,182,212,0.5)] hover:shadow-[0_0_20px_rgba(6,182,212,1)]"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(6,182,212,0.5)] hover:shadow-[0_0_20px_rgba(6,182,212,1)]"
              >
                About
              </Link>
              <Link
                href="/portfolio"
                className="px-6 py-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(6,182,212,0.5)] hover:shadow-[0_0_20px_rgba(6,182,212,1)]"
              >
                Portfolio
              </Link>
              {/* Blog removed */}
              <Link
                href="/connect"
                className="px-6 py-3 border border-cyan-400 text-black bg-cyan-400 transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(6,182,212,0.5)]"
              >
                Connect
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link
                href="/manifesto"
                className="h-12 w-12 border-2 border-blue-400 bg-black flex items-center justify-center hover:bg-blue-400 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.8)] hover:shadow-[0_0_25px_rgba(59,130,246,1)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 hover:text-black" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="/portfolio"
                className="h-12 w-12 border-2 border-teal-400 bg-black flex items-center justify-center hover:bg-teal-400 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(20,184,166,0.8)] hover:shadow-[0_0_25px_rgba(20,184,166,1)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400 hover:text-black" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Scanning Line Effect */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
