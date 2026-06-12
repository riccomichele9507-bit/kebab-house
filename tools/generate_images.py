#!/usr/bin/env python3
"""
generate_images.py — Genera le foto dei piatti di Kebab House con kie.ai (Nano Banana).

WAT (framework): tool deterministico. L'agente decide *cosa* generare,
questo script *esegue* le chiamate API in modo ripetibile.

USO
----
1. Inserisci la chiave in .env:           KIE_API_KEY=la_tua_chiave
2. (opzionale) installa requests:         pip install requests
3. Esegui:                                python tools/generate_images.py
   - solo alcuni:                         python tools/generate_images.py panino-kebab seekh-kebab
   - rigenera anche le esistenti:         python tools/generate_images.py --force

Le immagini vengono salvate in public/menu/<id>.png (1:1) e sono già referenziate
da data/menu.ts. Finché un file non esiste, l'app mostra un placeholder a gradiente.

NOTE
----
- Endpoint/modello kie.ai configurabili via env (KIE_BASE_URL, KIE_MODEL) in caso di
  variazioni dell'API. Default: API "Playground" unificata di kie.ai, modello nano-banana.
- Costo indicativo: ~1-3 cent per immagine. 21 piatti ≈ pochi centesimi/euro.
"""

from __future__ import annotations

import os
import sys
import time
import json
import base64
import pathlib
import urllib.request
import urllib.error

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "menu"

BASE_URL = os.environ.get("KIE_BASE_URL", "https://api.kie.ai")
MODEL = os.environ.get("KIE_MODEL", "google/nano-banana")
CREATE_PATH = "/api/v1/playground/createTask"
INFO_PATH = "/api/v1/playground/recordInfo"

# Stile fotografico comune a tutti i piatti (food photography premium, sfondo caldo crema).
STYLE = (
    "professional food photography, overhead 45-degree angle, appetizing, "
    "studio lighting, shallow depth of field, on a warm cream and terracotta surface, "
    "rustic wooden board, soft natural shadows, high detail, no text, no watermark"
)

# Prompt specifici per ogni piatto del menù (id -> soggetto).
DISHES: dict[str, str] = {
    "panino-kebab": "a doner kebab sandwich in soft bread with grilled halal meat, fresh lettuce, tomato and white sauce",
    "panino-falafel": "a falafel sandwich in soft bread with crispy chickpea falafel, fresh vegetables and yogurt sauce",
    "piadina-kebab": "an Italian piadina flatbread wrap filled with grilled halal kebab meat, salad and sauces",
    "piadina-falafel": "an Italian piadina flatbread wrap filled with crispy falafel and fresh vegetables",
    "hot-dog": "a hot dog with chicken sausage in soft bread, mustard and ketchup",
    "fish-burger": "a fish burger with crispy breaded fish fillet, lettuce and tartar sauce on a sesame bun",
    "hamburger": "a beef hamburger with melted cheese, lettuce, tomato and house sauce on a toasted bun",
    "piatto-kebab-piccolo": "a small kebab plate with grilled halal meat, french fries, fresh salad and sauces",
    "piatto-kebab-grande": "a large generous kebab plate with grilled halal meat, french fries, salad and sauces",
    "chicken-nuggets": "five golden crispy chicken nuggets with dipping sauce",
    "alette-pollo": "five fried chicken wings, crispy and glazed, with sauce",
    "seekh-kebab": "three grilled seekh kebab skewers of spiced minced meat",
    "anelli-cipolla": "five golden crispy onion rings",
    "samosa": "two fried vegetable samosas, golden and crispy, with dipping sauce",
    "patate-fritte-piccolo": "a small portion of golden french fries",
    "patate-fritte-grande": "a large portion of golden french fries",
    "menu-patatine": "a combo meal with french fries and a soft drink can",
    "menu-piadina": "a combo meal with a kebab piadina wrap and a soft drink",
    "menu-piatto": "a combo meal with a kebab plate and a soft drink",
    "menu-panino": "a combo meal with a kebab sandwich and a soft drink",
}


def api_key() -> str:
    key = os.environ.get("KIE_API_KEY", "").strip()
    if not key:
        # prova a leggere da .env
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


def _post(url: str, payload: dict, key: str) -> dict:
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode("utf-8"))


def _get(url: str, key: str) -> dict:
    req = urllib.request.Request(
        url, headers={"Authorization": f"Bearer {key}"}, method="GET"
    )
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode("utf-8"))


def create_task(prompt: str, key: str) -> str:
    payload = {
        "model": MODEL,
        "input": {"prompt": prompt, "image_size": "1:1", "output_format": "png"},
    }
    data = _post(BASE_URL + CREATE_PATH, payload, key)
    task_id = (data.get("data") or {}).get("taskId") or data.get("taskId")
    if not task_id:
        raise RuntimeError(f"Nessun taskId nella risposta: {data}")
    return task_id


def poll_result(task_id: str, key: str, timeout_s: int = 180) -> str:
    """Restituisce l'URL (o data URL) dell'immagine generata."""
    deadline = time.time() + timeout_s
    while time.time() < deadline:
        data = _get(f"{BASE_URL}{INFO_PATH}?taskId={task_id}", key)
        d = data.get("data") or {}
        state = (d.get("state") or d.get("status") or "").lower()
        if state in ("success", "succeeded", "completed"):
            result = d.get("resultJson") or d.get("result") or d
            if isinstance(result, str):
                result = json.loads(result)
            urls = result.get("resultUrls") or result.get("images") or result.get("urls")
            if urls:
                return urls[0]
            raise RuntimeError(f"Task completo ma senza URL: {data}")
        if state in ("fail", "failed", "error"):
            raise RuntimeError(f"Generazione fallita: {data}")
        time.sleep(3)
    raise TimeoutError(f"Timeout sul task {task_id}")


def download(url: str, dest: pathlib.Path) -> None:
    if url.startswith("data:"):
        b64 = url.split(",", 1)[1]
        dest.write_bytes(base64.b64decode(b64))
        return
    with urllib.request.urlopen(url, timeout=120) as r:
        dest.write_bytes(r.read())


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    force = "--force" in sys.argv
    key = api_key()
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    targets = args or list(DISHES.keys())
    print(f"[i] Genero {len(targets)} immagini → {OUT_DIR}")

    for i, dish_id in enumerate(targets, 1):
        subject = DISHES.get(dish_id)
        if not subject:
            print(f"  [{i}/{len(targets)}] {dish_id}: id sconosciuto, salto.")
            continue
        dest = OUT_DIR / f"{dish_id}.png"
        if dest.exists() and not force:
            print(f"  [{i}/{len(targets)}] {dish_id}: già presente, salto (usa --force).")
            continue

        prompt = f"{subject}, {STYLE}"
        try:
            print(f"  [{i}/{len(targets)}] {dish_id}: creo task…")
            task_id = create_task(prompt, key)
            url = poll_result(task_id, key)
            download(url, dest)
            print(f"      ✓ salvato {dest.name}")
        except (urllib.error.HTTPError, urllib.error.URLError, RuntimeError, TimeoutError) as e:
            print(f"      ✗ errore su {dish_id}: {e}")

    print("[i] Fatto.")


if __name__ == "__main__":
    main()
