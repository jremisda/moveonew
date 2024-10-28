import React, { useState } from 'react';
import { claudeService } from '../lib/claude';
import type { Flow } from '../types/flow';
import PromptInput from './PromptInput';
import FlowCanvas from './FlowCanvas';
import Header from './Header';

export function FlowGenerator() {
  const [flow, setFlow] = useState<Flow | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePromptSubmit = async (prompt: string) => {
    setIsLoading(true);
    try {
      const generatedFlow = await claudeService.generateFlow(prompt);
      if (generatedFlow) {
        setFlow(generatedFlow);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <PromptInput onSubmit={handlePromptSubmit} isLoading={isLoading} />
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          {flow && !isLoading && (
            <FlowCanvas
              nodes={flow.nodes}
              connections={flow.connections}
              onNodeSelect={(id) => console.log('Selected node:', id)}
            />
          )}
        </div>
      </main>
    </div>
  );
}