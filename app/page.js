//app/page.js
import StartingPageContent from '@/src/page-layouts/landing-page/landing-page';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../app/api/auth/[...nextauth]/route';

export default async function HomePage() {
	const session = await getServerSession(authOptions);

	if (session) {
		redirect('/home');
	}

	return <StartingPageContent />;
}
