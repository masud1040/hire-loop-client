import type { Job } from "@/type/jobstype";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const getJobs = async (queryString = ''): Promise<Job[]> => {

  const endpoint = queryString ? `${baseUrl}/jobs?${queryString}` : `${baseUrl}/jobs`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }

  return response.json();
};

export { getJobs };

export const getJobsById = async (id: string): Promise<Job> => {
  const response = await fetch(`${baseUrl}/jobs/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch job');
  }

  return response.json();
};

// src/lib/api/jobs.ts


export const getUserApplications = async (userId: string) => {
  try {
    const res = await fetch(`${baseUrl}/applications/${userId}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch applications");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};