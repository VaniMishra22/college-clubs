'use client';
import { ActionIcon, Avatar, Badge, Box, Button, Card, Container, Grid, Group, Text, TextInput, Title, rem, useMantineTheme } from '@mantine/core';
import { IconArrowRight, IconDotsVertical, IconHeart, IconSearch } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import classes from './clubs.module.css';
import { Dots } from './Dots';
import { enqueueSnackbar } from 'notistack';

const Clubs = () => {

  const [clubList, setClubList] = useState([]);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

  const theme = useMantineTheme();

  const fetchClubs = () => {
    fetch('http://localhost:5000/club/getall')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setClubList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchClubs();
  }, [])

  const clubJoined = (club) => {
    return club.members.find((member) => member === currentUser._id)
  }

  const joinClub = (clubId) => {
    fetch('http://localhost:5000/club/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clubId, userId: currentUser._id }),
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          fetchClubs();
          enqueueSnackbar('Club Joined Successfully', { variant: 'success' });
        }
      }).catch((err) => {
        console.log(err);
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      });
  }

  const displayClubs = () => {
    if (clubList.length === 0) return <div>No clubs found</div>
    else {
      return clubList.map((club) => (
        <Grid.Col span={4}>
          <Card withBorder padding="xl" radius="md" >
            <Card.Section
              h={140}
              style={{
                backgroundImage: `url("http://localhost:5000/${club.cover}")`,
              }}
            />
            <Avatar
              src={`http://localhost:5000/${club.icon}`}
              size={80}
              radius={80}
              mx="auto"
              mt={-30}
            />
            <Text ta="center" fz="lg" fw={500} mt="sm">
              {club.name}
            </Text>
            <Text ta="center" fz="sm" c="dimmed">
              {club.type}
            </Text>
            <Group mt="md" justify="center" gap={30}>
              {/* {items} */}
            </Group>
            <Group mt="md">
              <Button onClick={e => joinClub(club._id)} disabled={clubJoined(club)} style={{ flex: 1 }} fullWidth radius="md" size="md" variant="filled">
                {clubJoined(club) ? 'Joined' : 'Join Club'}
              </Button>
              <ActionIcon variant="default" radius="md" size={36}>
                <IconDotsVertical stroke={1.5} />
              </ActionIcon>
            </Group>
          </Card>
        </Grid.Col>
      ))
    }
  }



  return (
    <Box>
      <Container className={classes.wrapper} size={1400}>
        <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
        <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

        <div className={classes.inner}>
          <Title className={classes.title}>
            Browse{' '}
            <Text component="span" className={classes.highlight} inherit>
              College Clubs
            </Text>{' '}
            that suits you
          </Title>

          <Container p={0} size={600}>
            <Text size="lg" c="dimmed" className={classes.description}>
              Build more reliable software with AI companion. AI is also trained to detect lazy
              developers who do nothing and just complain on Twitter.
            </Text>
            <TextInput
              mt={30}
              radius="xl"
              size="md"
              placeholder="Search questions"
              rightSectionWidth={42}
              leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
              rightSection={
                <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
                  <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                </ActionIcon>
              }
            />
          </Container>


        </div>
      </Container>
      <Container size="xl">
        <Grid>
          {displayClubs()}
        </Grid>
      </Container>
    </Box>
  )
}

export default Clubs;