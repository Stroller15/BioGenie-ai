"use server"

import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';
import {generateObject} from 'ai';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});


export async function generateBio(input: string, temperature:number, model: string) {
  console.log("it's hited")
    const { object: data } = await generateObject({
        model: groq(model),
        system: 'generate in most funniest way',
        prompt: input,
        maxTokens: 1024,
        temperature: temperature,

        schema: z.object({
          data: z.array(
            z.object({
              bio: z.string().describe('Add generated bio here!'),
              
            }),
          ),
        }),

      });
    
      return { data };
}