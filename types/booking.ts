export type OrderType = "tavolo" | "asporto";

export interface BookingDraft {
  type: OrderType;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  partySize: number;
  name: string;
  phone: string;
  notes: string;
}

export interface BookingConfirmation extends BookingDraft {
  reference: string; // codice prenotazione generato
  createdAt: string; // ISO
}
