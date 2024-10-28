import React, { useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import { Node, Flow } from '../types/flow';
import { toast } from 'react-hot-toast';

interface FlowCanvasProps {
  nodes: Node[];
  connections: Flow['connections'];
  onNodeSelect: (id: string) => void;
}

export default function FlowCanvas({ nodes, connections, onNodeSelect }: FlowCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (canvasRef.current) {
      try {
        const dataUrl = await toPng(canvasRef.current);
        const link = document.createElement('a');
        link.download = 'moveo-flow.png';
        link.href = dataUrl;
        link.click();
      } catch (err) {
        toast.error('Failed to download image');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Flow Diagram</h2>
        <button
          onClick={downloadImage}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Download className="h-4 w-4" />
          <span>Download PNG</span>
        </button>
      </div>
      
      <div ref={canvasRef} className="min-h-[600px] p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-wrap gap-8">
          {nodes.map((node) => (
            <div
              key={node.id}
              onClick={() => onNodeSelect(node.id)}
              className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="text-sm font-medium text-gray-500">{node.category}</div>
              <div className="text-lg font-semibold">{node.label}</div>
              <div className="mt-2 text-sm text-gray-600">
                {node.type === 'INTENT' && node.config.utterances && (
                  <div>
                    <div className="font-medium">Training Phrases:</div>
                    <ul className="list-disc list-inside">
                      {node.config.utterances.slice(0, 3).map((phrase, i) => (
                        <li key={i}>{phrase}</li>
                      ))}
                      {node.config.utterances.length > 3 && (
                        <li>+{node.config.utterances.length - 3} more...</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}