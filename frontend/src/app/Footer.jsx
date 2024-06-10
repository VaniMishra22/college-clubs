import { Container, Group, Anchor, Title } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './footer.module.css';

const links = [
    { link: '#', label: 'Contact' },
    { link: '#', label: 'Privacy' },
    { link: '#', label: 'Blog' },
    { link: '#', label: 'Careers' },
];

export function Footer() {
    const items = links.map((link) => (
        <Anchor
            c="dimmed"
            key={link.label}
            href={link.link}
            onClick={(event) => event.preventDefault()}
            size="sm"
        >
            {link.label}
        </Anchor>
    ));

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Title order={3} align="center" className={classes.title}>
                    College Clubs
                </Title>

                <Group className={classes.links}>{items}</Group>
            </Container>
        </div>
    );
}