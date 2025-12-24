
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollIntoView = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 110; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const InstagramIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );

  const YelpIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.373 26.042l1.455-.336c.03-.007.081-.019.143-.039a1.605 1.605 0 001.147-1.91l-.006-.026a1.6 1.6 0 00-.247-.54 2.027 2.027 0 00-.595-.51 5.503 5.503 0 00-.844-.39l-1.596-.582c-.895-.332-1.79-.656-2.695-.972-.586-.209-1.082-.391-1.514-.525-.081-.025-.171-.05-.244-.075-.522-.16-.889-.226-1.199-.228a1.427 1.427 0 00-.604.11c-.2.086-.378.213-.525.372a3.22 3.22 0 00-.206.26 3.077 3.077 0 00-.306.61 8.259 8.259 0 00-.435 2.715c.006.835.029 1.905.489 2.631.11.187.259.348.436.473.327.226.657.255 1.001.28.514.037 1.012-.09 1.508-.204l4.833-1.115h.004zm16.23-7.721a8.261 8.261 0 00-1.581-2.25 2.422 2.422 0 00-.269-.23 3.135 3.135 0 00-.273-.183 3.117 3.117 0 00-.3-.144 1.542 1.542 0 00-.634-.104c-.207.011-.41.068-.592.166-.277.138-.578.36-.977.73-.055.055-.124.117-.186.175-.33.31-.696.69-1.132 1.135-.673.68-1.336 1.364-1.995 2.056l-1.18 1.222a5.494 5.494 0 00-.588.721c-.149.217-.254.46-.31.718a1.599 1.599 0 00.02.62 1.603 1.603 0 001.868 1.215c.065-.01.115-.02.146-.028l6.29-1.453c.496-.114.999-.219 1.444-.477.299-.173.583-.345.778-.69.104-.191.166-.4.184-.617.096-.856-.352-1.83-.713-2.582zm-11.257 2.646c.455-.572.454-1.424.494-2.121.136-2.33.28-4.659.392-6.989.043-.882.138-1.753.085-2.642-.044-.734-.05-1.576-.514-2.178-.819-1.062-2.564-.975-3.755-.81-.364.05-.73.118-1.092.205a14.59 14.59 0 00-1.072.295c-1.143.374-2.749 1.06-3.02 2.375-.153.744.21 1.505.493 2.183.342.823.81 1.564 1.235 2.338 1.126 2.044 2.273 4.075 3.416 6.11.341.606.714 1.375 1.374 1.69.044.019.088.036.133.05a1.598 1.598 0 001.727-.398 1.52 1.52 0 00.104-.108zm-.547 6.233a1.456 1.456 0 00-1.62-.545c-.07.023-.137.051-.202.084-.1.05-.195.11-.285.178-.262.194-.483.446-.684.699-.05.064-.097.15-.158.205l-1.011 1.39c-.573.78-1.138 1.56-1.699 2.354-.365.512-.681.944-.931 1.327-.048.072-.097.152-.142.216-.3.464-.469.802-.556 1.103-.065.2-.085.412-.06.62.028.218.101.427.216.615.06.094.126.184.196.272a3.06 3.06 0 00.508.467c.699.486 1.464.834 2.268 1.104a8.03 8.03 0 002.07.395c.119.006.239.004.358-.008.111-.01.221-.025.33-.046.11-.025.217-.057.322-.094a1.57 1.57 0 00.55-.35c.148-.148.262-.327.334-.523.117-.292.194-.661.244-1.21.004-.079.015-.172.023-.258.04-.456.058-.99.086-1.62.05-.967.088-1.93.118-2.896l.064-1.718c.014-.395.002-.834-.108-1.227a1.837 1.837 0 00-.231-.533zm11.425 2.685c-.211-.231-.51-.462-.983-.747-.068-.038-.148-.088-.222-.133-.393-.236-.866-.484-1.42-.784-.849-.466-1.7-.92-2.557-1.37l-1.517-.803c-.078-.023-.158-.08-.232-.116-.292-.139-.6-.269-.921-.328a1.941 1.941 0 00-.335-.035c-.073 0-.145.004-.217.013a1.456 1.456 0 00-1.214 1.201c-.023.193-.016.387.021.578.075.403.255.801.441 1.15l.81 1.516a151.9 151.9 0 001.376 2.552c.302.553.553 1.026.788 1.418.045.073.095.153.134.221.286.471.516.768.75.98.15.146.331.257.53.325.208.07.428.094.647.072.111-.013.221-.032.33-.057a3.18 3.18 0 00.318-.103 2.47 2.47 0 00.325-.15 8.022 8.022 0 001.687-1.262c.605-.595 1.14-1.244 1.555-1.987.058-.105.108-.214.15-.326.039-.104.073-.21.101-.317.025-.11.043-.22.056-.33a1.563 1.563 0 00-.074-.646 1.438 1.438 0 00-.327-.532z" />
    </svg>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Banner */}
      {showAnnouncement && (
        <div className="bg-karak-accent text-white py-2 px-4 relative flex items-center justify-center text-center">
          <p className="text-xs sm:text-sm font-medium tracking-wide">
            📢 We will be closed for the Holiday from Dec 23rd - 25th. Merry Christmas!
          </p>
          <button 
            onClick={() => setShowAnnouncement(false)}
            className="absolute right-4 p-1 hover:opacity-70 transition-opacity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      )}

      <header className={`transition-all duration-300 ${isScrolled ? 'bg-white shadow-md h-16' : 'bg-white/95 backdrop-blur-sm h-20 border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center">
                <Logo 
                  className={`transition-all duration-300 ${isScrolled ? 'h-8 md:h-9' : 'h-11 md:h-13'} w-auto`}
                  color="#182C2D"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-10 items-center">
              <button onClick={() => scrollIntoView('hero')} className="text-karak-primary font-bold tracking-wider uppercase text-[10px] hover:text-karak-accent transition-colors">Home</button>
              <button onClick={() => scrollIntoView('menu')} className="text-karak-primary font-bold tracking-wider uppercase text-[10px] hover:text-karak-accent transition-colors">Menu</button>
              <button onClick={() => scrollIntoView('about')} className="text-karak-primary font-bold tracking-wider uppercase text-[10px] hover:text-karak-accent transition-colors">About</button>
              <button onClick={() => scrollIntoView('contact')} className="text-karak-primary font-bold tracking-wider uppercase text-[10px] hover:text-karak-accent transition-colors">Find Us</button>
              
              <div className="h-4 w-px bg-gray-200"></div>
              
              {/* Social Icons Integrated into Nav with Pop colors */}
              <div className="flex items-center gap-5">
                <a 
                  href="https://www.instagram.com/hbrothers_esco/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#E4405F] hover:scale-110 active:scale-95 transition-all drop-shadow-sm"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a 
                  href="https://www.yelp.com/biz/h-brothers-escondido" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#D32323] hover:scale-110 active:scale-95 transition-all drop-shadow-sm flex items-center justify-center"
                  aria-label="Yelp"
                >
                  <YelpIcon />
                </a>
              </div>
            </nav>

            {/* Yelp Rating + Order */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-karak-primary">★ 4.8</span>
                  <div className="flex text-yellow-500"><span className="text-[10px]">★★★★★</span></div>
                </div>
                <a href="https://www.yelp.com/biz/h-brothers-escondido" target="_blank" rel="noopener noreferrer" className="text-[9px] uppercase tracking-widest font-bold text-gray-400 hover:text-[#D32323]">500+ Reviews</a>
              </div>
              <a href="https://www.hbrotherstogo.com/" target="_blank" rel="noopener noreferrer" className="bg-karak-primary text-karak-accent px-6 py-2.5 rounded-karak text-[10px] font-bold uppercase tracking-widest hover:bg-karak-accent hover:text-white transition-all active:scale-95 shadow-lg">
                Order Now
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-karak-primary hover:text-karak-accent"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path className={isMenuOpen ? 'hidden' : 'inline-flex'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  <path className={isMenuOpen ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top-2`}>
          <div className="px-2 pt-2 pb-6 space-y-1 text-center">
            <button onClick={() => scrollIntoView('hero')} className="block w-full px-3 py-4 text-[10px] font-bold text-karak-primary uppercase tracking-widest border-b border-gray-50">Home</button>
            <button onClick={() => scrollIntoView('menu')} className="block w-full px-3 py-4 text-[10px] font-bold text-karak-primary uppercase tracking-widest border-b border-gray-50">Menu</button>
            <button onClick={() => scrollIntoView('about')} className="block w-full px-3 py-4 text-[10px] font-bold text-karak-primary uppercase tracking-widest border-b border-gray-50">About</button>
            <button onClick={() => scrollIntoView('contact')} className="block w-full px-3 py-4 text-[10px] font-bold text-karak-primary uppercase tracking-widest border-b border-gray-50">Find Us</button>
            
            <div className="flex justify-center gap-10 py-6">
              <a href="https://www.instagram.com/hbrothers_esco/" target="_blank" rel="noopener noreferrer" className="text-[#E4405F]">
                <InstagramIcon />
              </a>
              <a href="https://www.yelp.com/biz/h-brothers-escondido" target="_blank" rel="noopener noreferrer" className="text-[#D32323]">
                <YelpIcon />
              </a>
            </div>

            <div className="pt-4 px-4">
              <a href="https://www.hbrotherstogo.com/" target="_blank" rel="noopener noreferrer" className="block w-full bg-karak-primary text-karak-accent py-4 rounded-karak text-[10px] font-bold uppercase tracking-widest text-center">Order Online</a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
