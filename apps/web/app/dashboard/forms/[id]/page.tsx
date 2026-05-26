"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useDeleteField, useGetFields } from "~/hooks/api/forms";
import { CreateFieldDialog } from "~/components/form/create-field-dialog";

export default function Page() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  return <Builder formId={id} />;
}

function Builder({ formId, }: { formId: string; }) {
  const { fields, isLoading, } = useGetFields(formId);
  const [selectedField, setSelectedField] = useState< (NonNullable<typeof fields>[number]) | null>(null);

  const { deleteFieldAsync } = useDeleteField(formId);
  const handleDeleteField = async (fieldId: string) => { await deleteFieldAsync({ fieldId }) };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">
            Form Builder
          </h1>

          <p className="text-sm text-muted-foreground">
            Build and manage your form fields
          </p>
        </div>

        <CreateFieldDialog
          formId={formId}
          nextOrderIndex={fields && fields.length > 0 ? Math.max(...fields.map((field) => field.orderIndex)) + 1 : 1}
        />

        {selectedField && (
          <CreateFieldDialog
            formId={formId}
            field={selectedField}
            open={!!selectedField}
            onOpenChange={(open) => {
              if (!open) {
                setSelectedField(null);
              }
            }}
          />
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center rounded-2xl border p-10 text-sm text-muted-foreground">
          <Loader2 size={18} className="mr-2 animate-spin" /> Loading fields...
        </div>
      ) : fields?.length ? (

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map((field) => (
            <div
              key={field.id}
              className="cursor-pointer rounded-2xl border border-foreground/20 p-6 transition hover:border-background hover:bg-accent"
              onClick={() => setSelectedField(field)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <div>
                    <h3 className="font-medium">
                      {field.fieldName ||
                        "Untitled Field"}
                    </h3>

                    {field.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {field.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="rounded-md border px-2 py-1 text-xs">
                      {field.fieldType}
                    </div>

                    {field.isRequired && (
                      <div className="rounded-md border px-2 py-1 text-xs">
                        Required
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();

                    handleDeleteField(field.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed p-16 text-center">
          <h2 className="text-xl font-semibold">
            No fields yet
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Start building your form by adding
            your first field.
          </p>
        </div>
      )}
    </div>
  );
}