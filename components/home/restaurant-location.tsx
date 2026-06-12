import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { restaurant } from "@/data/restaurant";
import { SectionHeading } from "@/components/shared/section-heading";

export function RestaurantLocation() {
  return (
    <section id="location" className="scroll-mt-20 pt-8">
      <SectionHeading eyebrow="Dove siamo" title="Vieni a trovarci" />

      <div className="mx-auto mt-4 max-w-md px-4">
        <div className="overflow-hidden rounded-3xl bg-paper ring-1 ring-black/5">
          <div className="aspect-[16/10] w-full">
            <iframe
              title="Mappa Kebab House"
              src={restaurant.mapEmbedUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="space-y-3 p-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
              <span className="text-sm text-ink">{restaurant.address.fullAddress}</span>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
              <span className="text-sm text-ink-soft">
                Lun–Ven: {restaurant.hours.weekdays}
                <br />
                Sab–Dom: {restaurant.hours.weekend}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-ember" />
              <a href={`tel:${restaurant.phone}`} className="text-sm text-ink hover:text-ember">
                {restaurant.phoneDisplay}
              </a>
            </div>

            <a
              href={restaurant.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-cream transition active:scale-95"
            >
              <Navigation className="h-4 w-4" strokeWidth={2.4} />
              Indicazioni stradali
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
