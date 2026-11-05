'use client';

import Image from 'next/image';
import { Search, MapPin, Briefcase, Building2, Users, Star, UserSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';

import globeImg from '@/app/images/globe.png';

const TRENDING_TAGS = ['Product Designer', 'AI Engineering', 'Dev-ops Engineer'];

const STATS = [
  { id: 1, icon: Briefcase, value: '50K', label: 'Active Jobs' },
  { id: 2, icon: Building2, value: '12K', label: 'Companies' },
  { id: 3, icon: UserSearch, value: '2M', label: 'Job Seekers' },
  { id: 4, icon: Star, value: '97%', label: 'Satisfaction Rate' },
];

export function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-[#050505] flex flex-col items-center pt-32 pb-20 overflow-hidden">
      
      {/* Top Badge with lines */}
      <div className="flex items-center gap-3 mb-6 z-10">
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/30"></div>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#121212] shadow-sm">
          <Briefcase className="w-4 h-4 text-[#e06c3a]" />
          <span className="text-xs font-mono text-gray-400 tracking-wider">
            50,000+ NEW JOBS THIS MONTH
          </span>
        </div>
        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/30"></div>
      </div>

      {/* Main Headings */}
      <h1 className="text-5xl md:text-6xl font-semibold text-white tracking-tight text-center z-10 relative mt-2">
        Find Your Dream Job Today
      </h1>
      <p className="mt-5 text-gray-400 max-w-2xl text-center text-lg leading-relaxed z-10 relative px-4">
        HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.
      </p>

      {/* Search Bar */}
    {/* Search Bar */}
      <div className="mt-10 w-full max-w-3xl px-4 z-20 relative">
        <div className="flex flex-col md:flex-row items-center bg-[#101010] border border-white/10 rounded-3xl md:rounded-full p-2 md:p-1.5 w-full shadow-lg gap-2 md:gap-0">
          
          <div className="flex-1 flex items-center px-4 py-2 md:py-0 w-full">
            <Search className="w-4 h-4 text-gray-500 mr-3 shrink-0" />
            <input 
              type="text" 
              placeholder="Job title, skill or company" 
              className="bg-transparent border-none outline-none text-white w-full h-10 text-sm placeholder:text-gray-500" 
            />
          </div>
          
          <div className="hidden md:block w-[1px] h-6 bg-white/10 mx-2"></div>
          
          <div className="flex-1 flex items-center px-4 py-2 md:py-0 w-full border-t border-white/5 md:border-none">
            <MapPin className="w-4 h-4 text-gray-500 mr-3 shrink-0" />
            <input 
              type="text" 
              placeholder="Location or Remote" 
              className="bg-transparent border-none outline-none text-white w-full h-10 text-sm placeholder:text-gray-500" 
            />
          </div>
          
          <Button className="w-full md:w-12 h-12 md:h-11 bg-[#6558ff] hover:bg-[#5244e0] rounded-2xl md:rounded-full flex items-center justify-center shrink-0 transition-colors">
            <Search className="w-4 h-4 text-white hidden md:block" />
            <span className="md:hidden text-white font-medium">Search</span>
          </Button>
        </div>
      </div>

      {/* Trending Tags */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 z-20 relative">
        <span className="text-xs text-gray-500">Trending Position</span>
        <div className="flex flex-wrap justify-center gap-2">
          {TRENDING_TAGS.map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1.5 rounded-full border border-white/10 bg-[#121212] text-[11px] text-gray-400 hover:bg-white/10 cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Globe & Stats Section (Same to Same Overlapping) */}
      <div className="relative w-full max-w-5xl mx-auto mt-12 flex flex-col items-center">
        
        {/* Globe Image Wrapper */}
        <div className="relative w-full flex justify-center px-4">
          <Image 
            src={globeImg} 
            alt="Global Connections" 
            width={1200}
            height={600}
            className="w-full max-w-4xl h-auto object-contain"
            priority
          />
          
          {/* Overlaid Text exactly at the top/center of the globe */}
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full text-center px-4">
            <h2 className="text-2xl md:text-4xl text-gray-300 font-light leading-snug drop-shadow-2xl">
              Assisting over <span className="font-semibold text-white">15,000 job seekers</span> <br/>
              find their dream positions.
            </h2>
          </div>
        </div>

        {/* Stats Cards (overlapping the bottom of the globe using negative margin) */}
        <div className="relative z-30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 w-full max-w-5xl -mt-16 md:-mt-32 lg:-mt-40">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id} 
                className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 flex flex-col h-40 shadow-2xl hover:border-white/10 transition-colors"
              >
                <div className="mb-auto">
                  <Icon className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}