import { Flame, Leaf } from "lucide-react";
import type { Dish } from "@/types/dish";
import { DishImage } from "@/components/shared/dish-image";
import { Price } from "@/components/shared/price";
import { AddToCartButton } from "./add-to-cart-button";

export function DishCard({ dish }: { dish: Dish }) {
  return (
    <article className="flex gap-3 rounded-2xl bg-paper p-3 ring-1 ring-black/5">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
        <DishImage dish={dish} className="h-full w-full" sizes="96px" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-sm font-bold leading-tight text-ink">
            {dish.name}
            {dish.format && (
              <span className="ml-1 text-xs font-medium text-warm-gray">· {dish.format}</span>
            )}
          </h3>
          <Price cents={dish.price} className="shrink-0 text-sm text-ember" />
        </div>

        <p className="mt-1 line-clamp-2 text-xs leading-snug text-warm-gray">
          {dish.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {dish.isVegetarian && (
              <span className="inline-flex items-center gap-1 rounded-full bg-olive/12 px-2 py-0.5 text-[10px] font-semibold text-olive">
                <Leaf className="h-3 w-3" /> Veg
              </span>
            )}
            {dish.spicyLevel >= 2 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-ember/12 px-2 py-0.5 text-[10px] font-semibold text-ember">
                <Flame className="h-3 w-3" /> Piccante
              </span>
            )}
            {dish.isHalal && (
              <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-[#8a6a26]">
                Halal
              </span>
            )}
          </div>
          <AddToCartButton dish={dish} className="shrink-0" />
        </div>
      </div>
    </article>
  );
}
