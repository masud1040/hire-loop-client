import React from "react";
import Link from "next/link";
export const dynamic = "force-dynamic";
import { 
  ChevronRight, 
  Plus, 
  MapPin, 
  Globe, 
  Users, 
  Pencil, 
  Trash2, 
  MoreVertical,
  Code2,
  PenTool,
  Server,
  Megaphone,
  CheckCircle2,
  Briefcase
} from "lucide-react";
import { getJobs } from "@/lib/api/jobs";
import type { Job } from "@/type/jobstype";
import { DeleteJobDialogue } from "@/app/components/Deletejob";

// ক্যাটাগরি অনুযায়ী আইকন ও কালার বের করার হেল্পার ফাংশন
const getCategoryStyles = (category: string = "") => {
  const cat = category.toLowerCase();
  if (cat.includes("engineering") || cat.includes("tech") || cat.includes("infrastructure")) {
    return { icon: Code2, colorClass: "text-blue-400", bgClass: "bg-blue-500/10", hex: "#60a5fa" };
  }
  if (cat.includes("design") || cat.includes("creative")) {
    return { icon: PenTool, colorClass: "text-orange-400", bgClass: "bg-orange-500/10", hex: "#fb923c" };
  }
  if (cat.includes("marketing") || cat.includes("sales")) {
    return { icon: Megaphone, colorClass: "text-purple-400", bgClass: "bg-purple-500/10", hex: "#c084fc" };
  }
  if (cat.includes("product") || cat.includes("operations")) {
    return { icon: Server, colorClass: "text-cyan-400", bgClass: "bg-cyan-500/10", hex: "#22d3ee" };
  }
  // ডিফল্ট স্টাইল
  return { icon: Briefcase, colorClass: "text-gray-400", bgClass: "bg-gray-500/10", hex: "#9ca3af" };
};

// স্যালারি ফরম্যাটিং হেল্পার
const formatSalary = (min: number, max: number, freq: string) => {
  const isYearly = freq.includes("year");
  const suffix = freq.includes("hour") ? "hr" : freq.includes("month") ? "mo" : "yr";
  
  if (isYearly) {
    return `€${min / 1000}k – €${max / 1000}k / ${suffix}`;
  }
  return `€${min} – €${max} / ${suffix}`;
};

// তারিখ ফরম্যাটিং হেল্পার (05/30/2025 -> May 30, 2025)
const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return dateString;
  }
};

// কতদিন আগে পোস্ট করা হয়েছে বের করার হেল্পার
const getPostedAgo = (dateString: string) => {
  if (!dateString) return "Recently";
  try {
    const diffTime = Math.abs(new Date().getTime() - new Date(dateString).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Posted today";
    if (diffDays < 7) return `Posted ${diffDays}d ago`;
    if (diffDays < 30) return `Posted ${Math.floor(diffDays / 7)}w ago`;
    return `Posted ${Math.floor(diffDays / 30)}mo ago`;
  } catch {
    return "";
  }
};

export default async function ManageJobsPage() {
  const jobs = await getJobs(); 
  
  // Ensure jobs is an array even if the API fails
  const safeJobs: Job[] = Array.isArray(jobs) ? jobs : [];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-white min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-4 bg-white/[0.03] w-fit px-3 py-1.5 rounded-full border border-white/[0.05]">
            <span className="text-gray-400">Manage Jobs</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-[#867dfa]">Job Listings & Postings</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-gray-100">
            Manage Job Posts
          </h1>
          <p className="text-sm text-gray-400">
            Review live listings, monitor applicants, and update job details across your organization.
          </p>
        </div>

        <Link 
          href="/dashboard/recruiter/jobs/added-job"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#6558ff] hover:bg-[#5244e0] text-white font-medium text-sm transition-all shadow-[0_0_20px_rgba(101,88,255,0.3)] hover:shadow-[0_0_25px_rgba(101,88,255,0.4)]"
        >
          <Plus className="w-4 h-4" />
          New Job Post
        </Link>
      </div>

      {/* Main Table Section */}
      <div className="bg-[#121212] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            {/* Table Head */}
            <thead>
              <tr className="border-b border-white/[0.08] text-[10px] uppercase tracking-wider text-gray-400 font-semibold bg-[#1a1a1a]/50">
                <th className="px-6 py-4 font-semibold">Job Title & Dept</th>
                <th className="px-6 py-4 font-semibold">Company & Location</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Compensation</th>
                <th className="px-6 py-4 font-semibold">Applicants</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Deadline</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-white/[0.05]">
              {safeJobs.length > 0 ? (
                safeJobs.map((job: Job) => {
                  const styles = getCategoryStyles(job.category);
                  const Icon = styles.icon;

                  return (
                    <tr key={job._id || job.id} className="hover:bg-white/[0.02] transition-colors group">
                      
                      {/* Title & Dept */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 shrink-0 ${styles.bgClass}`}>
                            <Icon className={`w-5 h-5 ${styles.colorClass}`} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                              {job.title}
                            </p>
                            <p className="text-[11px] font-medium mt-0.5" style={{ color: styles.hex }}>
                              {job.category}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Company & Location */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-medium text-gray-300">{job.company}</p>
                        <div className="flex items-center gap-1.5 mt-0.5 text-xs text-gray-500">
                          {job.isRemote ? (
                            <Globe className="w-3.5 h-3.5" />
                          ) : (
                            <MapPin className="w-3.5 h-3.5" />
                          )}
                          <span>
                            {job.isRemote ? `Remote (${job.location})` : `${job.location} (Hybrid)`}
                          </span>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] uppercase font-medium bg-[#1d1e26] text-gray-300 border border-white/[0.05]">
                          {job.jobType ? job.jobType.replace('-', ' ') : "N/A"}
                        </span>
                      </td>

                      {/* Compensation */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-medium text-gray-300">
                          {formatSalary(job.minSalary || 0, job.maxSalary || 0, job.frequency || "")}
                        </p>
                      </td>

                      {/* Applicants */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#867dfa]" />
                          <span className="text-sm font-medium text-[#a39eff]">
                            {job.applicants || 0} Candidates
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {job.status === "Active" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 text-gray-400 border border-white/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                            {job.status || "Expired"}
                          </span>
                        )}
                      </td>

                      {/* Deadline */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-medium text-gray-300">{formatDate(job.deadline)}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          {job.status === "Active" && job.createdAt ? getPostedAgo(job.createdAt) : "Closed"}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2a2b36] hover:bg-[#323340] text-gray-300 text-xs font-medium border border-white/5 transition-colors">
                            <Pencil className="w-3.5 h-3.5" />
                            Update
                          </button>
                          <button className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/5 transition-colors">
                            <DeleteJobDialogue job={job} />
                          </button>
                          <button className="p-1.5 text-gray-500 hover:text-gray-300 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-gray-500 text-sm">
                    No jobs found. Click &quot;New Job Post&quot; to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}