
import React from 'react';
import { Shield, Menu } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">AIVSS Framework</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#calculator" className="text-slate-300 hover:text-white transition-colors">
              Calculator
            </a>
            <a href="#top10" className="text-slate-300 hover:text-white transition-colors">
              OWASP Top 10
            </a>
            <a href="#docs" className="text-slate-300 hover:text-white transition-colors">
              Documentation
            </a>
          </nav>
          <button className="md:hidden text-slate-300 hover:text-white">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
