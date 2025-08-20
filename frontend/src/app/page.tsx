'use client';

import Image from "next/image";
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Menubar from "@/components/Menubar";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <div className="font-sans grid grid-rows-[60px_1fr_20px]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'authenticated' && (
          <div>
            <p>Welcome, {session.user?.name}!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        {status === 'unauthenticated' && (
          <div>
            <p>You are not logged in.</p>
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-[24px]">
       <span>footer</span>
      </footer>
    </div>
  );
}
