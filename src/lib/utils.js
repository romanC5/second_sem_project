import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Helper to build full image URL from server path
export function getImageUrl(img, fallback = 'https://via.placeholder.com/300') {
  if (!img) return fallback;
  if (img instanceof File) return URL.createObjectURL(img);
  if (typeof img === 'string' && img.startsWith('/uploads')) {
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000';
    return `${baseUrl}${img}`;
  }
  return img;
}
