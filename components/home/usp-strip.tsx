import { ShieldCheck, Flame, Clock } from "lucide-react";

const usps = [
  { icon: ShieldCheck, label: "100% Halal", sub: "Carne certificata" },
  { icon: Flame, label: "Allo spiedo", sub: "Cotto al momento" },
  { icon: Clock, label: "Pranzo & Cena", sub: "Sempre aperti" },
] as const;

export function UspStrip() {
  return (
    <section className="px-4 pt-6">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        {usps.map((u) => {
          const Icon = u.icon;
          return (
            <div
              key={u.label}
              className="flex flex-col items-center gap-1 rounded-2xl bg-paper px-2 py-3 text-center ring-1 ring-black/5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ember/10">
                <Icon className="h-4.5 w-4.5 text-ember" strokeWidth={2.2} />
              </span>
              <span className="text-xs font-semibold text-ink">{u.label}</span>
              <span className="text-[10px] leading-tight text-warm-gray">{u.sub}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
