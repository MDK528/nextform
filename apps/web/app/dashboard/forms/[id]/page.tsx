
type Props = {
  params: Promise<{id: string;}>;
};

export default async function Page({params}: Props) {
  const { id } = await params;

  return (
    <div className="flex flex-1 flex-col p-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Form Builder
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Form ID: {id}
        </p>
      </div>
    </div>
  );

}