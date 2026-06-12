import Link from "next/link";
import { CalendarDays, Users } from "lucide-react";

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
            <Users className="h-3 w-3" strokeWidth={2.5} />
            Prenotazione tavolo
          </span>
          <h2 className="mt-3 font-heading text-2xl font-extrabold leading-tight">
            Assicurati il tuo posto
          </h2>
          <p className="mt-1.5 text-sm text-cream/70">
            Prenota in pochi secondi: scegli giorno, ora e numero di persone.
            Ti aspettiamo da Kebab House.
          </p>
          <Link
            href="/prenota"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/30 transition active:scale-95"
          >
            <CalendarDays className="h-4 w-4" strokeWidth={2.4} />
            Prenota ora
          </Link>
        </div>
      </div>
    </section>
  );
}
