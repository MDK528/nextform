import { db, eq } from "@repo/database";
import { formsTable } from "@repo/database/schema";
import { CreateFormInput, CreateFormInputType, listFormsByUserIdInput, ListFormsByUserIdInputType } from "./model";

class FormService {
    
  public async createForm(payload: CreateFormInputType) {
    const { createdBy, title, description, isPublished = false, visibility = 'PUBLIC' } = await CreateFormInput.parseAsync(payload);

    const result = await db.insert(formsTable).values({ createdBy, title, description, isPublished, visibility }).returning({ id: formsTable.id });

    const formId = result?.[0]?.id;
    if (!result || result.length === 0 || !formId) throw new Error('Failed to create form');

    return { id: formId };
  }

  public async lisFormsByUserId(payload: ListFormsByUserIdInputType) {

    const { userId } = await listFormsByUserIdInput.parseAsync(payload)

    const forms = await db.select({
      id: formsTable.id,
      title: formsTable.title,
      decription: formsTable.description,
      createdAt: formsTable.createdAt,
      updatedAt: formsTable.updatedAt
    }).from(formsTable).where(eq(formsTable.createdBy, userId))

    return forms
  }

}

export default FormService;
