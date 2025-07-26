'use client';

import { useEffect, useState } from 'react';
import { Container, SimpleGrid, Box } from '@mantine/core';
import JobCard from '@/components/JobCard';
import JobFilterBar from '@/components/JobFilters'; // Make sure this path is correct
import { Job } from '@/types/job';
import { api } from '@/lib/api';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: '',
    salary: [0, 20],
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs');
        setJobs(res.data);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesTitle = job.jobTitle
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    const matchesLocation =
      !filters.location || job.location === filters.location;

    const matchesJobType =
      !filters.jobType || job.jobType === filters.jobType;

    const min = parseInt(job.salaryMin) || 0;
    const max = parseInt(job.salaryMax) || 0;
    const [filterMin, filterMax] = filters.salary;
    const matchesSalary = min >= filterMin && max <= filterMax;

    return (
      matchesTitle && matchesLocation && matchesJobType && matchesSalary
    );
  });

  return (
    <Container size="lg" pt="xl">

      <JobFilterBar filters={filters} setFilters={setFilters} />

      <Box
        p="xl"
        style={{
          borderRadius: '12px',
          backgroundColor: '#fff',
          width: '100%',
        }}
      >
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing="lg"
          style={{ alignItems: 'stretch' }}
        >
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
}
