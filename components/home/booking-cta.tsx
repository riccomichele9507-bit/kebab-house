import Link from "next/link";
import { ShoppingBag, Bike, Store } from "lucide-react";

export function BookingCTA() {
  return (
    <section className="px-4 pt-8">
      <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl bg-char p-6 text-cream">
        <div
          aria-hidden
          className="absolute -right-8 -top-10 h-40 w-40 rounded-full opacity-30 blur-2xl"
          style={{ background: "#d8542a" }}
        />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ember/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-soft">
            <ShoppingBag className="h-3 w-3" strokeWidth={2.5} />
            Ordina online
          </span>
          <h2 className="mt-3 font-heading text-2xl font-extrabold leading-tight">
            Il tuo kebab, come vuoi tu
          </h2>
          <p className="mt-1.5 text-sm text-cream/70">
            Scegli i piatti, poi ritira in negozio o ricevi a casa. Paga ora o alla consegna.
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-xs text-cream/80">
            <span className="inline-flex items-center gap-1.5">
              <Store className="h-4 w-4 text-gold" strokeWidth={2.2} /> Ritiro in negozio
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bike className="h-4 w-4 text-gold" strokeWidth={2.2} /> Asporto a domicilio
            </span>
          </div>

          <Link
            href="/menu"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/30 transition active:scale-95"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={2.4} />
            Ordina ora
          </Link>
        </div>
      </div>
    </section>
  );
}
