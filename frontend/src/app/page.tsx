"use client";

import React from "react";
import Link from "next/link";
import {
  Stethoscope,
  CheckCircle,
  Dna,
  FlaskConical,
  AlertTriangle,
  PieChart,
  SearchCode,
  FileText,
  LayoutGrid,
} from "lucide-react";

export default function ToolList() {
  const iconProps = { size: 36, color: "white" };

  const tools = [
    {
      name: "Disease Prediction",
      path: "disease-prediction",
      icon: <Stethoscope {...iconProps} />,
      bgColor: "from-emerald-700 to-emerald-800",
    },
    {
      name: "Clinical Significance",
      path: "clinical-significance",
      icon: <CheckCircle {...iconProps} />,
      bgColor: "from-teal-600 to-teal-700",
    },
    {
      name: "Sequence Translation",
      path: "sequence-translation",
      icon: <Dna {...iconProps} />,
      bgColor: "from-blue-600 to-blue-700",
    },
    {
      name: "Amino Acid Properties",
      path: "amino-acid-properties",
      icon: <LayoutGrid {...iconProps} />,
      bgColor: "from-yellow-600 to-yellow-700",
    },
    {
      name: "Protein Solubility",
      path: "protein-solubility",
      icon: <FlaskConical {...iconProps} />,
      bgColor: "from-indigo-600 to-indigo-700",
    },
    {
      name: "GC Content",
      path: "gc-content",
      icon: <FileText {...iconProps} />,
      bgColor: "from-orange-600 to-orange-700",
    },
    {
      name: "Mutation Detection",
      path: "mutation-detection",
      icon: <AlertTriangle {...iconProps} />,
      bgColor: "from-red-600 to-red-700",
    },
    {
      name: "Nucleotide Distribution",
      path: "nucleotide-distribution",
      icon: <PieChart {...iconProps} />,
      bgColor: "from-cyan-600 to-cyan-700",
    },
    {
      name: "Motif Pattern Search",
      path: "motif-pattern-search",
      icon: <SearchCode {...iconProps} />,
      bgColor: "from-purple-600 to-purple-700",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[100vh] flex items-center justify-center text-white border-b border-emerald-700 shadow-[0_8px_16px_#10b98133]">
        <div className="absolute top-0 left-0 w-full h-full z-[-1]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/vid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70" />
        </div>
        <div className="z-10 text-center px-4">
          <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-md">
            Welcome to Geneva
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-300 drop-shadow">
            Discover what your DNA says with our suite of
            powerful tools.           </p>
        </div>
      </section>

      {/* Tool Cards Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-950 to-gray-900 text-white">
        <h2 className="text-3xl font-bold text-center mb-14">Explore Our Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {tools.map((tool) => (
            <Link key={tool.name} href={`/${tool.path}`}>
              <div
                className={`
                  bg-gradient-to-tr ${tool.bgColor}
                  hover:ring-4 hover:ring-white hover:shadow-[0_0_25px_white]
                  transition duration-300 rounded-3xl p-8
                  shadow-xl hover:scale-105 cursor-pointer text-center
                  h-56 flex flex-col justify-center items-center border border-gray-700
                `}
              >
                <div className="mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold text-white">{tool.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
