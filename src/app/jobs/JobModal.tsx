'use client';

import {
    Modal,
    TextInput,
    Textarea,
    Select,
    Button,
    Stack,
    Group,
} from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

interface JobModalProps {
    opened: boolean;
    onClose: () => void;
}

export default function JobModal({ opened, onClose }: JobModalProps) {
    const { control, register, handleSubmit, reset } = useForm();

    const onSubmit = async (data: any, status: 'published' | 'draft' = 'published') => {
        const payload = {
            jobTitle: data.jobTitle?.trim(),
            companyName: data.companyName?.trim(),
            location: data.location,
            jobType: data.jobType,
            salaryMin: data.salaryMin,
            salaryMax: data.salaryMax,
            jobDescription: data.jobDescription?.trim(),
            requirements: data.requirements?.trim(),
            responsibilities: data.responsibilities?.trim(),
            applicationDeadline: data.applicationDeadline,
        };

        console.log('Submitting payload:', payload);

        try {
            await axios.post('http://localhost:5000/jobs', payload);
            reset();
            onClose();
            alert(status === 'draft' ? 'Draft saved!' : 'Job published!');
        } catch (error: any) {
            console.error('Error saving job:', error.response?.data || error.message);
            alert(`Error: ${error.response?.data?.message || 'Could not save job'}`);
        }
    };

    const inputStyle = {
        label: {
            marginBottom: 6,
            fontWeight: 600,
            fontSize: 14,
            color: '#111827',
            fontFamily: 'Inter, sans-serif',
        },
        input: {
            borderRadius: 8,
            padding: '14px 16px',
            fontSize: 14,
            fontFamily: 'Inter, sans-serif',
            border: '1px solid #D1D5DB',
        },
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            size="lg"
            radius="md"
            overlayProps={{ blur: 3, opacity: 0.3 }}
            title={
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: 20, fontFamily: 'Inter, sans-serif' }}>
                        Create Job Opening
                    </span>
                </div>
            }
            styles={{
                body: { padding: 28 },
                header: {
                    padding: '24px 28px',
                    borderBottom: '1px solid #E5E7EB',
                },
            }}
        >
            <form onSubmit={handleSubmit((data) => onSubmit(data, 'published'))}>
                <Stack gap={20}>

                    {/* Row 1: Job Title & Company */}
                    <Group grow>
                        <TextInput
                            label="Job Title"
                            placeholder="Full Stack Developer"
                            required
                            {...register('jobTitle')}
                            styles={inputStyle}
                        />
                        <TextInput
                            label="Company Name"
                            placeholder="Amazon, Microsoft, Swiggy"
                            required
                            {...register('companyName')}
                            styles={inputStyle}
                        />
                    </Group>

                    {/* Row 2: Location & Job Type */}
                    <Group grow>
                        <Controller
                            name="location"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    label="Location"
                                    placeholder="Choose Preferred Location"
                                    data={['Remote', 'Bangalore', 'Chennai', 'Hyderabad']}
                                    required
                                    {...field}
                                    styles={inputStyle}
                                />
                            )}
                        />
                        <Controller
                            name="jobType"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    label="Job Type"
                                    placeholder="FullTime"
                                    data={['FullTime', 'PartTime', 'Internship']}
                                    required
                                    {...field}
                                    styles={inputStyle}
                                />
                            )}
                        />
                    </Group>

                    {/* Row 3: Salary Range & Deadline */}
                    <Group grow>
                        <TextInput
                            label="Salary (Min)"
                            placeholder="₹0"
                            required
                            {...register('salaryMin')}
                            styles={inputStyle}
                        />
                        <TextInput
                            label="Salary (Max)"
                            placeholder="₹12,00,000"
                            required
                            {...register('salaryMax')}
                            styles={inputStyle}
                        />
                        <TextInput
                            type="date"
                            label="Application Deadline"
                            required
                            {...register('applicationDeadline')}
                            styles={inputStyle}
                        />
                    </Group>

                    {/* Row 4: Description */}
                    <Textarea
                        label="Job Description"
                        placeholder="Please share a description to let the candidate know more about the job role"
                        minRows={5}
                        required
                        {...register('jobDescription')}
                        styles={{
                            ...inputStyle,
                            input: {
                                ...inputStyle.input,
                                lineHeight: 1.5,
                            },
                        }}
                    />

                    {/* Footer Buttons */}
                    <Group justify='space-between' mt={10}>
                        <Button
                            variant="outline"
                            radius="md"
                            style={{
                                fontWeight: 500,
                                fontSize: 14,
                                padding: '10px 24px',
                                border: '1px solid #D1D5DB',
                                backgroundColor: '#fff',
                                color: '#374151',
                                fontFamily: 'Inter, sans-serif',
                            }}
                            onClick={handleSubmit((data) => onSubmit(data, 'draft'))}
                        >
                            Save Draft ⌄
                        </Button>

                        <Button
                            type="submit"
                            radius="md"
                            style={{
                                background: '#008EFF',
                                fontWeight: 600,
                                fontSize: 14,
                                padding: '10px 32px',
                                color: '#fff',
                                fontFamily: 'Inter, sans-serif',
                            }}
                        >
                            Publish &nbsp; »
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}
