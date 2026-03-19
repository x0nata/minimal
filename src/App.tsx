import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-[#050505] text-[#FAFAFA] font-mono selection:bg-white selection:text-black min-h-screen relative overflow-x-hidden cursor-crosshair">
      {/* Noise Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-20"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      {/* Custom Cursor Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.03), transparent 40%)`
        }}
      />

      {/* Nav */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-start z-40 mix-blend-difference">
        <div className="text-xs uppercase tracking-[0.3em] flex items-center gap-2 group cursor-pointer">
          <span className="w-8 h-[1px] bg-white group-hover:w-12 transition-all"></span> [MNML]
        </div>
        <div className="text-right">
          <a href="https://www.instagram.com/minimalgraphic.design?igsh=djlkNTl0eWl6N2R1" className="text-xs uppercase tracking-[0.3em] block hover:italic transition-all mb-1">IG: @MINIMALGRAPHIC.DESIGN</a>
          <span className="text-[10px] text-white/50 tracking-[0.2em]">BASED IN THE VOID</span>
        </div>
      </header>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center relative pt-20">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
          <span className="text-[40vw] font-black leading-none whitespace-nowrap overflow-hidden">MNML</span>
        </div>
        
        <div className="z-10 text-center w-full px-4">
          <h1 className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter mix-blend-difference leading-[0.8] mb-6 relative group">
            <span className="absolute -inset-4 bg-white/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
            MIN<span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>IM</span>AL
          </h1>
          <p className="max-w-xl mx-auto text-sm md:text-base text-white/60 font-light leading-relaxed tracking-wide">
            We are a digital design practice stripping away the decorative to reveal the structural. Total aesthetic reduction.
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[9px] uppercase tracking-[0.5em] text-white/40">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
        </div>
      </section>

      {/* Marquee */}
      <div className="w-full border-y border-white/10 py-4 flex overflow-hidden whitespace-nowrap relative bg-white/5 backdrop-blur-sm">
        <div className="animate-[marquee_20s_linear_infinite] inline-block">
          <span className="text-2xl md:text-4xl font-black uppercase tracking-widest mx-8 text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>BRAND IDENTITY // WEB DESIGN // EDITORIAL // ART DIRECTION //</span>
          <span className="text-2xl md:text-4xl font-black uppercase tracking-widest mx-8 text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>BRAND IDENTITY // WEB DESIGN // EDITORIAL // ART DIRECTION //</span>
        </div>
      </div>

      {/* Detailed Services */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-xs uppercase tracking-[0.4em] text-white/40 mb-16 border-b border-white/10 pb-4">01 / Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="space-y-16">
            <div className="group cursor-pointer">
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/20 transition-all duration-500">Identity</h3>
              <p className="text-white/50 font-light leading-relaxed">Developing core visual systems that scale. We build brutalist, unignorable brand marks and comprehensive rule-sets.</p>
            </div>
            <div className="group cursor-pointer">
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/20 transition-all duration-500">Digital</h3>
              <p className="text-white/50 font-light leading-relaxed">Web experiences focused on motion, stark typography, and frictionless performance. No templates, just pure code.</p>
            </div>
          </div>
          <div className="relative aspect-[3/4] bg-[#111] overflow-hidden group">
            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out flex items-center justify-center">
              <span className="text-white uppercase tracking-[0.5em] text-xs">View Showreel</span>
            </div>
            {/* Abstract geometric placeholder */}
            <div className="absolute inset-8 border border-white/20 rounded-full flex items-center justify-center">
               <div className="w-1/2 h-1/2 bg-white/10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works */}
      <section className="py-32 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
           <h2 className="text-xs uppercase tracking-[0.4em] text-white/40 mb-16 flex justify-between items-end border-b border-white/10 pb-4">
             <span>02 / Selected Works</span>
             <span className="text-[9px]">2023—2024</span>
           </h2>
           
           <div className="flex flex-col gap-8">
              {[
                { title: 'Project Zero', category: 'Brand Architecture', year: '24' },
                { title: 'Void Studio', category: 'Web Experience', year: '23' },
                { title: 'Monolith', category: 'Editorial Print', year: '23' },
              ].map((work, i) => (
                <div key={i} className="group relative border-b border-white/10 pb-8 cursor-pointer flex justify-between items-center hover:pr-8 transition-all duration-500">
                   <div>
                     <span className="text-[10px] text-white/30 font-mono mb-2 block tracking-widest">[{work.category}]</span>
                     <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter group-hover:italic">{work.title}</h3>
                   </div>
                   <div className="text-white/20 font-black text-2xl md:text-4xl group-hover:text-white transition-colors duration-500">'{work.year}</div>
                   
                   {/* Hover Image Reveal (Absolute positioned, follows somewhat) */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-40 bg-white/10 backdrop-blur-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-500 rotate-2 group-hover:-rotate-2 z-10 flex items-center justify-center border border-white/20">
                      <span className="text-xs tracking-widest uppercase mix-blend-overlay">Preview</span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default App;
