import { z } from 'zod'

export const CreateFormInput = z.object({
  createdBy: z.uuid().describe('The UUID of the user creating the form'),
  title: z.string().min(1).max(55).describe('The title of the form'),
  description: z.string().max(300).optional().describe('Optional description of the form'),
  isPublished: z.boolean().optional().describe('Whether the form is published'),
  visibility: z.enum(['PUBLIC', 'UNLISTED']).optional().describe('Form visibility'),
});

export type CreateFormInputType = z.infer<typeof CreateFormInput>;

export const listFormsByUserIdInput = z.object({
  userId: z.uuid().describe('The UUID of the user creating the form')
})

export type ListFormsByUserIdInputType = z.infer<typeof listFormsByUserIdInput>
