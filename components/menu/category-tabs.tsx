"use client";

import { useEffect, useState } from "react";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

export function CategoryTabs() {
  const [active, setActive] = useState<string>(categories[0]?.id ?? "");

  // Evidenzia la categoria visibile durante lo scroll.
  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.slug))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function scrollTo(slug: string) {
    const el = document.getElementById(slug);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  return (
    <div className="sticky top-16 z-30 -mx-4 border-b border-black/5 bg-cream/90 px-4 py-2.5 backdrop-blur-xl">
      <div className="no-scrollbar flex max-w-md gap-2 overflow-x-auto">
        {categories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => scrollTo(cat.slug)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition",
                isActive
                  ? "bg-ember text-white shadow-sm"
                  : "bg-paper text-ink-soft ring-1 ring-black/5 hover:text-ink",
              )}
            >
              <span className="mr-1">{cat.emoji}</span>
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
