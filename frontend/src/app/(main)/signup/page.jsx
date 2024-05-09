'use client';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import { TwitterButton } from './TwitterButton';
import { enqueueSnackbar } from 'notistack';

 const signUp = (props) => {
  const [type, toggle] = useToggle(['register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      cpassword:""
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const signupSubmit = (values) => {
    console.log(values);
    fetch("http://localhost:5000/user/add", {
      method:"POST",
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        enqueueSnackbar('Usee Registerd Successfully', { variant: 'success' });
      } else {
        enqueueSnackbar('Something went wrong', {variant: 'error' });
      }
    }).catch((err) => {
      console.log(err);
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    });
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to College Clubs, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(signupSubmit)}>
        <Stack>

          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              id="name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              error={form.errors.name && "Invalide name"}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@email.com"
            id="email"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            id='password'
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />
          
          <PasswordInput
            required
            label="Confirm Password"
            placeholder="Confirm password"
            id="cpassword"
            value={form.values.cPassword}
            onChange={(event) => form.setFieldValue('cpassword', event.currentTarget.value)}
            error={form.errors.cpassword && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <a href='/login'><Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor></a>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
export default signUp;