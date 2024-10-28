import React from 'react';
import { FlowNode, Connection } from '../types/flow';

interface FlowConnectionsProps {
  connections: Connection[];
  nodes: FlowNode[];
}

const FlowConnections: React.FC<FlowConnectionsProps> = ({ connections, nodes }) => {
  const getNodeCenter = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };
    
    return {
      x: node.position.x + 144,
      y: node.position.y + 40,
    };
  };

  return (
    <svg className="absolute inset-0 pointer-events-none" width="2000" height="1000">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="#64748b"
          />
        </marker>
      </defs>
      {connections.map(({ source, target, label }, index) => {
        const start = getNodeCenter(source);
        const end = getNodeCenter(target);
        
        // Calculate control points for straight-ish horizontal paths
        const distance = end.x - start.x;
        const midX = start.x + distance * 0.5;
        
        const path = `
          M ${start.x} ${start.y}
          C ${midX} ${start.y},
            ${midX} ${end.y},
            ${end.x} ${end.y}
        `;
        
        return (
          <g key={`${source}-${target}-${index}`}>
            <path
              d={path}
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            {label && (
              <text
                x={midX}
                y={(start.y + end.y) / 2 - 10}
                textAnchor="middle"
                className="fill-slate-600 text-sm font-medium"
                style={{ fontSize: '12px' }}
              >
                <tspan dy="-5" className="bg-white px-2 py-1">{label}</tspan>
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default FlowConnections;