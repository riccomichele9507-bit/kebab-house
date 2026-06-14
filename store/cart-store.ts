"use client";

import { useSyncExternalStore } from "react";
import type { CartLine } from "@/types/booking";
import type { Dish } from "@/types/dish";

/**
 * Cart store minimale, senza dipendenze (useSyncExternalStore + localStorage).
 * Stessa idea dello zustand store di special-sushi-poke, ma zero pacchetti extra.
 */

const STORAGE_KEY = "kh-cart-v1";
let lines: CartLine[] = [];
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    /* storage non disponibile: ignora */
  }
}

function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) lines = JSON.parse(raw) as CartLine[];
  } catch {
    lines = [];
  }
}

function subscribe(cb: () => void) {
  ensureHydrated();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

// --- Mutazioni ---
export function addToCart(dish: Dish, qty = 1) {
  ensureHydrated();
  const existing = lines.find((l) => l.id === dish.id);
  if (existing) {
    lines = lines.map((l) => (l.id === dish.id ? { ...l, qty: l.qty + qty } : l));
  } else {
    lines = [
      ...lines,
      { id: dish.id, name: dish.name, format: dish.format, price: dish.price, qty },
    ];
  }
  persist();
  emit();
}

/**
 * Aggiunge una riga personalizzata dal builder /crea.
 * L'id incorpora le opzioni così configurazioni diverse restano righe separate,
 * mentre la stessa identica configurazione si somma in quantità.
 */
export function addCustomLine(
  base: { id: string; name: string; format?: string; price: number },
  options: string[],
  qty = 1,
) {
  ensureHydrated();
  const slug = options.length
    ? options.join("|").toLowerCase().replace(/[^a-z0-9]+/g, "-")
    : "liscio";
  const lineId = `${base.id}__${slug}`;
  const existing = lines.find((l) => l.id === lineId);
  if (existing) {
    lines = lines.map((l) => (l.id === lineId ? { ...l, qty: l.qty + qty } : l));
  } else {
    lines = [
      ...lines,
      { id: lineId, name: base.name, format: base.format, price: base.price, qty, options },
    ];
  }
  persist();
  emit();
}

export function setQty(id: string, qty: number) {
  ensureHydrated();
  lines = qty <= 0 ? lines.filter((l) => l.id !== id) : lines.map((l) => (l.id === id ? { ...l, qty } : l));
  persist();
  emit();
}

export function removeLine(id: string) {
  setQty(id, 0);
}

export function clearCart() {
  ensureHydrated();
  lines = [];
  persist();
  emit();
}

// --- Selettori (snapshot stabili) ---
const EMPTY: CartLine[] = [];

function getLines(): CartLine[] {
  ensureHydrated();
  return hydrated ? lines : EMPTY;
}

export function useCartLines(): CartLine[] {
  return useSyncExternalStore(subscribe, getLines, () => EMPTY);
}

export function useCartCount(): number {
  const items = useCartLines();
  return items.reduce((n, l) => n + l.qty, 0);
}

export function useCartTotal(): number {
  const items = useCartLines();
  return items.reduce((sum, l) => sum + l.price * l.qty, 0);
}

export function useCartQty(id: string): number {
  const items = useCartLines();
  return items.find((l) => l.id === id)?.qty ?? 0;
}
