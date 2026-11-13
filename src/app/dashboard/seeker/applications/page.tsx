"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getUserApplications } from "@/lib/api/jobs";
import { 
  Search, Bell, Mail, Download, 
  ChevronLeft, ChevronRight, Code2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SeekerApplicationsPage() {
  const { data: session } = useSession();
  const user = session?.user;
  
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      getUserApplications(user.id).then((data) => {
        setApplications(data);
        setIsLoading(false);
      });
    }
  }, [user]);

  // স্ট্যাটস ক্যালকুলেশন
  const totalApplied = applications.length;
  const shortlisted = applications.filter(a => a.status === "Shortlisted").length;
  const interviews = applications.filter(a => a.status === "Interview").length;
  const successRate = totalApplied > 0 ? Math.round(((shortlisted + interviews) / totalApplied) * 100) : 0;

  // সময় ফরম্যাট করার হেল্পার
  const timeAgo = (dateString: string) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / 3600000;
    
    if (diffInHours < 24) return `${Math.floor(diffInHours)} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return `${Math.floor(diffInDays / 7)} weeks ago`;
  };

  // স্ট্যাটাস কালার জেনারেটর
  const getStatusBadge = (status: string = "Applied") => {
    const styles: any = {
      Applied: "bg-gray-500/10 text-gray-400 border-gray-500/20",
      Review: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      Shortlisted: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
      Offered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      Interview: "bg-orange-500/10 text-orange-400 border-orange-500/20"
    };
    const style = styles[status] || styles.Applied;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${style}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#0e0e11] min-h-screen text-gray-200 font-sans">
      
      {/* Top Header (যদি আপনার লেআউটে আগে থেকে হেডার থাকে, তবে এই header ট্যাগটি রিমুভ করে দিতে পারেন) */}
      <header className="h-16 border-b border-white/[0.05] flex items-center justify-between px-6 bg-[#0a0a0a]">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search applications..." 
            className="w-full bg-[#161618] border border-white/[0.05] rounded-lg py-2 pl-9 pr-4 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-white/20"
          />
        </div>
        <div className="flex items-center gap-4 ml-4">
          <button className="text-gray-400 hover:text-white transition-colors"><Bell className="w-5 h-5" /></button>
          <button className="text-gray-400 hover:text-white transition-colors"><Mail className="w-5 h-5" /></button>
          <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-gray-800 shrink-0">
             {user?.image ? <Image src={user.image} alt="User" width={32} height={32} /> : null}
          </div>
        </div>
      </header>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">My Applications</h1>
            <p className="text-sm text-gray-400">Track your job applications and interview progress in real-time.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-[#161618] border border-white/[0.05] rounded-lg p-1">
              <button className="px-4 py-1.5 bg-[#252529] text-white text-sm font-medium rounded-md shadow-sm">Active</button>
              <button className="px-4 py-1.5 text-gray-400 hover:text-white text-sm font-medium rounded-md transition-colors">Archived</button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4" /> Export PDF
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#121214] border border-white/[0.05] rounded-xl p-5">
            <p className="text-sm text-gray-500 mb-2">Total Applied</p>
            <h4 className="text-3xl font-bold text-white">{totalApplied}</h4>
          </div>
          <div className="bg-[#121214] border border-white/[0.05] rounded-xl p-5">
            <p className="text-sm text-gray-500 mb-2">Shortlisted</p>
            <h4 className="text-3xl font-bold text-white">{shortlisted}</h4>
          </div>
          <div className="bg-[#121214] border border-white/[0.05] rounded-xl p-5">
            <p className="text-sm text-gray-500 mb-2">Interviews</p>
            <h4 className="text-3xl font-bold text-[#f59e0b]">{interviews}</h4>
          </div>
          <div className="bg-[#121214] border border-white/[0.05] rounded-xl p-5">
            <p className="text-sm text-gray-500 mb-2">Success Rate</p>
            <h4 className="text-3xl font-bold text-[#10b981]">{successRate}%</h4>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-[#121214] border border-white/[0.05] rounded-xl overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/[0.05] text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="col-span-6 md:col-span-4">Job Title</div>
            <div className="hidden md:block col-span-3">Company</div>
            <div className="hidden md:block col-span-2">Applied</div>
            <div className="col-span-3 md:col-span-2">Status</div>
            <div className="col-span-3 md:col-span-1 text-right">Action</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/[0.05]">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">Loading applications...</div>
            ) : applications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No applications found. Start applying!</div>
            ) : (
              applications.map((app) => (
                <div key={app._id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/[0.02] transition-colors">
                  
                  {/* Job Title & Icon */}
                  <div className="col-span-6 md:col-span-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hidden sm:flex items-center justify-center shrink-0">
                       <Code2 className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">{app.job?.title}</h4>
                      <p className="text-xs text-gray-500 truncate capitalize">
                        {app.job?.jobType?.replace('-', ' ')} • {app.job?.isRemote ? 'Remote' : 'On-site'}
                      </p>
                    </div>
                  </div>

                  {/* Company (Desktop only) */}
                  <div className="hidden md:flex col-span-3 items-center">
                    <span className="text-sm text-gray-300 truncate">{app.job?.company}</span>
                  </div>

                  {/* Applied Date (Desktop only) */}
                  <div className="hidden md:flex col-span-2 items-center">
                    <span className="text-sm text-gray-400">{timeAgo(app.appliedAt)}</span>
                  </div>

                  {/* Status Badge */}
                  <div className="col-span-3 md:col-span-2 flex items-center">
                    {getStatusBadge(app.status)}
                  </div>

                  {/* Action */}
                  <div className="col-span-3 md:col-span-1 flex items-center justify-end">
                    <Link href={`/browse-jobs/${app.jobId}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                      Details
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Footer */}
          {applications.length > 0 && (
            <div className="p-4 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#161618]/50">
              <span className="text-xs text-gray-500">
                Showing {Math.min(1, applications.length)}-{Math.min(5, applications.length)} of {applications.length} applications
              </span>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-md bg-[#252529] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-md bg-white text-black text-sm font-semibold flex items-center justify-center shadow-sm">1</button>
                <button className="w-8 h-8 rounded-md bg-[#1a1a1c] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors text-sm font-medium">2</button>
                <button className="w-8 h-8 rounded-md bg-[#252529] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}