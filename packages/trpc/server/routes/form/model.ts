import { z } from 'zod'

export const createFormInputModel = z.object({
  title: z.string().min(1, 'Title is required').max(55).describe('The title of the form'),
  description: z.string().max(300).optional().describe('Optional description of the form'),
  isPublished: z.boolean().optional().describe('Whether the form is published'),
  visibility: z.enum(['PUBLIC', 'UNLISTED']).optional().describe('Form visibility'),
});

export const createFormOutputModel = z.object({
  id: z.uuid().describe('The ID of the created form'),
});

export type CreateFormInputType = z.infer<typeof createFormInputModel>;
export type CreateFormOutputType = z.infer<typeof createFormOutputModel>;

export const listFormsOutputModel = z.array(
  z.object({
    id: z.uuid().describe('The ID of the form'),
    title: z.string().nullable().describe('The title of the form'),
    description: z.string().nullable().describe('Optional description of the form'),
    isPublished: z.boolean().nullable().describe('Whether the form is published'),
    visibility: z.enum(['PUBLIC', 'UNLISTED']).nullable().describe('Form visibility'),
    createdAt: z.date().nullable().describe('Creation timestamp'),
    updatedAt: z.date().nullable().describe('Last updated timestamp')
  })
)

export type ListFormsOutputModel = z.infer<typeof listFormsOutputModel>