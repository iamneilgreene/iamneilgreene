"""WCAG contrast audit of the OKLCH palette.

The master council doc leaves exact production values open "subject to
accessibility, photography, print, and skin-tone testing before final
brand-guide lock". This is the accessibility half of that gate.
"""
import math, re, pathlib

def oklch_to_srgb(L, C, h_deg):
    h = math.radians(h_deg)
    a, b = C * math.cos(h), C * math.sin(h)
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_**3, m_**3, s_**3
    r = +4.0767416621*l - 3.3077115913*m + 0.2309699292*s
    g = -1.2684380046*l + 2.6097574011*m - 0.3413193965*s
    bl = -0.0041960863*l - 0.7034186147*m + 1.7076147010*s
    def enc(c):
        c = max(0.0, min(1.0, c))
        return 12.92*c if c <= 0.0031308 else 1.055*c**(1/2.4) - 0.055
    return tuple(enc(x) for x in (r, g, bl))

def luminance(rgb):
    def lin(c):
        return c/12.92 if c <= 0.04045 else ((c+0.055)/1.055)**2.4
    r, g, b = (lin(x) for x in rgb)
    return 0.2126*r + 0.7152*g + 0.0722*b

def ratio(c1, c2):
    a, b = luminance(c1), luminance(c2)
    hi, lo = max(a, b), min(a, b)
    return (hi + 0.05) / (lo + 0.05)

def hexs(rgb):
    return '#' + ''.join(f'{round(c*255):02x}' for c in rgb)

# Parse the tokens straight out of globals.css so this can never drift.
css = pathlib.Path('src/app/globals.css').read_text()
TOK = {}
for name, L, C, H in re.findall(
        r'--color-([a-z0-9-]+):\s*oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)', css):
    TOK[name] = oklch_to_srgb(float(L), float(C), float(H))

PAIRS = [
    ('Body copy',            'text-body',        'ink-900',  4.5),
    ('Headings',             'text-primary',     'ink-900',  4.5),
    ('Muted / captions',     'text-muted',       'ink-900',  4.5),
    ('Mono labels on 950',   'slate-600',        'ink-950',  4.5),
    ('Mono labels on 900',   'slate-500',        'ink-900',  4.5),
    ('Bronze label',         'bronze-500',       'ink-900',  4.5),
    ('Bronze label bright',  'bronze-400',       'ink-900',  4.5),
    ('Link / active',        'cobalt-300',       'ink-950',  4.5),
    ('Primary button text',  'bone-50',          'cobalt-500', 4.5),
    ('Ink on bone body',     'ink-on-bone-body', 'bone-50',  4.5),
    ('Ink on bone muted',    'ink-on-bone-muted','bone-50',  4.5),
    ('Bronze on bone',       'bronze-600',       'bone-50',  4.5),
    # WCAG 1.4.11 covers UI components and meaning-carrying graphics. The
    # decorative hairlines are neither, so they are exempt. Anything that is
    # the visible boundary of a control must use border-input, which is tested.
    ('Control border',       'border-input',     'ink-900',  3.0),
    ('Focus ring',           'cobalt-400',       'ink-900',  3.0),
]

print(f"{'PAIR':<24}{'FG':<20}{'BG':<14}{'RATIO':>7}  {'NEED':>5}  RESULT")
print('-' * 82)
fails = []
for label, fg, bg, need in PAIRS:
    if fg not in TOK or bg not in TOK:
        print(f'{label:<24}{fg:<20}{bg:<14}  MISSING TOKEN'); continue
    r = ratio(TOK[fg], TOK[bg])
    ok = r >= need
    if not ok:
        fails.append((label, fg, bg, r, need))
    print(f'{label:<24}{fg+" "+hexs(TOK[fg]):<20}{bg:<14}{r:>7.2f}  {need:>5.1f}  '
          f'{"PASS" if ok else "FAIL"}')
print()
print(f'{len(fails)} failing pair(s).')
for label, fg, bg, r, need in fails:
    print(f'  {label}: {fg} on {bg} = {r:.2f}, needs {need}')
