import { TRPCError } from "@trpc/server";
import { formService } from "../../services";
import { authenticatedProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { createFormInputModel, createFormOutputModel, listFormsOutputModel } from "./model";
import { z } from "zod";

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

  
  listForms: authenticatedProcedure
  .meta({ openapi: { method: "GET", path: getPath("/listForms"), tags: TAGS, protect: true } })
  .input(z.undefined())
  .output(listFormsOutputModel)
  .query(async ({ctx}) => {
    const forms =  formService.lisFormsByUserId({userId: ctx.user.id})

    return forms
  })
});
