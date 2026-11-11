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
  Laptop,
  Coffee,
  HeartPulse,
  Globe,
  Users,
  Building,
  ChevronLeft
} from "lucide-react";
import type { Job } from "@/type/jobstype";

// NOTE: আপনার API ফাইলে getJobById ফাংশনটি তৈরি করে নিতে হবে। 
// আপাতত ডামি ফেচিং ফাংশন ব্যবহার করা হলো।
import { getJobs } from "@/lib/api/jobs"; 
async function getJobById(id: string): Promise<Job | null> {
  const jobs = await getJobs("");
  return jobs.find((job: Job) => job._id === id || job.id === id) || null;
}

// স্যালারি ফরম্যাটিং হেল্পার
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
  const { id } = params; // Next.js 15+ হলে await params.id ব্যবহার করবেন
  
  const job = await getJobById(id);

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
               {/* এখানে চাইলে কোম্পানির লোগো দিতে পারেন */}
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
            <button className="flex-1 md:flex-none px-8 py-3.5 bg-white hover:bg-gray-200 text-black font-semibold rounded-xl transition-colors text-sm">
              Apply Now
            </button>
          </div>
        </div>

        {/* 2. Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Banknote, label: "SALARY RANGE", value: formatSalary(job.minSalary, job.maxSalary, job.frequency) },
            { icon: MapPin, label: "LOCATION", value: job.isRemote ? `Remote (${job.location})` : job.location },
            { icon: Clock, label: "JOB TYPE", value: job.jobType ? job.jobType.replace('-', ' ') : "Full-time" },
            { icon: BarChart, label: "EXPERIENCE", value: "3 - 5 Years" } // এটি ডামি, আপনার DB তে থাকলে ডায়নামিক করবেন
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
              
              {/* Description */}
              <section className="mb-10">
                <h3 className="text-lg font-semibold text-white mb-4">Job Description</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  We are looking for a highly skilled {job.title} to join our team at {job.company}. 
                  In this role, you will be responsible for defining and building the next generation of our product experiences. 
                  You will work closely with cross-functional teams including engineering, product management, and marketing to deliver high-quality solutions.
                </p>
              </section>

              {/* Responsibilities */}
              <section className="mb-10">
                <h3 className="text-lg font-semibold text-white mb-4">Responsibilities</h3>
                {renderBulletPoints(job.responsibilities) || (
                  <p className="text-sm text-gray-500">Responsibilities will be discussed during the interview.</p>
                )}
              </section>

              {/* Requirements */}
              <section className="mb-10">
                <h3 className="text-lg font-semibold text-white mb-4">Requirements</h3>
                
                {/* Skills/Tags Mock (Your Figma has these chips) */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['React.js', 'System Architecture', 'Problem Solving', 'Agile'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-gray-300 flex items-center gap-1.5">
                      <span className="text-gray-500">{'</>'}</span>
                      {skill}
                    </span>
                  ))}
                </div>

                {renderBulletPoints(job.requirements)}
              </section>

              {/* Benefits (Static Mock matching Figma) */}
              <section>
                <h3 className="text-lg font-semibold text-white mb-6">Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: ShieldCheck, text: "Full Health & Dental" },
                    { icon: HeartPulse, text: "Competitive 401k" },
                    { icon: Laptop, text: "Latest Hardware Stipend" },
                    { icon: Coffee, text: "Unlimited PTO" }
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                        <benefit.icon className="w-4 h-4 text-gray-400" />
                      </div>
                      <span className="text-sm text-gray-300 font-medium">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </section>

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

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between py-3 border-b border-white/[0.05]">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Size</span>
                  <span className="text-sm text-gray-300 font-medium">250 - 500 Employees</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/[0.05]">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Industry</span>
                  <span className="text-sm text-gray-300 font-medium">{job.category.split('&')[0]}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Founded</span>
                  <span className="text-sm text-gray-300 font-medium">2018</span>
                </div>
              </div>

              <button className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-colors text-sm flex items-center justify-center gap-2">
                <Globe className="w-4 h-4" />
                Visit Website
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}