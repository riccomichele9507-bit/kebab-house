# Kebab House 🌯

Web app **demo di ordinazione** per **Kebab House** — kebab & street food 100% Halal,
Via Dante Alighieri 18, Policoro (MT). Mobile-first, palette *Warm Cream + Brace*.
Ordine online con **ritiro in negozio** o **asporto a domicilio** e scelta del pagamento.

Costruita con la stessa architettura di `special-sushi-poke`.

## Stack
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react

## Sviluppo
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build di produzione
```

## Pagine
- `/` — Home: hero, specialità (add-to-cart), categorie, CTA ordine, chi siamo, mappa
- `/menu` — menù completo con tab di categoria sticky e pulsanti "Aggiungi"
- `/ordina` — carrello + ritiro/asporto + pagamento (paga ora / al ritiro|consegna) + conferma (demo)

## Contenuti
Tutto in `data/` (`restaurant.ts`, `menu.ts`, `categories.ts`). Prezzi in centesimi.
Carrello client in `store/cart-store.ts` (zero dipendenze, localStorage).

## Foto dei piatti (kie.ai)
Le immagini si generano con `tools/generate_images.py` (Nano Banana). Vedi
`workflows/generate_menu_images.md`. Finché mancano, l'app usa placeholder a gradiente.
1. Metti `KIE_API_KEY` in `.env`
2. `python tools/generate_images.py`

## Deploy (GitHub → Vercel)
1. Push del repo su GitHub.
2. Vercel → **New Project → Import** → framework **Next.js** (zero config).
3. Env vars: copia da `.env.example` (almeno `NEXT_PUBLIC_SITE_URL`).
4. Deploy → link `https://<progetto>.vercel.app` da inviare al cliente.

> Demo: la prenotazione non invia email/DB reali. È predisposta per un backend
> (Supabase/Resend) come in `special-sushi-poke`.
