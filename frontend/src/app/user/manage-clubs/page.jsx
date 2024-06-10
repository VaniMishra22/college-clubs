'use client';
import React, { useEffect, useState } from 'react'
import { Card, Image, Avatar, Text, Group, Container, Box, Title, Grid } from '@mantine/core';
import { useRouter } from 'next/navigation';
import useClubContext from '@/context/ClubContext';

const ManageClubs = () => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

    const [clubList, setClubList] = useState([]);

    const { setSelClub, selClub } = useClubContext();

    const router = useRouter();

    const fetchClubs = () => {
        fetch("http://localhost:5000/club/getbymember/" + currentUser._id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    response.json().then((data) => {
                        console.log(data);
                        setClubList(data);
                    });
                } else {
                    console.log("Something went wrong");
                }
            }).catch((err) => {
                console.log(err);
            });
    }

    const selectClub = (club) => {
        router.push('/club/' + club._id + '/announcements')
    }

    useEffect(() => {
        fetchClubs();
    }, [])

    const displayClubs = () => clubList.map((club) => (
        <Grid.Col span={{ base: 12, md: 6 }}>
            <Card withBorder radius="md" p={0} onClick={e => selectClub(club)}>
                <Group wrap="nowrap" gap={0}>
                    <Image
                        src={'http://localhost:5000/' + club.cover}
                        h={160}
                        w={250}
                        fit="cover"
                    />
                    <Box p={'lg'}>
                        <Text tt="uppercase" c="dimmed" fw={700} size="xs">
                            {club.type}
                        </Text>
                        <Text mt="xs" mb="md">
                            {club.name}
                        </Text>
                        <Group wrap="nowrap" gap="xs">
                            <Group gap="xs" wrap="nowrap">
                                <Avatar
                                    size={20}
                                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                                />
                                <Text size="xs">{club.moderator.name}</Text>
                            </Group>
                            <Text size="xs" c="dimmed">
                                •
                            </Text>
                            <Text size="xs" c="dimmed">
                                {new Date(club.createdAt).toDateString()}
                            </Text>
                        </Group>
                        <Text mt="md" size="sm">
                            {club.members.length} Members
                        </Text>
                    </Box>
                </Group>
            </Card>
        </Grid.Col>
    ))

    return (
        <Container size={'xl'}>
            <Title order={1} my={30} align="center">Joined Clubs</Title>
            <Grid>
                {displayClubs()}
            </Grid>
        </Container>
    )
}

export default ManageClubs;