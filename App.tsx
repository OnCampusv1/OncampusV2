import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';

type ViewState = 'landing' | 'signup' | 'onboarding' | 'dashboard';

export default function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Handle dark mode scroll effect only when on the landing page
  useEffect(() => {
    if (view !== 'landing') {
      // Reset to light mode if leaving landing page
      setIsDarkMode(false); 
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDarkMode(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "-50px 0px -50px 0px" 
      }
    );

    const target = document.getElementById('dark-mode-section');
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [view]);

  const handleStartSignup = (email: string) => {
    setUserEmail(email);
    setView('signup');
    window.scrollTo(0, 0);
  };

  const handleLogin = () => {
    setView('signup'); // For demo purposes, login goes to signup or we could add a login view
    window.scrollTo(0, 0);
  };

  const handleSignupComplete = () => {
    setView('onboarding');
    window.scrollTo(0, 0);
  };

  const handleOnboardingComplete = () => {
    setView('dashboard');
    window.scrollTo(0, 0);
  };

  const handleLogoClick = () => {
    setView('landing');
    window.scrollTo(0, 0);
  };

  // Render Logic
  if (view === 'signup') {
    return (
      <div className="min-h-screen bg-[#FDFDF5]">
        <Navbar onLogoClick={handleLogoClick} onLogin={handleLogin} onSignup={() => setView('signup')} hideAuthButtons={true} />
        <SignUp email={userEmail} onNext={handleSignupComplete} />
      </div>
    );
  }

  if (view === 'onboarding') {
    return (
      <div className="min-h-screen bg-[#FDFDF5]">
        <Navbar onLogoClick={handleLogoClick} onLogin={handleLogin} onSignup={() => setView('signup')} hideAuthButtons={true} />
        <Onboarding onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  if (view === 'dashboard') {
    return (
       <div className="min-h-screen bg-[#FDFDF5]">
          <Navbar 
            onLogoClick={handleLogoClick} 
            onLogin={handleLogin} 
            onSignup={() => setView('signup')} 
            isLoggedIn={true}
          />
          <Dashboard />
       </div>
    );
  }

  // Default Landing Page View
  return (
    <div className={`min-h-screen transition-colors duration-700 ease-in-out ${isDarkMode ? 'bg-[#0D1C22]' : 'bg-[#FDFDF5]'} text-gray-900 overflow-x-hidden selection:bg-[#D7F037] selection:text-black`}>
      <Navbar onLogoClick={handleLogoClick} onLogin={handleLogin} onSignup={() => setView('signup')} />
      <main>
        <Hero onStartSignup={handleStartSignup} />
        <Features />
        {/* Wrapper for the dark mode area */}
        <div id="dark-mode-section">
          <Testimonials isDarkMode={isDarkMode} />
          <Footer isDarkMode={isDarkMode} />
        </div>
      </main>
    </div>
  );
}