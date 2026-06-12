"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Users,
  User,
  Phone,
  MessageSquare,
  CheckCircle2,
  Store,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { restaurant } from "@/data/restaurant";
import type { BookingConfirmation, OrderType } from "@/types/booking";

const TIME_SLOTS = [
  "12:00", "12:30", "13:00", "13:30", "14:00",
  "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00",
];

const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8];

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

function makeReference(): string {
  return "KH-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}

function formatDateLabel(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function BookingForm() {
  const [type, setType] = useState<OrderType>("tavolo");
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [touched, setTouched] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  const phoneValid = useMemo(() => /^[+\d][\d\s]{6,}$/.test(phone.trim()), [phone]);
  const nameValid = name.trim().length >= 2;
  const canSubmit = date && time && nameValid && phoneValid;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) return;
    // DEMO: nessun invio reale. In produzione → server action (Supabase/Resend).
    setConfirmation({
      type,
      date,
      time,
      partySize,
      name: name.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
      reference: makeReference(),
      createdAt: new Date().toISOString(),
    });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (confirmation) {
    return <Confirmation data={confirmation} onReset={() => setConfirmation(null)} />;
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md px-4 pt-4">
      {/* Tipo prenotazione */}
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-paper p-1.5 ring-1 ring-black/5">
        {(
          [
            { id: "tavolo", label: "Tavolo", icon: Store },
            { id: "asporto", label: "Asporto", icon: ShoppingBag },
          ] as const
        ).map((opt) => {
          const Icon = opt.icon;
          const isActive = type === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setType(opt.id)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition",
                isActive ? "bg-ember text-white shadow-sm" : "text-ink-soft",
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={2.2} />
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Data */}
      <Field label="Data" icon={CalendarDays} className="mt-4">
        <input
          type="date"
          value={date}
          min={todayISO()}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-transparent text-sm font-medium text-ink outline-none"
        />
      </Field>

      {/* Orario */}
      <div className="mt-4">
        <Label icon={Clock}>Orario</Label>
        <div className="no-scrollbar -mx-1 mt-2 flex flex-wrap gap-2 px-1">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setTime(slot)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold transition",
                time === slot
                  ? "bg-ember text-white shadow-sm"
                  : "bg-paper text-ink-soft ring-1 ring-black/5 hover:text-ink",
              )}
            >
              {slot}
            </button>
          ))}
        </div>
        {touched && !time && (
          <p className="mt-1.5 text-xs text-ember">Scegli un orario.</p>
        )}
      </div>

      {/* Persone */}
      {type === "tavolo" && (
        <div className="mt-4">
          <Label icon={Users}>Persone</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {PARTY_SIZES.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPartySize(n)}
                className={cn(
                  "h-10 w-10 rounded-full text-sm font-semibold transition",
                  partySize === n
                    ? "bg-ember text-white shadow-sm"
                    : "bg-paper text-ink-soft ring-1 ring-black/5 hover:text-ink",
                )}
              >
                {n === 8 ? "8+" : n}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Nome */}
      <Field label="Nome e cognome" icon={User} className="mt-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Es. Mario Rossi"
          className="w-full bg-transparent text-sm font-medium text-ink outline-none placeholder:text-warm-gray-soft"
        />
      </Field>
      {touched && !nameValid && (
        <p className="mt-1.5 text-xs text-ember">Inserisci il tuo nome.</p>
      )}

      {/* Telefono */}
      <Field label="Telefono" icon={Phone} className="mt-4">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Es. 351 000 0000"
          className="w-full bg-transparent text-sm font-medium text-ink outline-none placeholder:text-warm-gray-soft"
        />
      </Field>
      {touched && !phoneValid && (
        <p className="mt-1.5 text-xs text-ember">Inserisci un numero valido.</p>
      )}

      {/* Note */}
      <Field label="Note (facoltativo)" icon={MessageSquare} className="mt-4 items-start">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="Allergie, seggiolone, occasione speciale…"
          className="w-full resize-none bg-transparent text-sm font-medium text-ink outline-none placeholder:text-warm-gray-soft"
        />
      </Field>

      <button
        type="submit"
        disabled={!canSubmit}
        className={cn(
          "mt-6 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold text-white shadow-lg transition active:scale-[0.98]",
          canSubmit ? "bg-ember shadow-ember/25" : "cursor-not-allowed bg-warm-gray-soft shadow-none",
        )}
      >
        <CalendarDays className="h-4 w-4" strokeWidth={2.4} />
        Conferma {type === "tavolo" ? "prenotazione" : "ordine"}
      </button>

      <p className="mt-3 text-center text-xs text-warm-gray">
        Demo dimostrativa · nessun dato viene inviato. Per assistenza:{" "}
        <a href={restaurant.whatsappLink} className="font-semibold text-ember">
          WhatsApp
        </a>
      </p>
    </form>
  );
}

function Label({ icon: Icon, children }: { icon: typeof Clock; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
      <Icon className="h-3.5 w-3.5 text-ember" strokeWidth={2.4} />
      {children}
    </span>
  );
}

function Field({
  label,
  icon,
  className,
  children,
}: {
  label: string;
  icon: typeof Clock;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <Label icon={icon}>{label}</Label>
      <div className="rounded-2xl bg-paper px-4 py-3 ring-1 ring-black/5 focus-within:ring-ember/40">
        {children}
      </div>
    </label>
  );
}

function Confirmation({
  data,
  onReset,
}: {
  data: BookingConfirmation;
  onReset: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="mx-auto max-w-md px-4 pt-6"
      >
        <div className="overflow-hidden rounded-3xl bg-paper ring-1 ring-black/5">
          <div className="flex flex-col items-center bg-char px-6 py-8 text-center text-cream">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.1 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-olive/90"
            >
              <CheckCircle2 className="h-9 w-9 text-white" strokeWidth={2.2} />
            </motion.span>
            <h2 className="mt-4 font-heading text-2xl font-extrabold">
              {data.type === "tavolo" ? "Tavolo prenotato!" : "Ordine confermato!"}
            </h2>
            <p className="mt-1 text-sm text-cream/70">
              Ti aspettiamo da Kebab House, {data.name.split(" ")[0]}.
            </p>
            <span className="mt-4 rounded-full bg-cream/10 px-3 py-1 text-xs font-semibold tracking-widest text-gold-soft">
              {data.reference}
            </span>
          </div>

          <dl className="divide-y divide-black/5 px-6 py-2">
            <Row label="Tipo">{data.type === "tavolo" ? "Tavolo al ristorante" : "Asporto"}</Row>
            <Row label="Data">{formatDateLabel(data.date)}</Row>
            <Row label="Orario">{data.time}</Row>
            {data.type === "tavolo" && (
              <Row label="Persone">{data.partySize === 8 ? "8+" : data.partySize}</Row>
            )}
            <Row label="A nome di">{data.name}</Row>
            <Row label="Telefono">{data.phone}</Row>
            {data.notes && <Row label="Note">{data.notes}</Row>}
          </dl>
        </div>

        <div className="mt-4 flex gap-2">
          <a
            href={restaurant.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center rounded-full bg-ember px-4 py-3 text-sm font-bold text-white transition active:scale-95"
          >
            Conferma su WhatsApp
          </a>
          <button
            type="button"
            onClick={onReset}
            className="rounded-full bg-paper px-5 py-3 text-sm font-semibold text-ink ring-1 ring-black/5 transition active:scale-95"
          >
            Nuova
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <dt className="text-xs font-medium uppercase tracking-wide text-warm-gray">{label}</dt>
      <dd className="text-right text-sm font-semibold capitalize text-ink">{children}</dd>
    </div>
  );
}
