'use server';
/**
 * @fileOverview An AI assistant for Super Admins to summarize flagged content and user reports,
 * and suggest initial moderation actions.
 *
 * - aiModerationAssistant - A function that handles the AI moderation assistance process.
 * - AiModerationAssistantInput - The input type for the aiModerationAssistant function.
 * - AiModerationAssistantOutput - The return type for the aiModerationAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiModerationAssistantInputSchema = z.object({
  flaggedContent: z.string().describe('The content that has been flagged for moderation.'),
  userReports: z.array(z.string()).describe('A list of user reports related to the flagged content.'),
});
export type AiModerationAssistantInput = z.infer<typeof AiModerationAssistantInputSchema>;

const AiModerationAssistantOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the flagged content and user reports.'),
  suggestedActions: z.array(z.string()).describe('A list of suggested moderation actions based on the summary.'),
});
export type AiModerationAssistantOutput = z.infer<typeof AiModerationAssistantOutputSchema>;

export async function aiModerationAssistant(input: AiModerationAssistantInput): Promise<AiModerationAssistantOutput> {
  return aiModerationAssistantFlow(input);
}

const moderationPrompt = ai.definePrompt({
  name: 'moderationAssistantPrompt',
  input: {schema: AiModerationAssistantInputSchema},
  output: {schema: AiModerationAssistantOutputSchema},
  prompt: `You are an AI assistant designed to help Super Admins efficiently moderate content on the PLXYGROUND platform. Your task is to analyze flagged content and associated user reports, then provide a summary and suggest initial moderation actions.

Flagged Content:
{{{flaggedContent}}}

User Reports:
{{#each userReports}}
- {{{this}}}
{{else}}
No specific user reports provided for this content.
{{/each}}

Based on the above, please provide:
1. A concise summary of the flagged content and the concerns raised by user reports.
2. A list of suggested initial moderation actions. Consider common moderation practices such as reviewing content, suspending users, issuing warnings, or escalating to a human moderator.`,
});

const aiModerationAssistantFlow = ai.defineFlow(
  {
    name: 'aiModerationAssistantFlow',
    inputSchema: AiModerationAssistantInputSchema,
    outputSchema: AiModerationAssistantOutputSchema,
  },
  async input => {
    const {output} = await moderationPrompt(input);
    return output!;
  }
);
