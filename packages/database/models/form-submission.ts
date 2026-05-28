import { pgTable, uuid, timestamp, json } from "drizzle-orm/pg-core";
import { formsTable } from "./forms";

export interface formSubmissionValue {
    formFeildId: string
    value: string
}

export type formSubmissionValueRow = formSubmissionValue[]

export const formSubmissionTable = pgTable("form_submissions", {
    id: uuid("id").primaryKey().defaultRandom(),

    formId: uuid("form_id").references(()=> formsTable.id),

    values: json("values").$type<formSubmissionValueRow>(),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(()=> new Date()) 
})