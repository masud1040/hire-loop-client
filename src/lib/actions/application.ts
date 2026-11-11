// আপনার API ফাইলের একদম উপরে baseUrl টি এভাবে আপডেট করুন
const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

const applyToJob = async (data) => {
  try {
    const response = await fetch(`${baseUrl}/application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     
      body: JSON.stringify(data), 
    });

    if (!response.ok) {
      throw new Error("Failed to apply for the job");
    }
console.log("Sending request to:", `${baseUrl}/application`);
    return await response.json(); 
    
  } catch (error) {
    console.error("Error applying to job:", error);
    throw error; // ফ্রন্টএন্ডে এরর হ্যান্ডেল করার জন্য
  }
};

// ফাংশনের নাম ছোট হাতের (camelCase) দিয়ে শুরু করা বেস্ট প্র্যাকটিস
export default applyToJob;