import { nanoid } from "nanoid";

export function generateId(length?: number): string {
  if (length) return nanoid(length);
  return nanoid();
}
