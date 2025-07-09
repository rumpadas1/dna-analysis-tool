import React from "react";
import { Github, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#7f1d1d] text-white py-10 px-10">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xl font-bold mb-3 text-yellow-300">
          © 2025 Geneva – DNA Analysis Tool
        </p>
        <p className="text-sm mb-6 text-gray-200">
           Team Geneva | All Rights Reserved
        </p>
        <div className="flex justify-center space-x-6 text-gray-200">
          <a
            href="https://github.com/rumpadas1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition"
          >
            <Github size={22} />
          </a>
          <a
            href="https://x.com/teamgeneva_in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition"
            aria-label="X (formerly Twitter)"
          >
            <Twitter size={22} />
          </a>
          <a
            href="https://instagram.com/teamgeneva.india"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition"
          >
            <Instagram size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
}
