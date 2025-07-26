'use client';

import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  TextInput,
  Textarea,
  Select,
  Container,
  Stack,
} from '@mantine/core';
import axios from 'axios';

type JobFormValues = {
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: string;
  salaryMin: string;
  salaryMax: string;
  jobDescription: string;
  requirements: string;
  responsibilities: string;
  applicationDeadline: string;
};

export default function JobForm() {
  const { register, handleSubmit, control, reset } = useForm<JobFormValues>();

  const onSubmit = async (data: JobFormValues) => {
    try {
      await axios.post('http://localhost:5000/jobs', data);
      alert('Job created successfully!');
      reset(); // clear form
    } catch (err: any) {
      console.error('Error saving job:', err?.response?.data || err.message);
      alert('Failed to create job');
    }
  };

  return (
    <Container size="sm" py="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Job Title"
            withAsterisk
            {...register('jobTitle')}
          />
          <TextInput
            label="Company Name"
            withAsterisk
            {...register('companyName')}
          />
          <TextInput
            label="Location"
            withAsterisk
            {...register('location')}
          />
          <Controller
            name="jobType"
            control={control}
            render={({ field }) => (
              <Select
                label="Job Type"
                withAsterisk
                data={['Full Time', 'Part Time', 'Internship']}
                {...field}
              />
            )}
          />

          <Stack gap="sm">
            <TextInput
              label="Minimum Salary (e.g., 4 LPA)"
              withAsterisk
              {...register('salaryMin')}
            />
            <TextInput
              label="Maximum Salary (e.g., 7 LPA)"
              withAsterisk
              {...register('salaryMax')}
            />
          </Stack>

          <Textarea
            label="Job Description"
            withAsterisk
            autosize
            minRows={3}
            {...register('jobDescription')}
          />
          <Textarea
            label="Requirements"
            withAsterisk
            autosize
            minRows={3}
            {...register('requirements')}
          />
          <Textarea
            label="Responsibilities"
            withAsterisk
            autosize
            minRows={3}
            {...register('responsibilities')}
          />
          <TextInput
            label="Application Deadline"
            type="date"
            withAsterisk
            {...register('applicationDeadline')}
          />
          <Button type="submit" fullWidth>
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
