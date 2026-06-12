"use client";

import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dish } from "@/types/dish";
import { addToCart, setQty, useCartQty } from "@/store/cart-store";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  dish,
  className,
}: {
  dish: Dish;
  className?: string;
}) {
  const qty = useCartQty(dish.id);

  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={() => addToCart(dish)}
        aria-label={`Aggiungi ${dish.name}`}
        className={cn(
          "inline-flex items-center gap-1 rounded-full bg-ember px-3 py-1.5 text-xs font-bold text-white shadow-sm transition active:scale-90",
          className,
        )}
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
        Aggiungi
      </button>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-ember px-1.5 py-1 text-white shadow-sm",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setQty(dish.id, qty - 1)}
        aria-label="Diminuisci"
        className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition active:scale-90"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={2.6} />
      </button>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={qty}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="min-w-4 text-center text-sm font-bold tabular-nums"
        >
          {qty}
        </motion.span>
      </AnimatePresence>
      <button
        type="button"
        onClick={() => addToCart(dish)}
        aria-label="Aumenta"
        className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition active:scale-90"
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
      </button>
    </div>
  );
}
