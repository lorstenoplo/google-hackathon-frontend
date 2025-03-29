import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const backendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL, // Replace with your API base URL
});
