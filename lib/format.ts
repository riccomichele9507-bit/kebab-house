/** Formatta un prezzo in centesimi come stringa euro: 450 → "€4,50". */
export function formatPrice(cents: number): string {
  return (
    "€" +
    (cents / 100).toLocaleString("it-IT", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

/** Etichetta leggibile per un allergene. */
export function allergenLabel(a: string): string {
  const map: Record<string, string> = {
    glutine: "Glutine",
    latte: "Latte",
    uova: "Uova",
    soia: "Soia",
    sesamo: "Sesamo",
    pesce: "Pesce",
    "frutta-secca": "Frutta secca",
  };
  return map[a] ?? a;
}
