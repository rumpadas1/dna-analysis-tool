'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const [username, setUsername] = useState<string | null>(null);
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFeatureOpen, setIsFeatureOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  // 🔄 Recheck login status
  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem('token');
      const storedUsername = localStorage.getItem('username');
      if (storedToken && storedUsername) {
        setUsername(storedUsername);
      } else {
        setUsername(null);
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(null);
    setIsDropdownOpen(false);
    window.dispatchEvent(new Event('storage'));
    window.location.href = '/';
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleFeatureDropdown = () => {
    setIsFeatureOpen(!isFeatureOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsFeatureOpen(false); // Hide features dropdown
  };

  // Hide feature dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (featuresRef.current && !featuresRef.current.contains(event.target as Node)) {
        setIsFeatureOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Hide profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#7f1d1d] shadow-md border-b border-red-900">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <img src="/logo/logo.png" alt="Geneva Logo" className="h-7 w-auto" />
          <span className="text-sm md:text-base font-semibold text-white">
            Geneva – DNA Analysis Tool
          </span>
        </div>

        {/* Burger for mobile */}
        <div className="md:hidden">
          <button
            className="text-white text-2xl"
            onClick={toggleMobileMenu}
          >
            ☰
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <nav className="flex gap-4 text-sm font-medium">
            <Link href="/" className="text-gray-300 hover:text-yellow-300 transition">Home</Link>
            <Link href="/about" className="text-gray-300 hover:text-yellow-300 transition">About</Link>
            <Link href="/contact" className="text-gray-300 hover:text-yellow-300 transition">Contact</Link>

            {/* Features Dropdown */}
            <div className="relative" ref={featuresRef}>
              <button
                onClick={toggleFeatureDropdown}
                className="text-gray-300 hover:text-yellow-300 transition"
              >
                Features ▾
              </button>
              {isFeatureOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded shadow-lg z-50">
                  {[
                    ["Disease Prediction", "/disease-prediction"],
                    ["Mutation Detection", "/mutation-detection"],
                    ["GC Content", "/gc-content"],
                    ["Sequence Translation", "/sequence-translation"],
                    ["Protein Solubility", "/protein-solubility"],
                    ["Nucleotide Distribution", "/nucleotide-distribution"],
                    ["Pattern Matching", "/motif-pattern-search"],
                    ["Clinical Significance", "/clinical-significance"],
                    ["Amino Acid Properties", "/amino-acid-properties"],
                  ].map(([label, href]) => (
                    <Link key={href} href={href} onClick={() => setIsFeatureOpen(false)} className="block px-4 py-2 hover:bg-gray-100">{label}</Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Profile Section */}
          <div ref={profileRef} className="relative ml-4">
            {username ? (
              <div>
                <div
                  onClick={toggleDropdown}
                  className="h-9 w-9 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold text-sm shadow-md cursor-pointer"
                  title={username}
                >
                  {username.charAt(0).toUpperCase()}
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-white rounded shadow-lg text-sm text-black z-50">
                    <p className="px-4 py-2 border-b">Welcome, {username}</p>
                    <Link href="/dashboard" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100 border-b">My Profile</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div
                  onClick={toggleDropdown}
                  className="h-9 w-9 rounded-full bg-gray-100 text-[#7f1d1d] flex items-center justify-center font-bold text-sm shadow-md cursor-pointer"
                >
                  🔓
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg text-sm text-black z-50">
                    <Link href="/login" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100 border-b">Login</Link>
                    <Link href="/signup" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100">Sign Up</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white text-black px-4 pt-2 pb-4 shadow-md">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2">Home</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-2">About</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-2">Contact</Link>

          {/* Features with submenu */}
          <div className="relative">
            <button
              onClick={toggleFeatureDropdown}
              className="block w-full text-left py-2"
            >
              Features ▾
            </button>
            {isFeatureOpen && (
              <div className="mt-1 ml-4 border-l border-gray-200 pl-4">
                {[
                  ["Disease Prediction", "/disease-prediction"],
                  ["Mutation Detection", "/mutation-detection"],
                  ["GC Content", "/gc-content"],
                  ["Sequence Translation", "/sequence-translation"],
                  ["Protein Solubility", "/protein-solubility"],
                  ["Nucleotide Distribution", "/nucleotide-distribution"],
                  ["Pattern Matching", "/motif-pattern-search"],
                  ["Clinical Significance", "/clinical-significance"],
                  ["Amino Acid Properties", "/amino-acid-properties"],
                ].map(([label, href]) => (
                  <Link key={href} href={href} onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-red-600">{label}</Link>
                ))}
              </div>
            )}
          </div>

          {/* Auth Buttons */}
          {username ? (
            <>
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block py-2">My Profile</Link>
              <button onClick={handleLogout} className="block w-full text-left py-2 text-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block py-2">Login</Link>
              <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="block py-2">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}