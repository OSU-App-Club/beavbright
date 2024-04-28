import { ModeToggle } from "@/components/mode-toggle";

export default async function Page() {
  return (
    <main className="flex flex-col items-center py-4">
      <ModeToggle />
      <h1 className="text-4xl font-bold">BeavBright</h1>
    </main>
  );
}
