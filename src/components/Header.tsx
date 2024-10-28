import React from 'react';
import { BrainCircuit } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center space-x-3">
          <BrainCircuit className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Moveo Flow Designer</h1>
        </div>
      </div>
    </header>
  );
}