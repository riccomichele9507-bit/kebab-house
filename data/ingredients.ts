/**
 * Ingredienti e salse per il builder "Crea il tuo" (panino / piadina / piatto).
 * Stessa lista per tutte e tre le basi. Aggiunta GRATUITA.
 */

export interface BuilderItem {
  id: string;
  label: string;
  emoji: string;
}

export const veggies: BuilderItem[] = [
  { id: "insalata", label: "Insalata", emoji: "🥬" },
  { id: "cavolo-cappuccio", label: "Cavolo cappuccio", emoji: "🥬" },
  { id: "cavolo-rosso", label: "Cavolo cappuccio rosso", emoji: "🟣" },
  { id: "cipolla", label: "Cipolla", emoji: "🧅" },
  { id: "pomodoro", label: "Pomodoro", emoji: "🍅" },
  { id: "mais", label: "Mais", emoji: "🌽" },
  { id: "rucola", label: "Rucola", emoji: "🌿" },
  { id: "carota", label: "Carota", emoji: "🥕" },
];

export const sauces: BuilderItem[] = [
  { id: "piccante", label: "Salsa piccante", emoji: "🌶️" },
  { id: "yogurt", label: "Salsa yogurt", emoji: "🥛" },
  { id: "bbq", label: "Salsa BBQ", emoji: "🍖" },
  { id: "ketchup", label: "Ketchup", emoji: "🍅" },
  { id: "maionese", label: "Maionese", emoji: "🥚" },
];

/** Basi del builder: id deve combaciare con un Dish in data/menu.ts. */
export interface BuilderBase {
  id: string;
  kind: "panino" | "piadina" | "piatto";
  label: string;
  price: number; // centesimi, "solo carne"
  image: string;
  desc: string;
}

export const builderBases: BuilderBase[] = [
  {
    id: "panino-kebab",
    kind: "panino",
    label: "Panino",
    price: 500,
    image: "/menu/panino-kebab.png",
    desc: "Pane morbido + carne kebab Halal allo spiedo",
  },
  {
    id: "piadina-kebab",
    kind: "piadina",
    label: "Piadina",
    price: 650,
    image: "/menu/piadina-kebab.png",
    desc: "Piadina farcita + carne kebab Halal allo spiedo",
  },
  {
    id: "piatto-kebab",
    kind: "piatto",
    label: "Piatto",
    price: 1000,
    image: "/menu/piatto-kebab-grande.png",
    desc: "Abbondante carne kebab Halal con patatine",
  },
];

export const builderBaseById = Object.fromEntries(
  builderBases.map((b) => [b.id, b]),
) as Record<string, BuilderBase>;
