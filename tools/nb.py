"""Nano Banana Pro (gemini-3-pro-image) driver.

Renders site imagery at 4K. Portraits are re-rendered *from the photograph*
rather than from a description, because a text prompt alone will produce a
different person. Passing the real frame in and asking for a higher-fidelity
render of that frame is the whole reason the likeness survives.
"""

import base64
import io
import json
import os
import sys
import time
import urllib.error
import urllib.request

from PIL import Image

API = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"


def key():
    d = json.load(open(os.path.expanduser("~/.claude.json")))
    return d["mcpServers"]["gemini-veo"]["env"]["GEMINI_API_KEY"]


def ref_part(path, cap=2048):
    """Reference images go up as bounded JPEG. A 10MB PNG inline is enough on
    its own to make the endpoint return 503."""
    im = Image.open(path).convert("RGB")
    if max(im.size) > cap:
        im = im.resize(
            (round(im.width * cap / max(im.size)), round(im.height * cap / max(im.size))),
            Image.LANCZOS,
        )
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=94, subsampling=0)
    return {"inline_data": {"mime_type": "image/jpeg",
                            "data": base64.b64encode(buf.getvalue()).decode()}}


def generate(prompt, out, refs=(), aspect="4:5", size="4K",
             model="gemini-3-pro-image", timeout=600, tries=5):
    parts = [ref_part(r) for r in refs]
    parts.append({"text": prompt})

    body = {
        "contents": [{"role": "user", "parts": parts}],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {"aspectRatio": aspect, "imageSize": size},
        },
    }

    d = None
    for attempt in range(tries):
        req = urllib.request.Request(
            API.format(model=model),
            data=json.dumps(body).encode(),
            headers={"x-goog-api-key": key(), "Content-Type": "application/json"},
        )
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                d = json.load(r)
            break
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503, 504) and attempt < tries - 1:
                wait = 8 * (attempt + 1)
                print(f"  {e.code}, retrying in {wait}s", flush=True)
                time.sleep(wait)
                continue
            raise SystemExit(f"HTTP {e.code}: {e.read()[:400]!r}")
    if d is None:
        raise SystemExit("no response")

    cands = d.get("candidates") or []
    if not cands:
        raise SystemExit("no candidates: " + json.dumps(d)[:600])
    for p in cands[0]["content"]["parts"]:
        if "inlineData" in p or "inline_data" in p:
            blob = p.get("inlineData") or p["inline_data"]
            open(out, "wb").write(base64.b64decode(blob["data"]))
            return out
    raise SystemExit("no image part: " + json.dumps(cands[0])[:600])


if __name__ == "__main__":
    prompt, out, aspect = sys.argv[1], sys.argv[2], sys.argv[3]
    generate(prompt, out, sys.argv[4:], aspect)
    print(out, Image.open(out).size)
