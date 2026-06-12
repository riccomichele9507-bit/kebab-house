import type { Metadata } from "next";
import { BookingForm } from "@/components/booking/booking-form";

export const metadata: Metadata = {
  title: "Prenota un tavolo",
  description:
    "Prenota online il tuo tavolo da Kebab House a Policoro. Scegli data, ora e numero di persone in pochi secondi.",
};

export default function PrenotaPage() {
  return (
    <div className="pb-8">
      <header className="mx-auto max-w-md px-4 pt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ember">
          Prenotazione
        </p>
        <h1 className="mt-1 font-heading text-3xl font-extrabold leading-tight text-ink">
          Prenota il tuo tavolo
        </h1>
        <p className="mt-1.5 text-sm text-ink-soft">
          Pochi secondi e il posto è tuo. Ti aspettiamo in Via Dante Alighieri 18.
        </p>
      </header>

      <BookingForm />
    </div>
  );
}
