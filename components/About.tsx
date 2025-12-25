
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#FDF8F3] overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Featured Visual - Positioned Above the 'Hearty Comfort' Heading */}
        <div className="relative mb-16 lg:mb-20">
          <div className="absolute -top-6 -left-6 w-32 h-32 border-t-4 border-l-4 border-karak-accent opacity-20"></div>
          <div className="relative rounded-2xl shadow-2xl overflow-hidden group">
            <img
              src="https://s3-media0.fl.yelpcdn.com/bphoto/k3GFsndzP0UX3xsnq4nRDg/o.jpg"
              alt="H Brothers restaurant interior in Downtown Escondido - warm family atmosphere"
              className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          {/* Floating Rating Badge */}
          <div className="absolute -bottom-8 right-4 md:right-12 bg-karak-primary p-6 md:p-10 rounded-2xl z-20 shadow-2xl border-b-4 border-karak-accent">
            <span className="text-karak-secondary font-black text-3xl md:text-5xl block mb-1 leading-none">4.8</span>
            <span className="text-white uppercase tracking-[0.3em] text-[8px] md:text-[10px] font-black opacity-80">Local Legend Rating</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl">
          <div className="space-y-8">
            <div>
              <h2 className="text-karak-accent font-raleway uppercase tracking-[0.4em] text-xs mb-4 font-black">Our Heritage</h2>
              <h3 className="text-karak-primary font-playfair text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 font-bold">
                Hearty Comfort <br />
                <span className="italic text-karak-accent">on Grand Ave</span>
              </h3>
              <p className="text-karak-text font-lato text-xl leading-relaxed opacity-90 max-w-3xl">
                H-Brothers brings hearty, homestyle comfort food to downtown Escondido. Family recipes, generous portions, and a whole lot of love—served Tuesday through Saturday.
              </p>
              <p className="text-karak-text font-lato text-lg leading-relaxed opacity-70 max-w-2xl">
                From our kitchen to your table, we believe in the power of a perfect meal to bring people together. Whether it's our signature smoked brisket or our crispy poutine, every bite tells a story of tradition and quality.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 py-12 border-t border-gray-200">
              <div className="flex items-center gap-5 group">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm border border-gray-100 transition-transform group-hover:rotate-6 group-hover:bg-karak-accent group-hover:text-white">👨‍🍳</div>
                <div>
                  <h5 className="text-karak-primary font-black uppercase tracking-widest text-xs mb-1">Family Recipes</h5>
                  <p className="text-sm text-gray-500">Made with love</p>
                </div>
              </div>
              <div className="flex items-center gap-5 group">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm border border-gray-100 transition-transform group-hover:-rotate-6 group-hover:bg-karak-accent group-hover:text-white">🥘</div>
                <div>
                  <h5 className="text-karak-primary font-black uppercase tracking-widest text-xs mb-1">Generous Portions</h5>
                  <p className="text-sm text-gray-500">Come hungry!</p>
                </div>
              </div>
            </div>

            <div className="flex gap-5 pt-4">
              <a 
                href="https://www.instagram.com/hbrothers_esco/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#E4405F] p-4 rounded-xl shadow-lg text-white hover:scale-105 transition-all transform hover:-translate-y-1 flex items-center justify-center"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.yelp.com/biz/h-brothers-escondido" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#D32323] p-4 rounded-xl shadow-lg text-white hover:scale-105 transition-all transform hover:-translate-y-1 flex items-center justify-center"
                aria-label="See us on Yelp"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.373 26.042l1.455-.336c.03-.007.081-.019.143-.039a1.605 1.605 0 001.147-1.91l-.006-.026a1.6 1.6 0 00-.247-.54 2.027 2.027 0 00-.595-.51 5.503 5.503 0 00-.844-.39l-1.596-.582c-.895-.332-1.79-.656-2.695-.972-.586-.209-1.082-.391-1.514-.525-.081-.025-.171-.05-.244-.075-.522-.16-.889-.226-1.199-.228a1.427 1.427 0 00-.604.11c-.2.086-.378.213-.525.372a3.22 3.22 0 00-.206.26 3.077 3.077 0 00-.306.61 8.259 8.259 0 00-.435 2.715c.006.835.029 1.905.489 2.631.11.187.259.348.436.473.327.226.657.255 1.001.28.514.037 1.012-.09 1.508-.204l4.833-1.115h.004zm16.23-7.721a8.261 8.261 0 00-1.581-2.25 2.422 2.422 0 00-.269-.23 3.135 3.135 0 00-.273-.183 3.117 3.117 0 00-.3-.144 1.542 1.542 0 00-.634-.104c-.207.011-.41.068-.592.166-.277.138-.578.36-.977.73-.055.055-.124.117-.186.175-.33.31-.696.69-1.132 1.135-.673.68-1.336 1.364-1.995 2.056l-1.18 1.222a5.494 5.494 0 00-.588.721c-.149.217-.254.46-.31.718a1.599 1.599 0 00.02.62 1.603 1.603 0 001.868 1.215c.065-.01.115-.02.146-.028l6.29-1.453c.496-.114.999-.219 1.444-.477.299-.173.583-.345.778-.69.104-.191.166-.4.184-.617.096-.856-.352-1.83-.713-2.582zm-11.257 2.646c.455-.572.454-1.424.494-2.121.136-2.33.28-4.659.392-6.989.043-.882.138-1.753.085-2.642-.044-.734-.05-1.576-.514-2.178-.819-1.062-2.564-.975-3.755-.81-.364.05-.73.118-1.092.205a14.59 14.59 0 00-1.072.295c-1.143.374-2.749 1.06-3.02 2.375-.153.744.21 1.505.493 2.183.342.823.81 1.564 1.235 2.338 1.126 2.044 2.273 4.075 3.416 6.11.341.606.714 1.375 1.374 1.69.044.019.088.036.133.05a1.598 1.598 0 001.727-.398 1.52 1.52 0 00.104-.108zm-.547 6.233a1.456 1.456 0 00-1.62-.545c-.07.023-.137.051-.202.084-.1.05-.195.11-.285.178-.262.194-.483.446-.684.699-.05.064-.097.15-.158.205l-1.011 1.39c-.573.78-1.138 1.56-1.699 2.354-.365.512-.681.944-.931 1.327-.048.072-.097.152-.142.216-.3.464-.469.802-.556 1.103-.065.2-.085.412-.06.62.028.218.101.427.216.615.06.094.126.184.196.272a3.06 3.06 0 00.508.467c.699.486 1.464.834 2.268 1.104a8.03 8.03 0 002.07.395c.119.006.239.004.358-.008.111-.01.221-.025.33-.046.11-.025.217-.057.322-.094a1.57 1.57 0 00.55-.35c.148-.148.262-.327.334-.523.117-.292.194-.661.244-1.21.004-.079.015-.172.023-.258.04-.456.058-.99.086-1.62.05-.967.088-1.93.118-2.896l.064-1.718c.014-.395.002-.834-.108-1.227a1.837 1.837 0 00-.231-.533zm11.425 2.685c-.211-.231-.51-.462-.983-.747-.068-.038-.148-.088-.222-.133-.393-.236-.866-.484-1.42-.784-.849-.466-1.7-.92-2.557-1.37l-1.517-.803c-.078-.023-.158-.08-.232-.116-.292-.139-.6-.269-.921-.328a1.941 1.941 0 00-.335-.035c-.073 0-.145.004-.217.013a1.456 1.456 0 00-1.214 1.201c-.023.193-.016.387.021.578.075.403.255.801.441 1.15l.81 1.516a151.9 151.9 0 001.376 2.552c.302.553.553 1.026.788 1.418.045.073.095.153.134.221.286.471.516.768.75.98.15.146.331.257.53.325.208.07.428.094.647.072.111-.013.221-.032.33-.057a3.18 3.18 0 00.318-.103 2.47 2.47 0 00.325-.15 8.022 8.022 0 001.687-1.262c.605-.595 1.14-1.244 1.555-1.987.058-.105.108-.214.15-.326.039-.104.073-.21.101-.317.025-.11.043-.22.056-.33a1.563 1.563 0 00-.074-.646 1.438 1.438 0 00-.327-.532z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
