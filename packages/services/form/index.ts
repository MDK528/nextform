import { db, eq, asc } from "@repo/database";
import { formsTable, formFieldsTable } from "@repo/database/schema";
import {
  CreateFormInput,
  CreateFormInputType,
  listFormsByUserIdInput,
  ListFormsByUserIdInputType,
  CreateFormFieldInput,
  CreateFormFieldInputType,
  DeleteFormFieldInput,
  DeleteFormFieldInputType,
  GetFormFieldInput,
  GetFormFieldInputType,
  UpdateFormFieldInput,
  UpdateFormFieldInputType,
  GetFormByIdInputModel,
  GetFormByIdInputType,
  GetFormByIdOutputType
} from "./model";

class FormService {
  private generateFieldKey(fieldName: string) {
    return fieldName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/^-+|-+$/g, "");
  }

  public async createForm(payload: CreateFormInputType) {
    const { createdBy, title, description, isPublished = false, visibility = 'PUBLIC' } = await CreateFormInput.parseAsync(payload);

    const result = await db.insert(formsTable).values({ createdBy, title, description, isPublished, visibility }).returning({ id: formsTable.id });

    const formId = result?.[0]?.id;
    if (!result || result.length === 0 || !formId) throw new Error('Failed to create form');

    return { id: formId };
  }

  public async listFormsByUserId(payload: ListFormsByUserIdInputType) {

    const { userId } = await listFormsByUserIdInput.parseAsync(payload)

    const forms = await db.select({
      id: formsTable.id,
      title: formsTable.title,
      description: formsTable.description,
      isPublished: formsTable.isPublished,
      visibility: formsTable.visibility,
      createdAt: formsTable.createdAt,
      updatedAt: formsTable.updatedAt
    }).from(formsTable).where(eq(formsTable.createdBy, userId))

    return forms
  }

  public async createField(payload: CreateFormFieldInputType) {
    const {
      formId,
      fieldName,
      fieldKey,
      fieldType,
      options = [],
      placeholder,
      isRequired = false,
      orderIndex,
      description,
    } = await CreateFormFieldInput.parseAsync(payload);

    const slugKey = fieldKey?.trim() || this.generateFieldKey(fieldName);
    const result = await db.insert(formFieldsTable).values({
      formId,
      fieldName,
      fieldKey: slugKey,
      fieldType,
      options,
      placeholder,
      isRequired,
      orderIndex,
      description,
    }).returning({ id: formFieldsTable.id });

    const fieldId = result?.[0]?.id;
    if (!result || result.length === 0 || !fieldId) throw new Error('Failed to create field');

    return { id: fieldId };
  }

  public async deleteField(payload: DeleteFormFieldInputType) {
    const { fieldId } = await DeleteFormFieldInput.parseAsync(payload);

    const existing = await db.select({ id: formFieldsTable.id }).from(formFieldsTable).where(eq(formFieldsTable.id, fieldId));
    if (!existing || existing.length === 0) throw new Error('Field not found');

    await db.delete(formFieldsTable).where(eq(formFieldsTable.id, fieldId));
    return { fieldId };
  }

  public async updateField(payload: UpdateFormFieldInputType) {
    const { id, fieldName, fieldType, options, placeholder, isRequired, orderIndex, description } = await UpdateFormFieldInput.parseAsync(payload);

    const updates: Record<string, unknown> = {};
    if (fieldName !== undefined) updates.fieldName = fieldName;
    if (fieldType !== undefined) updates.fieldType = fieldType;
    if (options !== undefined) updates.options = options;
    if (placeholder !== undefined) updates.placeholder = placeholder;
    if (isRequired !== undefined) updates.isRequired = isRequired;
    if (orderIndex !== undefined) updates.orderIndex = orderIndex;
    if (description !== undefined) updates.description = description;

    if (Object.keys(updates).length === 0) throw new Error('No field properties provided to update');

    const existing = await db.select({ id: formFieldsTable.id }).from(formFieldsTable).where(eq(formFieldsTable.id, id));
    if (!existing || existing.length === 0) throw new Error('Field not found');

    await db.update(formFieldsTable).set(updates).where(eq(formFieldsTable.id, id));

    return { id };
  }

  public async getFields(payload: GetFormFieldInputType) {
    const { formId } = await GetFormFieldInput.parseAsync(payload);

    const fields = await db.select({
      id: formFieldsTable.id,
      formId: formFieldsTable.formId,
      fieldName: formFieldsTable.fieldName,
      fieldKey: formFieldsTable.fieldKey,
      fieldType: formFieldsTable.fieldType,
      options: formFieldsTable.options,
      placeholder: formFieldsTable.placeholder,
      isRequired: formFieldsTable.isRequired,
      orderIndex: formFieldsTable.orderIndex,
      description: formFieldsTable.description,
      createdAt: formFieldsTable.createdAt,
      updatedAt: formFieldsTable.updatedAt,
    }).from(formFieldsTable).where(eq(formFieldsTable.formId, formId));

    return fields;
  }

  public async getFormById(payload: GetFormByIdInputType){
    const { formId } = await GetFormByIdInputModel.parseAsync(payload)

    const result = await db.select({
      id: formsTable.id,
      title: formsTable.title,
      description: formsTable.description,
      isPublished: formsTable.isPublished,
      visibility: formsTable.visibility,
      createdBy: formsTable.createdBy,
      createdAt: formsTable.createdAt,
      updatedAt: formsTable.updatedAt,
      fields: {
        id: formFieldsTable.id,
        fieldName: formFieldsTable.fieldName,
        fieldType: formFieldsTable.fieldType,
        options: formFieldsTable.options,
        placeholder: formFieldsTable.placeholder,
        isRequired: formFieldsTable.isRequired,
        orderIndex: formFieldsTable.orderIndex,
        description: formFieldsTable.description,
      }
    })
    .from(formsTable)
    .leftJoin(formFieldsTable, eq(formFieldsTable.formId, formsTable.id))
    .where(eq(formsTable.id, formId))
    .orderBy(asc(formFieldsTable.orderIndex))

   if (!result || result.length === 0) throw new Error("Form not found");

    const { id, title, description, isPublished, visibility, createdBy, createdAt, updatedAt } = result[0]!;

    const fields = result
      .filter(row => row.fields?.id !== null)
      .map(row => row.fields!);

    return { id, title, description, isPublished, visibility, createdBy, createdAt, updatedAt, fields };
  }
}
export default FormService;
