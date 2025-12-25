
import React from 'react';
import { MENU_ITEMS } from '../constants';

const Menu: React.FC = () => {
  return (
    <section id="menu" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-karak-accent font-raleway uppercase tracking-[0.4em] text-xs mb-3 font-bold">Our Menu</h2>
          <h3 className="text-karak-primary font-playfair text-4xl md:text-5xl mb-6">Comfort Food Favorites</h3>
          <div className="h-1 w-20 bg-karak-accent mx-auto mb-8"></div>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed italic font-playfair text-lg">
            "Hearty, homestyle dishes made with love. Every bite is comfort in its purest form."
          </p>
        </div>

        {/* Featured Weekly Special */}
        <div className="mb-24">
          <div className="bg-white rounded-karak overflow-hidden shadow-2xl border border-gold/20 relative group">
            <div className="absolute top-6 left-6 z-10">
              <span className="bg-karak-accent text-karak-primary px-6 py-2 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-lg">Weekly Special</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-[400px] overflow-hidden">
                <img
                  src="https://s3-media0.fl.yelpcdn.com/bphoto/WM0m_NzTkfx8c7dw1uZL9Q/o.jpg"
                  alt="H Brothers Brisket Mac & Cheese - 12-hour smoked brisket over creamy three-cheese mac"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-16 flex flex-col justify-center bg-white">
                <h4 className="text-3xl font-playfair text-karak-primary mb-4">Brisket Mac & Cheese</h4>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  Our signature 12-hour smoked brisket served over a double-cream three-cheese blend mac. Limited availability!
                </p>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-2xl font-bold text-karak-primary">$16.95</span>
                  <a
                    href="https://www.hbrotherstogo.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Order Brisket Mac & Cheese online"
                    className="bg-karak-primary text-karak-accent px-5 py-3 md:px-10 md:py-4 rounded-karak font-bold uppercase tracking-widest text-[9px] md:text-[10px] hover:shadow-xl transition-all whitespace-nowrap active:scale-95"
                  >
                    Order Special Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid of Classics */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px bg-gray-200 flex-grow"></div>
          <h5 className="text-gray-400 uppercase tracking-[0.3em] font-bold text-[10px]">Our Classics</h5>
          <div className="h-px bg-gray-200 flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MENU_ITEMS.filter(item => item.id !== 'special-1').map((item) => (
            <div key={item.id} className="group flex flex-col h-full bg-white rounded-karak border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={`${item.name} - ${item.description}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-karak-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <a
                    href="https://www.hbrotherstogo.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Order ${item.name} online`}
                    className="bg-karak-accent text-karak-primary px-6 py-2 rounded-karak font-bold uppercase tracking-widest text-[9px] shadow-lg"
                  >
                    Order Now
                  </a>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-karak-primary font-bold text-sm uppercase tracking-wide">{item.name}</h4>
                  <span className="text-karak-accent font-bold text-xs">{item.price}</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <a
            href="https://www.hbrotherstogo.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View full H Brothers menu and order online"
            className="inline-flex items-center gap-3 border-b-2 border-karak-accent text-karak-primary font-bold uppercase tracking-widest text-xs py-3 hover:text-karak-accent transition-all mb-16"
          >
            View Full Menu & Order Online
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>

          {/* New Highlight Image */}
          <div className="relative max-w-5xl mx-auto rounded-karak overflow-hidden shadow-2xl border border-white group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src="https://s3-media0.fl.yelpcdn.com/bphoto/cmk9sSDNnAa9t0MYZSnY_A/o.jpg"
              alt="H Brothers comfort food spread featuring hearty American classics in Escondido"
              className="w-full h-[450px] object-cover grayscale-[0.2] contrast-[1.05] transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute bottom-8 left-8 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
               <p className="text-white font-playfair italic text-2xl drop-shadow-lg">Fresh. Hearty. Authentically H Brothers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
