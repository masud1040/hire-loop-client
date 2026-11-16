import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Calendar,
  UserCircle,
  Building2,
  MapPin,
  Briefcase,
} from "lucide-react";
import StatusDropdown from "@/app/components/StatusDropdown";

export const dynamic = "force-dynamic";

interface ApplicationPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobApplicationsPage({
  params,
}: ApplicationPageProps) {
  const resolvedParams = await params;
  const jobId = resolvedParams.id;

  let applications = [];
  let jobDetails: any = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

    // 1. Fetching Job Details
    const jobRes = await fetch(`${baseUrl}/jobs/${jobId}`, {
      cache: "no-store",
    });
    if (jobRes.ok) {
      jobDetails = await jobRes.json();
    }

    // 2. Fetching Applications
    const appRes = await fetch(`${baseUrl}/applications/job/${jobId}`, {
      cache: "no-store",
    });
    if (appRes.ok) {
      applications = await appRes.json();
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-white min-h-screen">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/dashboard/recruiter/jobs/manage-jobs"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Manage Jobs
        </Link>
      </div>

      {/* 🚀 New Job Details Banner */}
      {jobDetails ? (
        <div className="bg-[#1a1a1a] border border-white/[0.08] rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold tracking-tight text-gray-100">
                {jobDetails.title}
              </h1>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                  jobDetails.status === "Active"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {jobDetails.status || "Closed"}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-gray-500" />
                {jobDetails.company}
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gray-500" />
                {jobDetails.isRemote
                  ? `Remote (${jobDetails.location})`
                  : jobDetails.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-gray-500" />
                <span className="capitalize">
                  {jobDetails.jobType?.replace("-", " ")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:items-end p-4 bg-[#121212] rounded-xl border border-white/[0.05]">
            <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              Total Candidates
            </span>
            <div className="text-3xl font-bold text-[#867dfa]">
              {applications.length}
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-2xl font-bold tracking-tight text-gray-100 mb-8">
          Job Applications
        </h1>
      )}

      {/* Applications Table */}
      <div className="bg-[#121212] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] text-[10px] uppercase tracking-wider text-gray-400 font-semibold bg-[#1a1a1a]/50">
                <th className="px-6 py-4">Candidate Profile</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Applied On</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/[0.05]">
              {applications.length > 0 ? (
                applications.map((app: any) => (
                  <tr
                    key={app._id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center shrink-0">
                          {app.applicantInfo?.image ? (
                            <img
                              src={app.applicantInfo.image}
                              alt="Profile"
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <UserCircle className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-200">
                            {app.applicantInfo?.name || "Seeker User"}
                          </p>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            ID: {app.userId.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Mail className="w-4 h-4 text-gray-500" />
                        {app.email || app.applicantInfo?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {formatDate(app.appliedAt)}
                      </div>
                    </td>
                    {/* Status (Rongin Badge) */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                          app.status === "Applied"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            : app.status === "Review"
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                            : app.status === "Interview"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            : app.status === "Shortlisted"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : app.status === "Offer"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : app.status === "Rejected"
                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            app.status === "Applied"
                              ? "bg-blue-500"
                              : app.status === "Review"
                              ? "bg-yellow-500"
                              : app.status === "Interview"
                              ? "bg-purple-500"
                              : app.status === "Shortlisted"
                              ? "bg-emerald-500"
                              : app.status === "Offer"
                              ? "bg-green-500"
                              : app.status === "Rejected"
                              ? "bg-red-500"
                              : "bg-blue-500"
                          }`}
                        />
                        {app.status || "Applied"}
                      </span>
                    </td>

                    {/* Action (Status Dropdown) */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <StatusDropdown
                        appId={app._id}
                        initialStatus={app.status || "Applied"}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-500 text-sm"
                  >
                    No candidates have applied for this job yet.
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
