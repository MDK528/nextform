import { CreateFormDialog } from "~/components/form/create-form-dialog"
import { FormsTable } from "~/components/form/forms-table";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Forms
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage your forms
          </p>
        </div>

        <CreateFormDialog />
      </div>

      <FormsTable />
    </div>
  );
}