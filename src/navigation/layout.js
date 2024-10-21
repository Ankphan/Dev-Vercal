'use client';

import { useSession } from 'next-auth/react';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  const { data: session } = useSession();

  return (
    <ChakraProvider>
      <Flex direction="column" height="100vh">

        {!session?.user && <Header />}

        <Flex flex="1">
          {session?.user && <Sidebar />}
          <Box flex="1" padding={4} marginLeft={session?.user ? '300px' : '0'} transition="margin-left 0.3s">
            {children}
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Layout;
