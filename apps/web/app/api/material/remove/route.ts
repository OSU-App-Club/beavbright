import { getSession } from "@/app/lib/session";
import { del } from "@vercel/blob";

// export const runtime = "edge";

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) {
    return new Response(null, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const urlToDelete = searchParams.get("url") as string;
  await del(urlToDelete);
  return new Response();
}
