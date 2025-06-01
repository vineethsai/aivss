import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createPageUrl(pageName: string): string {
  switch (pageName.toLowerCase()) {
    case "calculator":
      return "/";
    case "methodology":
      return "/aivss-methodology";
    case "owasp-top-10":
      return "/owasp-top-10";
    default:
      console.warn(`Unknown page name for createPageUrl: ${pageName}`);
      return "/"; // Default to home
  }
}
