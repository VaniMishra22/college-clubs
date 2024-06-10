import { useState } from 'react';
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

const data = [
    { link: '', label: 'Chat', icon: IconMessages },
    { link: '', label: 'Announcements', icon: IconSpeakerphone },
    { link: '', label: 'Schedules', icon: IconCalendar },
    { link: '', label: 'Edit Club', icon: IconPencil },
];

export default function Sidebar() {
    const [active, setActive] = useState('Billing');

    const { selClub } = useClubContext();
    console.log(selClub);

    const links = data.map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
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