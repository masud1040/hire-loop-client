"use client";

import React from 'react';
import { useSession } from '@/lib/auth-client';
import { Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation'; 
import { email } from 'better-auth';
import applyToJob from '@/lib/actions/application';
import { getSession } from '@/lib/api/core/server';
import { getPremiumUser } from '@/lib/api/user';
const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

const JobApplyButton = ({job}) => {
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user;

const handleApply = async () => {

  const UserSession = await getSession()

    if (!user) {
      router.push(`/sign-in?callbackUrl=/browse-jobs/${job._id || job.id}`);
      return; 
    }

    const userRole = (user as any).role;

    // ২. রোল চেক (ইউজার Seeker কি না)
    if (userRole === "seeker") {
        try {
            // ৩. ইউজারের সব অ্যাপ্লিকেশন ডেটা নিয়ে আসুন
            const res = await fetch(`${baseUrl}/applications/${user.id}`);
            const applications = await res.json();

            // অ্যারের length চেক করেই আমরা টোটাল অ্যাপ্লাই পেয়ে যাচ্ছি! 
            const totalApplied = applications.length; 
            console.log("Total Applied Jobs:", totalApplied);

            const premiumRes= await getPremiumUser(user.id)
            console.log('premium',premiumRes);
            

            // ৪. যদি ৫টা বা তার বেশি অ্যাপ্লাই করে ফেলে, তাহলে পেমেন্ট পেজে পাঠিয়ে দিন
            if ( !premiumRes.premium &&totalApplied >= 5) {
                console.log("Limit reached! Redirecting to payment page...");
                alert("You have reached your free limit of 5 applications. Please upgrade your plan."); 
                router.push("/payment");
                return; // কোড এখানেই থেমে যাবে, আর ডেটাবেসে সেভ হবে না
            }

            // ৫. যদি ৫টার কম হয়, তাহলে ডেটাবেসে সেভ হবে
            const newApplication = {
                jobId: job._id || job.id,
                userId: user.id,
                email: user.email
            };
            
            const result = await applyToJob(newApplication);

            if(result && (result.insertedId || result.acknowledged)) {
                console.log("Application successfully submitted!");
                router.push("/browse-jobs");
            }

        } catch (error) {
            console.error("API Call Error:", error);
        }
    } 
    else {
        alert("Only job seekers can apply for this job.");
    }
};
  return (
    <div className="flex items-center gap-3 w-full md:w-auto">
      <button className="p-3.5 bg-[#1a1a1a] border border-white/[0.08] hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
        <Bookmark className="w-5 h-5" />
      </button>
      <button
        onClick={handleApply}
        className="flex-1 md:flex-none px-8 py-3.5 bg-white hover:bg-gray-200 text-black font-semibold rounded-xl transition-colors text-sm"
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobApplyButton;