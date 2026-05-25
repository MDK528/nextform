import { db } from "@repo/database";
import { formsTable } from "@repo/database/schema";
import { CreateFormInput, CreateFormInputType } from "./model";

class FormService {
    
  public async createForm(payload: CreateFormInputType) {
    const { createdBy, title, description, isPublished = false, visibility = 'PUBLIC' } = await CreateFormInput.parseAsync(payload);

    const result = await db.insert(formsTable).values({ createdBy, title, description, isPublished, visibility }).returning({ id: formsTable.id });

    const formId = result?.[0]?.id;
    if (!result || result.length === 0 || !formId) throw new Error('Failed to create form');

    return { id: formId };
  }
}

export default FormService;
