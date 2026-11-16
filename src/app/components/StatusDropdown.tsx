"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface StatusDropdownProps {
  appId: string;
  initialStatus: string;
}

export default function StatusDropdown({ appId, initialStatus }: StatusDropdownProps) {
  const [status, setStatus] = useState(initialStatus || 'Applied');
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const statuses = ["Applied", "Review", "Interview", "Shortlisted", "Offer", "Rejected"];

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setIsUpdating(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
      const res = await fetch(`${baseUrl}/applications/${appId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        console.log("Status updated to:", newStatus);
        router.refresh(); // Page refresh korbe jate main status column update hoy
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("API Call Error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <select
      value={status}
      onChange={handleStatusChange}
      disabled={isUpdating}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer outline-none ${
        isUpdating ? "opacity-50 cursor-not-allowed" : ""
      } bg-[#2a2b36] hover:bg-[#323340] text-gray-200 border-white/5`}
    >
      {statuses.map((s) => (
        <option key={s} value={s} className="bg-[#1a1a1a] text-white">
          {s}
        </option>
      ))}
    </select>
  );
}