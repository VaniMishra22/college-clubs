'use client';
import React from 'react';
import { useForm } from '@mantine/form';
import { Button, Group, Paper, Stack, Text, TextInput, Textarea } from '@mantine/core';

const CreateClub = () => {

  const clubForm = useForm({
    initialValues: {
      name: '',
      description: '',
      moderator: '663cf4dcbab8f602ef53a1f9'
    },

    // validate: {
    //   email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    //   password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    // },
  });

  const formSubmit = (values) => {
    fetch('http://localhost:5000/club/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        console.log(response.status);
      }).catch((err) => {
        console.log(err);
      });
  }

  return (
    <Paper radius="md" p="xl" withBorder >
      <Text size="lg" fw={500}>
        Create New Club
      </Text>


      <form onSubmit={clubForm.onSubmit(formSubmit)}>
        <Stack>
          <TextInput
            required
            label="Club Name"
            placeholder="Enter Club Name"
            {...clubForm.getInputProps('name')}
            radius="md"
          />
          <Textarea
            required
            label="Club Description"
            placeholder="Enter Club description"
            {...clubForm.getInputProps('description')}
            radius="md"
          ></Textarea>

        </Stack>

        <Button type="submit" radius="xl">
          Create Club
        </Button>
      </form>
    </Paper>
  )
}

export default CreateClub;