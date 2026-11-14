"use client";

import React, { useState, use } from "react";
import { ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) {
  // "use client" কম্পোনেন্টে Promise আনর‍্যাপ করার সঠিক নিয়ম
  const { canceled } = use(searchParams);
  
  const { data: session } = useSession();
  const [currency, setCurrency] = useState<"BDT" | "USD">("BDT");

  const amountDisplay = currency === "BDT" ? "BDT 2,553.33" : "$20.00";

  return (
    <div className="min-h-screen bg-[#080809] text-[#e4e4e7] flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white">
      {/* Main Container */}
      <div className="max-w-[1040px] w-full mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left Column: Currency & Plan Summary */}
        <div className="lg:col-span-6 flex flex-col">
          <p className="text-[11px] font-semibold tracking-wider text-[#8a8a93] uppercase mb-3">
            Choose a currency:
          </p>

          {/* Currency Selector Grid */}
          <div className="grid grid-cols-2 gap-3 mb-2.5">
            <button
              type="button"
              onClick={() => setCurrency("BDT")}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-left transition-all ${
                currency === "BDT"
                  ? "bg-[#141416] border-[1.5px] border-white text-white shadow-sm"
                  : "bg-[#101012] border border-white/[0.07] text-[#8a8a93] hover:border-white/20 hover:text-gray-300"
              }`}
            >
              <svg className="w-5 h-3.5 rounded-[2px] shrink-0" viewBox="0 0 20 14" fill="none">
                <rect width="20" height="14" fill="#006A4E" />
                <circle cx="9" cy="7" r="4" fill="#F42A41" />
              </svg>
              <span className="text-sm font-semibold tracking-tight">BDT 2,553.33</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-left transition-all ${
                currency === "USD"
                  ? "bg-[#141416] border-[1.5px] border-white text-white shadow-sm"
                  : "bg-[#101012] border border-white/[0.07] text-[#8a8a93] hover:border-white/20 hover:text-gray-300"
              }`}
            >
              <svg className="w-5 h-3.5 rounded-[2px] shrink-0" viewBox="0 0 20 14" fill="none">
                <rect width="20" height="14" fill="#B22234" />
                <path d="M0 2H20M0 4H20M0 6H20M0 8H20M0 10H20M0 12H20" stroke="white" strokeWidth="1" />
                <rect width="9" height="7" fill="#3C3B6E" />
              </svg>
              <span className="text-sm font-semibold tracking-tight">$20.00</span>
            </button>
          </div>

          <p className="text-[11px] text-[#686870] italic mb-7">
            1 USD = 127.6665 BDT
          </p>

          <div className="h-[1px] bg-white/[0.08] w-full mb-7" />

          {/* Plan Details */}
          <div className="bg-[#101012] border border-white/[0.05] rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-white">Hireloop Pro Plan</h2>
                <p className="text-sm text-[#7c7c85] mt-1">Unlock your full potential</p>
              </div>
              <span className="text-lg font-bold text-white">
                {amountDisplay}
              </span>
            </div>
            
            <ul className="space-y-3 mt-6">
              {['Unlimited Job Applications', 'Priority Resume Review', 'Direct Message to Recruiters'].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00D64F]" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Checkout Action */}
        <div className="lg:col-span-6 max-w-[420px] w-full mx-auto lg:ml-auto lg:mr-0 flex flex-col justify-center">
          
          {canceled && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-200">
                Order canceled — continue to shop around and check out when you're ready.
              </p>
            </div>
          )}

          <div className="bg-[#121214] border border-white/[0.08] rounded-xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/[0.05]">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Secure Checkout</h3>
                <p className="text-xs text-gray-400">Powered by Stripe</p>
              </div>
            </div>

            {/* Stripe Checkout Form */}
            <form action="/api/checkout_sessions" method="POST" className="flex flex-col gap-4">
              {/* ব্যাকএন্ডে ডেটা পাঠানোর জন্য হিডেন ইনপুট */}
              <input type="hidden" name="currency" value={currency} />
              {session?.user?.email && (
                <input type="hidden" name="email" value={session.user.email} />
              )}

              <button 
                type="submit" 
                role="link"
                className="w-full h-12 bg-[#0066FF] hover:bg-[#0057db] active:scale-[0.995] text-white font-semibold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
              >
                Checkout — {amountDisplay}
              </button>
            </form>

            <p className="text-center text-xs text-[#686870] mt-4">
              You will be redirected to Stripe to complete your purchase securely.
            </p>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="py-6 border-t border-white/[0.05] text-center">
        <p className="text-[11px] text-[#686870] flex items-center justify-center gap-1">
          Payments processed securely by <span className="font-bold text-[#8a8a93] tracking-tight">Stripe</span>
        </p>
      </footer>
    </div>
  );
}