'use client';
import { ActionIcon, Avatar, Box, Flex, Group, Paper, Text, TextInput, Tooltip, rem } from '@mantine/core';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { io } from "socket.io-client";
import ReactTimeAgo from 'react-time-ago'
import { useParams } from 'next/navigation';

const ChatPage = ({ tutorData }) => {
    const hasConnected = useRef(false);

    const messageRef = useRef(null);
    const { id } = useParams();

    const [contactList, setContactList] = useState([]);
    const [selContact, setSelContact] = useState(null);

    const [messageList, setMessageList] = useState(
        JSON.parse(localStorage.getItem('club-messages')) || []
    );

    const socket = useMemo(() => io("http://localhost:5000"), []);
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    const checkNewContact = (email) => {
        // console.log(contactList);
        return contactList.find(contact => contact.email === email)
    }

    useEffect(() => {
        if (!hasConnected.current) {
            socket.emit("connect-user", currentUser._id);
            hasConnected.current = true;
        }
    }, [])


    socket.on("rec-message", ({ senderData, message, date }) => {
        console.log({ senderData, message, date });
        if (!checkNewContact(senderData.email)) {
            setContactList([...contactList, senderData])
        }
        setSelContact(senderData);
        setMessageList({
            ...messageList,
            [senderData.email]: [...(messageList[senderData.email] || []), { senderData, message, sent: false, date }]
        })

    })

    const fetchMessages = () => {
        fetch("http://localhost:5000/chat/getbyclub/" + id, {
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
                        setMessageList(data);
                    });
                } else {
                    console.log("Something went wrong");
                }
            }).catch((err) => {
                console.log(err);
            });
    }

    const sendMessage = () => {
        console.log(tutorData);
        if (!messageRef.current.value) return;

        const message = {
            message: messageRef.current.value,
            club: id,
            date: new Date(),
            sender: currentUser._id,
            sent: true
        }
        socket.emit("send-message", message);
        setMessageList([...messageList, message])
        messageRef.current.value = '';
    }

    const displayContacts = () => {
        return <Flex columnGap={20} style={{ width: '25rem', overflowX: 'auto' }}>
            {
                contactList.map(contact => (
                    <Tooltip label={contact.email}>
                        <Box align="center" onClick={
                            () => setSelContact(contact)
                        } style={{ cursor: 'pointer' }
                        }>
                            <Avatar src="avatar.png" alt={contact.email} />
                            <Text size='sm'>{contact.email.split('@')[0]}</Text>
                        </Box>
                    </Tooltip>
                ))
            }

        </Flex>
    }

    useEffect(() => {
        fetchMessages();
    }, [])


    // const getMessageList = () => {
    //     if (currentUser.role === 'tutor' && selContact) {
    //         return tutorMessageList[selContact.email] || []
    //     } else if (tutorData) {
    //         return studentMessageList[tutorData.email] || []
    //     } else {
    //         return []
    //     }
    // }

    // useEffect(() => {
    //     console.log('message changed');
    //     // persist in localstorage
    //     localStorage.setItem('tutor-messages', JSON.stringify(tutorMessageList));
    //     localStorage.setItem('student-messages', JSON.stringify(studentMessageList));
    // }, [tutorMessageList || studentMessageList])

    // useEffect(() => {
    //     if (currentUser.role === 'tutor') {
    //         const messages = localStorage.getItem('tutor-messages');
    //         if (messages) {
    //             setTutorMessageList(JSON.parse(messages))
    //         }
    //     } else {
    //         const messages = localStorage.getItem('student-messages');
    //         if (messages) {
    //             setStudentMessageList(JSON.parse(messages))
    //         }
    //     }
    // }, [studentMessageList])


    return (
        <Paper h={'90vh'} >
            {
                currentUser.role === 'tutor' && (
                    displayContacts()
                )
            }
            <Flex direction={'column'} justify={'end'} h={'83vh'} style={{ overflowY: 'scroll' }}>
                {
                    messageList.map((message, index) => (
                        <>
                            <div key={index} className={`message ${message.sent ? 'sent-msg' : 'rec-msg'}`} >
                                <Text fw={'bold'} c={'dimmed'} size='sm'>{message.senderData.name}</Text>
                                <p className='inner-text'>{message.message}</p>
                                <Text c={'dimmed'} size='sm'>
                                    <ReactTimeAgo date={new Date(message.date)} locale="en-US" />
                                </Text>
                            </div>
                        </>
                    ))
                }
            </Flex>
            <TextInput
                ref={messageRef}
                mt={'auto'}
                radius="xl"
                size="md"
                placeholder="Search questions"
                rightSectionWidth={42}
                rightSection={
                    <ActionIcon onClick={sendMessage} size={32} radius="xl" color='blue' variant="filled">
                        <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    </ActionIcon>
                }
            />
        </Paper>
    )
}

export default ChatPage;