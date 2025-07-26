'use client';

import {
  Group,
  Select,
  TextInput,
  RangeSlider,
  Box,
  rem,
} from '@mantine/core';
import {
  IconSearch,
  IconMapPin,
  IconBriefcase,
  IconCurrencyRupee,
} from '@tabler/icons-react';

export default function JobFilterBar({
  filters,
  setFilters,
}: {
  filters: any;
  setFilters: (f: any) => void;
}) {
  return (
    <Box
      bg="white"
      p="md"
      style={{
        borderRadius: rem(10),
        marginBottom: rem(24),
        marginTop: rem(-12),
      }}
    >
      <Group wrap="wrap" gap="md" justify="space-between">
        {/* Job Search */}
        <TextInput
          placeholder="Search By Job Title, Role"
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.currentTarget.value })
          }
          leftSection={<IconSearch size={18} stroke={1.5} color="black" />}
          leftSectionWidth={36}
          styles={{
            input: {
              height: rem(44),
              borderRadius: rem(8),
              fontSize: rem(14),
              paddingLeft: rem(38),
              color: 'black',
            },
          }}
        />

        {/* Location Select */}
        <Select
          placeholder="Preferred Location"
          data={['Chennai', 'Bangalore', 'Remote']}
          value={filters.location}
          onChange={(val) => setFilters({ ...filters, location: val })}
          leftSection={<IconMapPin size={18} stroke={1.5} color="black" />}
          leftSectionWidth={36}
          styles={{
            input: {
              height: rem(44),
              borderRadius: rem(8),
              fontSize: rem(14),
              paddingLeft: rem(38),
              color: 'black',
            },
            dropdown: {
              color: 'black',
            },
          }}
        />

        {/* Job Type */}
        <Select
          placeholder="Job type"
          data={['Full-time', 'Part-time', 'Internship']}
          value={filters.jobType}
          onChange={(val) => setFilters({ ...filters, jobType: val })}
          leftSection={<IconBriefcase size={18} stroke={1.5} color="black" />}
          leftSectionWidth={36}
          styles={{
            input: {
              height: rem(44),
              borderRadius: rem(8),
              fontSize: rem(14),
              paddingLeft: rem(38),
              color: 'black',
            },
            dropdown: {
              color: 'black',
            },
          }}
        />

        {/* Salary Range */}
        <Box style={{ width: 220 }}>
          <RangeSlider
            label={(value) => `${value} LPA`}
            value={filters.salary}
            onChange={(val) => setFilters({ ...filters, salary: val })}
            min={2}
            max={20}
            step={1}
            thumbSize={16}
            styles={{
              thumb: {
                border: '2px solid black',
                backgroundColor: '#fff',
              },
              track: {
                backgroundColor: '#E5E7EB',
              },
              bar: {
                backgroundColor: 'black',
              },
              label: {
                color: 'black',
              },
            }}
            thumbChildren={
              <IconCurrencyRupee size={14} stroke={1.5} color="black" />
            }
          />
        </Box>
      </Group>
    </Box>
  );
}
