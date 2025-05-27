
import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { AIVSSCalculator } from '@/components/AIVSSCalculator';
import { OwaspTop10 } from '@/components/OwaspTop10';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />
      <Hero />
      <div className="container mx-auto px-4 py-8 space-y-16">
        <AIVSSCalculator />
        <OwaspTop10 />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
