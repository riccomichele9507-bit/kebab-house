import type { Metadata } from "next";
import { OrderForm } from "@/components/order/order-form";

export const metadata: Metadata = {
  title: "Ordina ora",
  description:
    "Ordina online da Kebab House a Policoro: ritiro in negozio o asporto a domicilio, paga ora o alla consegna. Tutto 100% Halal.",
};

export default function OrdinaPage() {
  return (
    <div className="pb-8">
      <header className="mx-auto max-w-md px-4 pt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ember">
          Ordina ora
        </p>
        <h1 className="mt-1 font-heading text-3xl font-extrabold leading-tight text-ink">
          Completa il tuo ordine
        </h1>
        <p className="mt-1.5 text-sm text-ink-soft">
          Ritiro in negozio o asporto a domicilio. Paga ora o alla consegna.
        </p>
      </header>

      <OrderForm />
    </div>
  );
}
