"use client";
import { useState } from "react";
import DNAInputForm from "@/components/DNAInputForm";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function MotifPatternSearchPage() {
  const [pattern, setPattern] = useState("");
  const [result, setResult] = useState<{ pattern: string; matches: number[]; count: number } | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (sequence: string) => {
    setResult(null);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/motif-pattern-search/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sequence, pattern }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to search pattern");

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const chartData = result && {
    labels: result.matches.map((pos) => `Pos ${pos}`),
    datasets: [
      {
        label: `Pattern "${result.pattern}" Occurrences`,
        data: result.matches.map(() => 1),
        backgroundColor: "#f472b6", // pink-400
        borderColor: "#be185d",     // pink-800
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-pink-400 drop-shadow">
          Motif / Pattern Search
        </h1>
        <div className="h-1 w-32 mx-auto mb-6 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 rounded-full"></div>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-center">
          This tool searches for specific nucleotide patterns in a DNA sequence and highlights all match positions.
        </p>

        <input
          type="text"
          placeholder="Enter pattern (e.g. ATG)"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          className="w-full max-w-lg mx-auto mb-6 p-3 text-white bg-gray-800 border border-pink-500 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <DNAInputForm
          toolName=""
          onSubmit={handleSubmit}
          submitButtonClass="bg-pink-600 hover:bg-pink-500 text-white font-bold px-6 py-2 rounded-lg transition shadow-lg hover:shadow-pink-500/50"
          submitButtonText="Analyze"
          inputBorderColor="border-pink-500"
          inputFocusRing="focus:ring-pink-400"
        />

        {error && (
          <p className="mt-6 text-red-400 font-medium">{error}</p>
        )}

        {result && (
          <div className="mt-12">
            <div className="bg-black/20 p-6 rounded-xl border border-pink-700 text-left shadow">
              <h2 className="text-2xl font-semibold mb-4 text-pink-300">Results</h2>
              <p><span className="font-semibold text-pink-400">Pattern:</span> {result.pattern}</p>
              <p><span className="font-semibold text-pink-400">Total Matches:</span> {result.count}</p>
              <p><span className="font-semibold text-pink-400">Match Positions:</span> {result.matches.join(", ")}</p>
            </div>

            <div className="mt-10 flex justify-center">
              <div className="p-4 bg-black/20 rounded-xl border border-pink-700 shadow w-full max-w-2xl">
                <h3 className="text-pink-300 font-semibold text-center mb-3">Pattern Match Positions</h3>
                <Bar data={chartData} options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      labels: { color: "white" }
                    }
                  },
                  scales: {
                    x: { ticks: { color: "white" }},
                    y: { ticks: { color: "white" }}
                  }
                }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
