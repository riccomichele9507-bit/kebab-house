"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { DishImage } from "@/components/shared/dish-image";
import { addCustomLine } from "@/store/cart-store";
import {
  builderBases,
  builderMainIds,
  veggies,
  sauces,
  type BuilderBase,
  type BaseVariant,
} from "@/data/ingredients";
import { getDishById } from "@/data/menu";

export function KebabBuilder() {
  const params = useSearchParams();
  const requested = builderBases.find((b) => b.id === params.get("base"));
  const initialBase = requested ?? builderBases[0];

  const [base, setBase] = useState<BuilderBase>(initialBase);
  const [variant, setVariant] = useState<BaseVariant>(initialBase.variants[0]);
  const [selVeggies, setSelVeggies] = useState<Set<string>>(
    new Set(["insalata", "pomodoro", "cipolla"]),
  );
  const [selSauces, setSelSauces] = useState<Set<string>>(new Set(["yogurt"]));
  const [added, setAdded] = useState(false);

  // Mostra le 3 basi principali + l'eventuale base extra arrivata da ?base= (es. hamburger)
  const shownBases = useMemo(() => {
    const mains = builderBases.filter((b) => builderMainIds.includes(b.id));
    if (!builderMainIds.includes(base.id)) return [...mains, base];
    return mains;
  }, [base]);

  function pickBase(b: BuilderBase) {
    setBase(b);
    setVariant(b.variants[0]);
    setAdded(false);
  }

  function toggle(set: Set<string>, setter: (s: Set<string>) => void, id: string) {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setter(next);
    setAdded(false);
  }

  function selectedLabels(): string[] {
    const v = veggies.filter((x) => selVeggies.has(x.id)).map((x) => x.label);
    const s = sauces.filter((x) => selSauces.has(x.id)).map((x) => x.label);
    return [...v, ...s];
  }

  function cartName(): string {
    if (variant.id === "unico") return base.label;
    return `${base.label} ${variant.label}`;
  }

  function handleAdd() {
    addCustomLine(
      { id: `${base.id}-${variant.id}`, name: cartName(), format: "Crea il tuo", price: variant.price },
      selectedLabels(),
    );
    setAdded(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const hasVariants = base.variants.length > 1;
  let step = 1;
  const stepBase = step++;
  const stepVariant = hasVariants ? step++ : 0;
  const stepVeg = step++;
  const stepSauce = step++;

  return (
    <div className="mx-auto max-w-md px-4 pb-32">
      {/* Step — Base */}
      <Step n={stepBase} title="Scegli la base" />
      <div className="mt-3 grid grid-cols-3 gap-2">
        {shownBases.map((b) => {
          const active = base.id === b.id;
          const dish = getDishById(b.id);
          const from = Math.min(...b.variants.map((v) => v.price));
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => pickBase(b)}
              className={cn(
                "overflow-hidden rounded-2xl bg-paper text-left ring-2 transition active:scale-[0.98]",
                active ? "ring-ember" : "ring-black/5",
              )}
            >
              <div className="relative aspect-square w-full overflow-hidden">
                {dish && <DishImage dish={dish} className="h-full w-full" sizes="120px" />}
                {active && (
                  <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ember text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                )}
              </div>
              <div className="px-2 py-1.5">
                <p className="text-xs font-bold text-ink">{b.label}</p>
                <p className="text-[11px] font-semibold text-ember">
                  {b.variants.length > 1 ? "da " : ""}
                  {formatPrice(from)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      <p className="mt-2 px-1 text-xs text-warm-gray">{base.desc}</p>

      {/* Step — Variante (Kebab/Carne/taglie) */}
      {hasVariants && (
        <>
          <div className="mt-7">
            <Step n={stepVariant} title="Kebab o Carne?" />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {base.variants.map((v) => {
              const active = variant.id === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    setVariant(v);
                    setAdded(false);
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition active:scale-95",
                    active
                      ? "bg-ember text-white shadow-sm"
                      : "bg-paper text-ink-soft ring-1 ring-black/5 hover:text-ink",
                  )}
                >
                  {v.label}
                  <span className={cn("text-xs font-bold", active ? "text-white/90" : "text-ember")}>
                    {formatPrice(v.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Step — Verdure */}
      <div className="mt-7 flex items-center justify-between">
        <Step n={stepVeg} title="Aggiungi le verdure" />
        <span className="rounded-full bg-olive/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-olive">
          Gratis
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {veggies.map((v) => (
          <Chip
            key={v.id}
            label={v.label}
            emoji={v.emoji}
            active={selVeggies.has(v.id)}
            onClick={() => toggle(selVeggies, setSelVeggies, v.id)}
          />
        ))}
      </div>

      {/* Step — Salse */}
      <div className="mt-7 flex items-center justify-between">
        <Step n={stepSauce} title="Scegli le salse" />
        <span className="rounded-full bg-olive/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-olive">
          Gratis
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {sauces.map((s) => (
          <Chip
            key={s.id}
            label={s.label}
            emoji={s.emoji}
            active={selSauces.has(s.id)}
            onClick={() => toggle(selSauces, setSelSauces, s.id)}
          />
        ))}
      </div>

      {/* Barra fissa in basso */}
      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-black/5 bg-cream/95 backdrop-blur-xl">
        <div className="mx-auto max-w-md px-4 py-3">
          <AnimatePresence>
            {added && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="mb-2 flex items-center justify-between gap-2 rounded-xl bg-olive/12 px-3 py-2 text-xs font-semibold text-olive"
              >
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4" strokeWidth={2.6} /> Aggiunto al carrello!
                </span>
                <Link href="/ordina" className="inline-flex items-center gap-1 text-ember">
                  Vai all&apos;ordine <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            type="button"
            onClick={handleAdd}
            className="flex w-full items-center justify-between gap-2 rounded-full bg-ember px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-ember/25 transition active:scale-[0.98]"
          >
            <span className="inline-flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" strokeWidth={2.4} />
              Aggiungi {cartName()}
            </span>
            <span className="tabular-nums">{formatPrice(variant.price)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Step({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ember text-xs font-bold text-white">
        {n}
      </span>
      <h2 className="font-heading text-lg font-extrabold text-ink">{title}</h2>
    </div>
  );
}

function Chip({
  label,
  emoji,
  active,
  onClick,
}: {
  label: string;
  emoji: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition active:scale-95",
        active
          ? "bg-ember text-white shadow-sm"
          : "bg-paper text-ink-soft ring-1 ring-black/5 hover:text-ink",
      )}
    >
      <span>{emoji}</span>
      {label}
      <span
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded-full transition",
          active ? "bg-white/25" : "bg-ember/10",
        )}
      >
        {active ? (
          <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
        ) : (
          <Plus className="h-2.5 w-2.5 text-ember" strokeWidth={3} />
        )}
      </span>
    </button>
  );
}
