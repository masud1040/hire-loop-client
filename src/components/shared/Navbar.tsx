'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown, LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

import logo from '@/app/images/logo.png';
import { useSession, authClient,signOut } from '@/lib/auth-client';

const NAV_ITEMS = [
  { label: 'Browse Jobs', href: '/jobs' },
  { label: 'Company', href: '/company' },
  { label: 'Pricing', href: '/pricing' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

const handleSignOut = async () => {
  
    await authClient.signOut();
    router.refresh(); 
    window.location.href = '/'; 
  };

  return (
    <nav className="fixed top-6 left-4 right-4 md:left-8 md:right-8 lg:left-1/2 lg:-translate-x-1/2 lg:w-full max-w-6xl bg-[#121212]/70 backdrop-blur-xl border border-white/10 rounded-full z-50 shadow-2xl">
      <div className="px-6 md:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 z-50">
          <Image 
            src={logo} 
            alt="HireLoop" 
            width={120} 
            height={36} 
            className="object-contain drop-shadow-md" 
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.label} 
                href={item.href} 
                className={`relative px-4 py-2 text-sm font-medium transition-colors z-10 ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-gray-100'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            // Logged In State (Profile Dropdown)
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 hover:bg-white/5 p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-white/10"
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6558ff] to-[#a39eff] flex items-center justify-center text-white font-bold text-sm shadow-inner">
                  {user.name?.charAt(0).toUpperCase() || <UserIcon size={16} />}
                </div>
                <span className="text-sm font-medium text-gray-200">{user.name}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-56 bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-2 z-50 overflow-hidden"
                >
                  <Link 
                    href="/dashboard" 
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#7c72ff]" />
                    Dashboard
                  </Link>
                  <div className="h-px bg-white/10 my-1 mx-2"></div>
                  <button 
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            // Logged Out State
            <>
              <Link 
                href="/sign-in" 
                className="text-sm font-semibold text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link href="/sign-up">
                <Button className="bg-gradient-to-r from-[#6558ff] to-[#867dfa] hover:from-[#5244e0] hover:to-[#6558ff] shadow-[0_0_20px_rgba(101,88,255,0.3)] hover:shadow-[0_0_25px_rgba(101,88,255,0.5)] hover:-translate-y-0.5 text-white rounded-full h-10 px-6 text-sm font-medium transition-all duration-300 border border-[#867dfa]/30">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center z-50">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-gray-300 hover:text-white focus:outline-none p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-[110%] left-0 w-full bg-[#121212]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 flex flex-col gap-5 shadow-2xl md:hidden">
          
          {/* Mobile Profile Section (If Logged In) */}
          {user && (
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#6558ff] to-[#a39eff] flex items-center justify-center text-white font-bold text-lg shadow-inner">
                {user.name?.charAt(0).toUpperCase() || <UserIcon size={20} />}
              </div>
              <div>
                <h4 className="text-white font-medium">{user.name}</h4>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
          )}

          {/* Nav Links */}
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.label} 
                  href={item.href} 
                  className={`text-base font-medium transition-colors px-4 py-3 rounded-xl ${
                    isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          
          <div className="h-px bg-white/10"></div>
          
          {/* Mobile Actions */}
          <div className="flex flex-col gap-3">
            {user ? (
              <>
                <Link 
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5 text-[#7c72ff]" />
                  Dashboard
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-colors w-full text-left"
                >
                  <LogOut className="w-5 h-5" />
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/sign-in" 
                  className="text-base text-center font-semibold text-gray-300 hover:text-white py-3 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-[#6558ff] to-[#867dfa] text-white rounded-xl h-12 text-base font-medium shadow-[0_0_15px_rgba(101,88,255,0.3)] border border-[#867dfa]/30">
                    Get Started
                  </Button>
                </Link> 
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}