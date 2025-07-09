'use client';

import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AminoAcidProperties() {
  const [sequence, setSequence] = useState('');
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setChartData(null);

    try {
      const response = await fetch('https://dna-analysis-tool.onrender.com/amino-acid-properties/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sequence })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error fetching data');
      }

      const result = await response.json();

      const labels = Object.keys(result.hydrophobicity);
      const values = Object.values(result.hydrophobicity);

      const colors = labels.map((aa) => {
        switch (aa) {
          case 'A': return '#ff4b5c';
          case 'R': return '#5643fa';
          case 'N': return '#fcbf49';
          case 'D': return '#2ec4b6';
          case 'C': return '#6a0572';
          default: return '#9d4edd';
        }
      });

      setChartData({
        labels,
        datasets: [
          {
            label: 'Hydrophobicity',
            data: values,
            backgroundColor: colors
          }
        ]
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-pink-400 drop-shadow">
          Amino Acid Properties
        </h1>
        <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto">
          Enter your amino acid sequence to visualize hydrophobicity.
        </p>

        <textarea
          className="w-full bg-black/30 text-white placeholder-gray-300 border border-pink-500 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          rows={5}
          placeholder="Enter Amino Acid Sequence (e.g., ARNDCEQGHILKMFPSTWYV)"
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
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-4 text-pink-300">Hydrophobicity Chart</h2>
            <div className="bg-black/20 p-6 rounded-xl shadow border border-pink-700">
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      labels: { color: 'white' }
                    },
                    title: {
                      display: false
                    }
                  },
                  scales: {
                    x: {
                      ticks: { color: 'white' }
                    },
                    y: {
                      ticks: { color: 'white' }
                    }
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
