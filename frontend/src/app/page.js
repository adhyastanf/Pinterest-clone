'use client';
import { Inter } from '@next/font/google';
import { Box } from '@chakra-ui/react';
import ExploreHome from '@/component/Explore';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {

  return (
    <Box overflowY={'auto'}>
      <ExploreHome />
    </Box>
  );
}
