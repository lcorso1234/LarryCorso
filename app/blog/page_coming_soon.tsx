import Navigation from '@/components/Navigation';
import ScrollAnimation from '@/components/ScrollAnimation';
import EnhancedButton from '@/components/EnhancedButton';

export default function Blog() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        {/* Pulsing circles */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-green-500/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-yellow-500/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="border-r border-gray-700"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8 mt-20">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          {/* Coming Soon Badge */}
          <ScrollAnimation animation="fadeInUp" delay={0}>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/50 rounded-full backdrop-blur-sm">
              <span className="w-3 h-3 bg-blue-400 rounded-full animate-pulse mr-3"></span>
              <span className="text-blue-400 font-mono uppercase tracking-wider text-sm">Coming Soon</span>
            </div>
          </ScrollAnimation>

          {/* Main Title */}
          <ScrollAnimation animation="slideInDown" delay={0.1}>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.8)]">
                THE BLOG
              </span>
            </h1>
          </ScrollAnimation>

          {/* Subtitle */}
          <ScrollAnimation animation="fadeInUp" delay={0.2}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-r from-gray-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                WHERE DIGITAL JUSTICE UNFOLDS
              </span>
            </h2>
          </ScrollAnimation>

          {/* Description */}
          <ScrollAnimation animation="fadeInUp" delay={0.3}>
            <div className="space-y-6 text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
              <p className="leading-relaxed">
                The night worker&apos;s journal is being crafted in the shadows. 
                <span className="text-blue-400 font-semibold"> Deep insights</span>, 
                <span className="text-purple-400 font-semibold"> breakthrough strategies</span>, and 
                <span className="text-green-400 font-semibold"> visionary perspectives</span> 
                are coming to illuminate the digital darkness.
              </p>
              <p className="text-lg text-gray-400">
                🦇 Stories of transformation • Revolutionary ideas • Guardian wisdom 🦇
              </p>
            </div>
          </ScrollAnimation>

          {/* Features Preview */}
          <ScrollAnimation animation="scaleIn" delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-gradient-to-b from-blue-900/30 to-blue-800/10 border border-blue-400/30 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-blue-400 text-4xl mb-4">🎧</div>
                <h3 className="text-xl font-bold text-blue-300 mb-2">Night Podcasts</h3>
                <p className="text-gray-400 text-sm">Deep conversations when the world sleeps</p>
              </div>
              <div className="bg-gradient-to-b from-purple-900/30 to-purple-800/10 border border-purple-400/30 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-purple-400 text-4xl mb-4">🎬</div>
                <h3 className="text-xl font-bold text-purple-300 mb-2">Vision Videos</h3>
                <p className="text-gray-400 text-sm">Bringing digital justice to life</p>
              </div>
              <div className="bg-gradient-to-b from-green-900/30 to-green-800/10 border border-green-400/30 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-green-400 text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-green-300 mb-2">Digital Art</h3>
                <p className="text-gray-400 text-sm">Visual stories of transformation</p>
              </div>
            </div>
          </ScrollAnimation>

          {/* Call to Action */}
          <ScrollAnimation animation="fadeInUp" delay={0.5}>
            <div className="space-y-8 pt-8">
              <p className="text-lg text-gray-400">
                Join the movement. Be the first to witness the darkness transform into light.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <EnhancedButton 
                  href="/connect" 
                  variant="primary"
                  className="transform hover:scale-105 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                >
                  GET NOTIFIED
                </EnhancedButton>
                <EnhancedButton 
                  href="/portfolio" 
                  variant="secondary"
                  className="transform hover:scale-105"
                >
                  EXPLORE WORK
                </EnhancedButton>
              </div>
            </div>
          </ScrollAnimation>

          {/* Progress Indicator */}
          <ScrollAnimation animation="fadeInUp" delay={0.6}>
            <div className="pt-16">
              <div className="text-center mb-4">
                <span className="text-sm text-gray-500 font-mono">PROGRESS</span>
              </div>
              <div className="w-full max-w-md mx-auto bg-gray-800 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-full w-3/4 rounded-full animate-pulse"></div>
              </div>
              <div className="text-center mt-2">
                <span className="text-xs text-gray-500">75% Complete</span>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Navigation */}
      <Navigation theme="blue" />
    </div>
  );
}
