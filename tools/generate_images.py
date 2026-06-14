#!/usr/bin/env python3
"""
generate_images.py — Genera le foto dei piatti di Kebab House con kie.ai (Nano Banana 2).

WAT (framework): tool deterministico. L'agente decide *cosa* generare,
questo script *esegue* le chiamate API in modo ripetibile.

USO
----
1. Inserisci la chiave in .env:           KIE_API_KEY=la_tua_chiave
2. Esegui (tutte le immagini):            python tools/generate_images.py
   - solo alcune:                         python tools/generate_images.py panino-kebab seekh-kebab
   - rigenera anche le esistenti:         python tools/generate_images.py --force
   - risoluzione (1K/2K/4K):              python tools/generate_images.py --resolution 1K

Le immagini vengono salvate in public/menu/<id>.png (1:1) e sono già referenziate
da data/menu.ts. Finché un file non esiste, l'app mostra un placeholder a gradiente.

API kie.ai: https://api.kie.ai/api/v1/jobs (createTask + recordInfo), modello nano-banana-2.
Costo indicativo 1K: pochi cent per immagine.
"""

from __future__ import annotations

import os
import sys
import time
import json
import pathlib

# Console Windows: forza UTF-8 così frecce/spunte non rompono lo stdout (cp1252).
for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding="utf-8", errors="replace")  # type: ignore[attr-defined]
    except Exception:  # noqa: BLE001
        pass

# Usa il trust store di sistema (CertStore Windows) così la CA aziendale funziona.
try:
    import truststore

    truststore.inject_into_ssl()
except ImportError:
    pass

import requests

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "menu"

API_BASE = "https://api.kie.ai/api/v1/jobs"
CREATE_URL = f"{API_BASE}/createTask"
QUERY_URL = f"{API_BASE}/recordInfo"
MODEL = "nano-banana-2"

# Sfondo condiviso: stesso "set" caldo crema/terracotta per TUTTE le foto del menù.
SHARED_BG = (
    "on a warm cream and terracotta surface with a rustic wooden board, soft warm studio "
    "lighting, shallow depth of field, high detail, photorealistic, commercial menu quality, no watermark, no hands"
)

# Stile food-photography premium "che fa venire fame".
STYLE = (
    "ultra appetizing professional food photography, close-up 45-degree hero shot, "
    "fresh and steaming, juicy textures, glistening sauce, melted cheese, vibrant fresh "
    "vegetables, golden crispy details, creamy bokeh, mouth-watering, " + SHARED_BG + ", no text"
)

# Stile drink-photography (lattine/bottiglie), stesso sfondo caldo del cibo.
DRINK_STYLE = (
    "professional product drink photography, single can or bottle centered, ice-cold with "
    "fresh water condensation droplets, refreshing, readable brand label, " + SHARED_BG
)

# Bevande del menù (id == data/menu.ts). Usano DRINK_STYLE.
DRINKS: dict[str, str] = {
    "coca-cola": "a classic Coca-Cola red aluminium can",
    "coca-cola-zero": "a Coca-Cola Zero sleek black aluminium can",
    "fanta": "a Fanta orange soda aluminium can",
    "sprite": "a Sprite green and silver soda aluminium can",
    "estathe-pesca": "an Estathe peach iced tea drink can, warm orange packaging",
    "estathe-limone": "an Estathe lemon iced tea drink can, yellow packaging",
    "pepsi": "a Pepsi blue cola aluminium can",
    "acqua": "a clear plastic bottle of natural mineral water",
    "birra-heineken": "a green Heineken lager beer bottle with a small glass of golden beer",
    "birra-raffo": "an Italian Raffo golden lager beer bottle",
    "birra-peroni": "an Italian Peroni golden lager beer bottle",
    "birra-dreher": "an Italian Dreher golden lager beer bottle",
    "birra-nastro-azzurro": "an Italian Peroni Nastro Azzurro premium beer bottle with blue label",
    "birra-tennents": "a Tennent's Super strong lager beer can, red and gold",
}

# Soggetto specifico per ogni piatto (id deve combaciare con data/menu.ts).
DISHES: dict[str, str] = {
    "panino-kebab": "a doner kebab sandwich in soft warm bread overflowing with thin slices of grilled halal meat, crisp lettuce, ripe tomato and a drizzle of white garlic yogurt sauce",
    "panino-falafel": "a falafel sandwich in soft warm bread filled with golden crispy chickpea falafel balls, fresh crunchy vegetables and creamy yogurt tahini sauce",
    "piadina-kebab": "an Italian piadina flatbread wrap stuffed and rolled with abundant grilled halal kebab meat, fresh salad, tomato and white sauce, cut in half showing the filling",
    "piadina-falafel": "an Italian piadina flatbread wrap rolled with crispy golden falafel, fresh vegetables and yogurt sauce, cut showing the colorful filling",
    "hot-dog": "a hot dog with a juicy chicken sausage in a soft glossy bun, topped with wavy lines of mustard and ketchup",
    "fish-burger": "a fish burger with a thick crispy golden breaded fish fillet, melting cheese, crisp lettuce and tartar sauce on a glossy sesame bun",
    "hamburger": "a juicy beef hamburger with melted cheddar dripping down, fresh lettuce, tomato, onion and house sauce on a toasted brioche bun",
    "piatto-kebab-piccolo": "a kebab plate with a portion of grilled halal meat shavings, a side of golden french fries, fresh salad and white and chili sauces",
    "piatto-kebab-grande": "a large abundant kebab plate piled high with grilled halal meat shavings, a generous side of golden french fries, fresh colorful salad and sauces",
    "chicken-nuggets": "five golden crispy chicken nuggets with a small bowl of dipping sauce, crunchy breaded exterior",
    "alette-pollo": "five glossy fried chicken wings glazed and crispy, sprinkled with herbs, with a dipping sauce",
    "seekh-kebab": "three grilled seekh kebab skewers of spiced minced meat, charred and juicy, with fresh herbs and sauce",
    "anelli-cipolla": "a stack of five golden crispy battered onion rings with dipping sauce",
    "samosa": "two golden crispy fried vegetable samosas, triangular and flaky, with a tamarind dipping sauce",
    "patate-fritte-piccolo": "a small portion of hot golden french fries in a paper cone, lightly salted",
    "patate-fritte-grande": "a large generous portion of hot golden crispy french fries, lightly salted",
    "menu-patatine": "a combo meal with a portion of golden french fries and a cold soft drink can with condensation",
    "menu-piadina": "a combo meal with a rolled kebab piadina wrap and a cold soft drink, on a tray",
    "menu-piatto": "a combo meal with a full kebab plate and french fries plus a cold soft drink, on a tray",
    "menu-panino": "a combo meal with a kebab sandwich and a cold soft drink, on a tray",
}


def api_key() -> str:
    key = os.environ.get("KIE_API_KEY", "").strip()
    if not key:
        env = ROOT / ".env"
        if env.exists():
            for line in env.read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if line.startswith("KIE_API_KEY=") and not line.startswith("#"):
                    key = line.split("=", 1)[1].strip().strip('"').strip("'")
                    break
    if not key:
        sys.exit("[!] KIE_API_KEY mancante. Inseriscila in .env e riprova.")
    return key


def create_task(prompt: str, key: str, resolution: str) -> str:
    payload = {
        "model": MODEL,
        "input": {
            "prompt": prompt,
            "aspect_ratio": "1:1",
            "resolution": resolution,
            "output_format": "png",
        },
    }
    headers = {"Authorization": f"Bearer {key}", "Content-Type": "application/json"}
    r = requests.post(CREATE_URL, json=payload, headers=headers, timeout=30)
    if r.status_code == 401:
        sys.exit("[!] 401: API key non valida.")
    if r.status_code == 402:
        sys.exit("[!] 402: credito insufficiente su kie.ai.")
    if r.status_code != 200:
        raise RuntimeError(f"HTTP {r.status_code}: {r.text[:200]}")
    body = r.json()
    if body.get("code") != 200:
        raise RuntimeError(f"API: {body.get('msg', 'errore')}")
    task_id = (body.get("data") or {}).get("taskId")
    if not task_id:
        raise RuntimeError(f"nessun taskId: {body}")
    return task_id


def poll_result(task_id: str, key: str, timeout_s: int = 240) -> str:
    headers = {"Authorization": f"Bearer {key}"}
    deadline = time.time() + timeout_s
    while time.time() < deadline:
        r = requests.get(QUERY_URL, params={"taskId": task_id}, headers=headers, timeout=30)
        if r.status_code != 200:
            time.sleep(3)
            continue
        data = (r.json() or {}).get("data") or {}
        state = data.get("state")
        if state == "success":
            result = json.loads(data.get("resultJson") or "{}")
            urls = result.get("resultUrls") or []
            if urls:
                return urls[0]
            raise RuntimeError(f"success senza URL: {result}")
        if state == "fail":
            raise RuntimeError(f"fail: {data.get('failMsg')}")
        time.sleep(3)
    raise TimeoutError(f"timeout su {task_id}")


def download(url: str, dest: pathlib.Path) -> int:
    with requests.get(url, stream=True, timeout=120) as r:
        r.raise_for_status()
        with open(dest, "wb") as f:
            for chunk in r.iter_content(chunk_size=65536):
                if chunk:
                    f.write(chunk)
    return dest.stat().st_size


def main() -> None:
    raw = sys.argv[1:]
    force = "--force" in raw
    resolution = "1K"
    if "--resolution" in raw:
        i = raw.index("--resolution")
        if i + 1 < len(raw):
            resolution = raw[i + 1]
    args = [a for a in raw if not a.startswith("-") and a != resolution]

    key = api_key()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    all_items = {**DISHES, **DRINKS}
    targets = args or list(all_items.keys())
    print(f"[i] Genero {len(targets)} immagini @ {resolution} → {OUT_DIR}")

    ok = 0
    for i, dish_id in enumerate(targets, 1):
        subject = all_items.get(dish_id)
        if not subject:
            print(f"  [{i}/{len(targets)}] {dish_id}: id sconosciuto, salto.")
            continue
        dest = OUT_DIR / f"{dish_id}.png"
        if dest.exists() and not force:
            print(f"  [{i}/{len(targets)}] {dish_id}: già presente, salto (--force per rifare).")
            ok += 1
            continue
        style = DRINK_STYLE if dish_id in DRINKS else STYLE
        prompt = f"{subject}, {style}"
        try:
            print(f"  [{i}/{len(targets)}] {dish_id}: task…", flush=True)
            task_id = create_task(prompt, key, resolution)
            url = poll_result(task_id, key)
            size = download(url, dest)
            print(f"      ✓ {dest.name} ({size/1024:.0f} KB)", flush=True)
            ok += 1
        except Exception as e:  # noqa: BLE001 — log e continua col prossimo
            print(f"      ✗ errore su {dish_id}: {e}", flush=True)

    print(f"[i] Fatto. {ok}/{len(targets)} immagini pronte in public/menu/")


if __name__ == "__main__":
    main()
