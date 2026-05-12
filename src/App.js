import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Story from './pages/Story';
import About from './pages/About';
import Events from './pages/Events';
import Achievements from './pages/Achievements';
import Businesses from './pages/Businesses';
import Media from './pages/Media';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from './components/ui/sonner';
import PageTransition from './components/PageTransition';
import LoadingScreen from './components/LoadingScreen';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition title="Home"><Home /></PageTransition>} />
        <Route path="/story" element={<PageTransition title="Our Story"><Story /></PageTransition>} />
        <Route path="/about" element={<PageTransition title="About Dev"><About /></PageTransition>} />
        <Route path="/events" element={<PageTransition title="Events"><Events /></PageTransition>} />
        <Route path="/achievements" element={<PageTransition title="Achievements"><Achievements /></PageTransition>} />
        <Route path="/businesses" element={<PageTransition title="Businesses"><Businesses /></PageTransition>} />
        <Route path="/media" element={<PageTransition title="Media"><Media /></PageTransition>} />
        <Route path="/contact" element={<PageTransition title="Contact"><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
