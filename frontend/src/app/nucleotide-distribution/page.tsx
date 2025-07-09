"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const Pie = dynamic(() => import("react-chartjs-2").then(mod => mod.Pie), {
  ssr: false,
});

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function NucleotideDistributionPage() {
  const [sequence, setSequence] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setResult(null);

    try {
      const res = await fetch("https://dna-analysis-tool.onrender.com/nucleotide-distribution/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sequence }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to calculate distribution");

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-pink-400 drop-shadow">
          Nucleotide Distribution
        </h1>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-center">
  This tool calculates the percentage composition of each nucleotide (A, T, G, C) in a given DNA.
</p>

        <textarea
          className="w-full max-w-2xl mx-auto block p-4 bg-gray-800 text-white border-2 border-pink-500 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          rows={6}
          placeholder="Enter DNA sequence (A, T, G, C)"
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="mt-6 bg-pink-600 hover:bg-pink-500 text-white font-bold px-6 py-2 rounded-lg transition shadow-lg hover:shadow-pink-500/50"
        >
          Analyze
        </button>

        {error && (
          <div className="mt-6 bg-red-700 p-4 rounded text-white font-medium">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-12">
            <div className="bg-black/20 p-6 rounded-xl border border-pink-700 text-left shadow">
              <h2 className="text-2xl font-semibold mb-4 text-pink-300">
                Distribution Results (Total: {result.total_length} bases)
              </h2>
              <ul className="space-y-1">
                {Object.entries(result.distribution).map(([base, percent]: any) => (
                  <li key={base} className="text-white">
                    <span className="text-pink-400 font-semibold">{base}:</span> {percent}%
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex justify-center">
              <div className="p-4 bg-black/20 rounded-xl border border-pink-700 shadow">
                <h3 className="text-pink-300 font-semibold text-center mb-3">
                  Nucleotide Pie Chart
                </h3>
                <div style={{ width: "250px", height: "250px" }}>
                  <Pie
                    data={{
                      labels: Object.keys(result.distribution),
                      datasets: [
                        {
                          label: "% Composition",
                          data: Object.values(result.distribution),
                          backgroundColor: ["#e91e63", "#f06292", "#ba68c8", "#4fc3f7"],
                          borderColor: "#222",
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          labels: {
                            color: "white",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
