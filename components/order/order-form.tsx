"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  CalendarDays,
  User,
  Phone,
  MapPin,
  MessageSquare,
  CheckCircle2,
  Store,
  Bike,
  CreditCard,
  Wallet,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { restaurant } from "@/data/restaurant";
import {
  useCartLines,
  useCartTotal,
  setQty,
  removeLine,
  clearCart,
} from "@/store/cart-store";
import type { OrderConfirmation, OrderType, PaymentMethod } from "@/types/booking";

const TIME_SLOTS = [
  "12:00", "12:30", "13:00", "13:30", "14:00",
  "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00",
];

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function makeReference(): string {
  return "KH-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}

function formatDateLabel(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });
}

export function OrderForm() {
  const lines = useCartLines();
  const total = useCartTotal();

  const [type, setType] = useState<OrderType>("ritiro");
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("ora");
  const [touched, setTouched] = useState(false);
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);

  const phoneValid = useMemo(() => /^[+\d][\d\s]{6,}$/.test(phone.trim()), [phone]);
  const nameValid = name.trim().length >= 2;
  const addressValid = type === "ritiro" || address.trim().length >= 5;
  const canSubmit =
    lines.length > 0 && date && time && nameValid && phoneValid && addressValid;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) return;
    // DEMO: nessun pagamento/ordine reale. Stripe (Paga ora) si integra alla conferma cliente.
    const conf: OrderConfirmation = {
      type,
      date,
      time,
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      notes: notes.trim(),
      payment,
      reference: makeReference(),
      items: lines,
      total,
      createdAt: new Date().toISOString(),
    };
    setConfirmation(conf);
    clearCart();
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (confirmation) {
    return <Confirmation data={confirmation} />;
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 pt-10 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-paper ring-1 ring-black/5">
          <ShoppingBag className="h-7 w-7 text-warm-gray" />
        </span>
        <h2 className="mt-4 font-heading text-xl font-extrabold text-ink">Il tuo ordine è vuoto</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Aggiungi qualcosa dal menù e torna qui per completare l&apos;ordine.
        </p>
        <Link
          href="/menu"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-bold text-white transition active:scale-95"
        >
          Vai al menù
        </Link>
      </div>
    );
  }

  const payAtLabel = type === "asporto" ? "Paga alla consegna" : "Paga al ritiro";

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md px-4 pt-4">
      {/* Riepilogo carrello */}
      <div className="rounded-2xl bg-paper p-4 ring-1 ring-black/5">
        <h2 className="mb-3 flex items-center gap-2 font-heading text-sm font-bold text-ink">
          <ShoppingBag className="h-4 w-4 text-ember" /> Il tuo ordine
        </h2>
        <ul className="divide-y divide-black/5">
          {lines.map((l) => (
            <li key={l.id} className="flex items-center gap-3 py-2.5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">
                  {l.name}
                  {l.format && <span className="text-warm-gray"> · {l.format}</span>}
                </p>
                <p className="text-xs text-warm-gray">{formatPrice(l.price)} cad.</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-cream px-1 py-1 ring-1 ring-black/5">
                <button
                  type="button"
                  onClick={() => setQty(l.id, l.qty - 1)}
                  aria-label="Diminuisci"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-ink transition active:scale-90"
                >
                  <Minus className="h-3.5 w-3.5" strokeWidth={2.4} />
                </button>
                <span className="min-w-4 text-center text-sm font-bold tabular-nums">{l.qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(l.id, l.qty + 1)}
                  aria-label="Aumenta"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-ink transition active:scale-90"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
                </button>
              </div>
              <span className="w-14 shrink-0 text-right text-sm font-bold tabular-nums text-ink">
                {formatPrice(l.price * l.qty)}
              </span>
              <button
                type="button"
                onClick={() => removeLine(l.id)}
                aria-label={`Rimuovi ${l.name}`}
                className="text-warm-gray transition hover:text-ember"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-3">
          <span className="text-sm font-semibold text-ink-soft">Totale</span>
          <span className="font-heading text-lg font-extrabold text-ember">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Tipo ordine */}
      <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-paper p-1.5 ring-1 ring-black/5">
        {(
          [
            { id: "ritiro", label: "Ritiro", icon: Store },
            { id: "asporto", label: "Asporto", icon: Bike },
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
      <p className="mt-1.5 px-1 text-xs text-warm-gray">
        {type === "ritiro"
          ? "Ritiri tu in negozio in Via Dante Alighieri 18."
          : "Consegna a domicilio a cura del nostro driver."}
      </p>

      {/* Data */}
      <Field label={type === "asporto" ? "Giorno consegna" : "Giorno ritiro"} icon={CalendarDays} className="mt-4">
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
        <div className="mt-2 flex flex-wrap gap-2">
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
        {touched && !time && <p className="mt-1.5 text-xs text-ember">Scegli un orario.</p>}
      </div>

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
      {touched && !nameValid && <p className="mt-1.5 text-xs text-ember">Inserisci il tuo nome.</p>}

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
      {touched && !phoneValid && <p className="mt-1.5 text-xs text-ember">Inserisci un numero valido.</p>}

      {/* Indirizzo (solo asporto) */}
      {type === "asporto" && (
        <>
          <Field label="Indirizzo di consegna" icon={MapPin} className="mt-4">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Via, numero civico, citofono"
              className="w-full bg-transparent text-sm font-medium text-ink outline-none placeholder:text-warm-gray-soft"
            />
          </Field>
          {touched && !addressValid && (
            <p className="mt-1.5 text-xs text-ember">Inserisci l&apos;indirizzo di consegna.</p>
          )}
        </>
      )}

      {/* Note */}
      <Field label="Note (facoltativo)" icon={MessageSquare} className="mt-4 items-start">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="Allergie, salse, indicazioni…"
          className="w-full resize-none bg-transparent text-sm font-medium text-ink outline-none placeholder:text-warm-gray-soft"
        />
      </Field>

      {/* Pagamento */}
      <div className="mt-5">
        <Label icon={CreditCard}>Pagamento</Label>
        <div className="mt-2 grid gap-2">
          <PaymentOption
            active={payment === "ora"}
            onClick={() => setPayment("ora")}
            icon={CreditCard}
            title="Paga ora"
            desc="Carta · pagamento online sicuro"
            badge="Consigliato"
          />
          <PaymentOption
            active={payment === "ritiro"}
            onClick={() => setPayment("ritiro")}
            icon={Wallet}
            title={payAtLabel}
            desc={type === "asporto" ? "Contanti o carta al driver" : "Contanti o carta in negozio"}
          />
        </div>
        {payment === "ora" && (
          <p className="mt-2 rounded-xl bg-gold/10 px-3 py-2 text-[11px] leading-snug text-[#8a6a26]">
            Demo: il pagamento online (Stripe) verrà attivato alla conferma. Per ora l&apos;ordine
            viene registrato come “da pagare online”.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className={cn(
          "mt-6 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold text-white shadow-lg transition active:scale-[0.98]",
          canSubmit ? "bg-ember shadow-ember/25" : "cursor-not-allowed bg-warm-gray-soft shadow-none",
        )}
      >
        {payment === "ora" ? <CreditCard className="h-4 w-4" strokeWidth={2.4} /> : <CheckCircle2 className="h-4 w-4" strokeWidth={2.4} />}
        {payment === "ora" ? `Paga ${formatPrice(total)} e ordina` : `Conferma ordine · ${formatPrice(total)}`}
      </button>

      <p className="mt-3 text-center text-xs text-warm-gray">
        Demo dimostrativa · nessun pagamento reale. Assistenza:{" "}
        <a href={restaurant.whatsappLink} className="font-semibold text-ember">WhatsApp</a>
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

function PaymentOption({
  active,
  onClick,
  icon: Icon,
  title,
  desc,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof CreditCard;
  title: string;
  desc: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-2xl border-2 bg-paper p-3 text-left transition",
        active ? "border-ember" : "border-transparent ring-1 ring-black/5",
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl transition",
          active ? "bg-ember text-white" : "bg-ember/10 text-ember",
        )}
      >
        <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
      </span>
      <span className="flex-1">
        <span className="flex items-center gap-2">
          <span className="text-sm font-bold text-ink">{title}</span>
          {badge && (
            <span className="rounded-full bg-olive/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-olive">
              {badge}
            </span>
          )}
        </span>
        <span className="block text-xs text-warm-gray">{desc}</span>
      </span>
      <span
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-full border-2 transition",
          active ? "border-ember bg-ember" : "border-warm-gray-soft",
        )}
      >
        {active && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>
    </button>
  );
}

function Confirmation({ data }: { data: OrderConfirmation }) {
  const paidNow = data.payment === "ora";
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
            <h2 className="mt-4 font-heading text-2xl font-extrabold">Ordine confermato!</h2>
            <p className="mt-1 text-sm text-cream/70">
              Grazie {data.name.split(" ")[0]}, lo prepariamo subito.
            </p>
            <span className="mt-4 rounded-full bg-cream/10 px-3 py-1 text-xs font-semibold tracking-widest text-gold-soft">
              {data.reference}
            </span>
          </div>

          <div className="px-6 py-2">
            <ul className="divide-y divide-black/5">
              {data.items.map((l) => (
                <li key={l.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <span className="text-ink">
                    <span className="font-bold text-ember">{l.qty}×</span> {l.name}
                    {l.format && <span className="text-warm-gray"> · {l.format}</span>}
                  </span>
                  <span className="font-semibold tabular-nums text-ink">{formatPrice(l.price * l.qty)}</span>
                </li>
              ))}
            </ul>
          </div>

          <dl className="divide-y divide-black/5 px-6 pb-2">
            <Row label="Totale">
              <span className="text-ember">{formatPrice(data.total)}</span>
            </Row>
            <Row label="Modalità">{data.type === "asporto" ? "Asporto · consegna a domicilio" : "Ritiro in negozio"}</Row>
            <Row label={data.type === "asporto" ? "Consegna" : "Ritiro"}>
              {formatDateLabel(data.date)} · {data.time}
            </Row>
            {data.type === "asporto" && data.address && <Row label="Indirizzo">{data.address}</Row>}
            <Row label="Pagamento">
              {paidNow ? "Online (Stripe) — da attivare" : data.type === "asporto" ? "Alla consegna" : "Al ritiro"}
            </Row>
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
          <Link
            href="/menu"
            className="rounded-full bg-paper px-5 py-3 text-sm font-semibold text-ink ring-1 ring-black/5 transition active:scale-95"
          >
            Nuovo ordine
          </Link>
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
