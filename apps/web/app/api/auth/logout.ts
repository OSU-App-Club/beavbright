import { signOut } from "@/app/auth";

export async function GET() {
  await signOut();
}
