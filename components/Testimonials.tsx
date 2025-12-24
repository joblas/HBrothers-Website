import React from 'react';

const REVIEWS = [
  {
    name: "Katherine W.",
    text: "My family adored the food! Well made, very fresh, and so tasty! My mother-in-law loved the Caesar wrap.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Katherine",
    source: "Google",
    rating: 5
  },
  {
    name: "David M.",
    text: "Excellent food and quality. The Parmesan Crusted Chicken Sandwich and Shrimp Po-Boy are my new favorites!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    source: "Yelp",
    rating: 5
  },
  {
    name: "Nicki J.",
    text: "Always love H Bros. Buffalo Ranch Chicken Wrap and Original Poutine are a must try!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nicki",
    source: "Google",
    rating: 5
  },
  {
    name: "T. T.",
    text: "Delicious brisket sandwich, amazing onion rings, and the most beautiful apple/cranberry/walnut salad.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TT",
    source: "Yelp",
    rating: 5
  },
  {
    name: "Amanda S.",
    text: "Very good... just as described. Excellent menu with plenty of comfort food classics.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda",
    source: "Google",
    rating: 5
  },
  {
    name: "Ona L.",
    text: "Fantastic every time!! Great food as always and nicely packaged for takeout.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ona",
    source: "Yelp",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  // Triple the items to ensure the marquee fills even the largest screens seamlessly
  const loopedReviews = [...REVIEWS, ...REVIEWS, ...REVIEWS];
  
  return (
    <section id="reviews" className="py-24 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-karak-accent font-raleway uppercase tracking-[0.4em] text-xs mb-3 font-bold">What People Say</h2>
        <h3 className="text-karak-primary font-playfair text-4xl md:text-5xl mb-6 font-bold">Loved by Locals</h3>
        <div className="h-1.5 w-16 bg-karak-accent mx-auto rounded-full"></div>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-500">
          <div className="flex items-center gap-2">
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
            <span>4.9/5 on Google</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#D32323]" fill="currentColor" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.373 26.042l1.455-.336c.03-.007.081-.019.143-.039a1.605 1.605 0 001.147-1.91l-.006-.026a1.6 1.6 0 00-.247-.54 2.027 2.027 0 00-.595-.51 5.503 5.503 0 00-.844-.39l-1.596-.582c-.895-.332-1.79-.656-2.695-.972-.586-.209-1.082-.391-1.514-.525-.081-.025-.171-.05-.244-.075-.522-.16-.889-.226-1.199-.228a1.427 1.427 0 00-.604.11c-.2.086-.378.213-.525.372a3.22 3.22 0 00-.206.26 3.077 3.077 0 00-.306.61 8.259 8.259 0 00-.435 2.715c.006.835.029 1.905.489 2.631.11.187.259.348.436.473.327.226.657.255 1.001.28.514.037 1.012-.09 1.508-.204l4.833-1.115h.004zm16.23-7.721a8.261 8.261 0 00-1.581-2.25 2.422 2.422 0 00-.269-.23 3.135 3.135 0 00-.273-.183 3.117 3.117 0 00-.3-.144 1.542 1.542 0 00-.634-.104c-.207.011-.41.068-.592.166-.277.138-.578.36-.977.73-.055.055-.124.117-.186.175-.33.31-.696.69-1.132 1.135-.673.68-1.336 1.364-1.995 2.056l-1.18 1.222a5.494 5.494 0 00-.588.721c-.149.217-.254.46-.31.718a1.599 1.599 0 00.02.62 1.603 1.603 0 001.868 1.215c.065-.01.115-.02.146-.028l6.29-1.453c.496-.114.999-.219 1.444-.477.299-.173.583-.345.778-.69.104-.191.166-.4.184-.617.096-.856-.352-1.83-.713-2.582zm-11.257 2.646c.455-.572.454-1.424.494-2.121.136-2.33.28-4.659.392-6.989.043-.882.138-1.753.085-2.642-.044-.734-.05-1.576-.514-2.178-.819-1.062-2.564-.975-3.755-.81-.364.05-.73.118-1.092.205a14.59 14.59 0 00-1.072.295c-1.143.374-2.749 1.06-3.02 2.375-.153.744.21 1.505.493 2.183.342.823.81 1.564 1.235 2.338 1.126 2.044 2.273 4.075 3.416 6.11.341.606.714 1.375 1.374 1.69.044.019.088.036.133.05a1.598 1.598 0 001.727-.398 1.52 1.52 0 00.104-.108zm-.547 6.233a1.456 1.456 0 00-1.62-.545c-.07.023-.137.051-.202.084-.1.05-.195.11-.285.178-.262.194-.483.446-.684.699-.05.064-.097.15-.158.205l-1.011 1.39c-.573.78-1.138 1.56-1.699 2.354-.365.512-.681.944-.931 1.327-.048.072-.097.152-.142.216-.3.464-.469.802-.556 1.103-.065.2-.085.412-.06.62.028.218.101.427.216.615.06.094.126.184.196.272a3.06 3.06 0 00.508.467c.699.486 1.464.834 2.268 1.104a8.03 8.03 0 002.07.395c.119.006.239.004.358-.008.111-.01.221-.025.33-.046.11-.025.217-.057.322-.094a1.57 1.57 0 00.55-.35c.148-.148.262-.327.334-.523.117-.292.194-.661.244-1.21.004-.079.015-.172.023-.258.04-.456.058-.99.086-1.62.05-.967.088-1.93.118-2.896l.064-1.718c.014-.395.002-.834-.108-1.227a1.837 1.837 0 00-.231-.533zm11.425 2.685c-.211-.231-.51-.462-.983-.747-.068-.038-.148-.088-.222-.133-.393-.236-.866-.484-1.42-.784-.849-.466-1.7-.92-2.557-1.37l-1.517-.803c-.078-.023-.158-.08-.232-.116-.292-.139-.6-.269-.921-.328a1.941 1.941 0 00-.335-.035c-.073 0-.145.004-.217.013a1.456 1.456 0 00-1.214 1.201c-.023.193-.016.387.021.578.075.403.255.801.441 1.15l.81 1.516a151.9 151.9 0 001.376 2.552c.302.553.553 1.026.788 1.418.045.073.095.153.134.221.286.471.516.768.75.98.15.146.331.257.53.325.208.07.428.094.647.072.111-.013.221-.032.33-.057a3.18 3.18 0 00.318-.103 2.47 2.47 0 00.325-.15 8.022 8.022 0 001.687-1.262c.605-.595 1.14-1.244 1.555-1.987.058-.105.108-.214.15-.326.039-.104.073-.21.101-.317.025-.11.043-.22.056-.33a1.563 1.563 0 00-.074-.646 1.438 1.438 0 00-.327-.532z" />
            </svg>
            <span>4.8/5 on Yelp</span>
          </div>
        </div>
      </div>

      {/* Infinite Carousel - Scrolling Left to Right */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-marquee-ltr hover:pause-scroll w-max">
          {loopedReviews.map((review, idx) => (
            <div key={idx} className="flex-shrink-0 w-[300px] md:w-[450px] px-4 py-8">
              <div className="bg-[#FDF8F3] p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-0.5 text-karak-secondary">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full border border-gray-100 shadow-xs">
                      {review.source === 'Google' ? (
                        <img src="https://www.google.com/favicon.ico" className="w-3 h-3" alt="G" />
                      ) : (
                        <svg className="w-3 h-3 text-[#D32323]" fill="currentColor" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.373 26.042l1.455-.336c.03-.007.081-.019.143-.039a1.605 1.605 0 001.147-1.91l-.006-.026a1.6 1.6 0 00-.247-.54 2.027 2.027 0 00-.595-.51 5.503 5.503 0 00-.844-.39l-1.596-.582c-.895-.332-1.79-.656-2.695-.972-.586-.209-1.082-.391-1.514-.525-.081-.025-.171-.05-.244-.075-.522-.16-.889-.226-1.199-.228a1.427 1.427 0 00-.604.11c-.2.086-.378.213-.525.372a3.22 3.22 0 00-.206.26 3.077 3.077 0 00-.306.61 8.259 8.259 0 00-.435 2.715c.006.835.029 1.905.489 2.631.11.187.259.348.436.473.327.226.657.255 1.001.28.514.037 1.012-.09 1.508-.204l4.833-1.115h.004zm16.23-7.721a8.261 8.261 0 00-1.581-2.25 2.422 2.422 0 00-.269-.23 3.135 3.135 0 00-.273-.183 3.117 3.117 0 00-.3-.144 1.542 1.542 0 00-.634-.104c-.207.011-.41.068-.592.166-.277.138-.578.36-.977.73-.055.055-.124.117-.186.175-.33.31-.696.69-1.132 1.135-.673.68-1.336 1.364-1.995 2.056l-1.18 1.222a5.494 5.494 0 00-.588.721c-.149.217-.254.46-.31.718a1.599 1.599 0 00.02.62 1.603 1.603 0 001.868 1.215c.065-.01.115-.02.146-.028l6.29-1.453c.496-.114.999-.219 1.444-.477.299-.173.583-.345.778-.69.104-.191.166-.4.184-.617.096-.856-.352-1.83-.713-2.582zm-11.257 2.646c.455-.572.454-1.424.494-2.121.136-2.33.28-4.659.392-6.989.043-.882.138-1.753.085-2.642-.044-.734-.05-1.576-.514-2.178-.819-1.062-2.564-.975-3.755-.81-.364.05-.73.118-1.092.205a14.59 14.59 0 00-1.072.295c-1.143.374-2.749 1.06-3.02 2.375-.153.744.21 1.505.493 2.183.342.823.81 1.564 1.235 2.338 1.126 2.044 2.273 4.075 3.416 6.11.341.606.714 1.375 1.374 1.69.044.019.088.036.133.05a1.598 1.598 0 001.727-.398 1.52 1.52 0 00.104-.108zm-.547 6.233a1.456 1.456 0 00-1.62-.545c-.07.023-.137.051-.202.084-.1.05-.195.11-.285.178-.262.194-.483.446-.684.699-.05.064-.097.15-.158.205l-1.011 1.39c-.573.78-1.138 1.56-1.699 2.354-.365.512-.681.944-.931 1.327-.048.072-.097.152-.142.216-.3.464-.469.802-.556 1.103-.065.2-.085.412-.06.62.028.218.101.427.216.615.06.094.126.184.196.272a3.06 3.06 0 00.508.467c.699.486 1.464.834 2.268 1.104a8.03 8.03 0 002.07.395c.119.006.239.004.358-.008.111-.01.221-.025.33-.046.11-.025.217-.057.322-.094a1.57 1.57 0 00.55-.35c.148-.148.262-.327.334-.523.117-.292.194-.661.244-1.21.004-.079.015-.172.023-.258.04-.456.058-.99.086-1.62.05-.967.088-1.93.118-2.896l.064-1.718c.014-.395.002-.834-.108-1.227a1.837 1.837 0 00-.231-.533zm11.425 2.685c-.211-.231-.51-.462-.983-.747-.068-.038-.148-.088-.222-.133-.393-.236-.866-.484-1.42-.784-.849-.466-1.7-.92-2.557-1.37l-1.517-.803c-.078-.023-.158-.08-.232-.116-.292-.139-.6-.269-.921-.328a1.941 1.941 0 00-.335-.035c-.073 0-.145.004-.217.013a1.456 1.456 0 00-1.214 1.201c-.023.193-.016.387.021.578.075.403.255.801.441 1.15l.81 1.516a151.9 151.9 0 001.376 2.552c.302.553.553 1.026.788 1.418.045.073.095.153.134.221.286.471.516.768.75.98.15.146.331.257.53.325.208.07.428.094.647.072.111-.013.221-.032.33-.057a3.18 3.18 0 00.318-.103 2.47 2.47 0 00.325-.15 8.022 8.022 0 001.687-1.262c.605-.595 1.14-1.244 1.555-1.987.058-.105.108-.214.15-.326.039-.104.073-.21.101-.317.025-.11.043-.22.056-.33a1.563 1.563 0 00-.074-.646 1.438 1.438 0 00-.327-.532z" />
                        </svg>
                      )}
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.source}</span>
                    </div>
                  </div>
                  <p className="text-karak-text italic font-lato text-lg leading-relaxed mb-8 line-clamp-4">
                    "{review.text}"
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200/40">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="w-12 h-12 rounded-full bg-white p-0.5 border border-gray-200"
                  />
                  <div>
                    <h5 className="text-karak-primary font-bold text-xs uppercase tracking-widest leading-none mb-1">{review.name}</h5>
                    <span className="text-karak-accent text-[9px] uppercase font-bold tracking-tighter">Verified Reviewer</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-ltr {
          0% { transform: translateX(calc(-${REVIEWS.length} * 300px - ${REVIEWS.length} * 2rem)); }
          100% { transform: translateX(0); }
        }
        @media (min-width: 768px) {
          @keyframes marquee-ltr {
            0% { transform: translateX(calc(-${REVIEWS.length} * 450px - ${REVIEWS.length} * 2rem)); }
            100% { transform: translateX(0); }
          }
        }
        .animate-marquee-ltr {
          animation: marquee-ltr 60s linear infinite;
        }
      `}</style>

      <div className="mt-12 text-center">
        <a 
          href="https://www.google.com/search?q=h+brothers+reviews" 
          target="_blank" 
          className="text-[10px] font-bold uppercase tracking-[0.25em] text-karak-accent hover:text-karak-primary transition-colors flex items-center justify-center gap-2"
        >
          Explore All 1,000+ Reviews
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>
    </section>
  );
};

export default Testimonials;