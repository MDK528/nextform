import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  text,
  pgEnum,
  numeric,
  unique,
  
} from "drizzle-orm/pg-core";
import { formsTable } from "./forms";

export const fieldTypeEnum = pgEnum("field_type_enum", ["TEXT", "NUMBER", "EMAIL", "PASSWORD", "SELECT"])

export const formFieldsTable = pgTable("form_fields", {
  id: uuid("id").primaryKey().defaultRandom(),

  formId: uuid("form_id").references(()=> formsTable.id, {onDelete: "cascade"}),

  fieldName: varchar('field_name', { length: 20 }),
  fieldKey: varchar('field_key').notNull(),
  fieldType: fieldTypeEnum('field_type'),
  options: text('options').array().default([]),

  placeholder: varchar('placeholder',  {length: 30 }),
  isRequired: boolean('is_required').default(false).notNull(),
  orderIndex: numeric('order_index', { scale: 2, mode: "number"}).notNull(),
  description: text('description'),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
}, (table) => {
  return {
    uniqueFormIdAndOrderIndex: unique().on(table.formId, table.orderIndex)
  }
});
