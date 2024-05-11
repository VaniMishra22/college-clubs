'use client';
import React from 'react';
import { useForm } from '@mantine/form';
import { Button, FileInput, Group, Paper, Stack, Text, TextInput, Textarea } from '@mantine/core';

const CreateClub = () => {

  const clubForm = useForm({
    initialValues: {
      name: '',
      description: '',
      moderator: '663cf4dcbab8f602ef53a1f9',
      type: '',
      cover: '',
      icon: ''
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

  const uploadFile = (file, fieldName) => {
    const fd = new FormData();
    fd.append('myfile', file);

    fetch("http://localhost:5000/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("file uploaded");
        clubForm.setFieldValue(fieldName, file.name);
      }
    });
  };

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

          <TextInput
            required
            label="Ckub Type"
            placeholder="Enter Club Type"
            {...clubForm.getInputProps('type')}
            radius="md"
          />

          <FileInput
            label="Upload Club Cover Image"
            placeholder="Upload Club Cover Image"
            onChange={(file) => uploadFile(file, 'cover')}
          />

          <FileInput
            label="Upload Club Icon"
            placeholder="Upload Club Icon"
            onChange={(file) => uploadFile(file, 'icon')}
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