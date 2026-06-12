import type { Metadata } from "next";
import { MenuClient } from "@/components/menu/menu-client";

export const metadata: Metadata = {
  title: "Menù",
  description:
    "Il menù completo di Kebab House: panini, piadine, burger, piatti kebab, fritti e menù combinati. Tutto 100% Halal.",
};

export default function MenuPage() {
  return (
    <div className="pb-8">
      <header className="mx-auto max-w-md px-4 pt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ember">
          Il nostro menù
        </p>
        <h1 className="mt-1 font-heading text-3xl font-extrabold leading-tight text-ink">
          Tutto il gusto Halal
        </h1>
        <p className="mt-1.5 text-sm text-ink-soft">
          Prezzi chiari, ingredienti freschi. Aggiungi al carrello e ordina.
        </p>
      </header>

      <div className="pt-4">
        <MenuClient />
      </div>
    </div>
  );
}
