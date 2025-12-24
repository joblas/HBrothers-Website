
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Info Section */}
          <div className="space-y-12">
            <div>
              <h2 className="text-karak-accent font-raleway uppercase tracking-[0.4em] text-xs mb-3 font-bold">Visit Us</h2>
              <h3 className="text-karak-primary font-playfair text-4xl mb-6">In Downtown Escondido</h3>
              <p className="text-gray-500 max-w-md leading-relaxed">
                Join us on Grand Ave for homestyle North American classics. Walk-ins are always welcome, and no reservations are needed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h5 className="text-karak-primary font-bold uppercase tracking-widest text-[10px] mb-4">Location</h5>
                <p className="text-sm text-gray-500 leading-relaxed">
                  212 E. Grand Ave<br />
                  Escondido, CA 92025
                </p>
                <a 
                  href="https://maps.app.goo.gl/G7mpujLuGWzYXq9s6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-karak-accent text-[10px] font-bold uppercase tracking-widest border-b border-karak-accent hover:text-karak-primary hover:border-karak-primary transition-all"
                >
                  Get Directions
                </a>
              </div>
              <div>
                <h5 className="text-karak-primary font-bold uppercase tracking-widest text-[10px] mb-4">Hours</h5>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li className="flex justify-between"><span>Tue - Sat</span> <span className="font-bold text-karak-primary">11:00 AM - 9:00 PM</span></li>
                  <li className="flex justify-between text-gray-300"><span>Sun & Mon</span> <span>Closed</span></li>
                </ul>
                <p className="mt-2 text-[10px] italic text-gray-400 font-medium">Ready in ~20 minutes</p>
              </div>
            </div>

            <div className="p-8 border border-gray-100 rounded-karak bg-gray-50/50">
              <h5 className="text-karak-primary font-bold uppercase tracking-widest text-[10px] mb-4 font-bold">Inquiries & To-Go</h5>
              <div className="space-y-3">
                <a href="tel:+14429995542" className="block text-xl font-bold text-karak-primary hover:text-karak-accent transition-colors">
                   (442) 999-5542
                </a>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-karak-accent"></span>
                   Order Online for Pick-up or Delivery
                </p>
              </div>
              <div className="mt-6 flex gap-4">
                 <a href="https://www.hbrotherstogo.com/" target="_blank" rel="noopener noreferrer" className="bg-karak-primary text-karak-accent px-6 py-2.5 rounded-karak text-[10px] font-bold uppercase tracking-widest">Pick Up</a>
                 <a href="https://hbrothers.dine.online/" target="_blank" rel="noopener noreferrer" className="border border-karak-primary text-karak-primary px-6 py-2.5 rounded-karak text-[10px] font-bold uppercase tracking-widest">Delivery</a>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Section */}
          <div className="relative h-[550px] rounded-karak overflow-hidden shadow-2xl group border border-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3337.8118029584343!2d-117.08253132338023!3d33.12058046647265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dbf4989679234b%3A0x77017c66113b6320!2sH-Brothers!5e0!3m2!1sen!2sus!4v1740087754388!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="H-Brothers Location Map"
              className="grayscale-[0.3] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
            
            {/* Overlay Info Card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white p-6 rounded-karak shadow-2xl border border-gray-100 pointer-events-none md:pointer-events-auto">
              <h6 className="text-karak-primary font-bold text-xs uppercase tracking-widest mb-1 font-bold">Our Home Base</h6>
              <p className="text-xs text-gray-500 leading-relaxed italic font-playfair mb-3">"Hearty, homestyle dishes made with love on Grand Ave."</p>
              <div className="flex items-center gap-2 text-[#D32323] text-[9px] font-black uppercase tracking-[0.2em]">
                 <span className="w-1.5 h-1.5 bg-[#D32323] rounded-full animate-pulse"></span>
                 Authentic North American Classics
              </div>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=H-Brothers+Escondido" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-karak-primary text-white text-[9px] font-bold uppercase tracking-widest px-4 py-2 rounded-md hover:bg-karak-accent transition-colors md:hidden"
              >
                Open in Navigation
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
