"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { categories } from "@/data/categories";
import { menu, getDishesByCategory } from "@/data/menu";
import { CategoryTabs } from "./category-tabs";
import { DishCard } from "./dish-card";

export function MenuClient() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    return menu.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        (d.format?.toLowerCase().includes(q) ?? false),
    );
  }, [q]);

  return (
    <div className="mx-auto max-w-md">
      {/* Barra di ricerca */}
      <div className="px-4">
        <div className="flex items-center gap-2 rounded-2xl bg-paper px-4 py-3 ring-1 ring-black/5 focus-within:ring-ember/40">
          <Search className="h-4 w-4 shrink-0 text-warm-gray" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca un piatto, una bibita…"
            className="w-full bg-transparent text-sm font-medium text-ink outline-none placeholder:text-warm-gray-soft"
            aria-label="Cerca nel menù"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Cancella ricerca">
              <X className="h-4 w-4 text-warm-gray" />
            </button>
          )}
        </div>
      </div>

      {q ? (
        // Risultati ricerca (lista piatta)
        <div className="px-4 pt-4">
          <p className="mb-3 text-xs font-semibold text-warm-gray">
            {results.length === 0
              ? "Nessun risultato"
              : `${results.length} risultat${results.length === 1 ? "o" : "i"} per “${query}”`}
          </p>
          <div className="space-y-3">
            {results.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
          {results.length === 0 && (
            <p className="mt-4 text-center text-sm text-ink-soft">
              Prova con un altro termine, oppure sfoglia le categorie cancellando la ricerca.
            </p>
          )}
        </div>
      ) : (
        // Menù completo con tab + sezioni
        <>
          <div className="mt-3">
            <CategoryTabs />
          </div>
          <div className="space-y-8 px-4 pt-5">
            {categories.map((cat) => {
              const dishes = getDishesByCategory(cat.id);
              if (dishes.length === 0) return null;
              return (
                <section key={cat.id} id={cat.slug} className="scroll-mt-32">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-xl">{cat.emoji}</span>
                    <h2 className="font-heading text-lg font-extrabold text-ink">{cat.label}</h2>
                  </div>
                  <div className="space-y-3">
                    {dishes.map((dish) => (
                      <DishCard key={dish.id} dish={dish} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
