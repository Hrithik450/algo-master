import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface NavItem {
  label: string;
  id: string;
  action?: string;
}

export const navLists: Array<NavItem> = [
  { label: "Home", id: "home" },
  { label: "Features", id: "features" },
  { label: "Explore AI", id: "ai" },
  { label: "Insights", id: "insights", action: "insights" },
  { label: "Contact Us", id: "contact", action: "contact" },
];
