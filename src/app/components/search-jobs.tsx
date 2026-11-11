"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SearchJobs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL theke search param niye input state-e set kora
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");

  // Jodi onno kono vabe URL change hoy, input jeno update hoy
  useEffect(() => {
    setSearchInput(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchInput.trim()) {
      params.set("search", searchInput.trim());
    } else {
      params.delete("search");
    }
    
    // Same page-er URL update korbe
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-[#121212]/80 backdrop-blur-md border border-white/[0.08] rounded-2xl p-3 mb-8 shadow-lg">
      <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by job title, keywords or company..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-transparent border-none py-3 pl-12 pr-4 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-0"
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto bg-white text-black font-semibold px-8 py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm shrink-0"
        >
          Search Jobs
        </button>
      </form>
    </div>
  );
}