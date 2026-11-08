"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Globe, 
  ArrowRight,
  ChevronRight,
  Briefcase,
  Sparkles
} from "lucide-react";

const JOB_TYPES = [
  { label: "Full-time", value: "full-time" },
  { label: "Part-time", value: "part-time" },
  { label: "Contract", value: "contract" },
  { label: "Internship", value: "internship" },
];


export default function AddJobPage() {
  const [selectedJobType, setSelectedJobType] = useState("full-time");
  const [isRemote, setIsRemote] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const jobData = {
      title: formValues.title,
      company: formValues.company,
      category: formValues.category,
      jobType: selectedJobType,
      isRemote: isRemote,
      location: formValues.location,
      deadline: formValues.deadline,
      minSalary: Number(formValues.minSalary) || 0,
      maxSalary: Number(formValues.maxSalary) || 0,
      frequency: formValues.frequency,
      responsibilities: formValues.responsibilities,
      requirements: formValues.requirements,
      createdAt: new Date().toISOString(),
    };

    console.log("🚀 Published Job Data:", jobData);
    // TODO: Add toast notification here
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-white min-h-screen">
      
      {/* Premium Ambient Background Glow */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#6558ff] opacity-5 blur-[120px] pointer-events-none rounded-full" />

      {/* Header Section */}
      <div className="mb-10 relative z-10">
        <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-4 bg-white/[0.03] w-fit px-3 py-1.5 rounded-full border border-white/[0.05]">
          <Link href="/recruiter/jobs" className="hover:text-gray-200 transition-colors">
            Manage Jobs
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-[#867dfa]">Create New Listing</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
          Post a New Job
        </h1>
        <p className="text-sm md:text-base text-gray-400 max-w-xl">
          Fill in the position specifications to attract qualified talent across our network. Your listing will go live immediately after publishing.
        </p>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        
        {/* Section 1: Basic Information */}
        <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-[#6558ff]/20 border border-[#6558ff]/30 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-[#867dfa]" />
            </div>
            <h2 className="text-lg font-semibold tracking-wide text-gray-100">
              1. Basic Information
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Title <span className="text-[#6558ff]">*</span>
              </label>
              <input
                type="text"
                name="title"
                defaultValue="Frontend Developer"
                placeholder="e.g. Senior Frontend Engineer"
                required
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-3.5 text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-[#6558ff] focus:ring-4 focus:ring-[#6558ff]/10 transition-all hover:bg-white/[0.04]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name <span className="text-[#6558ff]">*</span>
                </label>
                <div className="relative flex items-center group">
                  <Building2 className="w-5 h-5 text-gray-500 absolute left-4 group-focus-within:text-[#867dfa] transition-colors" />
                  <input
                    type="text"
                    name="company"
                    defaultValue="HirePulse Network"
                    placeholder="Company name"
                    required
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-12 pr-5 py-3.5 text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-[#6558ff] focus:ring-4 focus:ring-[#6558ff]/10 transition-all hover:bg-white/[0.04]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Job Category <span className="text-[#6558ff]">*</span>
                </label>
                <div className="relative">
                  <select
                    name="category"
                    defaultValue="Engineering & Tech"
                    required
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-3.5 text-gray-200 focus:outline-none focus:border-[#6558ff] focus:ring-4 focus:ring-[#6558ff]/10 transition-all hover:bg-white/[0.04] appearance-none cursor-pointer"
                  >
                    <option value="Engineering & Tech" className="bg-[#121212]">Engineering & Tech</option>
                    <option value="Design & Creative" className="bg-[#121212]">Design & Creative</option>
                    <option value="Product & Operations" className="bg-[#121212]">Product & Operations</option>
                    <option value="Marketing & Sales" className="bg-[#121212]">Marketing & Sales</option>
                  </select>
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Job Type <span className="text-[#6558ff]">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {JOB_TYPES.map((type) => {
                  const isSelected = selectedJobType === type.value;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setSelectedJobType(type.value)}
                      className={`h-12 rounded-2xl text-sm font-medium transition-all duration-300 border ${
                        isSelected
                          ? "bg-gradient-to-br from-[#6558ff]/20 to-[#6558ff]/5 border-[#6558ff]/50 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_15px_rgba(101,88,255,0.2)]"
                          : "bg-white/[0.02] border-white/10 text-gray-400 hover:text-gray-200 hover:border-white/20 hover:bg-white/[0.04]"
                      }`}
                    >
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Location, Compensation & Timeline */}
        <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-[#6558ff]/20 border border-[#6558ff]/30 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-[#867dfa]" />
            </div>
            <h2 className="text-lg font-semibold tracking-wide text-gray-100">
              2. Location, Compensation & Timeline
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-white/[0.03] to-transparent border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#867dfa] shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-200">
                    Remote Work Allowed
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Enable worldwide or distributed candidate applications
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsRemote(!isRemote)}
                className={`w-12 h-6 rounded-full transition-all duration-300 relative shrink-0 border ${
                  isRemote 
                    ? "bg-[#6558ff] border-[#6558ff] shadow-[0_0_15px_rgba(101,88,255,0.4)]" 
                    : "bg-white/5 border-white/20"
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-all duration-300 absolute top-px ${
                    isRemote ? "left-[calc(100%-18px)] shadow-md" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Job Location
                </label>
                <div className="relative flex items-center group">
                  <MapPin className="w-5 h-5 text-gray-500 absolute left-4 group-focus-within:text-[#867dfa] transition-colors" />
                  <input
                    type="text"
                    name="location"
                    defaultValue="New York, USA"
                    placeholder="e.g. New York, USA"
                    required
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-12 pr-5 py-3.5 text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-[#6558ff] focus:ring-4 focus:ring-[#6558ff]/10 transition-all hover:bg-white/[0.04]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Application Deadline
                </label>
                <div className="relative flex items-center group">
                  <Calendar className="w-5 h-5 text-gray-500 absolute left-4 group-focus-within:text-[#867dfa] transition-colors" />
                  <input
                    type="text"
                    name="deadline"
                    defaultValue="05/30/2025"
                    placeholder="MM/DD/YYYY"
                    required
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-12 pr-5 py-3.5 text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-[#6558ff] focus:ring-4 focus:ring-[#6558ff]/10 transition-all hover:bg-white/[0.04]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Min Salary
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-500 font-medium">€</span>
                  <input
                    type="number"
                    name="minSalary"
                    defaultValue={25}
                    placeholder="0"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-9 pr-5 py-3.5 text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-[#6558ff] focus:ring-4 focus:ring-[#6558ff]/10 transition-all hover:bg-white/[0.04]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Salary
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-500 font-medium">€</span>
                  <input
                    type="number"
                    name="maxSalary"
                    defaultValue={40}
                    placeholder="0"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-9 pr-5 py-3.5 text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-[#6558ff] focus:ring-4 focus:ring-[#6558ff]/10 transition-all hover:bg-white/[0.04]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Frequency
                </label>
                <div className="relative">
                  <select
                    name="frequency"
                    defaultValue="per hour"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-3.5 text-gray-200 focus:outline-none focus:border-[#6558ff] focus:ring-4 focus:ring-[#6558ff]/10 transition-all hover:bg-white/[0.04] appearance-none cursor-pointer"
                  >
                    <option value="per hour" className="bg-[#121212]">per hour</option>
                    <option value="per month" className="bg-[#121212]">per month</option>
                    <option value="per year" className="bg-[#121212]">per year</option>
                  </select>
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Responsibilities & Requirements */}
        <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-[#6558ff]/20 border border-[#6558ff]/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#867dfa]" />
            </div>
            <h2 className="text-lg font-semibold tracking-wide text-gray-100">
              3. Responsibilities & Requirements
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Key Responsibilities <span className="text-[#6558ff]">*</span>
              </label>
              <textarea
                name="responsibilities"
                rows={4}
                defaultValue="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
                placeholder="List core duties..."
                required
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-5 text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-[#6558ff] focus:ring-4 focus:ring-[#6558ff]/10 transition-all hover:bg-white/[0.04] resize-y leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Qualifications & Requirements <span className="text-[#6558ff]">*</span>
              </label>
              <textarea
                name="requirements"
                rows={5}
                defaultValue={`• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers`}
                placeholder="List skills, certifications, and experience..."
                required
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-5 text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-[#6558ff] focus:ring-4 focus:ring-[#6558ff]/10 transition-all hover:bg-white/[0.04] resize-y leading-relaxed font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {/* Bottom Action Area */}
        <div className="pt-6 pb-20 md:pb-10 flex flex-col md:flex-row items-center justify-between border-t border-white/10">
          <p className="text-sm text-gray-500 mb-6 md:mb-0 text-center md:text-left">
            Double check your information before publishing.
          </p>
          
          <button
            type="submit"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#6558ff] to-[#867dfa] hover:from-[#5244e0] hover:to-[#6558ff] text-white font-semibold text-base transition-all duration-300 shadow-[0_8px_25px_rgba(101,88,255,0.3)] hover:shadow-[0_12px_35px_rgba(101,88,255,0.45)] hover:-translate-y-1"
          >
            Publish Job Listing
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </form>
    </div>
  );
}                          