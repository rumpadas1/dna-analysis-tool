'use client';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(res.ok ? 'Signup successful!' : data.detail || 'Signup failed');
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-900 p-6 rounded-xl shadow-lg">
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full px-4 py-2 rounded bg-zinc-800 text-white"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 rounded bg-zinc-800 text-white pr-10 
              [appearance:textfield] [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-400 hover:text-white"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 py-2 rounded">
          Sign Up
        </button>
        <p className="text-sm mt-2">{message}</p>
      </form>
    </main>
  );
}
