export interface Job {
  id?: number;
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: string;
  salaryMin: string;          // New field
  salaryMax: string;          // New field
  jobDescription: string;
  applicationDeadline: string;
  createdAt?: string;
  updatedAt?: string;
}
