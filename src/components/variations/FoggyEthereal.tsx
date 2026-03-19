/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';

const FoggyEthereal: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState(0);
  const [capabilitiesProgress, setCapabilitiesProgress] = useState(0);
  const capabilitiesRef = useRef<HTMLElement>(null);

  // Generate particles once using useMemo
  const particles = React.useMemo(() => {
    return Array.from({ length: 50 }).map(() => ({
      width: Math.random() * 3 + 1 + 'px',
      height: Math.random() * 3 + 1 + 'px',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      animation: `floatParticle ${Math.random() * 20 + 10}s linear infinite`,
      animationDelay: `-${Math.random() * 20}s`,
      opacity: Math.random() * 0.5 + 0.1
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      // Calculate capabilities section progress
      if (capabilitiesRef.current) {
        const rect = capabilitiesRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Animation starts when section top enters bottom 80% of viewport
        // Animation completes when section center reaches center of viewport
        const animationStart = viewportHeight * 0.85;
        const animationEnd = viewportHeight * 0.4;
        
        let progress = 0;
        
        // Only animate when section is in viewport
        if (rect.top < animationStart && rect.bottom > 0) {
          // Calculate progress based on scroll position
          progress = Math.max(0, Math.min(1, (animationStart - rect.top) / (animationStart - animationEnd)));
        }
        
        // If section has scrolled past center, start reducing progress (reverse animation)
        if (rect.top < animationEnd) {
          const reverseProgress = Math.max(0, Math.min(1, (rect.bottom) / (viewportHeight * 0.6)));
          progress = Math.min(progress, reverseProgress);
        }
        
        setCapabilitiesProgress(progress);
      }
      
      // Determine active section based on scroll position
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#020202] text-[#FAFAFA] font-mono selection:bg-white selection:text-black min-h-screen relative overflow-x-hidden cursor-crosshair">
      {/* Animated Fog Layers */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div 
          className="absolute inset-0 opacity-30 mix-blend-screen"
          style={{
            backgroundImage: `radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.03) 0%, transparent 60%),
                              radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.02) 0%, transparent 60%),
                              radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.01) 0%, transparent 70%)`,
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            transition: 'transform 0.8s ease-out'
          }}
        />
        {/* Moving Fog 1 */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.02) 50%, transparent 60%)',
            backgroundSize: '200% 200%',
            animation: 'fogMove1 25s ease-in-out infinite',
            filter: 'blur(40px)'
          }}
        />
        {/* Moving Fog 2 */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            background: 'linear-gradient(-45deg, transparent 40%, rgba(255,255,255,0.015) 50%, transparent 60%)',
            backgroundSize: '200% 200%',
            animation: 'fogMove2 30s ease-in-out infinite',
            filter: 'blur(60px)'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-white/10"
            style={{
              width: particle.width,
              height: particle.height,
              left: particle.left,
              top: particle.top,
              animation: particle.animation,
              animationDelay: particle.animationDelay,
              opacity: particle.opacity
            }}
          />
        ))}
      </div>

      {/* Noise Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-25"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Ethereal Cursor Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-500"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.04), transparent 30%),
                       radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.02), transparent 40%)`
        }}
      />

      {/* Navigation */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-start z-40 mix-blend-difference">
        <div className="text-xs uppercase tracking-[0.3em] flex items-center gap-3 group cursor-pointer">     
          <span className="group-hover:tracking-[0.4em] transition-all duration-500">[MNML]</span>
           <span className="w-12 h-[1px] bg-white group-hover:w-16 transition-all duration-500"></span> 
        </div>
        <div className="text-right space-y-2">
          <a href="https://www.instagram.com/minimalgraphic.design?igsh=djlkNTl0eWl6N2R1" className="text-xs uppercase tracking-[0.3em] block hover:italic transition-all duration-500">
             @MINIMALGRAPHIC.DESIGN
          </a>
          <span className="text-[10px] text-white/40 tracking-[0.2em] block">BASED IN THE VOID</span>
          <div className="flex items-center justify-end gap-2 mt-3">
            <div className="w-6 h-[1px] bg-white/30"></div>
          </div>
        </div>
      </header>

      {/* Section Indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4 hidden md:flex">
        {[0, 1, 2, 3, 4].map((index) => (
          <div 
            key={index}
            className={`w-[1px] transition-all duration-700 ${
              activeSection === index ? 'h-16 bg-white/80' : 'h-8 bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center relative pt-20 px-4">
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] select-none pointer-events-none">
          <span className="text-[45vw] font-black leading-none whitespace-nowrap tracking-tighter">
            MNML
          </span>
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/5 rounded-full"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              transition: 'transform 1.2s ease-out'
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-white/3 rotate-45"
            style={{
              transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px) rotate(45deg)`,
              transition: 'transform 1.5s ease-out'
            }}
          />
        </div>

        {/* Main Hero Content */}
        <div className="z-10 text-center w-full max-w-5xl">
          <div className="mb-8 overflow-hidden">
            <h1 className="text-[18vw] md:text-[14vw] font-black uppercase tracking-tighter mix-blend-difference leading-[0.7] relative group">
              <div className="flex flex-col items-center">
                <span className="block hover:scale-105 transition-transform duration-1000">
                  MIN<span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.9)' }}>IM</span>AL
                </span>
              </div>
              <div className="absolute -inset-8 bg-white/3 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
            </h1>
          </div>

          <div className="space-y-6 max-w-2xl mx-auto">
            <p className="text-sm md:text-base text-white/70 font-light leading-relaxed tracking-wide">
              We are a digital design practice stripping away the decorative to reveal the structural. 
              Total aesthetic reduction.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-white/40 tracking-[0.3em] uppercase">
              <span>Brand Identity</span>
              <span className="w-4 h-[1px] bg-white/20 hidden sm:block"></span>
              <span>Web Design</span>
              <span className="w-4 h-[1px] bg-white/20 hidden sm:block"></span>
              <span>Art Direction</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <button className="px-8 py-4 border border-white/20 text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-700 hover:border-white group">
              <span className="group-hover:tracking-[0.4em] transition-all duration-500">Explore Work</span>
            </button>
            <button className="px-8 py-4 text-xs uppercase tracking-[0.3em] text-white/60 hover:text-white transition-all duration-500 flex items-center gap-2">
              <span>Get in Touch</span>
              <div className="w-6 h-[1px] bg-white/30 group-hover:w-12 transition-all duration-500"></div>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 group cursor-pointer">
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent group-hover:h-20 transition-all duration-700"></div>
        </div>

        {/* Bottom Text */}
        <div className="absolute bottom-8 left-8 text-[9px] uppercase tracking-[0.3em] text-white/30 hidden md:block">
          <span>EST. 2023</span>
          <span className="mx-2">/</span>
          <span>DIGITAL DESIGN</span>
        </div>
      </section>

      {/* Marquee */}
      <div className="w-full border-y border-white/10 py-6 flex overflow-hidden whitespace-nowrap relative bg-white/5 backdrop-blur-md">
        <div className="animate-[marquee_25s_linear_infinite] inline-block">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="text-3xl md:text-5xl font-black uppercase tracking-widest mx-12 text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
              BRAND IDENTITY // WEB DESIGN // EDITORIAL // ART DIRECTION // DIGITAL EXPERIENCE //
            </span>
          ))}
        </div>
      </div>

      {/* Capabilities Section */}
      <section 
        ref={capabilitiesRef}
        className="py-20 md:py-40 px-6 md:px-12 max-w-7xl mx-auto relative"
      >
        {/* Section Title */}
        <div className="flex items-center gap-4 md:gap-8 mb-12 md:mb-20">
          <h2 className="text-xs uppercase tracking-[0.4em] text-white/40">01 / Capabilities</h2>
          <div className="flex-1 h-[1px] bg-white/10"></div>
          <span className="text-[9px] text-white/20 tracking-[0.3em] hidden md:block">WHAT WE DO</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32">
          {/* Services List */}
          <div className="space-y-12 md:space-y-20">
            {[
              { 
                title: 'Identity', 
                description: 'Developing core visual systems that scale. We build brutalist, unignorable brand marks and comprehensive rule-sets that define presence.',
                icon: '◆'
              },
              { 
                title: 'Digital', 
                description: 'Web experiences focused on motion, stark typography, and frictionless performance. No templates, just pure code.',
                icon: '◇'
              },
              { 
                title: 'Strategy', 
                description: 'Brand positioning and architecture that cuts through noise. We find the essential truth and amplify it.',
                icon: '○'
              },
              { 
                title: 'Art Direction', 
                description: 'Guiding visual narratives across all touchpoints. Consistent, powerful, unmistakable.',
                icon: '□'
              }
            ].map((service, i) => (
              <div 
                key={i} 
                className="group cursor-pointer"
                style={{
                  opacity: capabilitiesProgress > 0.15 ? 1 : 0,
                  transform: `translateX(${capabilitiesProgress > 0.15 ? 0 : -20}px)`,
                  transition: `all 0.6s ease-out ${i * 0.15}s`
                }}
              >
                <div className="flex items-start gap-4 md:gap-6 mb-4 md:mb-6">
                  <span className="text-white/20 text-lg md:text-xl group-hover:text-white/60 transition-colors duration-500">{service.icon}</span>
                  <div>
                    <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-2 md:mb-4 group-hover:italic transition-all duration-500">
                      {service.title}
                    </h3>
                    <p className="text-white/50 font-light leading-relaxed max-w-md text-sm md:text-base">{service.description}</p>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-white/10 group-hover:bg-white/30 transition-colors duration-700"></div>
              </div>
            ))}
          </div>

          {/* Visual Element with Scroll Animation */}
          <div 
            className="relative aspect-[3/4] md:aspect-[3/4] bg-[#080808] overflow-hidden group border border-white/10"
            style={{
              opacity: capabilitiesProgress > 0.05 ? Math.min(1, capabilitiesProgress * 1.5) : 0,
              transform: `translateY(${capabilitiesProgress > 0.05 ? 0 : 40}px) scale(${capabilitiesProgress > 0.05 ? 1 : 0.97})`,
              transition: 'all 0.8s ease-out'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-out flex items-center justify-center">
              <span className="text-white uppercase tracking-[0.5em] text-xs">View Showreel</span>
            </div>
            
            {/* Abstract geometric placeholder with scroll-triggered rotation */}
            <div className="absolute inset-8 md:inset-12 border border-white/10 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Outer square - rotates based on scroll */}
                <div 
                  className="absolute inset-0 border border-white/5"
                  style={{
                    transform: `rotate(${45 + capabilitiesProgress * 90}deg)`,
                    transition: 'transform 0.4s ease-out'
                  }}
                />
                {/* Middle square - rotates opposite direction */}
                <div 
                  className="absolute inset-6 md:inset-8 border border-white/10"
                  style={{
                    transform: `rotate(${45 - capabilitiesProgress * 60}deg)`,
                    transition: 'transform 0.5s ease-out'
                  }}
                />
                {/* Inner square - rotates slower */}
                <div 
                  className="absolute inset-12 md:inset-16 border border-white/15"
                  style={{
                    transform: `rotate(${45 + capabilitiesProgress * 45}deg)`,
                    transition: 'transform 0.6s ease-out'
                  }}
                />
                {/* Center square - scales and glows */}
                <div 
                  className="absolute top-1/2 left-1/2 border border-white/20"
                  style={{
                    width: `${20 + capabilitiesProgress * 30}%`,
                    height: `${20 + capabilitiesProgress * 30}%`,
                    backgroundColor: `rgba(255,255,255,${0.02 + capabilitiesProgress * 0.08})`,
                    transform: `translate(-50%, -50%) rotate(${capabilitiesProgress * 20}deg)`,
                    transition: 'all 0.4s ease-out'
                  }}
                />
              </div>
            </div>

            {/* Corner Details */}
            <div className="absolute top-4 left-4 text-[9px] text-white/20 tracking-[0.3em]">01</div>
            <div className="absolute top-4 right-4 text-[9px] text-white/20 tracking-[0.3em]">CAP</div>
            <div className="absolute bottom-4 left-4 text-[9px] text-white/20 tracking-[0.3em]">VID</div>
            <div className="absolute bottom-4 right-4 text-[9px] text-white/20 tracking-[0.3em]">24</div>
          </div>
        </div>
      </section>

      {/* Selected Works */}
      <section className="py-20 md:py-40 bg-[#080808] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex items-center gap-4 md:gap-8 mb-12 md:mb-20">
            <h2 className="text-xs uppercase tracking-[0.4em] text-white/40">02 / Selected Works</h2>
            <div className="flex-1 h-[1px] bg-white/10"></div>
            <span className="text-[9px] text-white/20 tracking-[0.3em]">2023—2024</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              { title: 'Project Zero', category: 'Brand Architecture', year: '24', number: '01' },
              { title: 'Void Studio', category: 'Web Experience', year: '23', number: '02' },
              { title: 'Monolith', category: 'Editorial Print', year: '23', number: '03' },
              { title: 'Nexus', category: 'Digital Campaign', year: '24', number: '04' },
              { title: 'Ethereal', category: 'Brand Identity', year: '24', number: '05' },
              { title: 'Cipher', category: 'Art Direction', year: '23', number: '06' }
            ].map((work, i) => (
              <div key={i} className="group relative border-b border-white/10 pb-6 md:pb-8 cursor-pointer overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] text-white/30 font-mono mb-2 block tracking-widest">[{work.category}]</span>
                    <h3 className="text-2xl md:text-5xl font-black uppercase tracking-tighter group-hover:italic transition-all duration-500">
                      {work.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-white/20 font-black text-xl md:text-2xl group-hover:text-white transition-colors duration-500">
                      '{work.year}
                    </div>
                    <span className="text-[9px] text-white/30 tracking-[0.3em]">{work.number}</span>
                  </div>
                </div>
                
                {/* Hover Image Reveal */}
                <div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-700 flex items-center justify-center">
                  <span className="text-xs tracking-[0.5em] uppercase text-white/50">View Project</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-[1px] bg-white/5 mt-4 overflow-hidden">
                  <div className="h-full bg-white/30 w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Background Elements */}
        <div className="absolute top-1/4 right-0 w-64 md:w-96 h-64 md:h-96 border border-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-48 md:w-64 h-48 md:h-64 border border-white/5 rotate-45 blur-2xl"></div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-40 px-6 md:px-12 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <div className="flex items-center gap-4 md:gap-8 mb-8 md:mb-12">
              <h2 className="text-xs uppercase tracking-[0.4em] text-white/40">03 / About</h2>
              <div className="flex-1 h-[1px] bg-white/10"></div>
            </div>
            
            <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
              We believe in the power of reduction.
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-12">
              <p className="text-white/60 font-light leading-relaxed text-sm md:text-base">
                In a world of visual noise, we find clarity through subtraction. Our practice is built on the principle that 
                true impact comes not from addition, but from the careful removal of everything unnecessary.
              </p>
              <p className="text-white/60 font-light leading-relaxed text-sm md:text-base">
                Every project begins with a question: what can we remove? This disciplined approach yields work that 
                resonates deeper, communicates faster, and endures longer.
              </p>
            </div>
          </div>
          
          <div className="space-y-6 md:space-y-8">
            <div className="border border-white/10 p-6 md:p-8 group hover:border-white/30 transition-colors duration-700">
              <div className="text-4xl md:text-6xl font-black mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-500">∞</div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/40">Experience</div>
            </div>
            <div className="border border-white/10 p-6 md:p-8 group hover:border-white/30 transition-colors duration-700">
              <div className="text-4xl md:text-6xl font-black mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-500">∞</div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/40">Projects</div>
            </div>
            <div className="border border-white/10 p-6 md:p-8 group hover:border-white/30 transition-colors duration-700">
              <div className="text-4xl md:text-6xl font-black mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-500">∞</div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/40">Commitment to Craft</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 md:py-40 bg-gradient-to-b from-[#080808] to-[#050505] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-12 md:mb-16">
            <div className="w-8 md:w-16 h-[1px] bg-white/20"></div>
            <h2 className="text-xs uppercase tracking-[0.4em] text-white/40">04 / Contact</h2>
            <div className="w-8 md:w-16 h-[1px] bg-white/20"></div>
          </div>
          
          <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-[0.9]">
            Let's create<br />something<br />essential.
          </h3>
          
          <p className="text-white/60 font-light leading-relaxed max-w-xl mx-auto mb-8 md:mb-12 text-sm md:text-base">
            Have a project in mind? Let's discuss how we can bring your vision to life 
            through the power of minimal design.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <button className="px-8 md:px-12 py-4 md:py-6 bg-white text-black text-xs uppercase tracking-[0.3em] hover:bg-transparent hover:text-white border border-white transition-all duration-700 group w-full sm:w-auto">
              <span className="group-hover:tracking-[0.4em] transition-all duration-500">Start a Project</span>
            </button>
          
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-24 md:w-32 h-24 md:h-32 border border-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 md:w-48 h-32 md:h-48 border border-white/5 rotate-45 blur-2xl"></div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-6 md:px-12 border-t border-white/10 bg-[#020202]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
          <div>
            <div className="text-xl md:text-2xl font-black mb-2">[MNML]</div>
            <div className="text-[10px] text-white/40 tracking-[0.2em]">TOTAL AESTHETIC REDUCTION</div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <div className="flex gap-6 md:gap-8 text-[10px] uppercase tracking-[0.2em] text-white/40">
              <a href="#" className="hover:text-white transition-colors duration-500">Instagram</a>
              <a href="#" className="hover:text-white transition-colors duration-500">Twitter</a>
            </div>
            <div className="text-[9px] text-white/30 tracking-[0.2em]">
              © 2024 MINIMAL DESIGN. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes fogMove1 {
          0%, 100% { transform: translateX(0%) translateY(0%); }
          50% { transform: translateX(10%) translateY(5%); }
        }
        @keyframes fogMove2 {
          0%, 100% { transform: translateX(0%) translateY(0%); }
          50% { transform: translateX(-8%) translateY(-3%); }
        }
        @keyframes floatParticle {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default FoggyEthereal;