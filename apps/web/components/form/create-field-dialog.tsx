"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Switch } from "~/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useCreateField, useUpdateField } from "~/hooks/api/forms";

type Props = {
  formId: string;
  nextOrderIndex?: number;
  field?: {
    id: string;
    fieldName: string | null;
    fieldType: "TEXT" | "NUMBER" | "EMAIL" | "PASSWORD" | "SELECT" | null;
    placeholder: string | null;
    description: string | null;
    isRequired: boolean;
    orderIndex: number;
  };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
};

export function CreateFieldDialog({ formId, nextOrderIndex, field, open: controlledOpen, onOpenChange, trigger }: Props) {

  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const [fieldName, setFieldName] = useState(field?.fieldName ?? "");
  const [placeholder, setPlaceholder] = useState(field?.placeholder ?? "");
  const [description, setDescription] = useState(field?.description ?? "");
  const [isRequired, setIsRequired] = useState(field?.isRequired ?? false);
  const [fieldType, setFieldType] =useState< "TEXT" | "NUMBER" | "EMAIL" | "PASSWORD" | "SELECT" >(field?.fieldType ?? "TEXT");

  useEffect(() => {
    if (!field) return;

    setFieldName(field.fieldName ?? "");
    setPlaceholder(field.placeholder ?? "");
    setDescription(field.description ?? "");
    setIsRequired(field.isRequired ?? false);
    setFieldType(field.fieldType ?? "TEXT");

  }, [field])

  const { createFieldAsync, status } = useCreateField(formId);
  const { updateFieldAsync } = useUpdateField(formId);

  const handleSubmit = async () => {
    if (field) {
      await updateFieldAsync({ id: field.id, fieldName, fieldType, placeholder, description, isRequired, orderIndex: field.orderIndex });
    } else {
      await createFieldAsync({ formId, fieldName, fieldType, placeholder, description, isRequired, orderIndex: nextOrderIndex ?? 1 });
    }
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      {!field && (
        <DialogTrigger asChild>
          {trigger ?? (
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Field
            </Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {field
              ? "Update Field"
              : "Create Field"}
          </DialogTitle>

          <DialogDescription>
            Add a new field to your form.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">
              Field Label
            </p>

            <Input
              value={fieldName}
              onChange={(e) =>
                setFieldName(
                  e.target.value
                )
              }
              placeholder="What is your full name?"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">
              Placeholder
            </p>

            <Input
              value={placeholder}
              onChange={(e) =>
                setPlaceholder(
                  e.target.value
                )
              }
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">
              Instructions
            </p>

            <Textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Optional instructions"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">
              Field Type
            </p>

            <Select
              value={fieldType}
              onValueChange={(value) =>
                setFieldType(
                  value as
                  | "TEXT"
                  | "NUMBER"
                  | "EMAIL"
                  | "PASSWORD"
                  | "SELECT"
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="TEXT">
                  Text
                </SelectItem>

                <SelectItem value="NUMBER">
                  Number
                </SelectItem>

                <SelectItem value="EMAIL">
                  Email
                </SelectItem>

                <SelectItem value="PASSWORD">
                  Password
                </SelectItem>

                <SelectItem value="SELECT">
                  Select
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-xl border p-3">
            <div>
              <p className="text-sm font-medium">
                Required Field
              </p>

              <p className="text-xs text-muted-foreground">
                Users must fill this field
              </p>
            </div>

            <Switch
              checked={isRequired}
              onCheckedChange={
                setIsRequired
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={
              !fieldName ||
              status === "pending"
            }
          >
            {status === "pending"
              ? field
                ? "Updating..."
                : "Creating..."
              : field
                ? "Update Field"
                : "Create Field"
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}