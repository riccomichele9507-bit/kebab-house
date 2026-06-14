import { getDishesByCategory } from "@/data/menu";
import { SectionHeading } from "@/components/shared/section-heading";
import { DishImage } from "@/components/shared/dish-image";
import { Price } from "@/components/shared/price";
import { AddToCartButton } from "@/components/menu/add-to-cart-button";

export function ComboMenus() {
  const combos = getDishesByCategory("menu-combo");
  return (
    <section className="pt-8">
      <SectionHeading eyebrow="Risparmia" title="Menù combinati" />
      <p className="mt-1 px-4 text-xs text-warm-gray">Piatto + bibita, il pasto completo.</p>

      <div className="mt-4 grid grid-cols-2 gap-3 px-4">
        {combos.map((dish) => (
          <article
            key={dish.id}
            className="flex flex-col overflow-hidden rounded-2xl bg-paper ring-1 ring-black/5"
          >
            <div className="relative aspect-[5/4] w-full overflow-hidden">
              <DishImage dish={dish} className="h-full w-full" sizes="200px" />
              <span className="absolute left-2 top-2 rounded-full bg-gold/90 px-2 py-0.5 text-[10px] font-bold uppercase text-char">
                Combo
              </span>
            </div>
            <div className="flex flex-1 flex-col p-3">
              <h3 className="font-heading text-sm font-bold text-ink">{dish.name}</h3>
              <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-warm-gray">
                {dish.description}
              </p>
              <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                <Price cents={dish.price} className="text-base text-ember" />
                <AddToCartButton dish={dish} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
