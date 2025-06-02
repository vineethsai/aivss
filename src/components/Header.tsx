import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/public/owasp-logo-dark.svg" alt="OWASP Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-white">AIVSS Framework</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-300 hover:text-white transition-colors">
              Calculator
            </Link>
            <Link to="/owasp-top-10" className="text-slate-300 hover:text-white transition-colors">
              OWASP Top 10
            </Link>
            <Link to="/aivss-methodology" className="text-slate-300 hover:text-white transition-colors">
              Methodology
            </Link>
          </nav>
          <button className="md:hidden text-slate-300 hover:text-white">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
