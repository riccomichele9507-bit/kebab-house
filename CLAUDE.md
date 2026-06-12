# CLAUDE.md — Kebab House

Guida per Claude Code (e per chiunque sviluppi) su questo progetto.

---

## Cos'è questo progetto

**Kebab House** è una **web app demo di prenotazione** per un kebab 100% Halal di nuova
apertura a **Policoro (MT)**, in **Via Dante Alighieri 18**. È pensata come demo da
inviare al cliente: mostra menù, identità visiva e un flusso di **prenotazione tavolo**.

- **Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion
- **Stile:** mobile-first, palette **Warm Cream + Brace** (crema calda + accenti brace/terracotta)
- **Struttura:** mutuata da `special-sushi-poke` (stessa organizzazione di `app/`, `components/`, `data/`, `lib/`)
- **Deploy:** GitHub → Vercel (link condivisibile col cliente)

---

## Comandi

```bash
npm install      # installa le dipendenze
npm run dev      # dev server su http://localhost:3000
npm run build    # build di produzione (verifica prima di ogni deploy)
npm start        # avvia la build di produzione
npm run lint     # ESLint
```

---

## Architettura (dove sta cosa)

```
app/                       # App Router (route + layout)
  layout.tsx               # root layout, font, metadata SEO, JSON-LD Restaurant
  page.tsx                 # Home (composizione delle sezioni home/)
  globals.css              # Design system Warm Cream (token @theme)
  menu/page.tsx            # Pagina menù completa
  prenota/page.tsx         # Pagina prenotazione (form + conferma)

components/
  layout/                  # header, footer, mobile-tab-bar, mobile-nav
  home/                    # sezioni della home (hero, usp, categorie, featured, cta, location)
  menu/                    # category-tabs, dish-card, dish-grid, menu-client
  booking/                 # booking-form (flusso prenotazione)
  shared/                  # container, section-heading, price, dish-image, whatsapp-fab

data/                      # Single source of truth dei contenuti
  restaurant.ts            # dati locale (nome, indirizzo, orari, contatti, social)
  menu.ts                  # tutti i piatti tipizzati (Dish[])
  categories.ts            # categorie del menù

lib/
  utils.ts                 # cn() merge classi tailwind
  format.ts                # formattazione prezzi (centesimi → €)

types/
  dish.ts                  # tipi Dish / Category / Allergen
  booking.ts               # tipi della prenotazione

public/menu/               # immagini piatti (generate via kie.ai, vedi tools/)

tools/                     # script deterministici (WAT) — generazione immagini kie.ai
workflows/                 # SOP in markdown per i tool
.env                       # segreti (KIE_API_KEY) — MAI committato
```

### Convenzioni
- **Prezzi in centesimi** (interi) in `data/menu.ts`; formattati con `lib/format.ts` (`€4,50`).
- **Token di colore** solo via classi Tailwind generate dai `@theme` di `globals.css`
  (`bg-cream`, `text-ink`, `bg-ember`, `text-gold`…). Non hardcodare hex nei componenti.
- **Mobile-first**: contenitore principale `max-w-md` centrato, tab bar fissa in basso.
- Componenti server di default; `"use client"` solo dove serve (form, animazioni, scroll).

---

## Palette — Warm Cream + Brace

| Token        | Hex       | Uso                              |
|--------------|-----------|----------------------------------|
| `cream`      | `#F7F1E6` | sfondo principale                |
| `cream-deep` | `#EFE6D4` | sezioni alternate                |
| `paper`      | `#FFFDF8` | card / superfici elevate         |
| `ink`        | `#2B2118` | testo principale                 |
| `ember`      | `#D8542A` | accento primario (brace/CTA)     |
| `gold`       | `#C99A4E` | badge premium / dettagli         |
| `olive`      | `#6F7A4B` | accento halal / freschezza       |
| `char`       | `#1A140E` | header / footer scuri            |

---

## Generazione immagini (kie.ai — framework WAT)

Le foto dei piatti si generano con **kie.ai (Nano Banana)** tramite script deterministici.

1. Inserisci la chiave in `.env`: `KIE_API_KEY=...`
2. Leggi il workflow: `workflows/generate_menu_images.md`
3. Esegui il tool: `python tools/generate_images.py`

Le immagini finiscono in `public/menu/<id>.png` e vengono referenziate da `data/menu.ts`.
Finché non esistono, l'app mostra un **placeholder a gradiente caldo** (vedi `shared/dish-image.tsx`).

> **Principio WAT:** l'AI ragiona e orchestra, gli script deterministici eseguono. I segreti
> stanno solo in `.env`. I file in `.tmp/` sono usa-e-getta.

---

## Deploy (GitHub → Vercel)

1. `git init && git add -A && git commit -m "..."` poi push su un repo GitHub.
2. Su Vercel: **New Project → Import** dal repo. Framework rilevato: **Next.js** (nessuna config).
3. Aggiungi le **Environment Variables** da `.env.example` (almeno `NEXT_PUBLIC_SITE_URL`;
   `KIE_API_KEY` serve solo per rigenerare le immagini, non a runtime dell'app).
4. Deploy → ottieni il link `https://<progetto>.vercel.app` da inviare al cliente.

---

## Note
- Demo: la prenotazione **non** invia email/DB reali — mostra una conferma a schermo.
  È predisposta per collegarsi in seguito a un backend (Supabase/Resend) come in `special-sushi-poke`.
- Tutti i contenuti (indirizzo, orari, prezzi) sono in `data/` per modifiche rapide.
