import { Suspense } from "react";
import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { KebabBuilder } from "@/components/builder/kebab-builder";

export const metadata: Metadata = {
  title: "Crea il tuo kebab",
  description:
    "Crea il tuo panino, piadina o piatto kebab Halal: scegli la base e aggiungi gratis verdure e salse. Da Kebab House, Policoro.",
};

export default function CreaPage() {
  return (
    <div className="pb-8">
      <header className="mx-auto max-w-md px-4 pt-6">
        <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ember">
          <Sparkles className="h-3.5 w-3.5" /> Crea il tuo
        </p>
        <h1 className="mt-1 font-heading text-3xl font-extrabold leading-tight text-ink">
          Componi il tuo kebab
        </h1>
        <p className="mt-1.5 text-sm text-ink-soft">
          Scegli la base e aggiungi <span className="font-semibold text-olive">gratis</span> tutte
          le verdure e le salse che vuoi.
        </p>
      </header>

      <Suspense fallback={<div className="mx-auto max-w-md px-4 pt-6 text-sm text-warm-gray">Caricamento…</div>}>
        <KebabBuilder />
      </Suspense>
    </div>
  );
}
