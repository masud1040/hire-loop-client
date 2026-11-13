"use client";

import React, { useState } from "react";
import { CreditCard, ChevronDown, Check, Lock } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [currency, setCurrency] = useState<"BDT" | "USD">("BDT");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [country, setCountry] = useState("Bangladesh");
  const [saveInfo, setSaveInfo] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Card number auto-spacing (e.g., 1234 1234 1234 1234)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  // Expiry date auto-formatting (MM / YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length >= 3) {
      setExpiry(`${value.slice(0, 2)} / ${value.slice(2)}`);
    } else {
      setExpiry(value);
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      alert("Payment Successful! Welcome to Hireloop Pro.");
      router.push("/dashboard/seeker/applications");
    }, 1500);
  };

  const amountDisplay = currency === "BDT" ? "BDT 2,553.33" : "$20.00";

  return (
    <div className="min-h-screen bg-[#080809] text-[#e4e4e7] flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white">
      {/* Main Container */}
      <div className="max-w-[1040px] w-full mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left Column: Currency & Plan Summary */}
        <div className="lg:col-span-5 flex flex-col">
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
              {/* Bangladesh Flag SVG */}
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
              {/* USA Flag SVG */}
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
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[15px] font-semibold text-white">Hireloop Pro Plan</h2>
              <p className="text-xs text-[#7c7c85] mt-1">Access to all features</p>
            </div>
            <span className="text-[15px] font-semibold text-white">
              {amountDisplay}
            </span>
          </div>
        </div>

        {/* Right Column: Checkout Form */}
        <div className="lg:col-span-7 max-w-[460px] w-full mx-auto lg:ml-auto lg:mr-0">
          
          {/* Express Link Pay Button */}
          <button
            type="button"
            className="w-full h-11 bg-[#00D64F] hover:bg-[#00c247] active:scale-[0.995] text-black font-semibold rounded-md flex items-center justify-center gap-3 transition-all shadow-sm"
          >
            <span className="flex items-center gap-1 font-bold text-sm tracking-tight">
              <span className="w-4 h-4 rounded-full bg-black text-[#00D64F] flex items-center justify-center text-[10px] font-black">
                i
              </span>
              link
            </span>
            <span className="h-4 w-[1px] bg-black/20" />
            <span className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="bg-[#1A1F71] text-white px-1.5 py-0.5 rounded-[3px] text-[9px] font-black tracking-wider uppercase">
                VISA
              </span>
              4242
            </span>
          </button>

          {/* OR Divider */}
          <div className="relative flex py-6 items-center">
            <div className="flex-grow border-t border-white/[0.08]"></div>
            <span className="flex-shrink mx-4 text-[11px] font-medium text-[#686870] uppercase tracking-wider">
              Or
            </span>
            <div className="flex-grow border-t border-white/[0.08]"></div>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-sm font-medium text-white mb-2.5">
                Contact information
              </h3>
              <div>
                <label className="block text-[11px] text-[#8a8a93] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full h-10 px-3.5 bg-[#161618] border border-white/[0.09] rounded-md text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-sm font-medium text-white mb-2.5">
                Payment method
              </h3>
              
              {/* Outer Card Box */}
              <div className="border border-white/[0.09] rounded-lg bg-[#0d0d0f] overflow-hidden">
                
                {/* Card Header */}
                <div className="px-4 py-3 bg-[#141416] border-b border-white/[0.08] flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 text-[#a1a1aa]" />
                  <span className="text-xs font-semibold text-white">Card</span>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-4">
                  
                  {/* Card Information Group (Joined Inputs) */}
                  <div>
                    <label className="block text-[10px] font-semibold tracking-wider text-[#8a8a93] uppercase mb-1.5">
                      Card Information
                    </label>
                    <div className="border border-white/[0.09] rounded-md overflow-hidden bg-[#161618] focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                      
                      {/* Top Input: Card Number */}
                      <div className="relative flex items-center border-b border-white/[0.08]">
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 1234 1234 1234"
                          className="w-full h-10 pl-3.5 pr-28 bg-transparent text-sm text-white placeholder-[#52525b] focus:outline-none"
                        />
                        {/* Mini Card Icons */}
                        <div className="absolute right-3 flex items-center gap-1 pointer-events-none">
                          <span className="px-1 py-0.5 bg-[#1A1F71] text-white rounded-[2px] text-[8px] font-bold">VISA</span>
                          <span className="w-5 h-3.5 bg-[#252529] rounded-[2px] flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-red-500 -mr-0.5 opacity-90" />
                            <span className="w-2 h-2 rounded-full bg-yellow-500 opacity-90" />
                          </span>
                          <span className="px-1 py-0.5 bg-[#016FD0] text-white rounded-[2px] text-[7px] font-bold">AMEX</span>
                        </div>
                      </div>

                      {/* Bottom Split: Expiry & CVC */}
                      <div className="grid grid-cols-2 divide-x divide-white/[0.08]">
                        <input
                          type="text"
                          required
                          value={expiry}
                          onChange={handleExpiryChange}
                          placeholder="MM / YY"
                          className="w-full h-10 px-3.5 bg-transparent text-sm text-white placeholder-[#52525b] focus:outline-none"
                        />
                        <div className="relative flex items-center">
                          <input
                            type="text"
                            required
                            maxLength={4}
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
                            placeholder="CVC"
                            className="w-full h-10 pl-3.5 pr-9 bg-transparent text-sm text-white placeholder-[#52525b] focus:outline-none"
                          />
                          <svg className="w-4 h-4 text-[#686870] absolute right-3 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="2" y="5" width="20" height="14" rx="2" />
                            <line x1="2" y1="10" x2="22" y2="10" />
                            <circle cx="17" cy="15" r="1.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-[10px] font-semibold tracking-wider text-[#8a8a93] uppercase mb-1.5">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Full name on card"
                      className="w-full h-10 px-3.5 bg-[#161618] border border-white/[0.09] rounded-md text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  {/* Country or Region */}
                  <div>
                    <label className="block text-[10px] font-semibold tracking-wider text-[#8a8a93] uppercase mb-1.5">
                      Country or Region
                    </label>
                    <div className="relative">
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full h-10 pl-3.5 pr-9 bg-[#161618] border border-white/[0.09] rounded-md text-sm text-white appearance-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      >
                        <option value="Bangladesh" className="bg-[#161618]">Bangladesh</option>
                        <option value="United States" className="bg-[#161618]">United States</option>
                        <option value="United Kingdom" className="bg-[#161618]">United Kingdom</option>
                        <option value="India" className="bg-[#161618]">India</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#7c7c85] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Save Information Checkbox */}
            <label
              onClick={() => setSaveInfo(!saveInfo)}
              className="flex items-start gap-3 p-3.5 border border-white/[0.08] rounded-lg bg-[#111113] cursor-pointer hover:border-white/[0.15] transition-colors select-none"
            >
              <div
                className={`mt-0.5 w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors shrink-0 ${
                  saveInfo
                    ? "bg-[#0066FF] border-[#0066FF] text-white"
                    : "bg-[#18181b] border-white/20"
                }`}
              >
                {saveInfo && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <div>
                <p className="text-xs font-medium text-white">
                  Save my information for faster checkout
                </p>
                <p className="text-[11px] text-[#7c7c85] mt-0.5">
                  Pay securely on this site and everywhere Link is accepted.
                </p>
              </div>
            </label>

            {/* Submit Pay Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full h-11 bg-[#0066FF] hover:bg-[#0057db] active:scale-[0.995] disabled:opacity-60 text-white font-semibold text-sm rounded-md shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>Pay</span>
                </>
              )}
            </button>
          </form>

        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 border-t border-white/[0.05] text-center">
        <p className="text-[11px] text-[#686870] flex items-center justify-center gap-1">
          Powered by <span className="font-bold text-[#8a8a93] tracking-tight">Stripe</span>
        </p>
      </footer>
    </div>
  );
}