import OpenAI from 'openai';
import { Flow, FlowNode } from '../types/flow';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface AIResponse {
  flow: Flow;
  error?: string;
}

export async function generateFlow(prompt: string): Promise<AIResponse> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a Moveo chatbot flow designer. Create flows using these components:
            START WITH: Intent, Event, Fallback
            RESPOND WITH: Text, Image, Carousel, Webview, Video, File, Survey, URL
            OPERATIONS: Question, Jump to, Condition, Handover, Tag, Pause, Set Variables, Reset Variables, Resolve, Replay
            EXTENSIONS: Webhook, Google Sheet, Email
            
            For each Intent, provide at least 10 training phrases.
            Ensure proper flow connections and error handling.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const flowData = JSON.parse(completion.choices[0].message.content || '{}');
    return processAIResponse(flowData, prompt);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return { 
      flow: createEmptyFlow(),
      error: 'Failed to generate flow. Please check your API key and try again.' 
    };
  }
}

function processAIResponse(data: any, originalPrompt: string): AIResponse {
  // Transform the AI response into our Flow format
  const nodes: FlowNode[] = [];
  const connections: Flow['connections'] = [];
  let xPosition = 50;
  let lastNodeId = '';

  // Process nodes and connections from AI response
  if (data.nodes) {
    data.nodes.forEach((node: any, index: number) => {
      const newNode: FlowNode = {
        id: crypto.randomUUID(),
        type: node.type,
        label: node.label,
        config: node.config,
        position: { x: xPosition, y: 200 + (index % 2) * 200 },
        category: node.category
      };
      nodes.push(newNode);

      if (lastNodeId) {
        connections.push({
          source: lastNodeId,
          target: newNode.id,
          label: node.connection_label || 'next'
        });
      }

      lastNodeId = newNode.id;
      xPosition += 350;
    });
  }

  return {
    flow: {
      id: crypto.randomUUID(),
      name: data.name || generateFlowName(originalPrompt),
      description: originalPrompt,
      nodes,
      connections,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  };
}

function createEmptyFlow(): Flow {
  return {
    id: crypto.randomUUID(),
    name: 'New Flow',
    description: '',
    nodes: [],
    connections: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function generateFlowName(prompt: string): string {
  const words = prompt.split(' ')
    .filter(w => w.length > 3)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .slice(0, 3)
    .join(' ');
  return `${words} Flow`;
}