# Workflow — Generare le foto del menù (kie.ai)

**Obiettivo:** popolare `public/menu/<id>.png` con foto realistiche dei piatti, così
che l'app mostri immagini reali al posto dei placeholder a gradiente.

## Input richiesti
- `KIE_API_KEY` valida in `.env` (kie.ai → Dashboard → API Keys)
- Connessione a internet

## Tool da usare
- `tools/generate_images.py`

## Passi
1. Inserisci la chiave: in `.env` → `KIE_API_KEY=...`
2. (Opzionale) `pip install requests` — non necessario, lo script usa solo la stdlib.
3. Genera tutte le immagini:
   ```bash
   python tools/generate_images.py
   ```
   Oppure solo alcune:
   ```bash
   python tools/generate_images.py seekh-kebab piatto-kebab-grande
   ```
   Forza la rigenerazione delle esistenti con `--force`.
4. Verifica: apri `public/menu/`. Ogni `<id>.png` corrisponde a un `id` in `data/menu.ts`.
5. Avvia `npm run dev` e controlla che le foto appaiano in Home e Menù.

## Output atteso
- File `public/menu/<id>.png` (1:1) per ogni piatto generato.

## Edge case / lezioni apprese
- **API key assente** → lo script esce con messaggio chiaro. Inseriscila in `.env`.
- **Endpoint/modello cambiati** → override via env: `KIE_BASE_URL`, `KIE_MODEL`.
  Default: `https://api.kie.ai` + modello `google/nano-banana`, API "Playground"
  (`/api/v1/playground/createTask` + `/recordInfo`).
- **Timeout generazione** → lo script riprova in polling fino a 180s per immagine.
- **Costo** → ~1-3 cent/immagine. Genera prima 1-2 piatti per validare lo stile,
  poi lancia il batch completo.
- Le immagini NON servono a runtime su Vercel: l'app funziona anche senza (placeholder).
  Servono solo a rendere la demo più realistica.
