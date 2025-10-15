'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Portfolio() {
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showAnnouncementPopup, setShowAnnouncementPopup] = useState(false);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10"></div>
        <div className="absolute inset-0 opacity-30 animate-pulse" 
             style={{
               backgroundImage: 'linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)',
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      {/* Laser Beam Effects */}
      <div className="absolute top-0 left-1/6 w-1 h-full bg-gradient-to-b from-purple-400 via-transparent to-blue-400 opacity-60 animate-pulse delay-500"></div>
      <div className="absolute top-0 right-1/5 w-1 h-full bg-gradient-to-b from-cyan-400 via-transparent to-purple-400 opacity-60 animate-pulse delay-1000"></div>
      <div className="absolute top-1/5 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-transparent to-cyan-400 opacity-60 animate-pulse delay-1500"></div>

      {/* Main Content */}
      <div className="relative z-10 py-20 px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-8">
              <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-500 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_20px_rgba(147,51,234,0.8)]">
                MY PORTFOLIO
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl font-bold text-purple-400 drop-shadow-[0_0_10px_rgba(147,51,234,0.5)]">
              WHERE STRATEGIC PLANNING CREATES DIGITAL EMPIRES
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Project 1 */}
            <div className="group bg-black/50 border border-purple-400/30 overflow-hidden hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)]">
              <div className="h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-400 mx-auto mb-4 transform rotate-45 group-hover:rotate-90 transition-transform duration-300"></div>
                  <p className="text-purple-400 font-bold">E-COMMERCE REVOLUTION</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-purple-400 mb-3">Brand Strategy <span className="text-sm text-yellow-400">[WORK IN PROGRESS]</span></h3>
                <p className="text-gray-300 mb-4">Through strategic planning and vision, I transformed ReLEAF from an impersonal shopping experience into a completely personalized digital ecosystem. My comprehensive brand strategy and user experience planning catapulted them to TOP 3 in the United States. <span className="text-yellow-400 font-bold">Seeking crowdfunding to scale globally.</span></p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-purple-400/20 text-purple-400 text-sm border border-purple-400/50">Strategic Planning</span>
                  <span className="px-3 py-1 bg-blue-400/20 text-blue-400 text-sm border border-blue-400/50">Brand Vision</span>
                  <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 text-sm border border-cyan-400/50">UX Strategy</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group bg-black/50 border border-blue-400/30 overflow-hidden hover:border-blue-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
              <div className="h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-400 mx-auto mb-4 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                  <p className="text-blue-400 font-bold">HEALTHCARE INNOVATION</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-blue-400 mb-3">Mental Health <span className="text-sm text-yellow-400">[WORK IN PROGRESS]</span></h3>
                <p className="text-gray-300 mb-4">Solved the critical client-therapist mismatch problem by innovating a revolutionary filtering system based on authentic content. My strategic approach connects clients with perfectly aligned therapists through genuine self-expression rather than clinical questionnaires. <span className="text-yellow-400 font-bold">Seeking crowdfunding to revolutionize mental healthcare.</span></p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-blue-400/20 text-blue-400 text-sm border border-blue-400/50">Matching Strategy</span>
                  <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 text-sm border border-cyan-400/50">Content Analysis</span>
                  <span className="px-3 py-1 bg-purple-400/20 text-purple-400 text-sm border border-purple-400/50">Authentic Filtering</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group bg-black/50 border border-cyan-400/30 overflow-hidden hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]">
              <div className="h-64 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-400 mx-auto mb-4 transform -rotate-45 group-hover:rotate-45 transition-transform duration-300"></div>
                  <p className="text-cyan-400 font-bold">EARTH HARMONY</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-cyan-400 mb-3">Earth Homes <span className="text-sm text-yellow-400">[WORK IN PROGRESS]</span></h3>
                <p className="text-gray-300 mb-4">Conceived a revolutionary solution to end global conflicts and environmental crisis through earth homes and bee integration. My visionary design uses curved architecture instead of harsh edges to create perfect harmony, fundamentally transforming how humanity lives on Earth. <span className="text-yellow-400 font-bold">Seeking crowdfunding to save the planet.</span></p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 text-sm border border-cyan-400/50">Global Peace Strategy</span>
                  <span className="px-3 py-1 bg-purple-400/20 text-purple-400 text-sm border border-purple-400/50">Harmonic Architecture</span>
                  <span className="px-3 py-1 bg-blue-400/20 text-blue-400 text-sm border border-blue-400/50">Ecosystem Integration</span>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="group bg-black/50 border border-pink-400/30 overflow-hidden hover:border-pink-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]">
              <div className="h-64 bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-400 mx-auto mb-4 rounded-lg group-hover:rotate-180 transition-transform duration-300"></div>
                  <p className="text-pink-400 font-bold">NANO REVOLUTION</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-pink-400 mb-3">Nano Technology <span className="text-sm text-yellow-400">[WORK IN PROGRESS]</span></h3>
                <p className="text-gray-300 mb-4">Pioneering nano technology integration within healthcare systems to revolutionize patient care at the molecular level. My strategic vision combines microscopic innovation with macro healthcare transformation, creating targeted treatment delivery systems that will reshape modern medicine. <span className="text-yellow-400 font-bold">Seeking crowdfunding to revolutionize healthcare through nano innovation.</span></p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-pink-400/20 text-pink-400 text-sm border border-pink-400/50">Nano Engineering</span>
                  <span className="px-3 py-1 bg-orange-400/20 text-orange-400 text-sm border border-orange-400/50">Healthcare Systems</span>
                  <span className="px-3 py-1 bg-red-400/20 text-red-400 text-sm border border-red-400/50">Molecular Medicine</span>
                </div>
              </div>
            </div>

            {/* Project 5 */}
            <div className="group bg-black/50 border border-green-400/30 overflow-hidden hover:border-green-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]">
              <div className="h-64 bg-gradient-to-br from-green-500/20 to-cyan-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-400 mx-auto mb-4 rounded-full group-hover:pulse transition-all duration-300"></div>
                  <p className="text-green-400 font-bold">SUSTAINABLE FASHION</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-green-400 mb-3">Clothing and Fashion <span className="text-sm text-yellow-400">[WORK IN PROGRESS]</span></h3>
                <p className="text-gray-300 mb-4">Revolutionizing the fashion industry through sustainable materials and ethical production that doesn&apos;t compromise style for conscience. My visionary approach to clothing transforms fast fashion into a force for environmental healing while keeping humans looking absolutely legendary. <span className="text-yellow-400 font-bold">Seeking crowdfunding to make fashion sustainable and fierce.</span></p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-green-400/20 text-green-400 text-sm border border-green-400/50">Sustainable Materials</span>
                  <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 text-sm border border-cyan-400/50">Ethical Production</span>
                  <span className="px-3 py-1 bg-blue-400/20 text-blue-400 text-sm border border-blue-400/50">Style Revolution</span>
                </div>
              </div>
            </div>

            {/* Project 6 */}
            <div className="group bg-black/50 border border-yellow-400/30 overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]">
              <div className="h-64 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-400 mx-auto mb-4 rounded-sm group-hover:rounded-full transition-all duration-300"></div>
                  <p className="text-yellow-400 font-bold">GAMING REVOLUTION</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-yellow-400 mb-3">Gaming <span className="text-sm text-yellow-400">[WORK IN PROGRESS]</span></h3>
                <p className="text-gray-300 mb-4">Creating next-generation gaming experiences that blur the lines between virtual reality and consciousness expansion. My game design philosophy weaponizes fun to unlock human potential, making players stronger, smarter, and more connected to their purpose. <span className="text-yellow-400 font-bold">Seeking crowdfunding to gamify human evolution.</span></p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 text-sm border border-yellow-400/50">VR Innovation</span>
                  <span className="px-3 py-1 bg-orange-400/20 text-orange-400 text-sm border border-orange-400/50">Consciousness Design</span>
                  <span className="px-3 py-1 bg-red-400/20 text-red-400 text-sm border border-red-400/50">Human Potential</span>
                </div>
              </div>
            </div>

            {/* Project 7 */}
            <div className="group bg-black/50 border border-indigo-400/30 overflow-hidden hover:border-indigo-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]">
              <div className="h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-400 mx-auto mb-4 transform skew-x-12 group-hover:skew-x-0 transition-transform duration-300"></div>
                  <p className="text-indigo-400 font-bold">EDUCATIONAL REVOLUTION</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-indigo-400 mb-3">Educational Systems <span className="text-sm text-yellow-400">[WORK IN PROGRESS]</span></h3>
                <p className="text-gray-300 mb-4">Dismantling the archaic education industrial complex and rebuilding it from the ground up! My radical framework turns passive students into active knowledge warriors through immersive learning ecosystems that actually prepare minds for the future, not the past. <span className="text-yellow-400 font-bold">Seeking crowdfunding to revolutionize how humanity learns.</span></p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-indigo-400/20 text-indigo-400 text-sm border border-indigo-400/50">Neural Learning</span>
                  <span className="px-3 py-1 bg-purple-400/20 text-purple-400 text-sm border border-purple-400/50">Future Readiness</span>
                  <span className="px-3 py-1 bg-blue-400/20 text-blue-400 text-sm border border-blue-400/50">Mind Liberation</span>
                </div>
              </div>
            </div>

            {/* Project 8 */}
            <div className="group bg-black/50 border border-orange-400/30 overflow-hidden hover:border-orange-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,146,60,0.4)]">
              <div className="h-64 bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-400 mx-auto mb-4 transform rotate-12 group-hover:rotate-45 transition-transform duration-300 rounded-full"></div>
                  <p className="text-orange-400 font-bold">ANIMAL LIBERATION</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-orange-400 mb-3">Animal Shelter <span className="text-sm text-yellow-400">[WORK IN PROGRESS]</span></h3>
                <p className="text-gray-300 mb-4">Building the world&apos;s most badass animal sanctuary that actually gives a damn about every creature on this planet! My revolutionary shelter design creates healing environments for animals AND fish, combining cutting-edge veterinary care with emotional rehabilitation that restores their trust in humanity. No animal left behind. <span className="text-yellow-400 font-bold">Seeking crowdfunding to save every animal and fish on Earth.</span></p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-orange-400/20 text-orange-400 text-sm border border-orange-400/50">Animal Rehabilitation</span>
                  <span className="px-3 py-1 bg-red-400/20 text-red-400 text-sm border border-red-400/50">Marine Sanctuary</span>
                  <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 text-sm border border-yellow-400/50">Healing Environments</span>
                </div>
              </div>
            </div>

            {/* Project 9 */}
            <div className="group bg-black/50 border border-teal-400/30 overflow-hidden hover:border-teal-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(20,184,166,0.4)]">
              <div className="h-64 bg-gradient-to-br from-teal-500/20 to-green-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-400 mx-auto mb-4 transform rotate-45 group-hover:rotate-90 transition-transform duration-300 rounded-lg"></div>
                  <p className="text-teal-400 font-bold">ANCESTRAL JOURNEYS</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-teal-400 mb-3">Global Travel Agency <span className="text-sm text-yellow-400">[WORK IN PROGRESS]</span></h3>
                <p className="text-gray-300 mb-4">Reconnecting displaced Americans with their ancestral homelands to rebuild what was lost! My revolutionary travel agency doesn&apos;t just book trips - we orchestrate homecoming missions that help people rediscover their roots and contribute to rebuilding their ancestral communities with modern infrastructure and ancient wisdom. <span className="text-yellow-400 font-bold">Seeking crowdfunding to reconnect humanity with its origins.</span></p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-teal-400/20 text-teal-400 text-sm border border-teal-400/50">Heritage Reconnection</span>
                  <span className="px-3 py-1 bg-green-400/20 text-green-400 text-sm border border-green-400/50">Infrastructure Building</span>
                  <span className="px-3 py-1 bg-blue-400/20 text-blue-400 text-sm border border-blue-400/50">Cultural Restoration</span>
                </div>
              </div>
            </div>

            {/* Project 10 */}
            <div className="group bg-black/50 border border-amber-400/30 overflow-hidden hover:border-amber-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]">
              <div className="h-64 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-400 mx-auto mb-4 transform rotate-12 group-hover:rotate-45 transition-transform duration-300 rounded-sm"></div>
                  <p className="text-amber-400 font-bold">ANCIENT TREASURES</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-amber-400 mb-3">Relic Collection <span className="text-sm text-yellow-400">[WORK IN PROGRESS]</span></h3>
                <p className="text-gray-300 mb-4">Hunting down humanity&apos;s lost treasures and sharing their secrets with the world! My relic collection mission rescues ancient artifacts from obscurity and creates immersive experiences that let people touch, feel, and learn from our ancestors&apos; wisdom. History isn&apos;t meant to gather dust - it&apos;s meant to inspire the future. <span className="text-yellow-400 font-bold">Seeking crowdfunding to preserve and share ancient wisdom.</span></p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-amber-400/20 text-amber-400 text-sm border border-amber-400/50">Artifact Recovery</span>
                  <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 text-sm border border-yellow-400/50">Historical Preservation</span>
                  <span className="px-3 py-1 bg-orange-400/20 text-orange-400 text-sm border border-orange-400/50">Interactive Museums</span>
                </div>
              </div>
            </div>

            {/* Project 11 */}
            <div className="group bg-black/50 border border-violet-400/30 overflow-hidden hover:border-violet-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]">
              <div className="h-64 bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-violet-400 mx-auto mb-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
                  <p className="text-violet-400 font-bold">OUTCAST SANCTUARY</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-violet-400 mb-3">Community for Outcasts <span className="text-sm text-yellow-400">[WORK IN PROGRESS]</span></h3>
                <p className="text-gray-300 mb-4">Creating the world&apos;s first true sanctuary where society&apos;s outcasts can finally feel safe, understood, and valued! My revolutionary community model provides judgment-free spaces where people can heal from trauma, addiction, and rejection while building genuine connections with others who truly get it. No masks required here. <span className="text-yellow-400 font-bold">Seeking crowdfunding to build safe havens for the forgotten.</span></p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-violet-400/20 text-violet-400 text-sm border border-violet-400/50">Safe Spaces</span>
                  <span className="px-3 py-1 bg-purple-400/20 text-purple-400 text-sm border border-purple-400/50">Trauma Recovery</span>
                  <span className="px-3 py-1 bg-blue-400/20 text-blue-400 text-sm border border-blue-400/50">Authentic Connection</span>
                </div>
              </div>
            </div>

            {/* Project 12 */}
            <div className="group bg-black/50 border border-rose-400/30 overflow-hidden hover:border-rose-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,113,133,0.4)]">
              <div className="h-64 bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-rose-400 mx-auto mb-4 transform rotate-0 group-hover:rotate-12 transition-transform duration-300 rounded-full"></div>
                  <p className="text-rose-400 font-bold">FUTURE FREEDOM</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-rose-400 mb-3">Music & Kid Books <span className="text-sm text-yellow-400">[WORK IN PROGRESS]</span></h3>
                <p className="text-gray-300 mb-4">Crafting revolutionary music and children&apos;s books that plant seeds of freedom in young minds before society can cage their spirits! My creative arsenal guides the next generation toward Earth liberation through stories and songs that teach them to question everything, love fiercely, and never surrender their wild hearts to conformity. <span className="text-yellow-400 font-bold">Seeking crowdfunding to raise freedom fighters through art.</span></p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-rose-400/20 text-rose-400 text-sm border border-rose-400/50">Freedom Music</span>
                  <span className="px-3 py-1 bg-pink-400/20 text-pink-400 text-sm border border-pink-400/50">Liberation Stories</span>
                  <span className="px-3 py-1 bg-red-400/20 text-red-400 text-sm border border-red-400/50">Wild Heart Preservation</span>
                </div>
              </div>
            </div>

            {/* Project 13 */}
            <div className="group bg-black/50 border border-emerald-400/30 overflow-hidden hover:border-emerald-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,211,153,0.4)]">
              <div className="h-64 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-400 mx-auto mb-4 transform skew-y-6 group-hover:skew-y-0 transition-transform duration-300 rounded-lg"></div>
                  <p className="text-emerald-400 font-bold">AUTHENTIC CINEMA</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-emerald-400 mb-3">Movie Industry Revolution <span className="text-sm text-yellow-400">[WORK IN PROGRESS]</span></h3>
                <p className="text-gray-300 mb-4">Dismantling Hollywood&apos;s fake-ass system and rebuilding cinema with actors who can actually ACT and stories that reflect real human truth! My revolutionary studio prioritizes raw talent over pretty faces, authentic emotions over CGI spectacle, and life lessons that actually matter over mindless entertainment. Time to make movies that heal souls instead of numbing them. <span className="text-yellow-400 font-bold">Seeking crowdfunding to bring truth back to cinema.</span></p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-emerald-400/20 text-emerald-400 text-sm border border-emerald-400/50">Authentic Acting</span>
                  <span className="px-3 py-1 bg-teal-400/20 text-teal-400 text-sm border border-teal-400/50">Truth Storytelling</span>
                  <span className="px-3 py-1 bg-green-400/20 text-green-400 text-sm border border-green-400/50">Soul Healing Cinema</span>
                </div>
              </div>
            </div>

            {/* Project 14 */}
            <div className="group bg-black/50 border border-slate-400/30 overflow-hidden hover:border-slate-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(148,163,184,0.4)]">
              <div className="h-64 bg-gradient-to-br from-slate-500/20 to-gray-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-400 mx-auto mb-4 transform rotate-45 group-hover:rotate-90 transition-transform duration-300 rounded-full"></div>
                  <p className="text-slate-400 font-bold">THE PENGUIN CAFE</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-slate-400 mb-3">Restaurant Experience <span className="text-sm text-yellow-400">[WORK IN PROGRESS]</span></h3>
                <p className="text-gray-300 mb-4">Revolutionizing dining through &quot;The Penguin Cafe&quot; - where spontaneity is the spice of life! My home-restaurant network lets people transform their homes into cultural dining experiences, serving family recipes in environments that celebrate their heritage and bring pure joy. No corporate chains, just authentic souls sharing their culture through food and love. <span className="text-yellow-400 font-bold">Seeking crowdfunding to bring authentic dining back to humanity.</span></p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-slate-400/20 text-slate-400 text-sm border border-slate-400/50">Home Restaurants</span>
                  <span className="px-3 py-1 bg-gray-400/20 text-gray-400 text-sm border border-gray-400/50">Cultural Celebration</span>
                  <span className="px-3 py-1 bg-zinc-400/20 text-zinc-400 text-sm border border-zinc-400/50">Spontaneous Joy</span>
                </div>
              </div>
            </div>

            {/* Project 15 */}
            <div className="group bg-black/50 border border-lime-400/30 overflow-hidden hover:border-lime-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.4)]">
              <div className="h-64 bg-gradient-to-br from-lime-500/20 to-green-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-lime-400 mx-auto mb-4 transform rotate-0 group-hover:rotate-180 transition-transform duration-300 rounded-lg"></div>
                  <p className="text-lime-400 font-bold">BEBO MARKETPLACE</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-lime-400 mb-3">Bebo Shopping Platform <span className="text-sm text-yellow-400">[WORK IN PROGRESS]</span></h3>
                <p className="text-gray-300 mb-4">Building Bebo - the anti-Amazon marketplace where real entrepreneurs showcase their genuine, handcrafted products without corporate interference! My platform cuts out the middleman bullshit and connects people directly with passionate creators who pour their souls into every product. No fake reviews, no mass production - just authentic goods from authentic humans. <span className="text-yellow-400 font-bold">Seeking crowdfunding to empower genuine entrepreneurs worldwide.</span></p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-lime-400/20 text-lime-400 text-sm border border-lime-400/50">Genuine Products</span>
                  <span className="px-3 py-1 bg-green-400/20 text-green-400 text-sm border border-green-400/50">Entrepreneur Support</span>
                  <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 text-sm border border-yellow-400/50">Authentic Commerce</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-8 text-purple-400">MY STRATEGIC ARSENAL</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="bg-black/50 border border-cyan-400/50 p-4 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300">
                <p className="text-cyan-400 font-bold">Strategic Planning</p>
              </div>
              <div className="bg-black/50 border border-blue-400/50 p-4 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
                <p className="text-blue-400 font-bold">Brand Vision</p>
              </div>
              <div className="bg-black/50 border border-purple-400/50 p-4 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300">
                <p className="text-purple-400 font-bold">UX Architecture</p>
              </div>
              <div className="bg-black/50 border border-green-400/50 p-4 hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300">
                <p className="text-green-400 font-bold">Business Strategy</p>
              </div>
              <div className="bg-black/50 border border-pink-400/50 p-4 hover:border-pink-400 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300">
                <p className="text-pink-400 font-bold">Market Analysis</p>
              </div>
              <div className="bg-black/50 border border-orange-400/50 p-4 hover:border-orange-400 hover:shadow-[0_0_20px_rgba(255,165,0,0.3)] transition-all duration-300">
                <p className="text-orange-400 font-bold">Growth Planning</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center py-16">
            <h3 className="text-4xl sm:text-5xl font-black mb-8">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                READY TO CHANGE THE WORLD?
              </span>
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              These world-changing projects need visionaries, innovators, and changemakers. Join the revolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/connect"
                className="px-12 py-6 bg-gradient-to-r from-purple-400 to-blue-500 text-black font-black text-xl border-2 border-purple-400 hover:shadow-[0_0_30px_rgba(147,51,234,0.8)] transition-all duration-300 transform hover:scale-105 text-center"
              >
                START A PROJECT
              </Link>
              <a href="mailto:lawrence@rumidesign.tech?subject=I Want To Help Change The World&body=Hello Lawrence,%0A%0AI&apos;m interested in joining your world-changing initiatives. I want to help with:%0A%0A- Brand Strategy%0A- Mental Health Revolution%0A- Earth Homes & Global Harmony%0A- Nano Technology Healthcare%0A- Clothing & Fashion Impact%0A- Gaming Innovation%0A- Educational Systems Revolution%0A- Animal Shelter & Liberation%0A- Global Travel & Heritage Agency%0A- Relic Collection & Ancient Wisdom%0A- Community for Outcasts & Recovery%0A- Music & Kid Books for Earth Freedom%0A- Movie Industry Revolution & Truth Cinema%0A- The Penguin Cafe Restaurant Experience%0A- Bebo Authentic Shopping Platform%0A%0AHere&apos;s how I can contribute:%0A%0ABest regards" className="px-12 py-6 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-black text-xl border-2 border-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] transition-all duration-300 transform hover:scale-105 text-center">
                WE ARE HIRING 🌍
              </a>
              <Link
                href="/manifesto"
                className="px-12 py-6 bg-transparent border-2 border-cyan-400 text-cyan-400 font-black text-xl hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(0,255,255,0.8)] transition-all duration-300 transform hover:scale-105 text-center"
              >
                READ MY MANIFESTO
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation theme="purple" leftIcon="PORT" />

      {/* User Profile Popup */}
      {showUserPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-black border border-purple-400 shadow-[0_0_30px_rgba(147,51,234,0.5)] max-w-md w-full relative">
            <button 
              onClick={() => setShowUserPopup(false)}
              className="absolute top-4 right-4 text-purple-400 hover:text-white text-2xl font-bold"
            >
              ×
            </button>
            
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.8)]">
                  <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-purple-400 mb-2">PORTFOLIO MODE</h3>
                <p className="text-gray-300">Technical Showcase</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-400 rounded flex items-center justify-center">
                    <span className="text-black font-bold text-sm">⚡</span>
                  </div>
                  <span className="text-white">Full-Stack Developer</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center">
                    <span className="text-black font-bold text-sm">🎯</span>
                  </div>
                  <span className="text-white">UI/UX Designer</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cyan-400 rounded flex items-center justify-center">
                    <span className="text-black font-bold text-sm">🚀</span>
                  </div>
                  <span className="text-white">Digital Innovator</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Link
                  href="/connect"
                  className="flex-1 py-3 bg-gradient-to-r from-purple-400 to-blue-500 text-black font-black text-center hover:shadow-[0_0_20px_rgba(147,51,234,0.8)] transition-all duration-300"
                >
                  HIRE ME
                </Link>
                <Link
                  href="/manifesto"
                  className="flex-1 py-3 border border-purple-400 text-purple-400 font-black text-center hover:bg-purple-400 hover:text-black transition-all duration-300"
                >
                  MY STORY
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Showcase Popup */}
      {showAnnouncementPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-black border border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.5)] max-w-lg w-full relative">
            <button 
              onClick={() => setShowAnnouncementPopup(false)}
              className="absolute top-4 right-4 text-cyan-400 hover:text-white text-2xl font-bold"
            >
              ×
            </button>
            
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.8)] animate-pulse">
                  <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-black mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    SKILLS ARSENAL
                  </span>
                </h3>
              </div>
              
              <div className="space-y-4 mb-6 text-center">
                <p className="text-xl font-bold text-cyan-400">
                  🛠️ TECHNICAL MASTERY
                </p>
                <p className="text-white leading-relaxed">
                  From <span className="text-purple-400 font-bold">React & Next.js</span> to 
                  <span className="text-cyan-400 font-bold"> Node.js & Python</span>, 
                  every project showcases cutting-edge expertise.
                </p>
                <p className="text-gray-300 text-sm">
                  Mode: <span className="text-cyan-400 font-bold">ALWAYS LEARNING</span>
                </p>
              </div>
              
              <div className="space-y-3">
                <Link
                  href="/connect"
                  className="block w-full py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-black text-center hover:shadow-[0_0_20px_rgba(0,255,255,0.8)] transition-all duration-300"
                >
                  START PROJECT
                </Link>
                <Link href="/" className="block w-full py-3 border border-cyan-400 text-cyan-400 font-black text-center hover:bg-cyan-400 hover:text-black transition-all duration-300">
                  BACK TO VISION
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
