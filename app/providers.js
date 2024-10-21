// app/providers.js
'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { FileContextProvider } from '@/context/FileProvider';
import { SessionProvider } from 'next-auth/react';
import { UploadModelProvider } from '@/context/UploadModelContext';

export function Providers({ children, session }) {
	return (
		<SessionProvider session={session}>
			<UploadModelProvider>
				<FileContextProvider>
					<CacheProvider>
						<ChakraProvider>{children}</ChakraProvider>
					</CacheProvider>
				</FileContextProvider>
			</UploadModelProvider>
		</SessionProvider>
	);
}
