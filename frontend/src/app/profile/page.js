'use client'
import { Container, Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '@/context/user';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  return <p onClick={() => setUser('adhyasta')}>{user}</p>;
}
