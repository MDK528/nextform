"use client";

import { useParams } from "next/navigation";
import { useGetForm } from "~/hooks/api/forms";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "~/components/ui/select";

import { Loader2 } from "lucide-react";

export default function Page() {
  const params = useParams<{
    form_id: string;
  }>();

  const formId = params.form_id;

  const {
    form,
    isLoading,
  } = useGetForm(formId);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!form) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Form not found
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="rounded-2xl border p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {form.title}
          </h1>

          {form.description && (
            <p className="mt-2 text-muted-foreground">
              {form.description}
            </p>
          )}
        </div>

        <div className="space-y-6">
          {form.fields.map((field) => (
            <div
              key={field.id}
              className="space-y-2"
            >
              <label className="text-sm font-medium">
                {field.fieldName}

                {field.isRequired && (
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                )}
              </label>

              {field.description && (
                <p className="text-sm text-muted-foreground">
                  {field.description}
                </p>
              )}

              {field.fieldType ===
                "TEXT" && (
                <Input
                  placeholder={
                    field.placeholder ??
                    ""
                  }
                />
              )}

              {field.fieldType ===
                "EMAIL" && (
                <Input
                  type="email"
                  placeholder={
                    field.placeholder ??
                    ""
                  }
                />
              )}

              {field.fieldType ===
                "PASSWORD" && (
                <Input
                  type="password"
                  placeholder={
                    field.placeholder ??
                    ""
                  }
                />
              )}

              {field.fieldType ===
                "NUMBER" && (
                <Input
                  type="number"
                  placeholder={
                    field.placeholder ??
                    ""
                  }
                />
              )}

              {field.fieldType ===
                "SELECT" && (
                <Select>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        field.placeholder ??
                        "Select"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {field.options?.map(
                      (option) => (
                        <SelectItem
                          key={option}
                          value={option}
                        >
                          {option}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}

          <Button
            className="w-full"
            disabled
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}