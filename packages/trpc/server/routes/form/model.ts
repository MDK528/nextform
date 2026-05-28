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

export const createFieldInputModel = z.object({
  formId: z.uuid().describe('The UUID of the form that owns the field'),
  fieldName: z.string().min(1, 'Field name is required').max(20).describe('The label of the field'),
  fieldKey: z.string().optional().describe('Stable slug key for the field'),
  fieldType: z.enum(['TEXT', 'NUMBER', 'EMAIL', 'PASSWORD', 'SELECT']).describe('The type of the field'),
  options: z.array(z.string()).optional().describe('Select options for the field'),
  placeholder: z.string().max(30).optional().describe('The placeholder text for the field'),
  isRequired: z.boolean().optional().describe('Whether the field is required'),
  orderIndex: z.number().describe('The fractional sort index for the field'),
  description: z.string().optional().describe('Optional field description'),
});

export const createFieldOutputModel = z.object({
  id: z.uuid().describe('The ID of the created field'),
});

export const getFieldInputModel = z.object({
  formId: z.uuid().describe('The UUID of the field to fetch'),
});

export const getFieldOutputModel = z.array(
  z.object({
    id: z.uuid().describe('The UUID of the field'),
    formId: z.uuid().nullable().describe('The UUID of the form that owns the field'),
    fieldName: z.string().nullable().describe('The label of the field'),
    fieldKey: z.string().describe('The stable slug key of the field'),
    fieldType: z.enum(['TEXT', 'NUMBER', 'EMAIL', 'PASSWORD', 'SELECT']).nullable().describe('The type of the field'),
    options: z.array(z.string()).nullable().describe('Select options for the field'),
    placeholder: z.string().nullable().describe('The placeholder text for the field'),
    isRequired: z.boolean().describe('Whether the field is required'),
    orderIndex: z.number().describe('The fractional sort index for the field'),
    description: z.string().nullable().describe('Optional field description'),
    createdAt: z.date().nullable().describe('Creation timestamp'),
    updatedAt: z.date().nullable().describe('Last updated timestamp'),
  })
);


export const updateFieldInputModel = z.object({
  id: z.uuid().describe('The UUID of the field to update'),
  fieldName: z.string().min(1, 'Field name is required').max(20).optional().describe('The label of the field'),
  fieldType: z.enum(['TEXT', 'NUMBER', 'EMAIL', 'PASSWORD', 'SELECT']).optional().describe('The type of the field'),
  options: z.array(z.string()).optional().describe('Select options for the field'),
  placeholder: z.string().max(30).optional().describe('The placeholder text for the field'),
  isRequired: z.boolean().optional().describe('Whether the field is required'),
  orderIndex: z.number().describe('The fractional sort index for the field'),
  description: z.string().optional().describe('Optional field description'),
});


export const updateFieldOutputModel = z.object({
  id: z.uuid().describe('The UUID of the updated field'),
});

export const deleteFieldInputModel = z.object({
  fieldId: z.uuid().describe('The UUID of the field to delete'),
});

export const deleteFieldOutputModel = z.object({
  fieldId: z.uuid().describe('The UUID of the deleted field'),
});

export type CreateFormInputType = z.infer<typeof createFormInputModel>;
export type CreateFormOutputType = z.infer<typeof createFormOutputModel>;
 export type CreateFieldInputType = z.infer<typeof createFieldInputModel>;
 export type CreateFieldOutputType = z.infer<typeof createFieldOutputModel>;
 export type GetFieldInputType = z.infer<typeof getFieldInputModel>;
 export type GetFieldOutputType = z.infer<typeof getFieldOutputModel>;
 export type UpdateFieldInputType = z.infer<typeof updateFieldInputModel>;
 export type UpdateFieldOutputType = z.infer<typeof updateFieldOutputModel>;
 export type DeleteFieldInputType = z.infer<typeof deleteFieldInputModel>;
 export type DeleteFieldOutputType = z.infer<typeof deleteFieldOutputModel>;

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

export const getFormByIdInputModel = z.object({
  formId: z.uuid().describe('The ID of the form'),
});

export const getFormByIdOutputModel = z.object({
  id: z.uuid().describe('The ID of the form'),
  title: z.string().nullable().describe('The title of the form'),
  description: z.string().nullable().describe('Optional description of the form'),
  isPublished: z.boolean().nullable().describe('Whether the form is published'),
  visibility: z.enum(['PUBLIC', 'UNLISTED']).nullable().describe('Form visibility'),
  createdBy: z.uuid().nullable(),
  createdAt: z.date().nullable().describe('Creation timestamp'),
  updatedAt: z.date().nullable().describe('Last updated timestamp'),
  fields: z.array(
    z.object({
      id: z.uuid().describe('The UUID of the field to update'),
      fieldName: z.string().nullable().describe('The label of the field'),
      fieldType: z.enum(['TEXT', 'NUMBER', 'EMAIL', 'PASSWORD', 'SELECT']).nullable().describe('The type of the field'),
      options: z.array(z.string()).nullable().optional().describe('Select options for the field'),
      placeholder: z.string().nullable().describe('The placeholder text for the field'),
      isRequired: z.boolean().nullable().describe('Whether the field is required'),
      description: z.string().nullable().describe('Optional field description'),
      orderIndex: z.number().describe('The fractional sort index for the field'),
    })
  ),
});

export type GetFormByIdInput  = z.infer<typeof getFormByIdInputModel>;
export type GetFormByIdOutput = z.infer<typeof getFormByIdOutputModel>;