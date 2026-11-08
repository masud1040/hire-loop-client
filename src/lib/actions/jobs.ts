const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const createJob = async (jobData: any) => {

  const response = await fetch(`${baseUrl}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(jobData), // এখানে 'data' এর পরিবর্তে 'jobData' হবে
  });

  if (!response.ok) {
    throw new Error('Failed to create job');
  }

  return response.json(); 
};