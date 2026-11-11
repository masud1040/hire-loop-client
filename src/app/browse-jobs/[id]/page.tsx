import React from "react";
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  Bookmark,
  CheckCircle2,
  Banknote,
  Clock,
  BarChart,
  ShieldCheck,
  Globe,
  Building,
  ChevronLeft
} from "lucide-react";
import type { Job } from "@/type/jobstype";

import { getJobs, getJobsById } from "@/lib/api/jobs"; 
import JobApplyButton from "@/app/components/job-applyButton"; // আপনার সঠিক পাথ অনুযায়ী চেক করে নিবেন

// স্যালারি ফরম্যাটিং হেল্পার (সিনট্যাক্স এরর ফিক্স করা হয়েছে)
const formatSalary = (min?: number, max?: number, freq: string = "per year") => {
  if (!min && !max) return "Undisclosed";
  if (freq.includes("year") && min && max) return `$${Math.floor(min / 1000)}k - $${Math.floor(max / 1000)}k`;
  return `$${min} - $${max} / ${freq.includes('hour') ? 'hr' : 'mo'}`;
};

// টেক্সটকে বুলেট পয়েন্টে কনভার্ট করার হেল্পার
const renderBulletPoints = (text?: string) => {
  if (!text) return null;
  const points = text.split('\n').filter(p => p.trim() !== '');
  return (
    <ul className="space-y-4 mt-4">
      {points.map((point, idx) => (
        <li key={idx} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 shrink-0" />
          <span>{point.replace('•', '').trim()}</span>
        </li>
      ))}
    </ul>
  );
};

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params; 
  
  const job = await getJobsById(id);

  if (!job) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
          <p className="text-gray-500 mb-6">The job listing you are looking for does not exist or has been removed.</p>
          <Link href="/browse-jobs" className="text-[#6558ff] hover:underline">← Back to Browse Jobs</Link>
        </div>
      </div>
    );
  }

  // ডায়নামিক ডেটার জন্য সেফ ভ্যালু (যদি ডাটাবেসে না থাকে, তবে ডিফল্ট দেখাবে)
  const experience = (job as any).experience || "Not Specified";
  const jobDescription = (job as any).description || `We are looking for a highly skilled ${job.title} to join our team at ${job.company}. You will work closely with cross-functional teams to deliver high-quality solutions.`;
  const companySize = (job as any).companySize || "Size not disclosed";
  const foundedYear = (job as any).foundedYear || "N/A";
  const website = (job as any).website || "#";
  const tags = (job as any).tags || [job.category?.split('&')[0], job.jobType?.replace('-', ' ')];
  const benefits = (job as any).benefits || [];

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 pt-24 pb-20 px-4 md:px-8 font-sans selection:bg-[#6558ff]/30">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Back Button */}
        <Link 
          href="/browse-jobs"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Jobs
        </Link>

        {/* 1. Header Section */}
        <div className="bg-[#101010] border border-white/[0.08] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#1a1a1a] border border-white/10 rounded-2xl flex items-center justify-center shrink-0">
               {/* কোম্পানির লোগো যদি DB তে থাকে, তবে image ট্যাগ ইউজ করবেন */}
               <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
                <span className="font-medium text-gray-300">{job.company}</span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Employer
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="p-3.5 bg-[#1a1a1a] border border-white/[0.08] hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
              <Bookmark className="w-5 h-5" />
            </button>
         <JobApplyButton job={job} />
          </div>
        </div>

        {/* 2. Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Banknote, label: "SALARY RANGE", value: formatSalary(job.minSalary, job.maxSalary, job.frequency) },
            { icon: MapPin, label: "LOCATION", value: job.isRemote ? `Remote (${job.location})` : job.location },
            { icon: Clock, label: "JOB TYPE", value: job.jobType ? job.jobType.replace('-', ' ') : "Full-time" },
            { icon: BarChart, label: "EXPERIENCE", value: experience } // ডায়নামিক ভ্যালু
          ].map((stat, i) => (
            <div key={i} className="bg-[#101010] border border-white/[0.08] rounded-2xl p-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <stat.icon className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
              </div>
              <p className="text-gray-200 font-semibold capitalize">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* 3. Main Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (Job Details) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#101010] border border-white/[0.08] rounded-2xl p-6 md:p-8">
              
              {/* Job Description (ডায়নামিক) */}
              <section className="mb-10">
                <h3 className="text-lg font-semibold text-white mb-4">Job Description</h3>
                <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">
                  {jobDescription}
                </p>
              </section>

              {/* Responsibilities */}
              <section className="mb-10">
                <h3 className="text-lg font-semibold text-white mb-4">Responsibilities</h3>
                {renderBulletPoints(job.responsibilities) || (
                  <p className="text-sm text-gray-500">Responsibilities will be discussed during the interview.</p>
                )}
              </section>

              {/* Requirements & Tags (ডায়নামিক) */}
              <section className="mb-10">
                <h3 className="text-lg font-semibold text-white mb-4">Requirements</h3>
                
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((skill: string, idx: number) => (
                      <span key={idx} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-gray-300 flex items-center gap-1.5">
                        <span className="text-gray-500">{'</>'}</span>
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {renderBulletPoints(job.requirements)}
              </section>

              {/* Benefits (ডায়নামিক) */}
              {benefits && benefits.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold text-white mb-6">Benefits</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {benefits.map((benefit: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="text-sm text-gray-300 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-1">
            <div className="bg-[#101010] border border-white/[0.08] rounded-2xl p-6 sticky top-28">
              <h3 className="text-lg font-semibold text-white mb-6">Company Overview</h3>
              
              {/* Image Placeholder */}
              <div className="w-full h-40 bg-[#1a1a1a] rounded-xl border border-white/5 mb-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#101010] to-transparent z-10" />
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <Building className="w-12 h-12 opacity-50" />
                </div>
              </div>

              {/* Company Info (ডায়নামিক) */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between py-3 border-b border-white/[0.05]">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Size</span>
                  <span className="text-sm text-gray-300 font-medium">{companySize}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/[0.05]">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Industry</span>
                  <span className="text-sm text-gray-300 font-medium">{job.category?.split('&')[0] || "General"}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Founded</span>
                  <span className="text-sm text-gray-300 font-medium">{foundedYear}</span>
                </div>
              </div>

              {/* Website Link (ডায়নামিক) */}
              <a 
                href={website !== "#" ? website : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-colors text-sm flex items-center justify-center gap-2 ${website === "#" ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
              >
                <Globe className="w-4 h-4" />
                Visit Website
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}