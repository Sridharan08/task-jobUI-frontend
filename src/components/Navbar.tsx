'use client';

import {
  Box,
  Button,
  Group,
  UnstyledButton,
  rem,
  Burger,
  Drawer,
  Stack,
} from '@mantine/core';
import Image from 'next/image';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import JobModal from '@/app/jobs/JobModal';
import logo from '@/assets/logo.png';

export default function Navbar() {
  const [opened, { open, close }] = useDisclosure(false); // Job modal
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false); // Mobile drawer
  const [activeItem, setActiveItem] = useState('Home');

  const navItems = ['Home', 'Find Jobs', 'Find Talents', 'About us', 'Testimonials'];

  return (
    <>
      <Box
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#FFFFFF',
          borderRadius: '999px',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
          height: '64px',
          maxWidth: '838px', // Exact width from Figma
          margin: '20px auto', // Center it horizontally
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Left Side: Logo + Nav */}
        <Group gap={34} align="center">
          <Image
            src={logo}
            alt="Logo"
            width={36}
            height={36}
            style={{ borderRadius: '8px' }}
          />

          {/* Nav Items */}
          <Group gap={40} visibleFrom="md">
            {navItems.map((item) => (
              <UnstyledButton
                key={item}
                onClick={() => setActiveItem(item)}
                style={{
                  fontSize: rem(14),
                  fontWeight: 500,
                  color: '#1E1E1E',
                  padding: '6px 8px',
                  borderRadius: '8px',
                  backgroundColor: activeItem === item ? '#F5F5F5' : 'transparent',
                }}
              >
                {item}
              </UnstyledButton>
            ))}
          </Group>
        </Group>

        {/* Right Side: Create Job + Mobile Burger */}
        <Group gap={24}>
          <Button
            onClick={open}
            radius="xl"
            size="md"
            visibleFrom="sm"
            style={{
              background: 'linear-gradient(135deg, #A259FF 0%, #6C63FF 100%)',
              color: '#fff',
              fontWeight: 600,
              padding: '8px 16px',
              fontSize: rem(14),
              height: '36px',
            }}
          >
            Create Jobs
          </Button>

          <Burger
            opened={drawerOpened}
            onClick={openDrawer}
            hiddenFrom="md"
            size="sm"
            color="#000"
          />
        </Group>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="xs"
        position="right"
      >
        <Stack gap="xs" p="md">
          {navItems.map((item) => (
            <UnstyledButton
              key={item}
              onClick={() => {
                setActiveItem(item);
                closeDrawer();
              }}
              style={{
                fontSize: rem(16),
                fontWeight: 500,
                color: '#1e1e1e',
                padding: '8px 16px',
                borderRadius: '8px',
                textAlign: 'left',
              }}
            >
              {item}
            </UnstyledButton>
          ))}

          <Button
            onClick={() => {
              open();
              closeDrawer();
            }}
            radius="sm"
            size="md"
            fullWidth
            mt="md"
            style={{
              background: 'linear-gradient(135deg, #A259FF 0%, #6C63FF 100%)',
              color: '#fff',
              fontWeight: 600,
            }}
          >
            Create Jobs
          </Button>
        </Stack>
      </Drawer>

      <JobModal opened={opened} onClose={close} />
    </>
  );
}
