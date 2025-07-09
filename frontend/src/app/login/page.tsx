'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Login successful!');
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('username', form.username);
      window.dispatchEvent(new Event('storage'));

      setTimeout(() => {
        router.push('/');
      }, 1000);
    } else {
      setMessage(data.detail || 'Login failed');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-950 via-black to-green-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-green-400">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-900 p-6 rounded-xl shadow-2xl w-80">
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full px-4 py-2 rounded bg-zinc-800 text-white placeholder-gray-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2 rounded bg-zinc-800 text-white placeholder-gray-400"
          required
        />
        <button type="submit" className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded">
          Login
        </button>
        <p className="text-sm mt-2 text-center text-yellow-400">{message}</p>
      </form>
    </main>
  );
}
