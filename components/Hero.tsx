
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
  const HERO_IMAGE_URL = `${import.meta.env.BASE_URL}images/hero-bg.jpg`;

  const contentOpacity = Math.max(0, 1 - scrollY / 600);

  return (
    <section id="hero" className="relative h-screen w-full bg-[#0d0a08] overflow-hidden flex flex-col items-center justify-center">

      {/* Background Image: Full screen */}
      <div
        className="absolute inset-0 z-0 overflow-hidden transition-transform duration-1000 ease-out"
        style={{ transform: `scale(${1 + scrollY * 0.0002})` }}
      >
        <img
          src={HERO_IMAGE_URL}
          alt="H Brothers restaurant in Downtown Escondido - warm interior with cozy ambiance serving hearty comfort food"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Overlays for depth and readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>

        {/* Subtle lighting mask to enhance the internal lamps */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>

        {/* Lighting Flare Overlay */}
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none"></div>
      </div>

      {/* Hero Interaction Layer - Positioned to reveal the branding text */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 pb-20 md:pb-20 pt-20 md:pt-32 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center text-center px-4 justify-end md:justify-end h-full md:h-auto"
        style={{ opacity: contentOpacity }}
      >
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-karak-secondary/40"></div>
            <p className="text-karak-secondary font-raleway uppercase tracking-[1em] text-[9px] md:text-[11px] font-black drop-shadow-lg">
              Est. 2017 • Escondido, CA
            </p>
            <div className="h-px w-12 bg-karak-secondary/40"></div>
          </div>

          <h1 className="text-white font-playfair text-3xl md:text-6xl lg:text-7xl mb-6 font-bold tracking-tight leading-[1.1] drop-shadow-2xl">
            Hearty <span className="italic text-karak-secondary font-medium">Comfort,</span><br />
            No Compromise.
          </h1>

          <p className="text-gray-200 font-raleway text-sm md:text-base tracking-widest uppercase font-medium mb-10 max-w-2xl mx-auto">
            Voted Best Comfort Food in Downtown Escondido
          </p>

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
