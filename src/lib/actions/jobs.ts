const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const createJob = async (jobData: any) => {
  const response = await fetch(`${baseUrl}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    throw new Error('Failed to create job');
  }

  return response.json(); 
};

export const deleteJob = async (jobId: string) => {
  const response = await fetch(`${baseUrl}/jobs/${jobId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete job');
  }
  
  // ফিক্স: json() এর পরিবর্তে text() দেওয়া হলো
  return response.text(); 
};