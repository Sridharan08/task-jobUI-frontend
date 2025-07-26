// src/components/JobCard.tsx

'use client';

import {
  Card,
  Text,
  Group,
  Stack,
  Button,
  Image,
  Box,
  Badge,
} from '@mantine/core';
import {
  IconBriefcase,
  IconMapPin,
  IconCurrencyRupee,
} from '@tabler/icons-react';
import { Job } from '@/types/job';

export default function JobCard({ job }: { job: Job }) {

  return (
    <Card
      radius="md"
      padding="lg"
      withBorder
      style={{
        borderRadius: 16,
        boxShadow:
          '0px 1.5px 2px rgba(0, 0, 0, 0.02), 0px 4px 8px rgba(0, 0, 0, 0.06)',
        background: '#ffffff',
        height: '100%',       // make it stretch in the grid cell
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Stack gap={10}>
        <Group justify="space-between" align="center">
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src={`/logos/${job.companyName.toLowerCase()}.png`}
              alt="Company logo"
              width={48}
              height={48}
              style={{ borderRadius: 12 }}
            />
          </Box>

          <Badge
            color="black"
            variant="light"
            size="sm"
            style={{
              backgroundColor: '#769cdaff',
              color: '#000000ff',
              fontSize: 12,
              fontWeight: 500,
              padding: '4px 10px',
              borderRadius: 6,
            }}
          >
            24h Ago
          </Badge>
        </Group>

        <Text size="lg" fw={700} style={{ color: '#111827' }}>
          {job.jobTitle}
        </Text>

        <Group
          gap={8}
          wrap="nowrap"
          style={{ color: '#4B5563', fontSize: 14 }}
        >
          <Group gap={4}>
            <IconBriefcase size={16} />
            <Text size="sm">{ '1-3 yr Exp'}</Text>
          </Group>
          <Group gap={4}>
            <IconMapPin size={16} />
            <Text size="sm">{job.location}</Text>
          </Group>
          <Group gap={4}>
            <IconCurrencyRupee size={16} />
            <Text size="sm">{"12lpa"}</Text>
          </Group>
        </Group>

        <Text size="sm" c="gray.7" lineClamp={3}>
          {job.jobDescription}
        </Text>

        <Button
          fullWidth
          radius="sm"
          style={{
            marginTop: 8,
            backgroundColor: '#007BFF',
            fontWeight: 600,
            fontSize: 10,
            padding: '12px 0',
            borderRadius: 8,
          }}
        >
          Apply Now
        </Button>
      </Stack>
    </Card>
  );
}
