#!/usr/bin/env python3
"""Build the Krasty Soft brand book as one self-contained HTML file.

    python3 tools/brand-book/build.py [output.html]

Inputs (edit these, never the generated HTML):
  brand.md            the brand book text, one "## " heading per section
  tokens.json         colours, type styles, spacing, radii, shadows, layout
  components/*.html   markup of each component example
  components/*.md     guidance for each component
  components.css      styles of the component examples
  assets-*.md         notes for the logo, icon, illustration and imagery groups

Logos, icons, the Sora font and the social image are read from src/ and
public/ and embedded as data URIs, so the output opens offline and can be
sent as a single file.
"""

import base64
import html
import json
import re
import subprocess
import sys
from datetime import date
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parent.parent
OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else HERE / "krasty-soft-brand-book.html"

COMPONENTS = ["Button", "Pill", "StatusBadge", "Card", "CTABanner", "Input"]

LOGOS = [
    ("krastysoft-black.svg", "src/assets/krastysoft-black.svg", "dark", "Wordmark for dark grounds (default)"),
    ("krastysoft-white.svg", "src/assets/krastysoft-white.svg", "light", "Wordmark for white grounds"),
    ("logo.svg", "src/assets/logo.svg", "dark", "A mark"),
    ("app-icon.svg", "src/app/icon.svg", "dark", "App icon and favicon"),
]
ICONS = [  # (file, ink): dark-ink files are shown on a light tile
    ("arrow-up.svg", "#121514"), ("arrow-right.svg", "#121514"), ("arrow-down.svg", "#121514"),
    ("arrow-left.svg", "#121514"), ("arrow-right-up.svg", "#727272"), ("close-grey.svg", "#727272"),
    ("menu-tab-mob.svg", "#727272"), ("done-mark.svg", "white"), ("done-mark-dark.svg", "#121514"),
    ("team-linkedin.svg", "white"), ("team-mail.svg", "white"),
]
ILLUSTRATIONS = [
    "ai.svg", "automate-reporting-analytics.svg", "consultancy.svg", "create-custom-tool.svg",
    "elevate-marketing.svg", "fin-tech.svg", "flexibility-in-deployment.svg", "health-care.svg",
    "integrate-crm.svg", "maritime.svg", "maximize-cloud-resources.svg", "optimise-workflows.svg",
    "protect.svg", "test-idea.svg",
]
COLOR_GROUPS = [
    ("Grounds", ("bg-",)),
    ("Brand", ("brand-", "logo-")),
    ("Text", ("text-",)),
    ("Lines", ("border-",)),
    ("States", ("state-",)),
    ("Call to action and tints", ("cta-", "pill-", "code-")),
    ("Status", ("status-",)),
]


def data_uri(path: Path, mime: str) -> str:
    return f"data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}"


def svg_uri(rel: str) -> str:
    return data_uri(REPO / rel, "image/svg+xml")


def esc(s) -> str:
    return html.escape(str(s), quote=True)


# --- a small Markdown subset: headings, paragraphs, lists, tables, bold, code ---

def inline(s: str) -> str:
    out, parts = [], re.split(r"(`[^`]+`)", s)
    for p in parts:
        if p.startswith("`") and p.endswith("`") and len(p) > 1:
            out.append(f"<code>{esc(p[1:-1])}</code>")
        else:
            t = esc(p)
            t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
            out.append(t)
    return "".join(out)


def md(text: str, shift: int = 0) -> str:
    lines, out, i = text.strip("\n").splitlines(), [], 0
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        m = re.match(r"^(#{1,6})\s+(.*)", line)
        if m:
            lvl = min(6, len(m.group(1)) + shift)
            out.append(f"<h{lvl}>{inline(m.group(2))}</h{lvl}>")
            i += 1
            continue
        if line.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r":?-{3,}:?", c) for c in cells):
                    rows.append(cells)
                i += 1
            head, body = rows[0], rows[1:]
            t = "<div class=\"table\"><table><thead><tr>" + "".join(f"<th>{inline(c)}</th>" for c in head) + "</tr></thead><tbody>"
            t += "".join("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>" for r in body)
            out.append(t + "</tbody></table></div>")
            continue
        if re.match(r"^\s*- ", line):
            items = []
            while i < len(lines) and lines[i].strip():
                if re.match(r"^\s*- ", lines[i]):
                    items.append(re.sub(r"^\s*- ", "", lines[i]))
                else:
                    items[-1] += " " + lines[i].strip()
                i += 1
            out.append("<ul>" + "".join(f"<li>{inline(x)}</li>" for x in items) + "</ul>")
            continue
        para = []
        while i < len(lines) and lines[i].strip() and not re.match(r"^(#|\||\s*- )", lines[i]):
            para.append(lines[i].strip())
            i += 1
        out.append(f"<p>{inline(' '.join(para))}</p>")
    return "\n".join(out)


def sections(text: str):
    """Split brand.md into (intro, [(title, body)])."""
    parts = re.split(r"^## (.+)$", text, flags=re.M)
    return parts[0], list(zip(parts[1::2], parts[2::2]))


def slug(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


# --- visual blocks injected after a section's text ---

def tok_value(t):
    v = t["value"]
    return v if isinstance(v, str) else v.get("dark") or next(iter(v.values()))


def block_colour(tokens):
    out = []
    for title, prefixes in COLOR_GROUPS:
        items = [t for t in tokens["color"]["tokens"] if t["name"].startswith(prefixes)]
        if not items:
            continue
        out.append(f"<h3>{esc(title)}</h3><div class=\"swatches\">")
        for t in items:
            v = tok_value(t)
            out.append(
                f"<figure class=\"swatch\"><div class=\"chip\" style=\"background:{esc(v)}\"></div>"
                f"<figcaption><b>{esc(t['name'])}</b><span class=\"val\">{esc(v)}</span>"
                f"<span class=\"use\">{inline(t.get('usage', ''))}</span></figcaption></figure>"
            )
        out.append("</div>")
    return "\n".join(out)


def block_type(tokens):
    fams = tokens["type"]["families"]
    out = []
    for g in tokens["type"]["groups"]:
        out.append(f"<h3>{esc(g['name'])}</h3><div class=\"specimens\">")
        for s in g["styles"]:
            fam = fams[s.get("family", g["family"])]
            style = [f"font-family:{fam}", f"font-size:min({s['fontSize']}, 11vw)"]
            meta = [s["fontSize"]]
            if "lineHeight" in s:
                style.append(f"line-height:{s['lineHeight']}")
                meta.append(f"line-height {s['lineHeight']}")
            if "fontWeight" in s:
                style.append(f"font-weight:{s['fontWeight']}")
                meta.append(f"weight {s['fontWeight']}")
            if "letterSpacing" in s:
                style.append(f"letter-spacing:{s['letterSpacing']}")
                meta.append(f"tracking {s['letterSpacing']}")
            out.append(
                f"<div class=\"specimen\"><div class=\"spec-meta\"><b>{esc(s['name'])}</b>"
                f"<span>{esc(' · '.join(str(m) for m in meta))}</span></div>"
                f"<div class=\"spec-sample\" style=\"{esc(';'.join(style))}\">{esc(s.get('sample', s['name']))}</div>"
                f"<p class=\"spec-use\">{inline(s.get('usage', ''))}</p></div>"
            )
        out.append("</div>")
    return "\n".join(out)


def block_spacing(tokens):
    out = ["<h3>Spacing</h3><div class=\"bars\">"]
    for t in tokens["spacing"]["tokens"]:
        out.append(
            f"<div class=\"bar-row\"><b>{esc(t['name'])}</b><span class=\"val\">{esc(t['value'])}</span>"
            f"<div class=\"bar\" style=\"width:{esc(t['value'])}\"></div><span class=\"use\">{inline(t['usage'])}</span></div>"
        )
    out.append("</div><h3>Layout</h3><div class=\"table\"><table><thead><tr><th>Token</th><th>Value</th><th>Use</th></tr></thead><tbody>")
    for t in tokens["layout"]["tokens"]:
        out.append(f"<tr><td><code>{esc(t['name'])}</code></td><td>{esc(t['value'])}</td><td>{inline(t['usage'])}</td></tr>")
    out.append("</tbody></table></div>")
    return "\n".join(out)


def block_shape(tokens):
    out = ["<h3>Radii</h3><div class=\"tiles\">"]
    for t in tokens["radius"]["tokens"]:
        r = "36px" if t["name"] == "radius-full" else t["value"]
        out.append(
            f"<figure class=\"tile\"><div class=\"radius-box\" style=\"border-radius:{esc(r)}\"></div>"
            f"<figcaption><b>{esc(t['name'])}</b><span class=\"val\">{esc(t['value'])}</span>"
            f"<span class=\"use\">{inline(t['usage'])}</span></figcaption></figure>"
        )
    out.append("</div><h3>Shadows</h3><div class=\"tiles\">")
    for t in tokens["shadow"]["tokens"]:
        out.append(
            f"<figure class=\"tile\"><div class=\"shadow-box\" style=\"box-shadow:{esc(t['value'])}\"></div>"
            f"<figcaption><b>{esc(t['name'])}</b><span class=\"val\">{esc(t['value'])}</span>"
            f"<span class=\"use\">{inline(t['usage'])}</span></figcaption></figure>"
        )
    out.append("</div>")
    return "\n".join(out)


def block_logo():
    out = ["<div class=\"logos\">"]
    for name, rel, ground, label in LOGOS:
        out.append(
            f"<figure class=\"logo-tile {ground}\"><div class=\"logo-art\"><img src=\"{svg_uri(rel)}\" alt=\"{esc(label)}\"></div>"
            f"<figcaption><b>{esc(name)}</b><span class=\"use\">{esc(label)}</span></figcaption></figure>"
        )
    out.append("</div>")
    out.append(f"<div class=\"note\">{md((HERE / 'assets-logos.md').read_text(), shift=2)}</div>")
    return "\n".join(out)


def block_icons():
    out = ["<h3>Icons</h3><div class=\"icons\">"]
    for name, ink in ICONS:
        light = ink == "#121514"
        out.append(
            f"<figure class=\"icon-tile{' light' if light else ''}\"><img src=\"{svg_uri('src/assets/' + name)}\" alt=\"{esc(name)}\">"
            f"<figcaption>{esc(name)}<span class=\"val\">ink {esc(ink)}</span></figcaption></figure>"
        )
    out.append("</div><h3>Illustrations</h3><div class=\"icons illus\">")
    for name in ILLUSTRATIONS:
        out.append(
            f"<figure class=\"icon-tile\"><img src=\"{svg_uri('src/assets/' + name)}\" alt=\"{esc(name)}\">"
            f"<figcaption>{esc(name)}</figcaption></figure>"
        )
    out.append("</div>")
    out.append(f"<div class=\"note\">{md((HERE / 'assets-illustrations.md').read_text(), shift=2)}</div>")
    return "\n".join(out)


def block_imagery():
    og = data_uri(REPO / "public/og-image.png", "image/png")
    return (
        f"<figure class=\"og\"><img src=\"{og}\" alt=\"Social preview: Krasty Soft, Software Development Company, "
        f"between two short red rules on a dark vignette\" width=\"1200\" height=\"630\">"
        f"<figcaption>og-image.png · 1200×630</figcaption></figure>"
        f"<div class=\"note\">{md((HERE / 'assets-imagery.md').read_text(), shift=2)}</div>"
    )


def block_components(_tokens=None):
    out = []
    for n in COMPONENTS:
        guide = (HERE / "components" / f"{n}.md").read_text()
        guide = re.sub(r"^# .*\n", "", guide)  # the section heading already names it
        demo = (HERE / "components" / f"{n}.html").read_text()
        out.append(
            f"<article class=\"component\" id=\"component-{slug(n)}\"><h3>{esc(n)}</h3>"
            f"<div class=\"demo\">{demo}</div><div class=\"guide\">{md(guide, shift=2)}</div></article>"
        )
    return "\n".join(out)


BLOCKS = {
    "Logo": lambda t: block_logo(),
    "Colour": block_colour,
    "Typography": block_type,
    "Layout and spacing": block_spacing,
    "Shape, borders and elevation": block_shape,
    "Iconography": lambda t: block_icons(),
    "Imagery": lambda t: block_imagery(),
    "Components": block_components,
}

COVER_ART = """<svg class="cover-art" viewBox="0 0 480 320" role="img" aria-label="Brand colour blocks with chevrons from the SOFT brackets">
<rect class="c-red" x="40" y="-12" width="176" height="236" rx="12"/>
<rect class="c-light" x="232" y="-12" width="120" height="112" rx="12"/>
<rect class="c-deep" x="232" y="116" width="260" height="172" rx="12"/>
<rect class="c-dark" x="40" y="240" width="80" height="48" rx="12"/>
<g class="chev cut"><polyline points="72,152 83,163 72,174"/><polyline points="112,152 123,163 112,174"/><polyline points="152,152 163,163 152,174"/></g>
<g class="chev">%s</g>
</svg>""" % "".join(
    f'<polyline points="{x},{y} {x + 11},{y + 11} {x},{y + 22}"/>'
    for y in (136, 176, 216, 256) for x in (256, 296, 336, 376, 416, 456)
)

PAGE_CSS = """
:root {
  color-scheme: dark;
  --page-gutter: max(16px, env(safe-area-inset-left, 0px));
}
* { box-sizing: border-box; }
html { background: var(--bg-primary); scroll-behavior: smooth; }
body { margin: 0; background: var(--bg-primary); color: var(--text-secondary); font: 400 16px/1.6 var(--font-sans); -webkit-font-smoothing: antialiased; }
img { max-width: 100%; }
a { color: inherit; }
code { font-family: var(--font-mono); font-size: .875em; color: var(--brand-red); background: var(--code-red-fill); padding: .1em .4em; border-radius: var(--radius-sm); }
strong { color: var(--text-primary); font-weight: 600; }
:focus-visible { outline: 2px solid var(--brand-red); outline-offset: 2px; }
::selection { background: var(--brand-red); color: var(--text-primary); }

.layout { display: grid; grid-template-columns: 240px minmax(0, 1fr); max-width: var(--max-width); margin: 0 auto; }
nav.toc { position: sticky; top: 0; align-self: start; height: 100vh; overflow-y: auto; padding: 40px 24px 40px var(--page-gutter); border-right: 1px solid var(--border-subtle); }
nav.toc .mark { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; color: var(--text-primary); font-weight: 600; text-decoration: none; }
nav.toc .mark img { width: 36px; }
nav.toc ol { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; counter-reset: s; }
nav.toc li a { display: block; padding: 6px 10px; border-radius: var(--radius-md); font-size: 14px; color: var(--text-muted); text-decoration: none; }
nav.toc li a:hover { color: var(--text-primary); background: var(--state-hover); }
nav.toc li a.on { color: var(--text-primary); background: var(--state-active); }
main { min-width: 0; padding-block: 0 96px; padding-left: 48px; padding-right: max(48px, env(safe-area-inset-right, 0px)); }

.cover { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: end; gap: 32px; padding: 72px 0 56px; border-bottom: 1px solid var(--border-subtle); }
.cover h1 { margin: 0; color: var(--text-primary); font-size: clamp(64px, 9vw, 112px); line-height: .92; font-weight: 700; letter-spacing: -0.02em; }
.cover .tag { margin: 12px 0 0 4px; color: var(--text-muted); font-size: 15px; }
.cover .kicker { margin: 0 0 20px; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: var(--brand-red); font-weight: 600; }
.cover-art { width: 100%; height: auto; display: block; }
.c-red { fill: var(--brand-red); } .c-deep { fill: var(--cta-red-900); } .c-dark { fill: var(--brand-red-dark); } .c-light { fill: var(--text-secondary); }
.chev { fill: none; stroke: var(--brand-red); stroke-width: 4; stroke-linecap: square; }
.chev.cut { stroke: var(--bg-primary); }
.intro { max-width: 68ch; font-size: 18px; line-height: 1.7; color: var(--text-secondary); padding: 40px 0 8px; }

section.part { padding-top: 64px; scroll-margin-top: 16px; }
section.part > h2 { display: flex; align-items: baseline; gap: 14px; margin: 0 0 24px; color: var(--text-primary); font-size: clamp(26px, 3.4vw, 34px); line-height: 1.2; font-weight: 700; text-wrap: balance; }
section.part > h2 .num { font-size: 13px; font-weight: 600; color: var(--brand-red); font-variant-numeric: tabular-nums; letter-spacing: .05em; }
section.part h3 { margin: 40px 0 16px; color: var(--text-primary); font-size: 20px; font-weight: 600; }
section.part h4, section.part h5 { margin: 24px 0 8px; color: var(--text-primary); font-size: 15px; font-weight: 600; }
section.part p, section.part li { max-width: 72ch; }
section.part ul { padding-left: 1.25rem; }
section.part li { margin: 6px 0; }
section.part li::marker { color: var(--brand-red); }
.table { overflow-x: auto; margin: 16px 0; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); }
table { width: 100%; border-collapse: collapse; font-size: 14px; }
th, td { text-align: left; vertical-align: top; padding: 10px 14px; border-bottom: 1px solid var(--border-subtle); }
th { color: var(--text-primary); font-size: 12px; letter-spacing: .05em; text-transform: uppercase; background: var(--bg-secondary); }
tr:last-child td { border-bottom: 0; }
.note { margin-top: 20px; padding: 16px 20px; background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); font-size: 14px; }
.note h3, .note h4 { margin-top: 0 !important; font-size: 13px !important; text-transform: uppercase; letter-spacing: .05em; color: var(--text-muted) !important; }
.val { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); }
.use { font-size: 13px; line-height: 1.5; color: var(--text-muted); }

.swatches { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
.swatch { margin: 0; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); overflow: hidden; background: var(--bg-secondary); }
.swatch .chip { height: 72px; border-bottom: 1px solid var(--border-subtle); }
.swatch figcaption, .tile figcaption { display: grid; gap: 4px; padding: 12px 14px 14px; }
.swatch b, .tile b, .logo-tile b { color: var(--text-primary); font-size: 14px; font-weight: 600; }

.specimens { display: grid; gap: 12px; }
.specimen { padding: 20px 24px; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); background: var(--bg-muted); min-width: 0; }
.spec-meta { display: flex; flex-wrap: wrap; gap: 6px 14px; align-items: baseline; margin-bottom: 12px; }
.spec-meta b { color: var(--brand-red); font-size: 13px; font-weight: 600; }
.spec-meta span { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); }
.spec-sample { color: var(--text-primary); overflow-wrap: anywhere; }
.spec-use { margin: 12px 0 0; font-size: 13px; color: var(--text-muted); }

.bars { display: grid; gap: 10px; }
.bar-row { display: grid; grid-template-columns: 120px 80px minmax(0, 220px) minmax(0, 1fr); gap: 12px; align-items: center; }
.bar-row b { color: var(--text-primary); font-size: 14px; font-weight: 600; }
.bar { height: 16px; max-width: 100%; background: var(--brand-red); border-radius: 2px; }

.tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
.tile { margin: 0; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); background: var(--bg-secondary); }
.radius-box, .shadow-box { width: 72px; height: 72px; margin: 20px 14px 4px; }
.radius-box { background: var(--bg-elevated); border: 2px solid var(--brand-red); }
.shadow-box { background: var(--bg-elevated); border-radius: var(--radius-lg); }

.logos { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 12px; }
.logo-tile { margin: 0; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); overflow: hidden; background: var(--bg-secondary); }
.logo-art { display: grid; place-items: center; height: 150px; padding: 24px; background: var(--brand-black); }
.logo-tile.light .logo-art { background: #ffffff; }
.logo-art img { max-height: 96px; }
.logo-tile figcaption { display: grid; gap: 4px; padding: 12px 14px 14px; }

.icons { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; }
.icon-tile { margin: 0; display: grid; justify-items: center; gap: 10px; padding: 20px 10px 12px; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); background: var(--bg-secondary); text-align: center; font-size: 12px; color: var(--text-secondary); overflow-wrap: anywhere; }
.icon-tile img { height: 32px; width: auto; }
.illus .icon-tile img { height: 56px; }
.icon-tile.light { background: var(--text-secondary); color: #121514; }
.icon-tile.light .val { color: #4a4a4a; }
.icon-tile figcaption { display: grid; gap: 2px; }

.og { margin: 0; max-width: 720px; }
.og img { display: block; width: 100%; height: auto; border-radius: var(--radius-lg); border: 1px solid var(--border-subtle); }
.og figcaption { margin-top: 8px; font-size: 12px; color: var(--text-muted); }

.component { margin-top: 32px; border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); overflow: hidden; }
.component h3 { margin: 0 !important; padding: 16px 24px; background: var(--bg-secondary); border-bottom: 1px solid var(--border-subtle); }
.component .demo { padding: 28px 24px; background: var(--bg-primary); border-bottom: 1px solid var(--border-subtle); }
.component .guide { padding: 4px 24px 20px; font-size: 15px; }

footer.colophon { margin-top: 80px; padding-top: 24px; border-top: 1px solid var(--border-subtle); font-size: 13px; color: var(--text-muted); }

@media (max-width: 1000px) {
  .layout { display: block; }
  nav.toc { position: static; height: auto; border-right: 0; border-bottom: 1px solid var(--border-subtle); padding: 20px var(--page-gutter); }
  nav.toc ol { display: flex; flex-wrap: wrap; gap: 4px; }
  nav.toc li a { padding: 4px 10px; border: 1px solid var(--border-subtle); border-radius: var(--radius-full); font-size: 13px; }
  main { padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
}
@media (max-width: 720px) {
  .cover { grid-template-columns: 1fr; padding-top: 40px; }
  .cover-art { order: -1; }
  .bar-row { grid-template-columns: 110px minmax(0, 1fr); }
  .bar-row .bar { grid-column: 1 / -1; }
  .bar-row .use { grid-column: 1 / -1; }
}
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } * { transition: none !important; } }
@media print {
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .layout { display: block; }
  nav.toc { display: none; }
  section.part { break-inside: auto; }
  .swatch, .specimen, .tile, .logo-tile, .icon-tile, .component { break-inside: avoid; }
}
"""

TOC_JS = """
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('nav.toc a[href^="#"]'));
  if (!('IntersectionObserver' in window) || !links.length) return;
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) { a.classList.remove('on'); });
      var a = byId[e.target.id];
      if (a) a.classList.add('on');
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  Object.keys(byId).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
})();
"""


def token_css(tokens) -> str:
    lines = [":root {"]
    for t in tokens["color"]["tokens"]:
        lines.append(f"  --{t['name']}: {tok_value(t)};")
    for fam in ("shadow", "spacing", "radius", "layout"):
        for t in tokens[fam]["tokens"]:
            lines.append(f"  --{t['name']}: {t['value']};")
    for k, v in tokens["type"]["families"].items():
        lines.append(f"  --font-{k}: {v};")
    lines.append("}")
    for f in tokens["type"]["fonts"]:
        font = data_uri(HERE / f["file"] if (HERE / f["file"]).exists() else REPO / "src/fonts" / Path(f["file"]).name, "font/ttf")
        lines.append(
            f"@font-face {{ font-family: \"{f['family']}\"; src: url(\"{font}\") format(\"truetype\"); "
            f"font-weight: {f['weight']}; font-style: {f.get('style', 'normal')}; font-display: swap; }}"
        )
    return "\n".join(lines)


def build() -> str:
    tokens = json.loads((HERE / "tokens.json").read_text())
    intro, parts = sections((HERE / "brand.md").read_text())
    try:
        sha = subprocess.run(["git", "-C", str(REPO), "rev-parse", "--short", "HEAD"], capture_output=True, text=True).stdout.strip()
    except OSError:
        sha = ""

    toc, body = [], []
    for n, (title, text) in enumerate(parts, 1):
        sid = slug(title)
        toc.append(f"<li><a href=\"#{sid}\">{esc(title)}</a></li>")
        extra = BLOCKS[title](tokens) if title in BLOCKS else ""
        body.append(
            f"<section class=\"part\" id=\"{sid}\"><h2><span class=\"num\">{n:02d}</span>{inline(title)}</h2>"
            f"{md(text, shift=0)}{extra}</section>"
        )

    mark = svg_uri("src/app/icon.svg")
    built = f"Built {date.today().isoformat()}" + (f" from commit {sha}" if sha else "")
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Krasty Soft Brand Book</title>
<link rel="icon" href="{mark}">
<style>
{token_css(tokens)}
{PAGE_CSS}
{(HERE / "components.css").read_text()}
</style>
</head>
<body>
<div class="layout">
<nav class="toc" aria-label="Sections">
<a class="mark" href="#top"><img src="{mark}" alt="">Brand Book</a>
<ol>{''.join(toc)}</ol>
</nav>
<main id="top">
<header class="cover">
<div><p class="kicker">Brand book</p><h1>Krasty<br>Soft</h1><p class="tag">Software Company Focused on AI and Software Engineering</p></div>
{COVER_ART}
</header>
<div class="intro">{md(intro)}</div>
{''.join(body)}
<footer class="colophon">{esc(built)}. Generated by tools/brand-book/build.py from brand.md and tokens.json; edit those and rebuild rather than editing this file.</footer>
</main>
</div>
<script>{TOC_JS}</script>
</body>
</html>
"""


if __name__ == "__main__":
    OUT.write_text(build(), encoding="utf-8")
    print(f"wrote {OUT} ({OUT.stat().st_size // 1024} KB)")
