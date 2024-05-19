'use client';
import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from '@tabler/icons-react';
import classes from './navbar.module.css';
import { ActionToggle } from './ActionToggle';
import { Feature, FeaturesGrid } from './FeaturesGrid';
import Link from 'next/link';

export default function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {/* <MantineLogo size={30} /> */}
          <Title order={3}>College Clubs</Title>

            <a href="/" className={classes.link}>
              Home
            </a>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                </SimpleGrid>

            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="/clubs" className={classes.link}>
              Clubs
            </a>
            <a href="/contact" className={classes.link}>
              Contact
            </a>
            <a href="/faq" className={classes.link}>
              FAQ's
            </a>

          <Group visibleFrom="sm">
            <ActionToggle></ActionToggle>
            <button variant="filled" href='/login'>Log in</button>
            <button variant="filled" href='/signUp'>Sign up</button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>

          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="/clubs" className={classes.link}>
            Clubs
          </a>
          <a href="/contact" className={classes.link}>
            contact
          </a>
          <a href="/faq" className={classes.link}>
            FAQ's
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );}