"use client";

import React, { useState } from "react";

export default function SequenceTranslationPage() {
  const [sequence, setSequence] = useState('');
  const [protein, setProtein] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setProtein('');
    setError('');

    try {
      const res = await fetch('https://dna-analysis-tool.onrender.com/sequence-translation/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sequence }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Translation failed');
      }

      setProtein(data.protein || data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-pink-400 drop-shadow">
          Sequence Translation
        </h1>
        <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto">
          Translate your DNA sequence into a corresponding protein sequence.
        </p>

        <textarea
          className="w-full bg-black/30 text-white placeholder-gray-300 border border-pink-500 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          rows={5}
          placeholder="Paste your DNA sequence here..."
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="mt-6 bg-pink-600 hover:bg-pink-500 text-white font-bold px-6 py-2 rounded-lg transition shadow-lg hover:shadow-pink-500/50"
        >
          Translate
        </button>

        {error && (
          <p className="mt-4 text-red-400 font-medium">{error}</p>
        )}

        {protein && (
          <div className="mt-16 text-left">
            <h2 className="text-2xl font-bold mb-4 text-pink-300">Translated Protein</h2>
            <div className="bg-black/20 p-6 rounded-xl shadow border border-pink-700">
              <p className="text-gray-200 break-words">{protein}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
