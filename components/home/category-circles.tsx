import Link from "next/link";
import { categories } from "@/data/categories";
import { SectionHeading } from "@/components/shared/section-heading";

export function CategoryCircles() {
  return (
    <section className="pt-8">
      <SectionHeading eyebrow="Scopri" title="Le categorie" />
      <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto px-4 pb-1">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/menu#${cat.slug}`}
            className="flex w-20 shrink-0 flex-col items-center gap-2"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper text-2xl shadow-sm ring-1 ring-black/5 transition active:scale-95">
              {cat.emoji}
            </span>
            <span className="text-center text-[11px] font-medium leading-tight text-ink-soft">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
