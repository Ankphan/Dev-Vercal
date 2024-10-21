'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Box, Button, VStack, Image, Flex, Text, Divider } from '@chakra-ui/react';
import { FiUser, FiSearch, FiVideo, FiFilm, FiSettings } from 'react-icons/fi';
import { FaSignOutAlt } from 'react-icons/fa';
function Sidebar() {
    const router = useRouter();
    const { data: session } = useSession();

    const [activeButton, setActiveButton] = useState("meetings");

    useEffect(() => {
        const savedActiveButton = localStorage.getItem('activeButton');
        if (savedActiveButton) {
            setActiveButton(savedActiveButton);
        }
    }, []);

    const setActiveButtonAndSave = (button) => {
        setActiveButton(button);
        localStorage.setItem('activeButton', button);
    };

    const handleSignOut = () => {
        signOut({ callbackUrl: '/' });
        localStorage.removeItem('activeButton'); // Optionally clear on sign out
    };

    const handleSearch = () => {
        router.push('/search', { shallow: true });
        setActiveButtonAndSave('search');
    };

    const handleMeetingsAndFolders = () => {
        setActiveButtonAndSave('meetings');
        router.push('/home', { shallow: true });
    };

    const handleClipsAndReels = () => {
        setActiveButtonAndSave('clips');
        router.push('/home', { shallow: true });
    };

    const handleSettings = () => {
        setActiveButtonAndSave('settings');
        router.push('/setting', { shallow: true });
    };

    return (
        <Box
            as="nav"
            bg="white"
            color="gray.800"
            w="300px"
            h="100vh"
            position="fixed"
            top={0}
            left={0}
            boxShadow="md"
            p={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
        >
            <VStack spacing={4} align="center" justify="center" w="100%">
                <Image
                    src="/theme/home_page/Beta_Logo.png"
                    alt="Logo"
                    boxSize="45px"
                    mb={4}
                />

                <Button
                    leftIcon={<FiSearch />}
                    bg={activeButton === 'search' ? "blue.50" : "white"}
                    color={activeButton === 'search' ? "blue.600" : "gray.700"}
                    _hover={{ bg: "blue.100" }}
                    borderRadius="10px"
                    px={6}
                    py={4}
                    border="0.5px solid"
                    onClick={handleSearch}
                    w="100%"
                >
                    Search
                </Button>

                <Divider my={0.5} borderColor="gray.300" w="100%" />

                <Button
                    leftIcon={<FiVideo />}
                    bg={activeButton === 'meetings' ? "blue.50" : "white"}
                    color={activeButton === 'meetings' ? "blue.600" : "gray.700"}
                    _hover={{ bg: "blue.100" }}
                    borderRadius="10px"
                    px={6}
                    py={4}
                    onClick={handleMeetingsAndFolders}
                    w="100%"
                >
                    Meetings & Folders
                </Button>
                <Button
                    leftIcon={<FiFilm />}
                    bg={activeButton === 'clips' ? "blue.50" : "white"}
                    color={activeButton === 'clips' ? "blue.600" : "gray.700"}
                    _hover={{ bg: "blue.100" }}
                    borderRadius="10px"
                    px={6}
                    py={4}
                    onClick={handleClipsAndReels}
                    w="100%"
                >
                    Clips & Reels
                </Button>

                <Button
                    leftIcon={<FiSettings />}
                    bg={activeButton === 'settings' ? "blue.50" : "white"}
                    color={activeButton === 'settings' ? "blue.600" : "gray.700"}
                    _hover={{ bg: "blue.100" }}
                    borderRadius="10px"
                    px={6}
                    py={4}
                    onClick={handleSettings}
                    w="100%"
                >
                    Settings
                </Button>
            </VStack>

            <Flex direction="column" alignItems="center" mb={4} w="100%">
                <Divider my={0.5} borderColor="gray.300" w="100%" />
                {session?.user?.email && (
                    <Flex
                        alignItems="center"
                        mb={2}
                        color="#1D4ED8"
                        px={3}
                        py={2}
                    >
                        <FiUser style={{ marginRight: '8px' }} />
                        <Text fontSize="md" fontWeight="medium">
                            {session.user.email}
                        </Text>
                    </Flex>
                )}

                <Button
                    onClick={handleSignOut}
                    leftIcon={<FaSignOutAlt />}
                    bg="#1D4ED8"
                    color="white"
                    borderRadius="full"
                    px={8.0}
                    py={2.5}
                    _hover={{ bg: '#1E40AF' }}
                >
                    Sign Out
                </Button>
            </Flex>
        </Box>
    );
}

export default Sidebar;
