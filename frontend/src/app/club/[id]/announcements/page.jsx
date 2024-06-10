'use client';
import { SimpleGrid, Card, Image, Text, Container, AspectRatio, Paper, Textarea, Button, TextInput, Table, Checkbox } from '@mantine/core';
import classes from './ArticlesCardsGrid.module.css';
import { useForm } from '@mantine/form';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useClubContext from '@/context/ClubContext';
import { enqueueSnackbar } from 'notistack';
import { DatePicker } from '@mantine/dates';
import '@mantine/dates/styles.css';

export function Announcements() {

  const { selClub, fetchClubDetails } = useClubContext();
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [announcementList, setAnnouncementList] = useState([]);
  const [selDate, setSelDate] = useState(new Date());

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
          enqueueSnackbar('Annoucement Registerd Successfully', { variant: 'success' });
          fetchAnnouncements();
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
            <Table.Th>Announcement Title</Table.Th>
            <Table.Th>Announcement Description</Table.Th>
            <Table.Th>Scheduled By</Table.Th>
            <Table.Th>Created By</Table.Th>
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
          <Textarea rows={5} label="Announcement Description" placeholder="enter description" required mt="md"
            {...announcementForm.getInputProps('description')}
          />

          <DatePicker value={selDate} onChange={setSelDate} />

          <Button type='submit' fullWidth mt="xl">
            Make Announcement
          </Button>
        </form>
      </Paper>

    </div>
  )

}
export default Announcements;
