import React from 'react';
import { Flow } from '../types/flow';
import { ListOrdered } from 'lucide-react';

interface FlowSummaryProps {
  flow: Flow;
}

const FlowSummary: React.FC<FlowSummaryProps> = ({ flow }) => {
  const getStepDescription = (node: Flow['nodes'][0], index: number) => {
    switch (node.type) {
      case 'INTENT':
        return (
          <div>
            <p>Create "{node.label}" intent with training phrases:</p>
            <ul className="mt-2 ml-4 list-disc text-sm text-gray-600">
              {node.config.utterances.slice(0, 5).map((u: string, i: number) => (
                <li key={i}>{u}</li>
              ))}
              <li className="text-blue-600">+{node.config.utterances.length - 5} more phrases</li>
            </ul>
            <p className="mt-2 text-sm text-amber-600">
              Note: Minimum 10 training phrases required
            </p>
          </div>
        );
      case 'QUESTION':
        return `Ask for ${node.label.toLowerCase()} with validation: ${node.config.validation}`;
      case 'CONDITION':
        return `Check ${node.config.variable} with conditions: ${node.config.conditions.join(', ')}`;
      case 'TEXT':
        return `Display message: "${node.config.text}"`;
      case 'FALLBACK':
        return `Handle error with message: "${node.config.text}"`;
      default:
        return `Configure ${node.type.toLowerCase()} node: ${node.label}`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <ListOrdered className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Implementation Steps</h2>
      </div>
      <ol className="space-y-6">
        {flow.nodes.map((node, index) => (
          <li key={node.id} className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
              {index + 1}
            </span>
            <div className="flex-grow">{getStepDescription(node, index)}</div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default FlowSummary;