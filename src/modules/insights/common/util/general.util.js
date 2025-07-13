import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const classNames = (...classes) => classes.filter(Boolean).join(" ");

export const formatString = (input) => {
  return input
    .split("_")
    .map((word, index) =>
      index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase()
    )
    .join(" ");
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
