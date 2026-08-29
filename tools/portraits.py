"""Generate the Neil Greene photography system.

Every shot is rendered *from* a real photograph of him rather than from a
description. A description alone produces a different man; the reference frame
is what holds the likeness. See nb.py.

Shot mix follows the photography system in the master council doc:
  50-60% documentary / lived capability
  20-25% editorial portraiture
  10-15% physical / action proof
  10-15% detail / environment

Wardrobe follows the locked direction: elevated utility. Fitted solid tees,
knit polos, overshirts, textured shirts, dark denim, tailored trousers.
Not a tactical operator, not a suit in every frame, no luxury signalling.
"""

import os
import sys

import nb

REF = os.path.expanduser("~/Pictures/AI Training Images")
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "portraits-4k")

# The two strongest identity references: controlled light, sharp, current.
FACE_A = f"{REF}/IMG_1904.jpg"   # cream knit, dark mottled ground, level gaze
FACE_B = f"{REF}/IMG_1907.JPG"   # brown knit + camel roll neck, near black
FACE_C = f"{REF}/DSC_5299.JPG"   # daylight, outdoors, three-quarter

# ── The block that actually preserves the likeness ────────────────────────
IDENTITY = (
    "The first image is a real photograph of the subject and is the sole "
    "authority on who he is. Reproduce his face from it exactly: the same bone "
    "structure, the same brow and eye shape, the same nose, the same mouth, the "
    "same strong jaw, the same deep warm brown complexion and undertone, the "
    "same short cropped hair with its clean tapered fade and sharp lineup, the "
    "same dense black full beard with its shaped edge, the same small stud "
    "earring, the same broad muscular build. "
    "Carry over real photographic detail: visible skin pores and fine texture, "
    "individually resolved hair and beard strands, crisp separated eyelashes, "
    "true catchlights in the eyes, natural sensor grain, real specular highlights "
    "on the skin. "
    "Do not smooth, retouch, slim, reshape, lighten or beautify him. Do not make "
    "him younger. Do not invent a different man. He must be instantly "
    "recognisable as the person in the first image. "
)

# ── Palette and grade, held constant across the whole system ──────────────
GRADE = (
    "Colour grade: deep ink and midnight navy in the shadows rather than pure "
    "black, warm bone and parchment in the highlights rather than clinical white, "
    "graphite mid-tones. Restrained and desaturated. Skin stays warm and true, "
    "never ashy, never orange. No teal-and-orange grade, no neon, no colour cast. "
)

NEGATIVE = (
    "Photographic, editorial, real. No text, no lettering, no logos, no "
    "watermarks, no graphics overlaid anywhere in the image. No motivational "
    "signage. No RGB or neon lighting. No fake server rooms. No shields, crests, "
    "swords or tactical iconography. No luxury signalling: no designer logos, no "
    "supercars, no cigars, no staged private jets. Not a fitness-model pose. "
    "Not a stock-photo expression. "
)


def P(*blocks):
    return IDENTITY + "".join(blocks) + GRADE + NEGATIVE


SHOTS = {
    # ── Editorial portraiture (20-25%) ───────────────────────────────────
    "portrait-editorial": (
        FACE_A, "4:5",
        P("He wears a heavy oatmeal cable-knit cardigan over a dark crew tee, a "
          "fine gold chain just visible at the collar. Studio portrait against a "
          "deep ink, softly mottled backdrop. One large soft key from camera left "
          "with a gentle falloff, a faint cool rim separating his shoulder from "
          "the ground. ",
          "Tight three-quarter length portrait, chest up. He faces camera and "
          "holds a level, composed, unhurried gaze. Closed mouth, no smile, calm "
          "authority rather than intensity. Shot on a full-frame camera with an "
          "85mm prime at f/2, shallow depth of field. ")),

    "portrait-ink": (
        FACE_B, "4:5",
        P("He wears a chocolate brown wool overshirt over a camel roll-neck "
          "sweater. Studio portrait against a near-black ink ground. Single soft "
          "key from camera left, deep controlled shadow on the right of the frame. ",
          "Chest-up portrait, squared to camera, direct eye contact, composed and "
          "serious. Shot on a full-frame camera with an 85mm prime at f/2. ")),

    # ── Documentary / lived capability (50-60%) ──────────────────────────
    "neil-study": (
        FACE_A, "4:5",
        P("The setting is his working study: a modern command centre crossed with "
          "a scholar's room. Warm walnut shelving with real, worn books, a stone "
          "or concrete surface, a dark desk, one dimmed monitor at the edge of "
          "frame, a single warm practical lamp. Restrained, lived-in, not staged. ",
          "He wears a charcoal overshirt open over a fitted solid slate tee, dark "
          "denim. He stands at the edge of the desk, weight settled, one hand "
          "resting on the surface, looking directly at camera without performing. ",
          "Three-quarter length. Available-light look, the practical lamp doing "
          "the work. Shot on a full-frame camera with a 35mm prime at f/2. ")),

    "neil-working": (
        FACE_B, "3:2",
        P("He is working a problem out on a large glass writing wall in a quiet "
          "modern office. Real handwriting and a simple four-part diagram in black "
          "marker: four labelled boxes joined by plain connecting lines, drawn the "
          "way a working person actually draws, not designed. Daylight from a "
          "window at camera left, dark walls beyond. ",
          "He wears a fitted solid dark tee, sleeves clean at the bicep, a plain "
          "steel watch. Seen from the side and slightly behind, mid-gesture with "
          "the marker, attention on the wall and not on camera. ",
          "Wide environmental frame, him in the right third, the diagram legible "
          "in the left two thirds. Shot on a full-frame camera with a 35mm prime "
          "at f/2.8. ")),

    "neil-speaking": (
        FACE_B, "3:2",
        P("He is speaking to a small room of adults, seen from among the seated "
          "audience: a few out-of-focus heads and shoulders in the near "
          "foreground. A plain, well-lit modern room. No stage lighting, no "
          "conference branding, no screen behind him. ",
          "He wears a fine-gauge charcoal knit polo and tailored dark trousers. "
          "Mid-sentence, hands open in an explaining gesture, engaged and warm "
          "rather than performing. ",
          "Documentary frame, shot from the audience on a full-frame camera with "
          "a 50mm prime at f/2, shallow depth of field, him sharp and the "
          "foreground soft. ")),

    "neil-daylight": (
        FACE_C, "4:5",
        P("Outdoors in a city in the late afternoon: raw concrete architecture, a "
          "bridge underside or a covered walkway, soft overcast daylight, green "
          "foliage well out of focus behind him. ",
          "He wears a deep navy overshirt over a solid bone tee, dark denim. He "
          "leans on a steel handrail, forearms settled, turned three-quarters to "
          "camera, looking off frame-left in thought. Unposed. ",
          "Three-quarter length portrait. Natural light only. Shot on a "
          "full-frame camera with a 50mm prime at f/1.8. ")),

    # ── Physical / action proof (10-15%) ─────────────────────────────────
    "neil-training": (
        FACE_A, "4:3",
        P("A real home garage gym in daylight: a black power rack, a bench, a "
          "loaded barbell, weight plates stacked on the wall, a rubber platform, "
          "plain painted wall. Ordinary, used, not a commercial gym and not styled. ",
          "He wears a fitted charcoal training tee and dark shorts, and is mid-set "
          "at the rack with both hands on the bar, braced and working. Effort, not "
          "display. He is not looking at camera and he is not posing. ",
          "Wide documentary frame that keeps the rack and the plates in shot, him "
          "off centre. Shot on a full-frame camera with a 35mm prime at f/2.8. ")),
}

# ── Detail / environment (10-15%). No face, so no identity block ─────────
DETAIL = {
    "detail-desk": (
        None, "3:2",
        "Overhead flat-lay on a dark walnut desk: an open hardback book with dense "
        "text, a ruled notebook with a hand-drawn four-box diagram and short "
        "handwritten notes, a plain black fountain pen, a simple steel watch on a "
        "leather strap, a pair of reading glasses, a white coffee cup. Arranged as "
        "someone actually working left them, not styled for a photograph. "
        "One soft window light from the left, long soft shadows. " + GRADE + NEGATIVE),
}


def main(names):
    os.makedirs(OUT, exist_ok=True)
    todo = {**SHOTS, **DETAIL}
    for name in names or todo:
        ref, aspect, prompt = todo[name]
        out = os.path.join(OUT, f"{name}.png")
        refs = [ref] if ref else []
        print(f"→ {name} ({aspect}) ...", flush=True)
        for model in ("gemini-3-pro-image", "gemini-3.1-flash-image"):
            try:
                nb.generate(prompt, out, refs, aspect, "4K", model, tries=3)
                from PIL import Image
                print(f"  ok {name} {Image.open(out).size} via {model}", flush=True)
                break
            except SystemExit as e:
                print(f"  {model} failed: {str(e)[:160]}", flush=True)


if __name__ == "__main__":
    main(sys.argv[1:])
