import Link from "next/link";
import { ArrowRight, Flame, Sparkles } from "lucide-react";
import { featuredDishes } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import { SectionHeading } from "@/components/shared/section-heading";
import { DishImage } from "@/components/shared/dish-image";
import { Price } from "@/components/shared/price";
import { AddToCartButton } from "@/components/menu/add-to-cart-button";

export function FeaturedDishes() {
  return (
    <section className="pt-8">
      <SectionHeading
        eyebrow="I più amati"
        title="Specialità della casa"
        action={
          <Link
            href="/menu"
            className="inline-flex items-center gap-1 text-xs font-semibold text-ember"
          >
            Tutto il menù <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        }
      />

      <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto px-4 pb-1">
        {featuredDishes.map((dish) => (
          <article
            key={dish.id}
            className="flex w-44 shrink-0 flex-col overflow-hidden rounded-2xl bg-paper ring-1 ring-black/5"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <DishImage dish={dish} className="h-full w-full" sizes="180px" />
              {dish.spicyLevel >= 2 && (
                <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-ember px-2 py-0.5 text-[10px] font-semibold text-white">
                  <Flame className="h-3 w-3" /> Piccante
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-3">
              <h3 className="line-clamp-1 font-heading text-sm font-bold text-ink">
                {dish.name}
                {dish.format ? ` · ${dish.format}` : ""}
              </h3>
              <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-warm-gray">
                {dish.description}
              </p>
              <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                {dish.priceFrom ? (
                  <span className="text-base font-bold text-ember">da {formatPrice(dish.price)}</span>
                ) : (
                  <Price cents={dish.price} className="text-base text-ember" />
                )}
                {dish.isCustomizable ? (
                  <Link
                    href={`/crea?base=${dish.id}`}
                    className="inline-flex items-center gap-1 rounded-full bg-ember px-3 py-1.5 text-xs font-bold text-white transition active:scale-90"
                  >
                    <Sparkles className="h-3.5 w-3.5" strokeWidth={2.6} />
                    Crea
                  </Link>
                ) : (
                  <AddToCartButton dish={dish} />
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
