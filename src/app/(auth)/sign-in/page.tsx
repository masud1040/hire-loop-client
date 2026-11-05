'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/app/images/logo.png';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col justify-center items-center p-4">
      {/* Optional Top Logo */}
      <Link href="/" className="mb-8">
        <Image src={logo} alt="HireLoop" width={140} height={40} className="object-contain" />
      </Link>

      <div className="w-full max-w-md bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Top Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#6558ff] opacity-10 blur-3xl"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-semibold text-white mb-2 text-center">Welcome back</h2>
          <p className="text-gray-400 text-sm text-center mb-8">Enter your details to sign in to your account</p>

          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            {/* Email Input */}
            <div className="relative flex items-center">
              <Mail className="w-5 h-5 text-gray-500 absolute left-4" />
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-[#121212] border border-white/10 rounded-xl h-12 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#6558ff] transition-colors"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative flex items-center">
              <Lock className="w-5 h-5 text-gray-500 absolute left-4" />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full bg-[#121212] border border-white/10 rounded-xl h-12 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#6558ff] transition-colors"
                required
              />
            </div>

            <div className="flex justify-end mb-2">
              <Link href="#" className="text-xs text-[#6558ff] hover:text-[#7c72ff] transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button className="w-full h-12 bg-[#6558ff] hover:bg-[#5244e0] text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all group">
              Sign In
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="px-4 text-xs text-gray-500 uppercase tracking-wider">or continue with</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Google Login Button */}
          <Button variant="outline" className="w-full h-12 bg-transparent border border-white/10 hover:bg-white/5 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-3">
            <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </Button>

          {/* Switch to Sign Up */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link href="/sign-up" className="text-white font-medium hover:text-[#6558ff] transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}