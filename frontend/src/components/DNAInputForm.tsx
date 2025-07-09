'use client';

import React, { useState } from 'react';

interface DNAInputFormProps {
  toolName: string;
  onSubmit: (sample: string, reference?: string) => void;
  showReferenceInput?: boolean;
  submitButtonText?: string;
  submitButtonClass?: string;
  inputBorderColor?: string;
  inputFocusRing?: string;
}

export default function DNAInputForm({
  toolName,
  onSubmit,
  showReferenceInput = false,
  submitButtonText = "Submit",
  submitButtonClass = "bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-700",
  inputBorderColor = "border-gray-500",
  inputFocusRing = "focus:ring-indigo-500"
}: DNAInputFormProps) {
  const [sample, setSample] = useState('');
  const [reference, setReference] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleSampleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSample(e.target.value);
    setFile(null);
  };

  const handleReferenceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReference(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setSample('');
  };

  const readFileContent = async () => {
    if (!file) return '';
    const allowedTypes = ['text/plain', 'text/csv'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only TXT or CSV files are allowed.');
      return '';
    }

    try {
      const text = await file.text();
      return text;
    } catch (err) {
      setError('Error reading file.');
      return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let input = sample;

    if (file) {
      input = await readFileContent();
    }

    if (!input.trim()) {
      setError('Please provide a DNA sequence.');
      return;
    }

    if (showReferenceInput && !reference.trim()) {
      setError('Please provide a reference sequence too.');
      return;
    }

    setError('');
    onSubmit(input.trim(), showReferenceInput ? reference.trim() : undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center capitalize">{toolName}</h1>

      {showReferenceInput && (
        <textarea
          value={reference}
          onChange={handleReferenceChange}
          placeholder="Enter reference DNA sequence"
          className={`w-full p-2 border ${inputBorderColor} rounded bg-gray-800 text-white ${inputFocusRing}`}
          rows={4}
        />
      )}

      <textarea
        value={sample}
        onChange={handleSampleChange}
        placeholder={showReferenceInput ? "Enter sample DNA sequence" : "Paste your DNA sequence here (A, T, G, C, U)"}
        className={`w-full p-2 border ${inputBorderColor} rounded bg-gray-800 text-white ${inputFocusRing}`}
        rows={5}
      />

      <input
        type="file"
        accept=".txt,.csv"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className={submitButtonClass}
      >
        {submitButtonText}
      </button>
    </form>
  );
}
