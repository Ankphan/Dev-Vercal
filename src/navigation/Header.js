'use client';

import { Box, Button, Flex, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FaSignInAlt } from 'react-icons/fa';
import { FiFolder, FiHome } from 'react-icons/fi';

function Header() {
	const router = useRouter();

	const redirectToHomePage = () => {
		router.push('/home');
	};

	return (
		<Box
			as="nav"
			bg="white"
			color="gray.800"
			p={4}
			w="100%"
			position="fixed"
			top={0}
			zIndex={1}
		>
			<Flex align="center">
				<HStack spacing={4}>
					<Image
						src="/theme/home_page/Beta_Logo.png"
						alt="Logo"
						boxSize="45px"
						ml={4}
					/>

					<Button
						leftIcon={<FiHome />}
						variant="ghost"
						colorScheme="#1D4ED8"
						_hover={{ textColor: '#1E40AF' }}
					>
						Home
					</Button>

					<Menu>
						<MenuButton
							as={Button}
							leftIcon={<FiFolder />}
							variant="ghost"
							colorScheme="#1D4ED8"
							_hover={{ textColor: '#1E40AF' }}
						>
							Product
						</MenuButton>
						<MenuList>
							<MenuItem onClick={() => router.push('/subpage1')} _hover={{ color: '#1E40AF' }}>Subpage 1</MenuItem>
							<MenuItem onClick={() => router.push('/subpage2')} _hover={{ color: '#1E40AF' }}>Subpage 2</MenuItem>
							<MenuItem onClick={() => router.push('/subpage3')} _hover={{ color: '#1E40AF' }}>Subpage 3</MenuItem>
						</MenuList>
					</Menu>
				</HStack>
				<Spacer />
				<Button
					onClick={redirectToHomePage}
					leftIcon={<FaSignInAlt />}
					bg="#1D4ED8"
					color="white"
					borderRadius="full"
					px={8.0}
					py={2.5}
					_hover={{ bg: '#1E40AF' }}
					transition="background-color 0.3s ease-in-out"
				>
					Sign In
				</Button>
			</Flex>
		</Box>
	);
}

export default Header;
