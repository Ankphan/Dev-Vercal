// import HomePageTest from '@/src/page-layouts/home-page/HomePage';
import SettingsTest from '@/src/components/dashboard/Settings';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

const test = async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/login');
    }
    return <SettingsTest />;
};

export default test;
