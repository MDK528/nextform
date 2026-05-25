"use client";

import Link from "next/link";
import { MoreHorizontal, Pencil } from "lucide-react";

import { useListForms } from "~/hooks/api/forms";

import { Button } from "~/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function FormsTable() {
  const {
    forms,
    isLoading,
  } = useListForms();

  if (isLoading) {
    return (
      <div className="rounded-2xl border p-10 text-center text-sm text-muted-foreground">
        Loading forms...
      </div>
    );
  }

  if (!forms?.length) {
    return (
      <div className="rounded-2xl border border-dashed p-10 text-center">
        <h3 className="text-lg font-medium">
          No forms yet
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Create your first form to start building.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border">
      <table className="w-full">
        <thead className="bg-muted/40">
          <tr className="border-b">
            <th className="px-4 py-3 text-left text-sm font-medium">
              Title
            </th>

            <th className="px-4 py-3 text-left text-sm font-medium">
              Visibility
            </th>

            <th className="px-4 py-3 text-left text-sm font-medium">
              Status
            </th>

            <th className="px-4 py-3 text-left text-sm font-medium">
              Created
            </th>

            <th className="w-15" />
          </tr>
        </thead>

        <tbody>
          {forms.map((item) => (
            <tr
              key={item.id}
              className="border-b transition-colors hover:bg-muted/30"
            >
              <td className="px-4 py-4">
                <Link
                  href={`/dashboard/forms/${item.id}`}
                  className="block"
                >
                  <div className="font-medium">
                    {item.title || "Untitled form"}
                  </div>

                  {item.description && (
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </Link>
              </td>

              <td className="px-4 py-4 text-sm">
                {item.visibility}
              </td>

              <td className="px-4 py-4 text-sm">
                {item.isPublished
                  ? "Published"
                  : "Draft"}
              </td>

              <td className="px-4 py-4 text-sm text-muted-foreground">
                {item.createdAt
                  ? new Date(
                      item.createdAt
                    ).toLocaleDateString()
                  : "-"}
              </td>

              <td className="px-4 py-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/dashboard/forms/${item.id}`}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Open builder
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}