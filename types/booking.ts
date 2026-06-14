export type OrderType = "ritiro" | "asporto";
export type PaymentMethod = "ora" | "ritiro";

export interface CartLine {
  id: string;
  name: string;
  format?: string;
  price: number; // centesimi
  qty: number;
  /** Personalizzazioni scelte nel builder (es. ["Insalata", "Salsa piccante"]). */
  options?: string[];
}

export interface OrderDraft {
  type: OrderType;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  name: string;
  phone: string;
  address: string; // solo asporto
  notes: string;
  payment: PaymentMethod;
}

export interface OrderConfirmation extends OrderDraft {
  reference: string;
  items: CartLine[];
  total: number; // centesimi
  createdAt: string; // ISO
}
