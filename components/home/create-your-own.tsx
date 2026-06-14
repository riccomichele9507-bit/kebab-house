import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { builderBases } from "@/data/ingredients";
import { formatPrice } from "@/lib/format";
import { getDishById } from "@/data/menu";
import { DishImage } from "@/components/shared/dish-image";

export function CreateYourOwn() {
  return (
    <section className="px-4 pt-8">
      <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl bg-char p-5 text-cream">
        <div
          aria-hidden
          className="absolute -left-10 -top-12 h-44 w-44 rounded-full opacity-30 blur-2xl"
          style={{ background: "#d8542a" }}
        />
        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ember/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-soft">
                <Sparkles className="h-3 w-3" strokeWidth={2.6} />
                Crea il tuo
              </span>
              <h2 className="mt-2 font-heading text-2xl font-extrabold leading-tight">
                Componi il tuo kebab
              </h2>
              <p className="mt-1 text-sm text-cream/70">
                Scegli la base, aggiungi verdure e salse{" "}
                <span className="font-semibold text-gold-soft">gratis</span>.
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {builderBases.map((b) => {
              const dish = getDishById(b.id);
              return (
                <Link
                  key={b.id}
                  href={`/crea?base=${b.id}`}
                  className="group overflow-hidden rounded-2xl bg-cream/5 ring-1 ring-white/10 transition active:scale-[0.97]"
                >
                  <div className="relative aspect-square w-full overflow-hidden">
                    {dish && <DishImage dish={dish} className="h-full w-full" sizes="120px" />}
                  </div>
                  <div className="px-2 py-1.5">
                    <p className="text-xs font-bold text-cream">{b.label}</p>
                    <p className="text-[11px] font-semibold text-gold-soft">
                      da {formatPrice(b.price)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <Link
            href="/crea"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/30 transition active:scale-95"
          >
            Inizia a comporre
            <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
          </Link>
        </div>
      </div>
    </section>
  );
}
