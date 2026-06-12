"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, CalendarDays, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "home", href: "/", label: "Home", icon: Home, exact: true },
  { id: "menu", href: "/menu", label: "Menù", icon: UtensilsCrossed },
  { id: "prenota", href: "/prenota", label: "Prenota", icon: CalendarDays },
  { id: "dove", href: "/#location", label: "Dove", icon: MapPin },
] as const;

export function MobileTabBar() {
  const pathname = usePathname();

  function isActive(tab: (typeof tabs)[number]): boolean {
    if (tab.href.includes("#")) return false;
    if ("exact" in tab && tab.exact) return pathname === tab.href;
    return pathname === tab.href || pathname.startsWith(`${tab.href}/`);
  }

  return (
    <nav
      aria-label="Navigazione mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.06] bg-cream/90 backdrop-blur-2xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab);
          return (
            <li key={tab.id} className="flex-1">
              <Link href={tab.href} aria-label={tab.label} className="block w-full">
                <motion.span
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: "spring", stiffness: 480, damping: 22 }}
                  className={cn(
                    "relative flex h-14 flex-col items-center justify-center gap-1 px-2 transition-colors",
                    active ? "text-ember" : "text-warm-gray hover:text-ink",
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.8} />
                  <span className={cn("text-[10px] tracking-wide", active ? "font-semibold" : "font-normal")}>
                    {tab.label}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="active-tab-dot"
                      aria-hidden
                      className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-ember"
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    />
                  )}
                </motion.span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
