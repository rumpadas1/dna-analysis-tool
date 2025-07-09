'use client';
import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProteinSolubility() {
  const [sequence, setSequence] = useState('');
  const [solubility, setSolubility] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setSolubility(null);

    try {
      const response = await fetch('https://dna-analysis-tool.onrender.com/protein-solubility/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sequence })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error fetching solubility data');
      }

      const result = await response.json();
      setSolubility(result.solubility_index);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const chartData = solubility !== null ? {
    labels: ['Soluble (%)', 'Insoluble (%)'],
    datasets: [{
      data: [solubility, 100 - solubility],
      backgroundColor: ['#00b4d8', '#6a0572'],
      hoverOffset: 4
    }]
  } : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-pink-400 drop-shadow">
          Protein Solubility Predictor
        </h1>
        <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto">
          Analyze the solubility percentage of your protein sequence.
        </p>

        <textarea
          className="w-full bg-black/30 text-white placeholder-gray-300 border border-pink-500 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          rows={5}
          placeholder="Enter Amino Acid Sequence"
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="mt-6 bg-pink-600 hover:bg-pink-500 text-white font-bold px-6 py-2 rounded-lg transition shadow-lg hover:shadow-pink-500/50"
        >
          Submit
        </button>

        {error && (
          <p className="mt-4 text-red-400 font-medium">{error}</p>
        )}

        {chartData && (
          <div className="mt-16 w-full flex justify-center">
            <div className="bg-black/20 p-4 rounded-xl shadow border border-pink-700">
              <div className="w-[500px] h-[300px]">
                <Doughnut
                  data={chartData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        labels: { color: 'white', font: { size: 10 } }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
