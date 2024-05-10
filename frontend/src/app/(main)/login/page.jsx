'use client';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  BackgroundImage,
  Box,
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';
import { enqueueSnackbar } from 'notistack';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';


const login = (props) => {

  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: '',
      
      password: ''
      
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const loginSubmit = (values) => {
    console.log(values);
    fetch("http://localhost:5000/user/authenticate", {
      method:"POST",
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        enqueueSnackbar('User Logged Successfully', { variant: 'success' });
        router.push("/")
      } else {
        enqueueSnackbar('Something went wrong', {variant: 'error' });
      }
    }).catch((err) => {
      console.log(err);
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    });
  }
// export function AuthenticationTitle() {
  return (
    <Box style={{BackgroundImage: `url("https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-colorful-beautiful-tennis-club-recruits-new-image_168691.jpg")`}}>
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back to College Clubs!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <a href='/signUp'><Anchor size="sm" component="button">
          Create account
        </Anchor></a>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form action="" onSubmit={form.onSubmit(loginSubmit)}>
        <TextInput label="Email" placeholder="name@gmail.com" required
        
        value={form.values.email}
        onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
        error={form.errors.email && "Invalid email"}
        />
        <PasswordInput label="Password" placeholder="Your password" required mt="md"
        value={form.values.password}
        onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
        error={form.errors.password && "Invalid Password"}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <a href='/resetPassword'><Anchor component="button" size="sm">
            Forgot password?
          </Anchor></a>
        </Group>
        <Button type='submit' fullWidth mt="xl">
          Sign in
        </Button>
        </form>
      </Paper>
    </Container>
    </Box>
  );
}
export default login;