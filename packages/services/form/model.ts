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

export const fieldTypeEnum = z.enum(['TEXT', 'NUMBER', 'EMAIL', 'PASSWORD', 'SELECT']);

export const CreateFormFieldInput = z.object({
  formId: z.uuid().describe('The UUID of the form that owns the field'),
  fieldName: z.string().min(1).max(20).describe('The label of the field'),
  fieldKey: z.string().optional().describe('Stable slug key for the field'),
  fieldType: fieldTypeEnum.describe('The type of the field'),
  options: z.array(z.string()).optional().describe('Select options for the field'),
  placeholder: z.string().max(30).optional().describe('The placeholder text for the field'),
  isRequired: z.boolean().optional().describe('Whether the field is required'),
  orderIndex: z.string().describe('The fractional sort index for the field'),
  description: z.string().optional().describe('Optional field description'),
});

export type CreateFormFieldInputType = z.infer<typeof CreateFormFieldInput>;

export const DeleteFormFieldInput = z.object({
  fieldId: z.uuid().describe('The UUID of the field to delete'),
});

export type DeleteFormFieldInputType = z.infer<typeof DeleteFormFieldInput>;

export const GetFormFieldInput = z.object({
  fieldId: z.uuid().describe('The UUID of the field to fetch'),
});

export type GetFormFieldInputType = z.infer<typeof GetFormFieldInput>;

export const UpdateFormFieldInput = z.object({
  id: z.uuid().describe('The UUID of the field to update'),
  fieldName: z.string().min(1).max(20).optional().describe('The label of the field'),
  fieldType: fieldTypeEnum.optional().describe('The type of the field'),
  options: z.array(z.string()).optional().describe('Select options for the field'),
  placeholder: z.string().max(30).optional().describe('The placeholder text for the field'),
  isRequired: z.boolean().optional().describe('Whether the field is required'),
  orderIndex: z.number().optional().describe('The fractional sort index for the field'),
  description: z.string().optional().describe('Optional field description'),
});

export type UpdateFormFieldInputType = z.infer<typeof UpdateFormFieldInput>;
