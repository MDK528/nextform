import { formService } from "../../services";
import { authenticatedProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { z } from "zod";
import {
  createFormInputModel,
  createFormOutputModel,
  createFieldInputModel,
  createFieldOutputModel,
  getFieldInputModel,
  getFieldOutputModel,
  updateFieldInputModel,
  updateFieldOutputModel,
  deleteFieldInputModel,
  deleteFieldOutputModel,
  listFormsOutputModel,
} from "./model";

const TAGS = ["Forms"];
const getPath = generatePath("/forms");

export const formRouter = router({
  createForm: authenticatedProcedure
    .meta({ openapi: { method: "POST", path: getPath("/createForm"), tags: TAGS, protect: true } })
    .input(createFormInputModel)
    .output(createFormOutputModel)
    .mutation(async ({ input, ctx }) => {
      const {title, description, isPublished, visibility} = input
      const userId = ctx.user?.id;
      if (!userId) throw new Error('User not authenticated');

      const { id } = await formService.createForm({ createdBy: userId, title, description, isPublished, visibility });

      return { id };
    }),

  createField: authenticatedProcedure
    .meta({ openapi: { method: "POST", path: getPath("/createField"), tags: TAGS, protect: true } })
    .input(createFieldInputModel)
    .output(createFieldOutputModel)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user?.id;
      if (!userId) throw new Error('User not authenticated');

      const { id } = await formService.createField(input);
      return { id };
    }),

  getFields: authenticatedProcedure
    .meta({ openapi: { method: "GET", path: getPath("/getField"), tags: TAGS, protect: true } })
    .input(getFieldInputModel)
    .output(getFieldOutputModel)
    .query(async ({ input }) => {
      const { formId } = input
      return await formService.getFields({formId});
    }),

  updateField: authenticatedProcedure
    .meta({ openapi: { method: "PATCH", path: getPath("/updateField"), tags: TAGS, protect: true } })
    .input(updateFieldInputModel)
    .output(updateFieldOutputModel)
    .mutation(async ({ input }) => {
      const { id } = await formService.updateField(input);
      return { id };
    }),

  deleteField: authenticatedProcedure
    .meta({ openapi: { method: "DELETE", path: getPath("/deleteField"), tags: TAGS, protect: true } })
    .input(deleteFieldInputModel)
    .output(deleteFieldOutputModel)
    .mutation(async ({ input }) => {
      const { fieldId } = await formService.deleteField(input);
      return { fieldId };
    }),

  listForms: authenticatedProcedure
  .meta({ openapi: { method: "GET", path: getPath("/listForms"), tags: TAGS, protect: true } })
  .input(z.undefined())
  .output(listFormsOutputModel)
  .query(async ({ctx}) => {
    const forms = await formService.listFormsByUserId({userId: ctx.user.id})

    return forms
  })
});
