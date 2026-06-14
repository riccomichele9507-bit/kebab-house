export type CategoryId =
  | "panini"
  | "burger"
  | "piatti"
  | "fritti"
  | "menu-combo"
  | "bibite"
  | "birre";

export type Allergen =
  | "glutine"
  | "latte"
  | "uova"
  | "soia"
  | "sesamo"
  | "pesce"
  | "frutta-secca";

export type SpicyLevel = 0 | 1 | 2 | 3;

export interface Dish {
  id: string;
  name: string;
  description: string;
  /** Prezzo in centesimi di euro (es. 450 = €4,50). */
  price: number;
  category: CategoryId;
  image: string;
  imageAlt: string;
  /** Formato/porzione opzionale (es. "Grande", "5 pz"). */
  format?: string;
  allergens: Allergen[];
  spicyLevel: SpicyLevel;
  isHalal?: boolean;
  isVegetarian?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  /** Personalizzabile dal builder /crea (scelta variante + ingredienti). */
  isCustomizable?: boolean;
  /** Mostra il prezzo come "da €…" (basi con più varianti). */
  priceFrom?: boolean;
  /** Colori del placeholder a gradiente quando manca la foto. */
  bgFrom?: string;
  bgTo?: string;
}

export interface Category {
  id: CategoryId;
  label: string;
  slug: string;
  emoji: string;
  available: boolean;
}
