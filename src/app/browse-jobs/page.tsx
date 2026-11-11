"use client";

import React, { useState, useEffect, Suspense } from "react";
import { 
  MapPin, 
  Briefcase, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  Check,
  Zap,
  Filter
} from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getJobs } from "@/lib/api/jobs"; 
import type { Job } from "@/type/jobstype"; 

// আলাদা করা Search কম্পোনেন্ট ইমপোর্ট করা হলো
import SearchJobs from "@/app/components/search-jobs"; 

const CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Product & Operations",
  "Marketing & Sales"
];
const JOB_TYPES = ["full-time", "part-time", "contract", "internship"];
const WORK_MODES = ["Remote", "On-site"];

function BrowseJobsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // States
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  // URL থেকে current filter গুলো রিড করা
  const currentCategories = searchParams.get("category")?.split(",") || [];
  const currentJobTypes = searchParams.get("jobType")?.split(",") || [];
  const currentWorkModes = searchParams.get("workMode")?.split(",") || [];

  // Filter Checkbox ক্লিক করলে URL আপডেট হবে
  const handleFilterToggle = (key: string, value: string, currentValues: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    
    let newValues;
    if (currentValues.includes(value)) {
      newValues = currentValues.filter((v) => v !== value);
    } else {
      newValues = [...currentValues, value];
    }

    if (newValues.length > 0) {
      params.set(key, newValues.join(","));
    } else {
      params.delete(key);
    }
    
    setCurrentPage(1);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // URL চেঞ্জ হলে API থেকে ফিল্টার করা ডেটা আনবে
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams(searchParams.toString());
        
        // Remote লজিক ব্যাকএন্ডের জন্য ট্রান্সলেট করা
        const workModes = params.get("workMode")?.split(",") || [];
        if (workModes.includes("Remote") && !workModes.includes("On-site")) {
          params.set("isRemote", "true");
        } else if (workModes.includes("On-site") && !workModes.includes("Remote")) {
          params.set("isRemote", "false");
        }
        params.delete("workMode"); 

        const fetchedJobs = await getJobs(params.toString());
        setJobs(Array.isArray(fetchedJobs) ? fetchedJobs : []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [searchParams]);

  // স্যালারি ফরম্যাটিং হেল্পার
  const formatSalary = (min?: number, max?: number, freq: string = "per year") => {
    if (!min && !max) return "Salary Undisclosed";
    if (freq.includes("year") && min && max) return `$${Math.floor(min / 1000)}k - $${Math.floor(max / 1000)}k`;
    return `$${min} - $${max} / ${freq.includes('hour') ? 'hr' : 'mo'}`;
  };

  // ডাইনামিক স্টাইলিং হেল্পার
  const getJobStyling = (category: string = "") => {
    const cat = category.toLowerCase();
    if (cat.includes("engineering") || cat.includes("tech")) return { bg: "bg-blue-500/10", border: "border-blue-500/20", icon: "text-blue-400" };
    if (cat.includes("design")) return { bg: "bg-orange-500/10", border: "border-orange-500/20", icon: "text-orange-400" };
    if (cat.includes("marketing")) return { bg: "bg-purple-500/10", border: "border-purple-500/20", icon: "text-purple-400" };
    return { bg: "bg-[#2a2b36]", border: "border-white/5", icon: "text-gray-400" };
  };

  // জব ডিটেইলস পেজে যাওয়ার ফাংশন
  const handleDetails = (jobId: string | undefined) => {
    if (jobId) {
     router.push(`/browse-jobs/${jobId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 pt-24 pb-12 px-4 md:px-8 font-sans">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#6558ff] opacity-[0.03] blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* আলাদা করা Search Component এখানে বসানো হলো */}
        <SearchJobs />

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar Filters */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-[#121212]/80 backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 sticky top-28 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-4 h-4 text-white" />
                <h2 className="text-lg font-semibold text-white">Filters</h2>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="text-[11px] font-bold text-gray-500 mb-4 uppercase tracking-widest">Category</h3>
                <div className="space-y-3">
                  {CATEGORIES.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={currentCategories.includes(cat)}
                        onChange={() => handleFilterToggle("category", cat, currentCategories)}
                      />
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        currentCategories.includes(cat) 
                          ? "bg-[#6558ff] border-[#6558ff]" 
                          : "border-gray-600 bg-[#0a0a0a] group-hover:border-gray-400"
                      }`}>
                        {currentCategories.includes(cat) && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Type Filter */}
              <div className="mb-8">
                <h3 className="text-[11px] font-bold text-gray-500 mb-4 uppercase tracking-widest">Job Type</h3>
                <div className="space-y-3">
                  {JOB_TYPES.map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={currentJobTypes.includes(type)}
                        onChange={() => handleFilterToggle("jobType", type, currentJobTypes)}
                      />
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        currentJobTypes.includes(type) 
                          ? "bg-[#6558ff] border-[#6558ff]" 
                          : "border-gray-600 bg-[#0a0a0a] group-hover:border-gray-400"
                      }`}>
                        {currentJobTypes.includes(type) && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors capitalize">
                        {type.replace('-', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Work Mode Filter */}
              <div>
                <h3 className="text-[11px] font-bold text-gray-500 mb-4 uppercase tracking-widest">Work Mode</h3>
                <div className="space-y-3">
                  {WORK_MODES.map((mode) => (
                    <label key={mode} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={currentWorkModes.includes(mode)}
                        onChange={() => handleFilterToggle("workMode", mode, currentWorkModes)}
                      />
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        currentWorkModes.includes(mode) 
                          ? "bg-[#6558ff] border-[#6558ff]" 
                          : "border-gray-600 bg-[#0a0a0a] group-hover:border-gray-400"
                      }`}>
                        {currentWorkModes.includes(mode) && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
              <h1 className="text-lg font-medium text-white">
                Found <span className="font-bold text-[#867dfa]">{jobs.length}</span> Professional Jobs
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select className="bg-[#121212] border border-white/[0.08] text-gray-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#6558ff]/50 appearance-none cursor-pointer">
                  <option>Most Recent</option>
                  <option>Highest Salary</option>
                </select>
              </div>
            </div>

            {/* Job List */}
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                   <div className="w-8 h-8 border-4 border-[#6558ff]/30 border-t-[#6558ff] rounded-full animate-spin"></div>
                </div>
              ) : jobs.length === 0 ? (
                <div className="bg-[#121212]/50 border border-dashed border-white/[0.1] rounded-2xl p-16 text-center">
                   <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                   <h3 className="text-lg font-medium text-gray-300 mb-1">No jobs found</h3>
                   <p className="text-sm text-gray-500">Try adjusting your filters or search terms.</p>
                </div>
              ) : (
                jobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage).map((job) => {
                  const style = getJobStyling(job.category);
                  
                  return (
                    <div 
                      key={job._id || job.id} 
                      // পুরো কার্ডটিতে ক্লিক ইভেন্ট দেওয়া হলো
                      onClick={() => handleDetails(job._id || job.id)}
                      className="bg-[#121212]/80 backdrop-blur-sm border border-white/[0.06] hover:border-[#6558ff]/30 hover:bg-[#1a1a1a] rounded-2xl p-6 transition-all duration-300 flex flex-col sm:flex-row gap-5 relative group shadow-sm hover:shadow-[0_4px_20px_rgba(101,88,255,0.05)] cursor-pointer"
                    >
                      <div className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center border ${style.bg} ${style.border}`}>
                         <Briefcase className={`w-6 h-6 ${style.icon}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-[17px] font-semibold text-white mb-1 truncate pr-8 group-hover:text-[#867dfa] transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-5 truncate flex items-center gap-1.5">
                          {job.company} <span className="w-1 h-1 rounded-full bg-gray-600 mx-1"></span> 
                          <MapPin className="w-3.5 h-3.5" /> {job.location} {job.isRemote && '(Remote)'}
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs font-medium text-gray-300">
                            <span className="text-gray-500">$</span>
                            {formatSalary(job.minSalary, job.maxSalary, job.frequency)}
                          </div>
                          
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs font-medium text-gray-300 capitalize">
                            <Briefcase className="w-3.5 h-3.5 text-gray-500" />
                            {job.jobType ? job.jobType.replace('-', ' ') : 'Full-time'}
                          </div>

                          <button 
                            // Apply বাটনে stopPropagation দেওয়া হলো
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("Apply clicked");
                            }}
                            className="ml-auto flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-gray-900 text-xs font-bold transition-all shadow-[0_4px_15px_rgba(16,185,129,0.2)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.35)] hover:-translate-y-0.5"
                          >
                             <Zap className="w-3.5 h-3.5 fill-current" />
                             Easy Apply
                          </button>
                        </div>
                      </div>

                      <button 
                        // Bookmark বাটনে stopPropagation দেওয়া হলো
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Bookmark clicked");
                        }}
                        className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                      >
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pagination */}
            {jobs.length > jobsPerPage && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#121212] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.05] disabled:opacity-50 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <button className="w-9 h-9 rounded-xl flex items-center justify-center bg-white text-black font-semibold text-sm shadow-md">
                  {currentPage}
                </button>
                
                <button 
                  onClick={() => setCurrentPage(p => p + 1)}
                  disabled={currentPage * jobsPerPage >= jobs.length}
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#121212] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.05] disabled:opacity-50 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// Next.js useSearchParams এর জন্য Suspense ব্যবহার করা বাধ্যতামূলক
export default function BrowseJobsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#6558ff]/30 border-t-[#6558ff] rounded-full animate-spin"></div>
      </div>
    }>
      <BrowseJobsContent />
    </Suspense>
  );
}