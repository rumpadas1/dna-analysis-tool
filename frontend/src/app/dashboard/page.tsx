'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');

    if (!token || !user) {
      router.push('/login');
    } else {
      setUsername(user);
    }
  }, [router]);

  return (
    <main className="h-screen bg-zinc-200 text-black flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 text-[#7f1d1d]">
          Welcome, {username}
        </h1>
        <p className="text-base text-gray-800">
          You're now logged in and can use all the features of the{' '}
          <span className="text-green-700 font-semibold">Geneva DNA Analysis Tool</span>.
        </p>
      </div>
    </main>
  );
}
