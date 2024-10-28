import React from 'react';
import { Toaster } from 'react-hot-toast';
import { FlowGenerator } from './components/FlowGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <FlowGenerator />
    </div>
  );
}

export default App;