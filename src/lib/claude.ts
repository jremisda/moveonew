import { Anthropic } from '@anthropic-ai/sdk';
import { toast } from 'react-hot-toast';
import type { Flow } from '../types/flow';

class ClaudeService {
  private anthropic: Anthropic;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
    });
  }

  async generateFlow(prompt: string): Promise<Flow | null> {
    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 4096,
        temperature: 0.7,
        system: `You are a Moveo chatbot flow designer. Generate flows using these components:
          START WITH: Intent, Event, Fallback
          RESPOND WITH: Text, Image, Carousel, Webview, Video, File, Survey, URL
          OPERATIONS: Question, Jump to, Condition, Handover, Tag, Pause, Set variables, Reset variables, Resolve, Replay
          EXTENSIONS: Webhook, Google sheet, Email
          
          Return the response as a valid JSON object with nodes and connections.
          Each Intent node must have at least 10 training phrases.`,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      const content = response.content[0].text;
      if (!content) {
        throw new Error('No content received from Claude');
      }

      try {
        return JSON.parse(content) as Flow;
      } catch (parseError) {
        console.error('Failed to parse Claude response:', parseError);
        toast.error('Invalid response format from AI');
        return null;
      }
    } catch (error: any) {
      console.error('Claude API Error:', error);
      toast.error(error.message || 'Failed to generate flow');
      return null;
    }
  }
}

export const claudeService = new ClaudeService();