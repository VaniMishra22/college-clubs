import { ActionIcon, Avatar, Box, Flex, Group, Paper, Text, TextInput, Tooltip, rem } from '@mantine/core';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { io } from "socket.io-client";
import ReactTimeAgo from 'react-time-ago'

const ChatPage = ({ tutorData }) => {
    const hasConnected = useRef(false);

    const messageRef = useRef(null);

    const [messageList, setMessageList] = useState([]);

    const [contactList, setContactList] = useState([]);
    const [selContact, setSelContact] = useState(null);

    const [tutorMessageList, setTutorMessageList] = useState(
        JSON.parse(localStorage.getItem('tutor-messages')) || {}
    );
    const [studentMessageList, setStudentMessageList] = useState(
        JSON.parse(localStorage.getItem('student-messages')) || {}
    );

    const socket = useMemo(() => io("http://localhost:5000"), []);
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("tutor"))
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

    useEffect(() => {
        if (currentUser.role === 'tutor') {
            const contacts = localStorage.getItem('tutor-contacts');
            if (contacts) {
                setContactList(JSON.parse(contacts))
            }
        }
    }, []);

    useEffect(() => {
        if (contactList.length)
            localStorage.setItem('tutor-contacts', JSON.stringify(contactList));
    }, [contactList])


    socket.on("rec-message", ({ senderData, message, date }) => {
        console.log({ senderData, message, date });
        if (!checkNewContact(senderData.email)) {
            setContactList([...contactList, senderData])
        }
        setSelContact(senderData);
        // setMessageList([...messageList, { senderData, message, sent: false, date }]);
        if (currentUser.role === 'tutor') {
            setTutorMessageList({
                ...tutorMessageList,
                [senderData.email]: [...(tutorMessageList[senderData.email] || []), { senderData, message, sent: false, date }]
            })
        }
        else {
            setStudentMessageList({
                ...studentMessageList,
                [tutorData.email]: [...(studentMessageList[tutorData.email] || []), { senderData, message, sent: false, date }]
            })
        }

    })

    const sendMessage = () => {
        console.log(tutorData);
        if (!messageRef.current.value) return;
        let rec_id = '';
        if (currentUser.role === 'tutor') {
            rec_id = selContact._id;
        } else if (tutorData) {
            rec_id = tutorData._id;
        } else {
            return alert('Please select a contact to send message');
        }
        // if(!(selContact || tutorData)) return alert('Please select a contact to send message');
        // if(!checkNewContact(selContact.email)){
        //     setContactList([...contactList, selContact])
        // }
        socket.emit("send-message", {
            message: messageRef.current.value,
            senderData: currentUser,
            date: new Date(),
            rec_id: rec_id
        });
        // setMessageList([...messageList, { senderData: currentUser, message: messageRef.current.value, sent: true, date: new Date() }]);
        if (currentUser.role === 'tutor') {
            setTutorMessageList({
                ...tutorMessageList,
                [selContact.email]: [...(tutorMessageList[selContact.email] || []), { senderData: currentUser, message: messageRef.current.value, sent: true, date: new Date() }]
            })
        } else {
            setStudentMessageList({
                ...studentMessageList,
                [tutorData.email]: [...(studentMessageList[tutorData.email] || []), { senderData: currentUser, message: messageRef.current.value, sent: true, date: new Date() }]
            })
        }
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

    const getMessageList = () => {
        if (currentUser.role === 'tutor' && selContact) {
            return tutorMessageList[selContact.email] || []
        } else if (tutorData) {
            return studentMessageList[tutorData.email] || []
        } else {
            return []
        }
    }

    useEffect(() => {
        console.log('message changed');
        // persist in localstorage
        localStorage.setItem('tutor-messages', JSON.stringify(tutorMessageList));
        localStorage.setItem('student-messages', JSON.stringify(studentMessageList));
    }, [tutorMessageList || studentMessageList])

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
                    getMessageList().map((message, index) => (
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