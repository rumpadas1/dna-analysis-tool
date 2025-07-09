'use client';

import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DiseasePrediction() {
  const [sequence, setSequence] = useState('');
  const [matchedDiseases, setMatchedDiseases] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    setMatchedDiseases([]);

    try {
      const res = await fetch('https://dna-analysis-tool.onrender.com/disease-prediction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sequence }),
      });

      const data = await res.json();
      if (data.matched_diseases.length === 0) {
        setError('No disease patterns found.');
      } else {
        setMatchedDiseases(data.matched_diseases);
      }
    } catch (err) {
      setError('Error while predicting disease.');
    }
  };

  const chartData = {
    labels: matchedDiseases,
    datasets: [
      {
        data: matchedDiseases.map(() => 1),
        backgroundColor: [
          '#e91e63', '#9c27b0', '#3f51b5',
          '#03a9f4', '#00bcd4', '#009688',
          '#4caf50', '#8bc34a', '#ffc107',
          '#ff5722', '#795548', '#607d8b',
          '#ff9800', '#cddc39', '#f44336'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-pink-400 drop-shadow">
          Disease Prediction
        </h1>
        <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto">
          Enter your DNA sequence to predict possible genetic disorders using pattern recognition.
        </p>

        <textarea
          className="w-full bg-black/30 text-white placeholder-gray-300 border border-pink-500 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          rows={5}
          placeholder="Type or paste your DNA sequence here..."
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="mt-6 bg-pink-600 hover:bg-pink-500 text-white font-bold px-6 py-2 rounded-lg transition shadow-lg hover:shadow-pink-600/50"
        >
          Predict
        </button>

        {error && (
          <p className="mt-4 text-red-400 font-medium">{error}</p>
        )}

        {matchedDiseases.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-pink-300">Matched Genetic Disorders</h2>
            <div className="max-w-md mx-auto bg-black/20 p-6 rounded-xl shadow-md border border-pink-700">
              <Pie data={chartData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
