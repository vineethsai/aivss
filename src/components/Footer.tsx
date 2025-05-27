
import React from 'react';
import { Shield, Github, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold text-white">AIVSS Framework</span>
            </div>
            <p className="text-slate-400 text-sm">
              Standardizing vulnerability assessment for agentic AI systems worldwide.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Best Practices</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                GitHub <ExternalLink className="h-3 w-3" />
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors">Discussions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contributing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Research Papers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Standards</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">OWASP Foundation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">NIST Guidelines</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ISO/IEC Standards</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Industry Partners</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 AIVSS Framework. Licensed under Creative Commons. 
            Built for the global AI security community.
          </p>
        </div>
      </div>
    </footer>
  );
};
