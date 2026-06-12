import Link from "next/link";
import { MapPin, Clock, Phone, Instagram, Facebook } from "lucide-react";
import { restaurant } from "@/data/restaurant";

export function Footer() {
  return (
    <footer className="mt-4 bg-char text-cream/80">
      <div className="mx-auto max-w-md px-5 py-10">
        <div className="font-heading text-2xl font-extrabold text-cream">
          Kebab<span className="text-ember">House</span>
        </div>
        <p className="mt-1 text-sm text-cream/60">{restaurant.shortTagline}</p>

        <div className="mt-6 space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span>{restaurant.address.fullAddress}</span>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span>
              Lun–Ven: {restaurant.hours.weekdays}
              <br />
              Sab–Dom: {restaurant.hours.weekend}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 shrink-0 text-gold" />
            <a href={`tel:${restaurant.phone}`} className="hover:text-cream">
              {restaurant.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <a
            href={restaurant.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 transition hover:bg-ember"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href={restaurant.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 transition hover:bg-ember"
          >
            <Facebook className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-4 gap-y-1 text-xs text-cream/50">
          <Link href="/" className="hover:text-cream">Home</Link>
          <Link href="/menu" className="hover:text-cream">Menù</Link>
          <Link href="/prenota" className="hover:text-cream">Prenota</Link>
        </div>

        <p className="mt-6 text-xs text-cream/40">
          © {new Date().getFullYear()} {restaurant.name} · Policoro (MT) · Demo web app
        </p>
      </div>
    </footer>
  );
}
