'use client';

import Image from 'next/image';
import Link from 'next/link';
import logo from '@/app/images/logo.png';

const FOOTER_LINKS = [
  {
    title: 'Product',
    links: ['Job discovery', 'Worker AI', 'Companies', 'Salary data'],
  },
  {
    title: 'Navigations',
    links: ['Help center', 'Career library', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Brand Guideline', 'Newsroom'],
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#050505] pt-20 pb-8 px-6 border-t border-white/5 z-20 relative">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Logo & Description */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link href="/" className="mb-6">
              <Image 
                src={logo} 
                alt="HireLoop" 
                width={120} 
                height={36} 
                className="object-contain" 
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Links Columns */}
          {FOOTER_LINKS.map((column) => (
            <div key={column.title} className="flex flex-col">
              <h4 className="text-[#5244e0] font-medium mb-6 text-sm">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-4">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <Link href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              {/* Custom Facebook SVG */}
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </Link>
            <Link href="#" className="w-9 h-9 rounded-lg bg-[#5244e0] flex items-center justify-center text-white hover:bg-[#6558ff] transition-all">
              {/* Custom Pinterest SVG */}
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.182 0 7.436 2.981 7.436 6.942 0 4.156-2.62 7.512-6.262 7.512-1.22 0-2.368-.633-2.763-1.385l-.752 2.862c-.27 1.027-1 2.316-1.492 3.104 1.144.336 2.35.515 3.593.515 6.621 0 11.988-5.368 11.988-11.988C24.004 5.367 18.637 0 12.017 0z"/>
              </svg>
            </Link>
            <Link href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              
            </Link>
          </div>

          {/* Copyright & Links */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-gray-600">
            <p>Copyright 2024 — Programming Hero</p>
            <div className="hidden sm:block w-px h-3 bg-gray-700"></div>
            <Link href="#" className="hover:text-gray-400 transition-colors">
              Terms & Policy - Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}