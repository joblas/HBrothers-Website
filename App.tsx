
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBarista from './components/ChatBarista';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen selection:bg-karak-accent selection:text-karak-primary">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <div id="menu">
                  <Menu />
                </div>
                <div id="about">
                  <About />
                </div>
                <Testimonials />
                <div id="contact">
                  <Contact />
                </div>
              </>
            } />
          </Routes>
        </main>
        <ChatBarista />
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
