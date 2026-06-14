import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck } from "lucide-react";
import { restaurant } from "@/data/restaurant";

export function HeroCard() {
  return (
    <section className="px-4 pt-3">
      <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl shadow-[0_18px_50px_-20px_rgba(43,33,24,0.5)] ring-1 ring-black/5">
        {/* Sfondo: foto kebab sullo spiedo (still food photography) */}
        <div className="relative aspect-[16/13] w-full bg-char">
          <Image
            src="/hero/kebab-spit.png"
            alt="Kebab Halal cotto sullo spiedo verticale da Kebab House"
            fill
            priority
            quality={80}
            sizes="(max-width: 480px) 100vw, 480px"
            className="object-cover"
          />
          {/* overlay scuro per leggibilità testo + badge */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 55% at 25% 105%, rgba(0,0,0,0.55), transparent), linear-gradient(to top, rgba(26,20,14,0.92), rgba(26,20,14,0.25) 48%, rgba(26,20,14,0.35))",
            }}
          />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white ring-1 ring-white/25 backdrop-blur">
              <ShieldCheck className="h-3 w-3" strokeWidth={2.5} />
              100% Halal
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-char">
              <Sparkles className="h-3 w-3" strokeWidth={2.5} />
              Nuova Apertura
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6">
            <h1 className="font-heading text-3xl font-extrabold leading-tight text-white drop-shadow">
              Kebab House
            </h1>
            <p className="mt-1.5 max-w-[18rem] text-sm text-white/85">
              Kebab cotto allo spiedo, street food e fritti. Tutto Halal, nel cuore di Policoro.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/crea"
                className="inline-flex items-center gap-2 rounded-full bg-ember px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition active:scale-95"
              >
                <Sparkles className="h-4 w-4" strokeWidth={2.4} />
                Crea il tuo
              </Link>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-sm font-semibold text-ink transition active:scale-95"
              >
                Vedi il menù
              </Link>
            </div>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-2 max-w-md px-1 text-center text-xs text-ink-soft">
        {restaurant.address.fullAddress}
      </p>
    </section>
  );
}
