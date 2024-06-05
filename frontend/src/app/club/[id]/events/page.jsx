'use client';
import useClubContext from '@/context/ClubContext';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Paper, Textarea, Button, TextInput, Table, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { enqueueSnackbar } from 'notistack';
import { DatePicker } from '@mantine/dates';
import '@mantine/dates/styles.css';

const Events = () => {

  const { selClub, fetchClubDetails } = useClubContext();
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [eventList, setEventList] = useState([]);
  const [selDate, setSelDate] = useState(new Date());

  const { id } = useParams();

  const fetchEvents = () => {
    fetch('http://localhost:5000/event/getbyclub/' + id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setEventList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchClubDetails();
    fetchEvents();
  }, [])

  const eventForm = useForm({
    initialValues: {
      title: '',
      description: '',
      club: id,
      createdBy: currentUser._id,
      date: new Date(),
    },

    // validate: {
    //   email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    //   password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    // },
  });

  const formSubmit = (values) => {
    values.date = selDate;
    console.log(values);
    fetch("http://localhost:5000/event/add", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          enqueueSnackbar('User Registerd Successfully', { variant: 'success' });
          fetchEvents();
        } else {
          enqueueSnackbar('', { variant: 'error' });
        }
      }).catch((err) => {
        console.log(err);
        enqueueSnackbar('', { variant: 'error' });
      });
  }

  const displayEvents = () => {
    return eventList.map((event) => (
      <Table.Tr
        key={event._id}
      // bg={selectedRows.includes(element.position) ? 'var(--mantine-color-blue-light)' : undefined}
      >
        <Table.Td>
          <Checkbox
            aria-label="Select row"
          // checked={selectedRows.includes(element.position)}
          // onChange={(event) =>
          //   setSelectedRows(
          //     event.currentTarget.checked
          //       ? [...selectedRows, element.position]
          //       : selectedRows.filter((position) => position !== element.position)
          //   )
          // }
          />
        </Table.Td>
        <Table.Td>{event.title}</Table.Td>
        <Table.Td>{event.description}</Table.Td>
        <Table.Td>{new Date(event.date).toDateString()}</Table.Td>
        <Table.Td>{event.createdBy.name}</Table.Td>
      </Table.Tr>
    ))
  }

  return (
    <div>
      <h1>Events</h1>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>Event Title</Table.Th>
            <Table.Th>Event Description</Table.Th>
            <Table.Th>Scheduled On</Table.Th>
            <Table.Th>Created By</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {displayEvents()}
        </Table.Tbody>
      </Table>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={eventForm.onSubmit(formSubmit)}>
          <TextInput label="Title" required
            {...eventForm.getInputProps('title')}
          />
          <Textarea rows={5} label="Event Description" placeholder="enter description" required mt="md"
            {...eventForm.getInputProps('description')}
          />
          <DatePicker value={selDate} onChange={setSelDate} />

          <Button type='submit' fullWidth mt="xl">
            Make Event
          </Button>
        </form>
      </Paper>
    </div>
  )
}

export default Events;