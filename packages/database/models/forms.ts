import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const visibilityEnum = pgEnum("visibility_enum", ['PUBLIC', 'UNLISTED'])

export const formsTable = pgTable("forms", {
  id: uuid("id").primaryKey().defaultRandom(),

  createdBy: uuid("created_by").references(()=> usersTable.id),

  title: varchar('form_title', { length: 55 }),
  description: varchar("form_description", { length:300 }),
  isPublished: boolean("is_published").default(false),
  visibility: visibilityEnum('visibility').default('PUBLIC'),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
