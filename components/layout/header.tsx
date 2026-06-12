"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { restaurant } from "@/data/restaurant";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menù" },
  { href: "/prenota", label: "Prenota" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-black/[0.06] bg-cream/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-md items-center justify-between gap-3 px-4">
        <Link href="/" className="group flex items-baseline gap-2" aria-label={`${restaurant.name} — Home`}>
          <span className="font-heading text-lg font-extrabold tracking-tight text-ink transition group-hover:text-ember">
            Kebab<span className="text-ember">House</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1" aria-label="Navigazione principale">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-sm font-medium transition",
                  isActive ? "text-ember" : "text-ink-soft hover:text-ink",
                )}
              >
                {link.label}
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 bottom-0.5 h-px bg-gradient-to-r from-transparent via-ember to-transparent"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
