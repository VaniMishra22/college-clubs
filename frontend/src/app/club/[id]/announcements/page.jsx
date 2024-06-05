'use client';
import { SimpleGrid, Card, Image, Text, Container, AspectRatio, Paper, Textarea, Button, TextInput, Table, Checkbox } from '@mantine/core';
import classes from './ArticlesCardsGrid.module.css';
import { useForm } from '@mantine/form';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useClubContext from '@/context/ClubContext';
import { enqueueSnackbar } from 'notistack';

const mockdata = [
  {
    title: 'Top 10 places to visit in Norway this summer',
    image:
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'August 18, 2022',
  },
  {
    title: 'Best forests to visit in North America',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'August 27, 2022',
  },
  {
    title: 'Hawaii beaches review: better than you think',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'September 9, 2022',
  },
  {
    title: 'Mountains at night: 12 best locations to enjoy the view',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'September 12, 2022',
  },
];

export function Announcements() {

  const { selClub, fetchClubDetails } = useClubContext();
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [announcementList, setAnnouncementList] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchClubDetails();
    fetchAnnouncements();
  }, [])

  const fetchAnnouncements = () => {
    fetch("http://localhost:5000/announcement/getbyclub/" + id, {
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
            setAnnouncementList(data);
          });
        } else {
          console.log("Something went wrong");
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  const announcementForm = useForm({
    initialValues: {
      title: '',
      description: '',
      createdBy: currentUser._id,
      club: id,
    },

    // validate: {
    //   email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    //   password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    // },
  });

  const formSubmit = (values) => {
    console.log(values);
    fetch("http://localhost:5000/announcement/add", {
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
        } else {
          enqueueSnackbar('', { variant: 'error' });
        }
      }).catch((err) => {
        console.log(err);
        enqueueSnackbar('', { variant: 'error' });
      });
  }

  const displayAnnouncements = () => {
    return announcementList.map((announcement) => (
      <Table.Tr
        key={announcement._id}
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
        <Table.Td>{announcement.title}</Table.Td>
        <Table.Td>{announcement.description}</Table.Td>
      </Table.Tr>
    ))
  }

  return (
    <div>
      <h1>Announcements</h1>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>Element position</Table.Th>
            <Table.Th>Element name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Atomic mass</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {displayAnnouncements()}
        </Table.Tbody>
      </Table>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={announcementForm.onSubmit(formSubmit)}>
          <TextInput label="Title" required
            {...announcementForm.getInputProps('title')}
          />
          <Textarea rows={5} label="Password" placeholder="Your password" required mt="md"
            {...announcementForm.getInputProps('description')}
          />
          <Button type='submit' fullWidth mt="xl">
            Make Announcement
          </Button>
        </form>
      </Paper>

    </div>
  )

}
export default Announcements;
