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
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 shrink-0 text-ember" />
              <span className="text-sm text-ink-soft">{restaurant.hours.everyday}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-ember" />
              <a href={`tel:${restaurant.phone}`} className="text-sm text-ink hover:text-ember">
                {restaurant.phoneDisplay}
              </a>
            </div>

            <div className="mt-1 grid grid-cols-2 gap-2">
              <a
                href={restaurant.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition active:scale-95"
              >
                <svg viewBox="0 0 32 32" className="h-4 w-4 fill-white" aria-hidden>
                  <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.3.7 4.5 1.9 6.4L4 29l7-1.8c1.8 1 3.9 1.5 6 1.5 6.6 0 12-5.3 12-11.9C29 8.3 23.6 3 16 3zm0 21.8c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.1 1.1 1.1-4-.3-.4a9.7 9.7 0 01-1.5-5.2c0-5.4 4.5-9.8 10-9.8s10 4.4 10 9.8-4.5 9.8-9.9 9.8zm5.5-7.3c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4z" />
                </svg>
                WhatsApp
              </a>
              <a
                href={restaurant.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-cream transition active:scale-95"
              >
                <Navigation className="h-4 w-4" strokeWidth={2.4} />
                Indicazioni
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
