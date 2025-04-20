import { motion } from "framer-motion"
import ParticleBackground from "./components/ParticleBackground"
import { BentoGridDemo } from "./components/BentoGridDemo"
import { HeroHighlight } from "./components/ui/hero-highlight"
import SpotlightCard from "./components/SpotlightCard"
import Orb from "./components/Orb"

export default function Landingpage() {
  // Animation variants for headers
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  return (
    <div className="relative min-h-screen bg-black dark:bg-black text-gray-900 dark:text-gray-100 overflow-hidden">
      {/* ✨ Full Background Particle Layer */}
      <div className="absolute inset-0 z-0">
        {/* Component Header */}
        <div className="absolute top-0 left-0 m-4 z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10"
          >
            <span className="text-xs font-mono text-violet-300">Component:</span>
            <h3 className="text-sm font-semibold text-white">Particle Background</h3>
          </motion.div>
        </div>
        
        <ParticleBackground
          particleColors={['#ffffff', '#ffffff']}
          particleCount={1500}
          particleSpread={9}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative">
          {/* Component Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10"
          >
            <span className="text-xs font-mono text-violet-300">Component:</span>
            <h3 className="text-sm font-semibold text-white">Hero Highlight</h3>
          </motion.div>
          
          <HeroHighlight containerClassName="your-custom-class">
            <div className="bg-transparent py-24 px-6 sm:px-12 md:px-24 lg:px-32">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-7xl font-extrabold text-center bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-md">
                  Your UI Components Library ✨
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
              >
                <p className="mt-6 text-xl text-center text-violet-300 max-w-3xl mx-auto tracking-wide leading-relaxed">
                  Get ready made code of your fave Components and save your time 😉
                </p>
              </motion.div>

              <motion.div
                className="mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
              >
                <a
                  href="https://github.com/your-repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-violet-500/25 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a
                  href="/docs"
                  className="group px-6 py-3 rounded-xl border border-violet-400/50 text-violet-200 hover:bg-violet-800/50 hover:text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-violet-700/20 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Docs
                </a>
              </motion.div>
            </div>
          </HeroHighlight>
        </div>

        {/* Bento Grid Section */}
        <div className="relative">
          {/* Component Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="absolute top-4 left-4 z-20 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10"
          >
            <span className="text-xs font-mono text-violet-300">Component:</span>
            <h3 className="text-sm font-semibold text-white">Bento Grid</h3>
          </motion.div>
          
          <BentoGridDemo />
        </div>
        
        {/* Spotlight Card & Orb Section */}
        <div className="relative bg-black py-20 px-5">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
            {/* LEFT SIDE - Spotlight Card */}
            <div className="flex flex-col items-center gap-10 w-full lg:w-1/2 relative">
              {/* Component Header */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={headerVariants}
                className="absolute -top-10 left-0 z-20 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10"
              >
                <span className="text-xs font-mono text-violet-300">Component:</span>
                <h3 className="text-sm font-semibold text-white">Spotlight Card</h3>
              </motion.div>
              
              <SpotlightCard className="relative w-full max-w-sm rounded-3xl bg-gradient-to-br from-neutral-900 to-black text-white p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <div className="mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 0L9 6H3l5 4-2 6 5-4 5 4-2-6 5-4h-6L11 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-2">Boost Your Experience</h3>
                <p className="text-gray-300 mb-6">
                  Get exclusive benefits, features & 24/7 support as a permanent club member.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 rounded-xl bg-white text-black font-semibold transition-all duration-200"
                >
                  Join now
                </motion.button>
              </SpotlightCard>
            </div>

            {/* RIGHT SIDE - Orb */}
            <div className="flex justify-center items-center w-full lg:w-1/2 relative">
              {/* Component Header */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={headerVariants}
                className="absolute -top-10 left-0 z-20 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10"
              >
                <span className="text-xs font-mono text-violet-300">Component:</span>
                <h3 className="text-sm font-semibold text-white">Interactive Orb</h3>
              </motion.div>
              
              <div className="w-[80%] text-white h-[400px] relative mx-auto">
                <Orb hoverIntensity={0.5} rotateOnHover={true} hue={0} forceHoverState={false} />
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <p className="text-white text-2xl font-semibold">Hover me</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}