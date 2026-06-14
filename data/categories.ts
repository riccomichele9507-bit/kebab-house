import type { Category } from "@/types/dish";

export const categories: Category[] = [
  { id: "panini", label: "Panini e Piadine", slug: "panini", emoji: "🌯", available: true },
  { id: "piatti", label: "Piatti", slug: "piatti", emoji: "🍽️", available: true },
  { id: "burger", label: "Burger e Hot Dog", slug: "burger", emoji: "🍔", available: true },
  { id: "fritti", label: "Fritti e Contorni", slug: "fritti", emoji: "🍟", available: true },
  { id: "menu-combo", label: "Menù Combinati", slug: "menu-combo", emoji: "🥤", available: true },
  { id: "bibite", label: "Bibite", slug: "bibite", emoji: "🥤", available: true },
  { id: "birre", label: "Birre", slug: "birre", emoji: "🍺", available: true },
];

export const categoryById = Object.fromEntries(
  categories.map((c) => [c.id, c]),
) as Record<Category["id"], Category>;
