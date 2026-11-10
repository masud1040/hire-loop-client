import type { Job } from "@/type/jobstype";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const getJobs = async (): Promise<Job[]> => {
  const response = await fetch(`${baseUrl}/jobs`, {
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