"use client";

import { useState } from "react";
import type { Dish } from "@/types/dish";
import { cn } from "@/lib/utils";

/**
 * Immagine del piatto con fallback automatico a un placeholder a gradiente caldo.
 * Le foto reali vivono in /menu/<id>.png e si generano via kie.ai (vedi tools/).
 * Finché non esistono (o se il caricamento fallisce) mostra il gradiente brand.
 */
export function DishImage({
  dish,
  className,
  sizes = "(max-width: 480px) 100vw, 480px",
}: {
  dish: Dish;
  className?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  const from = dish.bgFrom ?? "#e9a23b";
  const to = dish.bgTo ?? "#b23e1c";

  if (failed) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden",
          className,
        )}
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        aria-label={dish.imageAlt}
        role="img"
      >
        <span
          aria-hidden
          className="select-none px-3 text-center font-heading text-lg font-bold leading-tight text-white/95 drop-shadow"
        >
          {dish.name}
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute -right-4 -bottom-5 text-7xl opacity-25"
        >
          🌯
        </span>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={dish.image}
      alt={dish.imageAlt}
      sizes={sizes}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
    />
  );
}
