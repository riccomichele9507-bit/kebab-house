"use client";

import { categories } from "@/data/categories";
import { getDishesByCategory } from "@/data/menu";
import { CategoryTabs } from "./category-tabs";
import { DishCard } from "./dish-card";

export function MenuClient() {
  return (
    <div className="mx-auto max-w-md">
      <CategoryTabs />

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
    </div>
  );
}
