import { useEffect, useState } from 'react';
import { Group, Code, Title } from '@mantine/core';
import {
    IconLogout,
    IconMessages,
    IconCalendar,
    IconSpeakerphone,
    IconPencil,
} from '@tabler/icons-react';
import classes from './sidebar.module.css';
import useClubContext from '@/context/ClubContext';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

const data = [
    { link: (id) => {return `/club/${id}/chat` }, label: 'Chat', icon: IconMessages },
    { link: (id) => {return `/club/${id}/announcements` }, label: 'Announcements', icon: IconSpeakerphone },
    { link: (id) => {return `/club/${id}/events` }, label: 'Schedules', icon: IconCalendar },
    { link: (id) => {return `/club/${id}/edit-club` }, label: 'Edit Club', icon: IconPencil },
];

export default function Sidebar() {
    const [active, setActive] = useState('Billing');
    const {id} = useParams();
    const { selClub, fetchClubDetails } = useClubContext();
    console.log(id);

    // useEffect(() => {
        // fetchClubDetails()
    // }, [])
    
    const router = useRouter();

    const links = data.map((item) => (
        <Link
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link(id)}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                router.push(item.link(id))
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Group className={classes.header} justify="space-between">
                    <Title order={3} style={{color: 'white'}}>
                        {selClub?.name}
                    </Title>
                    <Code fw={700} className={classes.version}>
                        {selClub?.members.length} members
                    </Code>
                </Group>
                {links}
            </div>

            <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </nav>
    );
}