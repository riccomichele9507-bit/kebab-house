import { ShieldCheck, Flame, Leaf } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const points = [
  {
    icon: ShieldCheck,
    title: "100% Halal",
    text: "Carne certificata Halal, selezionata e lavorata con cura ogni giorno.",
  },
  {
    icon: Flame,
    title: "Cotto allo spiedo",
    text: "Il vero kebab, cotto lentamente alla brace per un gusto autentico.",
  },
  {
    icon: Leaf,
    title: "Ingredienti freschi",
    text: "Verdure di giornata, pane morbido e salse fatte in casa.",
  },
];

export function AboutTeaser() {
  return (
    <section id="about" className="pt-8">
      <SectionHeading eyebrow="Chi siamo" title="Sapore autentico, a Policoro" />
      <div className="mx-auto mt-4 max-w-md space-y-3 px-4">
        {points.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="flex items-start gap-3 rounded-2xl bg-paper p-4 ring-1 ring-black/5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ember/10">
                <Icon className="h-5 w-5 text-ember" strokeWidth={2.2} />
              </span>
              <div>
                <h3 className="font-heading text-sm font-bold text-ink">{p.title}</h3>
                <p className="mt-0.5 text-xs leading-snug text-warm-gray">{p.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
