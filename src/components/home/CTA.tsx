'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Apnar images folder theke cta-bg image ti import kora hocche
import ctaBg from '@/app/images/cta-bg.png';

export function CTA() {
  return (
    <section className="relative w-full bg-[#050505] flex flex-col items-center pt-32 pb-24 overflow-hidden border-t border-white/5">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full flex justify-center items-start pointer-events-none select-none">
        <div className="relative w-full max-w-5xl aspect-[1.5/1] md:aspect-[2.5/1]">
          <Image 
            src={ctaBg} 
            alt="CTA Grid Background" 
            fill
            className="object-cover object-top opacity-70 mask-image-bottom-fade"
            priority
          />
          {/* Bottom Fade Gradient jate dark background er sathe mishe jay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] z-0"></div>
        </div>
      </div>

      {/* Main Text Content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center mt-12 md:mt-24">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight">
          Your next role is <br className="hidden sm:block" /> already looking for you
        </h2>
        <p className="mt-6 text-gray-400 text-sm md:text-base max-w-xl">
          Build a profile in three minutes. The matches start arriving tomorrow morning.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 rounded-xl px-8 h-12 font-medium transition-colors">
            Create a free account
          </Button>
          <Button variant="outline" className="w-full sm:w-auto bg-transparent border border-white/10 text-white hover:bg-white/5 rounded-xl px-8 h-12 font-medium transition-colors">
            View pricing
          </Button>
        </div>
      </div>
    </section>
  );
}