#!/bin/zsh
# Regenerate the full photography system through Codex, sequentially.
# One image per `codex exec` run; the newest png in the session dir is the
# result. Identity references ride along on every shot that shows his face.

set -u
REF="/Users/noel/Pictures/AI Training Images"
OUT="/Users/noel/Claude Code/iamneilgreene/assets/portraits-4k"
PUB="/Users/noel/Claude Code/iamneilgreene/public/images"
CODEX=/opt/homebrew/bin/codex

IDENTITY="Reproduce the man in the reference photos exactly: same bone structure, brow, eyes, nose, mouth, strong jaw, deep warm brown complexion, short cropped hair with clean tapered fade, dense black full beard with shaped edge, small stud earring, broad muscular build. Do not smooth, slim, lighten, or beautify him. Do not invent a different man. Real photographic texture: pores, beard strands, catchlights, subtle grain."

GRADE="Color grade: deep ink-navy shadows (never pure black), warm bone highlights, graphite midtones, desaturated and restrained. Skin warm and true. No orange-teal, no neon. No text, logos, or watermarks anywhere."

typeset -A PROMPTS
PROMPTS=(
  portrait-ink "Editorial studio portrait, 4:5 vertical, chest up, squared to camera, direct stoic eye contact. He wears a chocolate-brown wool overshirt over a camel roll-neck. Near-black ink ground, single soft key from camera left, deep controlled shadow camera right. 85mm f/2."
  neil-study "Environmental portrait, 4:5 vertical, three-quarter length. His working study: modern command center crossed with a scholar's room. Walnut shelves with worn books, dark stone desk, one dimmed monitor at frame edge, single warm practical lamp. He wears a charcoal overshirt over a fitted slate tee, dark denim, standing at the desk edge, one hand on the surface, looking at camera, composed, not performing. 35mm f/2, available light."
  neil-working "Documentary frame, 3:2 horizontal. He works a problem on a large glass writing wall in a quiet modern office: a hand-drawn four-box diagram with connecting lines in black marker, drawn like a working person draws. Daylight from a window camera left. Fitted solid dark tee, plain steel watch. Seen from the side, slightly behind, mid-gesture with marker, attention on the wall not the camera. Him in the right third, diagram legible in the left two thirds. 35mm f/2.8."
  neil-speaking "Documentary frame, 3:2 horizontal, shot from within a seated audience: a few out-of-focus heads in near foreground. Plain well-lit modern room, no stage lights, no branding, no screen. He wears a fine-gauge charcoal knit polo, tailored dark trousers. Mid-sentence, hands open explaining, engaged and warm. 50mm f/2, him sharp, foreground soft."
  neil-daylight "Outdoor portrait, 4:5 vertical, three-quarter length. Late afternoon city: raw concrete architecture, covered walkway, soft overcast daylight, green foliage far out of focus. Deep navy overshirt over a solid bone tee, dark denim. Leaning on a steel handrail, forearms settled, turned three-quarters, looking off frame-left in thought, unposed. 50mm f/1.8, natural light only."
  neil-training "Documentary frame, 4:3 horizontal. Real home garage gym in daylight: black power rack, bench, loaded barbell, wall-stacked plates, rubber floor, plain painted wall. Used, not styled. Fitted charcoal training tee, dark shorts, mid-set at the rack, both hands on the bar, braced and working. Effort, not display. Not looking at camera, not posing. Rack and plates in shot, him off-center. 35mm f/2.8."
)

for name in ${(k)PROMPTS}; do
  echo "=== $name ==="
  before=$(ls -t ~/.codex/generated_images/*/exec-*.png 2>/dev/null | head -1)
  $CODEX exec --skip-git-repo-check \
    "Generate an image: $IDENTITY ${PROMPTS[$name]} $GRADE" \
    -i "$REF/IMG_1904.jpg" -i "$REF/IMG_1907.JPG" </dev/null 2>&1 | tail -2
  after=$(ls -t ~/.codex/generated_images/*/exec-*.png 2>/dev/null | head -1)
  if [[ -n "$after" && "$after" != "$before" ]]; then
    cp "$after" "$OUT/$name.png"
    /opt/homebrew/bin/cwebp -quiet -q 88 "$after" -o "$PUB/$name.webp"
    echo "OK $name <- $after"
  else
    echo "FAIL $name (no new image)"
  fi
done
echo "ALL DONE"
