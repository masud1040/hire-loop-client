/**
 * Central job-related types shared by the recruiter pages,
 * the delete dialog, and the API helpers (`src/lib/api/jobs.ts`,
 * `src/lib/actions/jobs.ts`).
 */

/** Lifecycle status of a job listing. */
export type JobStatus = "Active" | "Expired";

/** Employment types offered when creating a job (see JOB_TYPES in the add-job page). */
export type JobType = "full-time" | "part-time" | "contract" | "internship";

/** Salary frequency options offered in the add-job form. */
export type SalaryFrequency = "per hour" | "per month" | "per year";

/**
 * A job as returned by the backend (GET /jobs).
 * Optional fields are ones the UI already defends against with fallbacks
 * (`job.minSalary || 0`, `job.status || "Expired"`, ...).
 */
export interface Job {
  _id?: string;
  id?: string;
  title: string;
  company: string;
  category: string;
  isRemote: boolean;
  location: string;
  deadline: string;
  jobType?: JobType;
  minSalary?: number;
  maxSalary?: number;
  frequency?: SalaryFrequency;
  status?: JobStatus;
  createdAt?: string;
  applicants?: number;
  responsibilities?: string;
  requirements?: string;
}

/** Payload sent to POST /jobs when publishing a new listing. */
export interface JobCreatePayload {
  title: string;
  company: string;
  category: string;
  jobType: JobType;
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: number;
  maxSalary: number;
  frequency: SalaryFrequency;
  responsibilities: string;
  requirements: string;
  createdAt: string;
  status: JobStatus;
}
