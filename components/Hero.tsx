
import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Updated to the high-resolution brand image provided by the user
  const HERO_IMAGE_URL = "https://s3-media0.fl.yelpcdn.com/bphoto/smFB-Ow4ime35qToNbgDcA/o.jpg";

  const contentOpacity = Math.max(0, 1 - scrollY / 600);

  return (
    <section id="hero" className="relative h-screen w-full bg-[#0d0a08] overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background Atmosphere: Subtle Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={HERO_IMAGE_URL}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover blur-[100px] opacity-30 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
      </div>

      {/* The Gallery Frame: Ensures "Zoomed Out" context */}
      <div 
        className="relative z-10 w-full h-full flex items-center justify-center px-4 md:px-12 lg:px-24 transition-transform duration-1000 ease-out"
        style={{ transform: `scale(${1 + scrollY * 0.00015})` }}
      >
        <div className="relative w-full max-w-6xl h-[65vh] md:h-[75vh] flex items-center justify-center">
          {/* Main Atmosphere Image */}
          <img
            src={HERO_IMAGE_URL}
            alt="H Brothers restaurant in Downtown Escondido - warm interior with cozy ambiance serving hearty comfort food"
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-contain shadow-[0_0_100px_rgba(0,0,0,0.9)] border border-white/5 rounded-sm transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {/* Subtle lighting mask to enhance the internal lamps */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] pointer-events-none rounded-sm"></div>
          
          {/* Lighting Flare Overlay - Aligned with branding lamps */}
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Hero Interaction Layer - Positioned to reveal the branding text */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-20 pb-12 md:pb-20 pt-32 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center text-center px-4"
        style={{ opacity: contentOpacity }}
      >
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-karak-secondary/40"></div>
            <p className="text-karak-secondary font-raleway uppercase tracking-[1em] text-[9px] md:text-[11px] font-black drop-shadow-lg">
              Est. 2017
            </p>
            <div className="h-px w-12 bg-karak-secondary/40"></div>
          </div>
          
          <h1 className="text-white font-playfair text-3xl md:text-6xl lg:text-7xl mb-10 font-bold tracking-tight leading-[1.1] drop-shadow-2xl">
            Hearty <span className="italic text-karak-secondary font-medium">Comfort,</span><br />
            No Compromise.
          </h1>

          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <a
              href="https://www.hbrotherstogo.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order H Brothers comfort food online for pickup"
              className="bg-karak-accent text-white px-12 py-4 rounded-karak font-black uppercase tracking-[0.25em] text-[10px] hover:bg-white hover:text-karak-primary transition-all shadow-[0_15px_40px_-10px_rgba(192,64,0,0.5)] active:scale-95"
            >
              Order Online
            </a>
            <button
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="View H Brothers menu"
              className="bg-white/5 border border-white/20 text-white backdrop-blur-xl px-12 py-4 rounded-karak font-black uppercase tracking-[0.25em] text-[10px] hover:bg-white hover:text-black transition-all active:scale-95"
            >
              View Menu
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-3">
        <div className="w-px h-10 bg-gradient-to-b from-karak-secondary/60 to-transparent animate-pulse"></div>
      </div>

      {/* Film Grain Texture for depth */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-screen z-20">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
