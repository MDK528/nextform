"use client"

import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { useCreateForm } from "~/hooks/api/forms";

type CreateFormValues = {
  title: string;
  description?: string;
  visibility: "PUBLIC" | "UNLISTED";
  isPublished: boolean;
};

export function CreateFormDialog() {
  const [open, setOpen] = React.useState(false);
  const { createFormAsync, isPending, isError } = useCreateForm();

  const form = useForm<CreateFormValues>({
    defaultValues: {
      title: "",
      description: "",
      visibility: "PUBLIC",
      isPublished: false,
    },
  });

  const onSubmit = async (values: CreateFormValues) => {
    await createFormAsync(values);
    form.reset();
    setOpen(false);
  };

  return (
    <div className="py-6 px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Forms</h1>
          <p className="text-sm text-muted-foreground">
            Create a new form and manage your workspace forms.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Create new form</Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Create new form</DialogTitle>
              <DialogDescription>
                Add a title, description and visibility settings for your new form.
              </DialogDescription>
            </DialogHeader>

            <form className="mt-6 grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="My customer feedback form"
                  {...form.register("title", { required: true })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this form is for"
                  {...form.register("description")}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="visibility">Visibility</Label>
                  <select
                    id="visibility"
                    className="border-input h-9 rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50"
                    {...form.register("visibility")}
                  >
                    <option value="PUBLIC">Public</option>
                    <option value="UNLISTED">Unlisted</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    id="isPublished"
                    type="checkbox"
                    className="h-4 w-4 rounded border-input text-primary focus-visible:ring-ring"
                    {...form.register("isPublished")}
                  />
                  <Label htmlFor="isPublished">Publish immediately</Label>
                </div>
              </div>

              {isError && (
                <p className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                  There was a problem creating the form. Please try again.
                </p>
              )}

              <DialogFooter className="mt-4 flex items-center justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Creating..." : "Create form"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
