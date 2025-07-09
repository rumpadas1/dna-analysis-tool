"use client";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Mutation {
  position: number;
  reference: string;
  sample: string;
}

export default function MutationDetectionPage() {
  const [sample, setSample] = useState("");
  const [reference, setReference] = useState("");
  const [result, setResult] = useState<{ total_mutations: number; mutations: Mutation[] } | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setResult(null);

    if (!reference.trim() || !sample.trim()) {
      setError("Both sample and reference sequences are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/mutation-detection/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference, sample }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to detect mutations");
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const chartData = result && {
    labels: result.mutations.map((m) => `Pos ${m.position}`),
    datasets: [
      {
        label: "Mutation",
        data: result.mutations.map(() => 1),
        backgroundColor: "#ec4899", // pink-500
        borderColor: "#be185d",     // pink-700
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-pink-400 drop-shadow">
          Mutation Detection
        </h1>
        <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto">
          Compare your sample DNA with a reference to detect genetic mutations using pattern matching.
        </p>

        <textarea
          className="w-full bg-black/30 text-white placeholder-gray-300 border border-pink-500 rounded-xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          rows={4}
          placeholder="Enter sample DNA sequence..."
          value={sample}
          onChange={(e) => setSample(e.target.value)}
        />

        <textarea
          className="w-full bg-black/30 text-white placeholder-gray-300 border border-pink-500 rounded-xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          rows={4}
          placeholder="Enter reference DNA sequence..."
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="mt-2 bg-pink-600 hover:bg-pink-500 text-white font-bold px-6 py-2 rounded-lg transition shadow-lg hover:shadow-pink-600/50"
        >
          Analyze
        </button>

        {error && (
          <p className="mt-4 text-red-400 font-medium">{error}</p>
        )}

        {result && (
          <div className="mt-16 text-left">
            <h2 className="text-2xl font-bold mb-6 text-pink-300 text-center">Mutation Results</h2>

            <div className="max-w-3xl mx-auto bg-black/20 p-6 rounded-xl shadow-md border border-pink-700">
              <p><span className="font-semibold text-pink-400">Total Mutations:</span> {result.total_mutations}</p>

              <ul className="mt-4 space-y-2">
                {result.mutations.map((mut, index) => (
                  <li key={index} className="bg-gray-800 p-3 rounded text-sm">
                    <span className="text-white">Position: {mut.position}</span> | 
                    <span className="text-blue-300"> Ref: {mut.reference}</span> → 
                    <span className="text-red-400"> Sample: {mut.sample}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <h3 className="text-pink-300 font-semibold text-center mb-3">Mutation Position Chart</h3>
                <div style={{ maxHeight: "300px" }}>
                  {chartData && (
                    <Bar
                      data={chartData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { labels: { color: "white" } },
                        },
                        scales: {
                          x: { ticks: { color: "white" } },
                          y: { ticks: { color: "white" } },
                        },
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
