// Adjust the path based on the folder structure
'use client'
import { AimifyHome } from '@/components/amify-home';
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/components/app-login-page'); // Adjust the path as needed
  };

  return (
    <div>
      <AimifyHome onClick={navigateToLogin}/>
    </div>
  );
}
