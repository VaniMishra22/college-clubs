'use client';
import { Overlay, Container, Title, Button, Text } from '@mantine/core';
import classes from './page.module.css';
import Navbar from './(main)/navbar';
import Features from './Features';
import { Footer } from './Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container} size="md">
          <Title className={classes.title}>Clubs In College: Different Types And Benefits</Title>
          <Text className={classes.description} size="xl" mt="xl">
            Looking to join a club in college?
            Read on to learn about the different types and benefits of clubs in college.

            Want to amplify your college experience? Consider joining a student club!

            Joining different clubs in college can be the most rewarding experience in your undergraduate journey.It allows you to meet like-minded people, pursue various interests, build long-lasting connections with mentors and peers, and develop a strong skill set that can help you in your post-college career.
          </Text>

          <Button variant="gradient" size="xl" radius="xl" className={classes.control}>
            Get started
          </Button>
        </Container>
      </div>
      <Features />
      <Footer />
    </>
  );
}

export default Home;