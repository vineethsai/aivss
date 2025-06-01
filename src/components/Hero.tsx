import React from 'react';
import { Shield, AlertTriangle, Target } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Agentic AI Vulnerability
            <span className="text-blue-400 block">Scoring System</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            The first comprehensive framework for assessing and scoring vulnerabilities 
            in agentic AI systems. Built on OWASP principles with industry-standard 
            scoring methodology.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700">
              <img src="/owasp.png" alt="AIVSS Calculator" className="h-12 w-12 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">AIVSS Calculator</h3>
              <p className="text-slate-300 text-sm">
                Real-time vulnerability scoring with detailed metrics and impact assessment
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700">
              <AlertTriangle className="h-12 w-12 text-orange-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">OWASP Top 10</h3>
              <p className="text-slate-300 text-sm">
                Critical security risks specifically designed for agentic AI systems
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700">
              <Target className="h-12 w-12 text-green-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">Industry Standard</h3>
              <p className="text-slate-300 text-sm">
                Standardized methodology for consistent vulnerability assessment
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
