'use server';
/**
 * @fileOverview An AI content optimization agent for titles and descriptions.
 *
 * - aiContentOptimizer - A function that optimizes content titles and descriptions.
 * - AiContentOptimizerInput - The input type for the aiContentOptimizer function.
 * - AiContentOptimizerOutput - The return type for the aiContentOptimizer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiContentOptimizerInputSchema = z.object({
  originalTitle: z.string().describe('The original title of the content.'),
  originalDescription: z
    .string()
    .describe('The original description of the content.'),
});
export type AiContentOptimizerInput = z.infer<
  typeof AiContentOptimizerInputSchema
>;

const AiContentOptimizerOutputSchema = z.object({
  optimizedTitle: z.string().describe('The AI-suggested optimized title.'),
  optimizedDescription: z
    .string()
    .describe('The AI-suggested optimized description.'),
});
export type AiContentOptimizerOutput = z.infer<
  typeof AiContentOptimizerOutputSchema
>;

export async function aiContentOptimizer(
  input: AiContentOptimizerInput
): Promise<AiContentOptimizerOutput> {
  return aiContentOptimizerFlow(input);
}

const aiContentOptimizerFlow = ai.defineFlow(
  {
    name: 'aiContentOptimizerFlow',
    inputSchema: AiContentOptimizerInputSchema,
    outputSchema: AiContentOptimizerOutputSchema,
  },
  async input => {
    const {output} = await ai.generate({
      prompt: `You are an expert content optimizer for sports creator content on the PLXYGROUND platform.
Your goal is to make content more discoverable and engaging for fans.

Analyze the provided original title and description and suggest an optimized version for both.
Focus on clarity, keywords, and hooks that would attract a sports audience.
Keep the suggestions concise and impactful.

Original Title: ${input.originalTitle}
Original Description: ${input.originalDescription}`,
      output: {schema: AiContentOptimizerOutputSchema},
    });
    return output!;
  }
);
