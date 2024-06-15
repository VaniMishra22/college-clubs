'use client';
import { Button, Group, SimpleGrid, TextInput, Textarea, Title } from '@mantine/core';
import { Formik } from 'formik';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const EditClub = () => {

  const { id } = useParams();
  const [clubDetails, setClubDetails] = useState(null);

  useEffect(() => {
    fetchClubDetails();
  }, [])


  const fetchClubDetails = () => {
    fetch("http://localhost:5000/club/getbyid/" + id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setClubDetails(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const formSubmit = (values) => {
    fetch('http://localhost:5000/club/update/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        console.log(response.status);
        setClubDetails(values);
      }).catch((err) => {
        console.log(err);
      });
  }

  const displayClubData = () => {
    if (clubDetails !== null) {
      return (
        <div>
          <Formik initialValues={clubDetails} onSubmit={formSubmit} >
            {
              (clubForm) => (
                <form onSubmit={clubForm.handleSubmit}>
                  <Title
                    order={2}
                    size="h1"
                    style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
                    fw={900}
                    ta="center"
                  >
                    Get in touch
                  </Title>

                  <TextInput
                    label="Club name"
                    placeholder="Club name"
                    name="name"
                    onChange={clubForm.handleChange}
                    value={clubForm.values.name}
                    variant="filled"
                    mb={20}
                  />

                  <TextInput
                    label="Club Type"
                    placeholder="Club Type"
                    name="type"
                    onChange={clubForm.values.handleChange}
                    value={clubForm.values.type}
                    variant="filled"
                    mb={20}
                  />

                  <Textarea
                    multiple
                    label="Description"
                    placeholder="Club Description"
                    name="description"
                    onChange={clubForm.handleChange}
                    value={clubForm.values.description}
                    variant="filled"
                    mb={20}
                  />

                  <Group justify="center" mt="xl">
                    <Button type="submit" size="md">
                      Update
                    </Button>
                  </Group>
                </form>
              )
            }

          </Formik>
        </div>
      )
    } else {
      return <p>Loading...</p>
    }
  }

  return (
    <div>
      <Title order={2} size="h1" style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }} fw={900} ta="center">
        Edit Club
      </Title>
      {displayClubData()}
    </div>
  )
}

export default EditClub;