"use client";

import { Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useRouter } from "next/navigation";
import { deleteJob } from "@/lib/actions/jobs"; 
import type { Job } from "@/type/jobstype";

export function DeleteJobDialogue({ job }: { job: Job }) {
  // হুক অবশ্যই কম্পোনেন্টের ভেতরে কল করতে হবে
  const router = useRouter(); 

  const handleDelete = async () => {
 
    const jobId = job._id || job.id;
    if (!jobId) return;
    
    try {
      await deleteJob(jobId);
      
      console.log("Job deleted successfully");
      router.refresh(); // ডিলিট হওয়ার পর পেজ রিফ্রেশ করে টেবিল আপডেট করবে
      
    } catch (error) {
      console.error("Failed to delete job:", error);
    } 
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/5 transition-colors">
          <Trash2Icon className="w-4 h-4" />
        </button>
      </AlertDialogTrigger>
      
      <AlertDialogContent className="bg-[#121212] border border-white/10 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Job Post?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            This will permanently delete this job listing. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-500 text-white hover:bg-red-600 border-none">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}