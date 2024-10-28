import React from 'react';
import { 
  Target, Flag, AlertCircle, // Start With
  MessageSquare, Image as ImageIcon, Layout, Globe, Video, FileText, ClipboardList, Link2, // Respond With
  HelpCircle, ArrowRightCircle, GitFork, HeadsetIcon, Tag, Pause, Variable, RotateCcw, CheckSquare, Repeat, // Operations
  Webhook, Table, Mail // Extensions
} from 'lucide-react';
import { FlowNode as FlowNodeType } from '../types/flow';

interface FlowNodeProps {
  node: FlowNodeType;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const FlowNode: React.FC<FlowNodeProps> = ({ node, onSelect, isSelected }) => {
  const getIcon = () => {
    switch (node.type) {
      // START WITH
      case 'INTENT': return <Target className="w-5 h-5" />;
      case 'EVENT': return <Flag className="w-5 h-5" />;
      case 'FALLBACK': return <AlertCircle className="w-5 h-5" />;
      
      // RESPOND WITH
      case 'TEXT': return <MessageSquare className="w-5 h-5" />;
      case 'IMAGE': return <ImageIcon className="w-5 h-5" />;
      case 'CAROUSEL': return <Layout className="w-5 h-5" />;
      case 'WEBVIEW': return <Globe className="w-5 h-5" />;
      case 'VIDEO': return <Video className="w-5 h-5" />;
      case 'FILE': return <FileText className="w-5 h-5" />;
      case 'SURVEY': return <ClipboardList className="w-5 h-5" />;
      case 'URL': return <Link2 className="w-5 h-5" />;
      
      // OPERATIONS
      case 'QUESTION': return <HelpCircle className="w-5 h-5" />;
      case 'JUMP': return <ArrowRightCircle className="w-5 h-5" />;
      case 'CONDITION': return <GitFork className="w-5 h-5" />;
      case 'HANDOVER': return <HeadsetIcon className="w-5 h-5" />;
      case 'TAG': return <Tag className="w-5 h-5" />;
      case 'PAUSE': return <Pause className="w-5 h-5" />;
      case 'SET_VARIABLES': return <Variable className="w-5 h-5" />;
      case 'RESET_VARIABLES': return <RotateCcw className="w-5 h-5" />;
      case 'RESOLVE': return <CheckSquare className="w-5 h-5" />;
      case 'REPLAY': return <Repeat className="w-5 h-5" />;
      
      // EXTENSIONS
      case 'WEBHOOK': return <Webhook className="w-5 h-5" />;
      case 'GOOGLE_SHEET': return <Table className="w-5 h-5" />;
      case 'EMAIL': return <Mail className="w-5 h-5" />;
      
      default: return <MessageSquare className="w-5 h-5" />;
    }
  };

  const getBadgeColor = () => {
    switch (node.category) {
      case 'START': return 'bg-purple-100 text-purple-800';
      case 'RESPOND': return 'bg-blue-100 text-blue-800';
      case 'OPERATIONS': return 'bg-yellow-100 text-yellow-800';
      case 'EXTENSIONS': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      style={{ transform: `translate(${node.position.x}px, ${node.position.y}px)` }}
      className={`absolute p-4 bg-white rounded-lg shadow-lg border-2 w-72 cursor-pointer transition-all
        ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'}`}
      onClick={() => onSelect(node.id)}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={`${isSelected ? 'text-blue-500' : 'text-gray-600'}`}>
          {getIcon()}
        </div>
        <span className="font-semibold flex-grow">{node.label}</span>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getBadgeColor()}`}>
          {node.type}
        </span>
      </div>
      <div className="text-sm text-gray-600 space-y-2">
        {Object.entries(node.config).map(([key, value]) => (
          <div key={key} className="bg-gray-50 p-2 rounded">
            <span className="font-medium text-gray-700">{key}:</span>{' '}
            {Array.isArray(value) ? (
              <div className="mt-1 space-y-1">
                {value.map((item, i) => (
                  <div key={i} className="pl-2 text-gray-600">• {String(item)}</div>
                ))}
              </div>
            ) : (
              <span className="text-gray-600">{String(value)}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowNode;