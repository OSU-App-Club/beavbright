import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMimeType(base64: string): string | null {
  const match = base64.match(/^data:(.*?);base64,/);
  return match ? match[1] : null;
}

// TODO: Make this support more file types
export function getVercelBlobFileType(link: string): string {
  if (!link.endsWith(".pdf")) {
    return `image/${link.split(".").pop()}`;
  } else {
    return "application/pdf";
  }
}

export function isValidBody<T extends Record<string, unknown>>(
  body: any,
  fields: (keyof T)[]
): body is T {
  return Object.keys(body).every((key) => fields.includes(key));
}
