import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<any> {
  try {
    const response = await fetch("http://localhost:3001/users", {
      next: {
        tags: ["users"],
      },
      cache: "no-store",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export default async function Page() {
  const data = await getData();
  return (
    <main className="flex flex-col items-center py-4">
      <DataTable columns={columns} data={data} />
    </main>
  );
}
