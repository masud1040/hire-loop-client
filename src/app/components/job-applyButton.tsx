"use client";

import React from 'react';
import { useSession } from '@/lib/auth-client';
import { Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation'; 
import { email } from 'better-auth';
import applyToJob from '@/lib/actions/application';

const JobApplyButton = ({job}) => {
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user;

  const handleApply = async () => {
    // যদি ইউজার লগ-ইন করা না থাকে, তাহলে সাইন-ইন পেজে পাঠাবে
    if (!user) {
      // ফিক্স: redirectTo এর জায়গায় callbackUrl দেওয়া হলো
      router.push(`/sign-in?callbackUrl=/browse-jobs/${job._id}`);
      return; 
    }
   // (user as any).role ব্যবহার করা হলো
else if ((user as any).role === "seeker") {

        const application= {
            jobId: job._id,
            userId: user.id,
            email: user.email

        }
        const result= await applyToJob(application)
        if(result.insertedId){
            console.log("application submited");
            router.push("/browse-jobs")
            
        }

    }
    else{
        console.log("USER not a job seeker");
        
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