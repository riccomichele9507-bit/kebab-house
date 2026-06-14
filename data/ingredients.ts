/**
 * Builder "Crea il tuo" — basi con varianti (Kebab / Carne, + taglie per il piatto)
 * e ingredienti/salse a scelta. L'aggiunta di verdure e salse è sempre GRATUITA.
 * Vale anche per hamburger e fish burger (varianti singole).
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

export interface BaseVariant {
  id: string;
  label: string;
  price: number; // centesimi
}

export interface BuilderBase {
  id: string; // combacia con un Dish in data/menu.ts
  kind: "panino" | "piadina" | "piatto" | "burger";
  label: string;
  desc: string;
  image: string;
  /** Mostra il selettore variante (Kebab/Carne/taglie) solo se > 1. */
  variants: BaseVariant[];
}

export const builderBases: BuilderBase[] = [
  {
    id: "panino",
    kind: "panino",
    label: "Panino",
    desc: "Pane morbido, scegli Kebab o Carne",
    image: "/menu/panino-kebab.png",
    variants: [
      { id: "kebab", label: "Kebab", price: 450 },
      { id: "carne", label: "Carne", price: 550 },
    ],
  },
  {
    id: "piadina",
    kind: "piadina",
    label: "Piadina",
    desc: "Piadina farcita, scegli Kebab o Carne",
    image: "/menu/piadina-kebab.png",
    variants: [
      { id: "kebab", label: "Kebab", price: 500 },
      { id: "carne", label: "Carne", price: 650 },
    ],
  },
  {
    id: "piatto",
    kind: "piatto",
    label: "Piatto",
    desc: "Con patatine, scegli Kebab o Carne",
    image: "/menu/piatto-kebab-grande.png",
    variants: [
      { id: "kebab-piccolo", label: "Kebab piccolo", price: 600 },
      { id: "kebab-grande", label: "Kebab grande", price: 800 },
      { id: "carne", label: "Carne", price: 1000 },
    ],
  },
  {
    id: "hamburger",
    kind: "burger",
    label: "Hamburger",
    desc: "Hamburger di manzo Halal",
    image: "/menu/hamburger.png",
    variants: [{ id: "unico", label: "Hamburger", price: 500 }],
  },
  {
    id: "fish-burger",
    kind: "burger",
    label: "Fish Burger",
    desc: "Filetto di pesce panato e croccante",
    image: "/menu/fish-burger.png",
    variants: [{ id: "unico", label: "Fish Burger", price: 400 }],
  },
];

/** Basi mostrate in evidenza nella sezione "Crea il tuo". */
export const builderMainIds = ["panino", "piadina", "piatto"];

export const builderBaseById = Object.fromEntries(
  builderBases.map((b) => [b.id, b]),
) as Record<string, BuilderBase>;

/** Prezzo minimo di una base (per le etichette "da €…"). */
export function baseFromPrice(b: BuilderBase): number {
  return Math.min(...b.variants.map((v) => v.price));
}
