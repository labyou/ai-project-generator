import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import { messages } from './messages'

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function createProjectStructure(projectName: string, projectDescription: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: messages.createStructureToConfirm.systemMessage,
        },
        {
          role: 'developer',
          content: messages.createStructureToConfirm.userMessage(projectName, projectDescription)
        },
      ],
    });

    const generatedStructure = response.choices[0]?.message.content || 'Error generating script';

    return generatedStructure;
  } catch (error) {
    console.error('Error generating project structure script:', error);
    throw error;
  }
}


export async function createStructureScript(projectName: string, projectDescription: string): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: messages.createNodeJSScript.systemMessage,
          },
          {
            role: 'developer',
            content: messages.createNodeJSScript.userMessage(projectName, projectDescription)
          },
        ],

      });
  
      const generatedScript = response.choices[0]?.message.content || 'Error generating script';

      return generatedScript;
    } catch (error) {
      console.error('Error generating project structure script:', error);
      throw error;
    }
  }

  export async function fixStructureScript(projectName: string, projectDescription: string, errorMessage: string): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: messages.fixNodeJSScript.systemMessage,
          },
          {
            role: 'developer',
            content: messages.fixNodeJSScript.userMessage(projectName, projectDescription)
          },
        ],

      });
  
      const generatedScript = response.choices[0]?.message.content || 'Error generating script';
      return generatedScript;
    } catch (error) {
      console.error('Error generating project structure script:', error);
      throw error;
    }
  }

  
