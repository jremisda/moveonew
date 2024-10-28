import OpenAI from 'openai';
import { toast } from 'react-hot-toast';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateFlow(prompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a Moveo chatbot flow designer. Generate flows using these components:
            START WITH: Intent, Event, Fallback
            RESPOND WITH: Text, Image, Carousel, Webview, Video, File, Survey, URL
            OPERATIONS: Question, Jump to, Condition, Handover, Tag, Pause, Set variables, Reset variables, Resolve, Replay
            EXTENSIONS: Webhook, Google sheet, Email`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    toast.error(error.message || 'Failed to generate flow');
    return null;
  }
}