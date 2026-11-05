'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

// List akare nav items, jate ek jaigay change korle shob jaigay change hoy
const NAV_ITEMS = [
  { label: 'Browse Jobs', href: '/jobs' },
  { label: 'Company', href: '/company' },
  { label: 'Pricing', href: '/pricing' },
];

import logo from '@/app/images/logo.png';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Floating, Rounded ebong Glass effect Container
  return (
    <nav className="fixed top-6 left-4 right-4 md:left-8 md:right-8 lg:left-1/2 lg:-translate-x-1/2 lg:w-full max-w-6xl bg-[#121212]/60 backdrop-blur-md border border-white/10 rounded-full z-50 shadow-2xl">
      <div className="px-6 md:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image 
            src={logo} 
            alt="HireLoop" 
            width={120} 
            height={36} 
            className="object-contain" 
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions (Sign In / Get Started) */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            href="/signin" 
            className="text-sm font-semibold text-[#7c72ff] hover:text-[#6558ff] transition-colors"
          >
            Sign In
          </Link>
          <Button className="bg-[#6558ff] hover:bg-[#5244e0] text-white rounded-full px-6 h-10 transition-colors">
            Get Started
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-[110%] left-0 w-full bg-[#121212]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex flex-col gap-4 shadow-2xl md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.label} 
                href={item.href} 
                className="text-base font-medium text-gray-300 hover:text-white transition-colors px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="h-px bg-white/10 my-2"></div>
          
          <div className="flex flex-col gap-4 px-2 pb-2">
            <Link 
              href="/signin" 
              className="text-base font-semibold text-[#7c72ff] hover:text-[#6558ff] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Button className="w-full bg-[#6558ff] hover:bg-[#5244e0] text-white rounded-full h-11 text-base transition-colors">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}