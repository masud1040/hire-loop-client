import { getJobs } from '@/lib/api/jobs';
import React from 'react';

const BrowsJobs = async ({searchParams}:{searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const search = await searchParams;
  console.log("searchParams", search);
  const url = new URLSearchParams(search as Record<string, string>).toString();

  console.log("url", url);
  const jobs = await getJobs(url);

    return (
        <div>
            <h1>Browse Jobs</h1>
            <ul>
                {jobs.map((job) => (    

                    <li key={job._id}>
                        <h2>{job.title}</h2>
                        <p>Company: {job.company}</p>
                        <p>Location: {job.location}</p>
                        <p>Deadline: {job.deadline}</p>
                        <p>Type: {job.jobType}</p>
                        <p>Salary: {job.minSalary} - {job.maxSalary} ({job.frequency})</p>
                        <p>Status: {job.status}</p>
                    </li>
                ))}
            </ul>
            
    
            
        </div>
    );
};

export default BrowsJobs;