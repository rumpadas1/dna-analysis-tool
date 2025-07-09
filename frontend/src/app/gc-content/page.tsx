"use client";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import DNAInputForm from "@/components/DNAInputForm";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GcContentPage() {
  const [result, setResult] = useState<null | {
    gc_content_percent: number;
    length: number;
    gc_count: number;
  }>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (sequence: string) => {
    setResult(null);
    setError("");

    try {
      const res = await fetch("https://dna-analysis-tool.onrender.com/gc-content/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sequence }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to calculate GC content");

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const chartData =
    result !== null
      ? {
          labels: ["GC Content", "AT Content"],
          datasets: [
            {
              label: "Base Pair Composition",
              data: [result.gc_count, result.length - result.gc_count],
              backgroundColor: ["#ec4899", "#6a0572"],
              borderColor: ["#ec4899", "#6a0572"],
              borderWidth: 1,
            },
          ],
        }
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-pink-400 drop-shadow">
          GC Content
        </h1>

        <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto">
          Calculate the GC content of your DNA sequence to understand its base composition.
        </p>

        <DNAInputForm
          toolName=""
          onSubmit={handleSubmit}
          submitButtonText="Analyze"
          submitButtonClass="bg-pink-600 hover:bg-pink-500 text-white font-bold px-6 py-2 rounded-lg transition shadow-lg hover:shadow-pink-500/50"
          inputBorderColor="border-pink-500"
          inputFocusRing="focus:ring-pink-400"
        />

        {error && (
          <p className="mt-6 text-red-400 font-medium">{error}</p>
        )}

        {result && (
          <div className="mt-12 text-left">
            <div className="bg-black/20 p-6 rounded-xl border border-pink-700 shadow">
              <h2 className="text-2xl font-semibold mb-4 text-pink-300">Results</h2>
              <p><span className="font-semibold text-pink-400">GC Content:</span> {result.gc_content_percent}%</p>
              <p><span className="font-semibold text-pink-400">GC Count:</span> {result.gc_count}</p>
              <p><span className="font-semibold text-pink-400">Total Length:</span> {result.length}</p>
            </div>

            {chartData && (
              <div className="mt-10 flex justify-center">
                <div className="p-4 bg-black/20 rounded-xl border border-pink-700 shadow">
                  <h3 className="text-pink-300 font-semibold text-center mb-3">GC vs AT Distribution</h3>
                  <div style={{ width: "250px", height: "250px" }}>
                    <Pie data={chartData} options={{ maintainAspectRatio: false }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
