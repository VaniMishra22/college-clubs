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
  Menu,
  Avatar,
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
  IconUser,
  IconLogout,
  IconUsersGroup,
} from '@tabler/icons-react';
import classes from './navbar.module.css';
import { ActionToggle } from './ActionToggle';
import useAppContext from '@/context/AppContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import cx from 'clsx';

export default function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const router = useRouter();

  const { loggedIn, currentUser, logout } = useAppContext();
  const [userMenuOpened, setUserMenuOpened] = useState(false);


  const showLoginOptions = () => {
    if (loggedIn) {
      return <Menu
        width={260}
        position="bottom-end"
        transitionProps={{ transition: 'pop-top-right' }}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton
            className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
          >
            <Group gap={7}>
              <Avatar src={currentUser.avatar} alt={currentUser.name} radius="xl" size={20} />
              <Text fw={500} size="sm" lh={1} mr={3}>
                {currentUser.name}
              </Text>
              <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>

          <Menu.Item
            leftSection={
              <IconUser style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            }
          >
            Profile
          </Menu.Item>
          <Menu.Item
            onClick={() => router.push('/club/chat')}
            leftSection={
              <IconUsersGroup style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            }
          >
            View Clubs
          </Menu.Item>
          <Menu.Item
            color='red'
            onClick={logout}
            leftSection={
              <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            }
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    } else {
      return <Group visibleFrom="sm">
        <ActionToggle></ActionToggle>
        <Button variant='filled' onClick={e => router.push('/login')}>Log in</Button>
        <Button variant='filled' onClick={e => router.push('/signUp')}>Sign up</Button>
      </Group>
    }
  }

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {/* <MantineLogo size={30} /> */}
          <Title order={3}>College Clubs</Title>

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="/" className={classes.link}>
              Home
            </a>
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="/about" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      About
                    </Box>
                  </Center>
                </a>
              </HoverCard.Target>

            </HoverCard>
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
          </Group>

          {
            showLoginOptions()
          }

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
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                About
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}></Collapse>
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
  );
}