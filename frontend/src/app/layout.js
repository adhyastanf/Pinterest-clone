'use client';
import './globals.css';
import { Box, ChakraProvider, Stack, Flex, StackDivider, Divider } from '@chakra-ui/react';
import { UserProvider } from '@/context/user';
import Sidebar from '@/component/Sidebar';
import { store } from '@/store';
import { Provider } from 'react-redux';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Header } from '@/component/Elements';

export default function RootLayout({ children }) {
  const path = usePathname();
  const protectedPages = ['/login', '/register'];
  const [disabledSidebar] = useState(!protectedPages.includes(path));

  const renderProtectPages = () => {
    return <>{children}</>;
  };
  
  const renderNotProtectPages = () => {
    return (
      <Flex direction={'column'} height='100vh'>
        <Flex direction={'row'} height='100%'>
          <Sidebar />
          <Box overflowY={'auto'} flex={1}>
            <Stack px='5' py={'12'}>
              <Header />
              {children}
            </Stack>
          </Box>
        </Flex>
      </Flex>
    );
  };

  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ChakraProvider>
          <Provider store={store}>
            <UserProvider>
              {disabledSidebar ? renderNotProtectPages() : renderProtectPages()}
            </UserProvider>
          </Provider>
        </ChakraProvider>
      </body>
    </html>
  );
}

const Content = ({ children }) => {
  return (
    <main>
      <Box maxW={'100%'} flex={1} px='5' py={'12'} marginLeft='280px'>
        {children}
      </Box>
    </main>
  );
};
