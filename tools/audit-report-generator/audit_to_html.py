#!/usr/bin/env python3
"""
Krasty Soft — Audit Report HTML generator.

Markdown audit doc (Krasty Soft finding format) -> self-contained, branded,
collapsible HTML. Reusable template for any audit deliverable.

Usage:  python3 scripts/audit_to_html.py <input.md> <output.html> ["Report Title"]

Design tokens lifted from krasty-soft-landing-page/src/app/globals.css:
  dark theme, brand red #e50606, Sora font, red-glow accents, elevated cards.
Findings render as <details> collapsed by default so the reader isn't buried in
a wall of text; each summary row shows ID · title · severity · hours.
"""
import sys, re, html

# ── brand tokens ────────────────────────────────────────────────────────────
KRASTY_ICON = (
    '<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" '
    'width="34" height="34" aria-hidden="true">'
    '<rect width="36" height="36" rx="6" fill="black"/>'
    '<path d="M33 27L33 8L21 18.0198L33 27Z" fill="#F30000"/>'
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M4 30V6H8.64516V16.8293V30H4Z" fill="#F0F0F0"/>'
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M23.1613 30C17.4924 24.8565 14.3141 21.9728 '
    '8.64516 16.8293L23.1613 6H29.632L15.6129 18L31 30H23.1613Z" fill="#F0F0F0"/>'
    '<path d="M8.64516 16.8293V6H4V30H8.64516V16.8293ZM8.64516 16.8293C14.3141 21.9728 17.4924 '
    '24.8565 23.1613 30H31L15.6129 18L29.632 6H23.1613L8.64516 16.8293Z" stroke="#F0F0F0"/></svg>'
)

SEV_MAP = {  # label -> (css class, dot colour)
    'critical': ('critical', '#e50606'),
    'high':     ('high',     '#ff7a1a'),
    'medium':   ('medium',   '#ffc400'),
    'low':      ('low',      '#8a8a8a'),
}

# ── tiny inline-markdown -> HTML ─────────────────────────────────────────────
def inline(t):
    t = html.escape(t)
    t = re.sub(r'`([^`]+)`', r'<code>\1</code>', t)
    t = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', t)
    t = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<em>\1</em>', t)
    return t

def blocks_to_html(lines):
    """Convert a list of markdown lines (a finding body or a static section) to HTML."""
    out, i, n = [], 0, len(lines)
    while i < n:
        ln = lines[i]
        s = ln.strip()
        if not s:
            i += 1; continue
        # table
        if s.startswith('|') and i + 1 < n and set(lines[i+1].strip()) <= set('|-: '):
            head = [c.strip() for c in s.strip('|').split('|')]
            i += 2
            rows = []
            while i < n and lines[i].strip().startswith('|'):
                rows.append([c.strip() for c in lines[i].strip().strip('|').split('|')])
                i += 1
            th = ''.join(f'<th>{inline(h)}</th>' for h in head)
            trs = ''.join('<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>' for r in rows)
            out.append(f'<div class="twrap"><table><thead><tr>{th}</tr></thead><tbody>{trs}</tbody></table></div>')
            continue
        # blockquote
        if s.startswith('>'):
            q = []
            while i < n and lines[i].strip().startswith('>'):
                q.append(lines[i].strip()[1:].strip()); i += 1
            out.append(f'<blockquote>{blocks_to_html(q)}</blockquote>')
            continue
        # code fence
        if s.startswith('```'):
            i += 1; code = []
            while i < n and not lines[i].strip().startswith('```'):
                code.append(lines[i]); i += 1
            i += 1
            out.append('<pre><code>' + html.escape('\n'.join(code)) + '</code></pre>')
            continue
        # bullet list
        if re.match(r'^[-*] ', s):
            items = []
            while i < n and re.match(r'^[-*] ', lines[i].strip()):
                items.append(inline(re.sub(r'^[-*] ', '', lines[i].strip()))); i += 1
            out.append('<ul>' + ''.join(f'<li>{it}</li>' for it in items) + '</ul>')
            continue
        # numbered list
        if re.match(r'^\d+\. ', s):
            items = []
            while i < n and re.match(r'^\d+\. ', lines[i].strip()):
                items.append(inline(re.sub(r'^\d+\. ', '', lines[i].strip()))); i += 1
            out.append('<ol>' + ''.join(f'<li>{it}</li>' for it in items) + '</ol>')
            continue
        # hr
        if s == '---':
            out.append('<hr>'); i += 1; continue
        # h4 (#### )
        if s.startswith('#### '):
            out.append(f'<h4>{inline(s[5:])}</h4>'); i += 1; continue
        # h3 (### ) — only reaches here for non-finding sub-headings
        # ("### Security", "### Option 1 — Beta-Ready", "### Must fix before beta")
        if s.startswith('### '):
            out.append(f'<h3>{inline(s[4:])}</h3>'); i += 1; continue
        # paragraph (gather until blank / block start)
        para = []
        while i < n and lines[i].strip() and not re.match(r'^([-*] |\d+\. |> |\||### |#### |```|---)', lines[i].strip()):
            para.append(lines[i].strip()); i += 1
        out.append(f'<p>{inline(" ".join(para))}</p>')
    return '\n'.join(out)

# ── finding heading parse — handles both house formats ───────────────────────
#   client:   "### A1 — Title · **Critical** · 20–120 h"
#   register: "### 2.1 CRITICAL — Title"   /   "### 2.33 MEDIUM ⚠️ — Title"
#             "### 2.13 Untagged title"    (no severity / no em-dash)
# A finding heading must START with an id-like token; multi-word headings
# ("Must fix before beta", "Estimation basis") are section prose, not findings.
ID_PAT = r'(?:§?\d+(?:\.\d+)+|[A-Za-z]{1,4}\d+)'

def parse_heading(line):
    if not line.startswith('### '):
        return None
    h = line[4:].strip()
    m = re.match(rf'^({ID_PAT})\s+—\s+(.*?)\s+·\s+\*\*(Critical|High|Medium|Low)\*\*\s+·\s+(.+)$', h)
    if m: return {'id': m[1], 'title': m[2], 'sev': m[3].lower(), 'hours': m[4].strip()}
    m = re.match(rf'^({ID_PAT})\s+(CRITICAL|HIGH|MEDIUM|LOW)(\s*⚠️)?\s+—\s+(.+)$', h)
    if m: return {'id': m[1], 'title': m[4].strip(), 'sev': m[2].lower(), 'hours': '⚠️' if m[3] else ''}
    m = re.match(rf'^({ID_PAT})\s+—\s+(.+)$', h)
    if m: return {'id': m[1], 'title': m[2].strip(), 'sev': '', 'hours': ''}
    m = re.match(rf'^({ID_PAT})\s+(.+)$', h)
    if m: return {'id': m[1], 'title': m[2].strip(), 'sev': '', 'hours': ''}
    return None

def parse(md):
    """-> (title, meta_lines, [sections]) where section = {name, intro_html, findings[], static_html}"""
    lines = md.split('\n')
    # doc title + meta (before first ## )
    title = 'Audit Report'
    meta = []
    i = 0
    if lines and lines[0].startswith('# '):
        title = lines[0][2:].strip(); i = 1
    while i < len(lines) and not lines[i].startswith('## '):
        if lines[i].strip(): meta.append(lines[i].strip())
        i += 1
    # split into ## sections
    secs = []
    cur = None
    body = lines[i:]
    j = 0
    while j < len(body):
        ln = body[j]
        if ln.startswith('## '):
            cur = {'name': ln[3:].strip(), 'lines': []}
            secs.append(cur); j += 1; continue
        if cur is not None:
            cur['lines'].append(ln)
        j += 1
    # within each section, split findings vs static
    parsed = []
    for sec in secs:
        findings, static_before, cur_find = [], [], None
        k = 0; sl = sec['lines']
        # detect if this section has findings
        has_find = any(parse_heading(x) for x in sl)
        if not has_find:
            parsed.append({'name': sec['name'], 'static': blocks_to_html(sl), 'findings': []})
            continue
        intro, buf, meta_f = [], [], None
        idx = 0
        # collect intro (before first ###)
        while idx < len(sl) and not sl[idx].startswith('### '):
            intro.append(sl[idx]); idx += 1
        while idx < len(sl):
            hd = parse_heading(sl[idx])
            if hd:
                fbody = []
                idx += 1
                while idx < len(sl) and not sl[idx].startswith('### '):
                    fbody.append(sl[idx]); idx += 1
                hd['body_html'] = blocks_to_html(fbody)
                findings.append(hd)
            elif sl[idx].startswith('### '):
                # A sub-heading inside a findings section that is NOT a finding
                # ("### Technical debt inventory", "### Wave 2 & 3 additions — …").
                # Keep it and its body as prose, in place: silently dropping it
                # loses the whole block, which is invisible in the output.
                ptitle = sl[idx][4:].strip()
                pbody = []
                idx += 1
                while idx < len(sl) and not sl[idx].startswith('### '):
                    pbody.append(sl[idx]); idx += 1
                findings.append({'prose': True, 'title': ptitle, 'id': '',
                                 'sev': '', 'hours': '',
                                 'body_html': blocks_to_html(pbody)})
            else:
                idx += 1
        parsed.append({'name': sec['name'], 'intro': blocks_to_html(intro), 'findings': findings, 'static': None})
    return title, meta, parsed

# ── render ───────────────────────────────────────────────────────────────────
def render(title, meta, sections, report_title, internal=False):
    # severity tally across all findings
    tally = {'critical':0,'high':0,'medium':0,'low':0}
    for s in sections:
        for f in s.get('findings', []):
            if f['sev'] in tally: tally[f['sev']] += 1
    total = sum(tally.values())

    def sev_badge(sev):
        cls, _ = SEV_MAP.get(sev, ('low', '#8a8a8a'))
        return f'<span class="badge {cls}">{sev.capitalize() or "—"}</span>' if sev else ''

    # severity summary only makes sense for a findings doc; skip it otherwise
    if total:
        tiles = ('<div class="summary">' + ''.join(
            f'<div class="tile {SEV_MAP[k][0]}"><div class="tnum">{tally[k]}</div>'
            f'<div class="tlbl">{k.capitalize()}</div></div>'
            for k in ('critical','high','medium','low')
        ) + '</div>'
        + f'<p style="color:var(--tx3);font-size:13px;margin:2px 4px 0">{total} findings · '
          'click any row to expand · collapsed by default</p>')
    else:
        tiles = ''

    body_html = []
    for s in sections:
        if s.get('findings'):
            body_html.append(f'<section class="scope"><h2>{inline(s["name"])}</h2>')
            if s.get('intro'): body_html.append(f'<div class="intro">{s["intro"]}</div>')
            for f in s['findings']:
                if f.get('prose'):   # non-finding sub-heading — render as plain prose
                    body_html.append(f'<h3>{inline(f["title"])}</h3>')
                    if f['body_html']:
                        body_html.append(f'<div class="intro">{f["body_html"]}</div>')
                    continue
                cls, _ = SEV_MAP.get(f['sev'], ('low','#8a8a8a'))
                hours = f'<span class="hours">{inline(f["hours"])}</span>' if f['hours'] else ''
                body_html.append(
                    f'<details class="finding sev-{cls}">'
                    f'<summary><span class="fid">{inline(f["id"])}</span>'
                    f'<span class="ftitle">{inline(f["title"])}</span>'
                    f'{sev_badge(f["sev"])}{hours}'
                    f'<span class="chev">▸</span></summary>'
                    f'<div class="fbody">{f["body_html"]}</div></details>'
                )
            body_html.append('</section>')
        else:
            body_html.append(f'<section class="static"><h2>{inline(s["name"])}</h2>{s["static"]}</section>')

    meta_html = ' &nbsp;·&nbsp; '.join(inline(m) for m in meta if m and not m.startswith('>'))
    notes = [m for m in meta if m.startswith('>')]
    note_html = ''
    if notes:
        note_html = '<div class="topnote">' + blocks_to_html([n for n in notes]) + '</div>'

    banner = ('<div class="internal-banner">● INTERNAL — DO NOT SEND TO CLIENT · '
              'true (un-shifted) severities · contains sales framing (Part 4)</div>') if internal else ''
    kicker = ('Krasty Soft · <span style="color:#ff6b6b">INTERNAL WORKING DOCUMENT</span>'
              if internal else 'Krasty Soft · Confidential Audit')
    tag = 'Internal Register' if internal else 'Security &amp; Architecture Audit'
    return TEMPLATE.format(
        doctitle=html.escape(report_title or title),
        icon=KRASTY_ICON,
        title=inline(title),
        meta=meta_html,
        note=note_html,
        tiles=tiles,
        body='\n'.join(body_html),
        banner=banner,
        kicker=kicker,
        tag=tag,
    )

TEMPLATE = '''<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{doctitle} — Krasty Soft</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{{
  --bg:#0a0a0a; --bg2:#121212; --bg3:#1a1a1a; --elev:#1f1f1f;
  --red:#e50606; --red-glow:rgba(229,6,6,.30); --red-border:rgba(229,6,6,.25);
  --tx:#ffffff; --tx2:#e5e5e5; --tx3:#8a8a8a; --bd:#2a2a2a; --bd2:#3a3a3a;
  --orange:#ff7a1a; --amber:#ffc400; --gray:#8a8a8a;
}}
*{{box-sizing:border-box}}
html{{scroll-behavior:smooth}}
body{{margin:0;background:var(--bg);color:var(--tx2);font-family:'Sora',system-ui,sans-serif;
  font-size:15px;line-height:1.6;-webkit-font-smoothing:antialiased}}
.wrap{{max-width:1040px;margin:0 auto;padding:0 24px 96px}}
a{{color:var(--red);text-decoration:none}}
code{{font-family:'SFMono-Regular',ui-monospace,Menlo,monospace;font-size:.86em;
  background:#000;border:1px solid var(--bd);border-radius:5px;padding:1px 6px;color:#ffb3b3}}
strong{{color:var(--tx);font-weight:600}}
em{{color:var(--tx2)}}
hr{{border:0;border-top:1px solid var(--bd);margin:22px 0}}

/* internal banner */
.internal-banner{{position:sticky;top:0;z-index:30;background:var(--red);color:#fff;
  text-align:center;font-weight:700;font-size:12px;letter-spacing:.06em;padding:7px 16px;
  text-transform:uppercase;box-shadow:0 0 22px var(--red-glow)}}

/* header */
header.top{{position:sticky;top:0;z-index:20;background:rgba(10,10,10,.86);
  backdrop-filter:blur(12px);border-bottom:1px solid var(--bd);}}
.topbar{{max-width:1040px;margin:0 auto;padding:14px 24px;display:flex;align-items:center;gap:12px}}
.brand{{display:flex;align-items:center;gap:11px}}
.brand .wm{{font-weight:700;letter-spacing:.14em;font-size:14px;color:var(--tx)}}
.brand .wm b{{color:var(--red)}}
.topbar .spacer{{flex:1}}
.topbar .tag{{font-size:12px;color:var(--tx3);letter-spacing:.02em}}
.actions{{display:flex;gap:8px}}
.btn{{font:inherit;font-size:12px;font-weight:500;color:var(--tx2);background:var(--bg3);
  border:1px solid var(--bd2);border-radius:8px;padding:6px 12px;cursor:pointer;transition:all .15s}}
.btn:hover{{border-color:var(--red-border);color:var(--tx);box-shadow:0 0 12px var(--red-glow)}}

/* cover */
.cover{{padding:56px 0 8px;border-bottom:1px solid var(--bd);margin-bottom:8px}}
.cover .kicker{{color:var(--red);font-weight:600;font-size:12px;letter-spacing:.22em;text-transform:uppercase}}
.cover h1{{font-size:2.4rem;line-height:1.15;color:var(--tx);font-weight:700;margin:.4em 0 .3em}}
.cover .meta{{color:var(--tx3);font-size:13px}}
.topnote{{margin-top:18px}}
.topnote blockquote{{margin:0}}

/* severity summary */
.summary{{display:flex;gap:14px;flex-wrap:wrap;margin:34px 0 10px}}
.tile{{flex:1;min-width:120px;background:var(--bg2);border:1px solid var(--bd);border-radius:14px;
  padding:18px 20px;position:relative;overflow:hidden}}
.tile:before{{content:"";position:absolute;left:0;top:0;bottom:0;width:4px}}
.tile.critical:before{{background:var(--red);box-shadow:0 0 18px var(--red-glow)}}
.tile.high:before{{background:var(--orange)}}
.tile.medium:before{{background:var(--amber)}}
.tile.low:before{{background:var(--gray)}}
.tile .tnum{{font-size:2rem;font-weight:700;color:var(--tx);line-height:1}}
.tile .tlbl{{font-size:12px;color:var(--tx3);margin-top:6px;letter-spacing:.06em;text-transform:uppercase}}

/* sections */
section{{margin:40px 0}}
h2{{font-size:1.35rem;color:var(--tx);font-weight:600;margin:0 0 16px;padding-bottom:10px;
  border-bottom:1px solid var(--bd)}}
h3{{color:var(--tx);font-size:1.08rem;font-weight:600;margin:26px 0 8px}}
h4{{color:var(--tx);font-size:.98rem;font-weight:600;margin:16px 0 6px}}
.intro{{color:var(--tx2);margin-bottom:14px}}
.static p,.intro p{{margin:.5em 0}}

/* finding cards (collapsible) */
.finding{{background:var(--bg2);border:1px solid var(--bd);border-left:3px solid var(--bd2);
  border-radius:12px;margin:10px 0;overflow:hidden;transition:border-color .15s,box-shadow .15s}}
.finding[open]{{box-shadow:0 6px 22px rgba(0,0,0,.45)}}
.finding.sev-critical{{border-left-color:var(--red)}}
.finding.sev-high{{border-left-color:var(--orange)}}
.finding.sev-medium{{border-left-color:var(--amber)}}
.finding.sev-low{{border-left-color:var(--gray)}}
.finding.sev-critical[open]{{box-shadow:0 6px 22px rgba(0,0,0,.5),0 0 0 1px var(--red-border)}}
summary{{list-style:none;cursor:pointer;display:flex;align-items:center;gap:12px;
  padding:14px 18px;user-select:none}}
summary::-webkit-details-marker{{display:none}}
summary:hover{{background:var(--state-hover,rgba(255,255,255,.03))}}
.fid{{font-weight:700;color:var(--tx);font-size:13px;min-width:42px;font-family:ui-monospace,monospace}}
.ftitle{{flex:1;color:var(--tx);font-weight:500;font-size:14.5px}}
.badge{{font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
  padding:3px 9px;border-radius:20px;white-space:nowrap}}
.badge.critical{{background:rgba(229,6,6,.16);color:#ff6b6b;border:1px solid var(--red-border)}}
.badge.high{{background:rgba(255,122,26,.14);color:#ffa866;border:1px solid rgba(255,122,26,.3)}}
.badge.medium{{background:rgba(255,196,0,.13);color:#ffd84d;border:1px solid rgba(255,196,0,.3)}}
.badge.low{{background:rgba(138,138,138,.14);color:#b8b8b8;border:1px solid var(--bd2)}}
.hours{{font-size:12px;color:var(--tx3);white-space:nowrap;min-width:60px;text-align:right}}
.chev{{color:var(--tx3);transition:transform .2s;font-size:12px}}
.finding[open] .chev{{transform:rotate(90deg);color:var(--red)}}
.fbody{{padding:2px 20px 18px;border-top:1px solid var(--bd);margin-top:2px;color:var(--tx2)}}
.fbody p{{margin:.6em 0}}
.fbody ul,.fbody ol{{margin:.5em 0;padding-left:20px}}
.fbody li{{margin:.3em 0}}

/* tables */
.twrap{{overflow-x:auto;margin:14px 0}}
table{{border-collapse:collapse;width:100%;font-size:13.5px}}
th,td{{text-align:left;padding:9px 12px;border-bottom:1px solid var(--bd);vertical-align:top}}
th{{color:var(--tx3);font-weight:600;font-size:11.5px;text-transform:uppercase;letter-spacing:.05em;
  background:var(--bg3)}}
td{{color:var(--tx2)}}
tr:hover td{{background:rgba(255,255,255,.02)}}

blockquote{{border-left:3px solid var(--red-border);background:var(--bg2);
  padding:2px 18px;margin:14px 0;border-radius:0 8px 8px 0;color:var(--tx2)}}
pre{{background:#000;border:1px solid var(--bd);border-radius:10px;padding:14px 16px;
  overflow-x:auto;margin:12px 0}}
pre code{{background:none;border:0;padding:0;color:#e5e5e5}}

footer{{border-top:1px solid var(--bd);margin-top:60px;padding:28px 0;color:var(--tx3);
  font-size:12px;display:flex;align-items:center;gap:10px}}

@media print{{
  header.top{{position:static}}
  .actions{{display:none}}
  .finding{{break-inside:avoid}}
  details{{}}
  body{{background:#fff;color:#111}}
}}
.internal-banner + header.top{{top:30px}}
</style></head>
<body>
{banner}
<header class="top"><div class="topbar">
  <span class="brand">{icon}<span class="wm">KRASTY<b>SOFT</b></span></span>
  <span class="spacer"></span>
  <span class="tag">{tag}</span>
  <span class="actions">
    <button class="btn" onclick="document.querySelectorAll('details.finding').forEach(d=>d.open=true)">Expand all</button>
    <button class="btn" onclick="document.querySelectorAll('details.finding').forEach(d=>d.open=false)">Collapse all</button>
  </span>
</div></header>

<div class="wrap">
  <div class="cover">
    <div class="kicker">{kicker}</div>
    <h1>{title}</h1>
    <div class="meta">{meta}</div>
    {note}
  </div>

  {tiles}

  {body}

  <footer>{icon}<span>Krasty Soft — Progressive B2B software development. This audit is confidential and prepared for the named client.</span></footer>
</div>
</body></html>'''

def main():
    args = [a for a in sys.argv[1:] if a != '--internal']
    internal = '--internal' in sys.argv
    if len(args) < 2:
        print("usage: audit_to_html.py <input.md> <output.html> [title] [--internal]"); sys.exit(1)
    md = open(args[0]).read()
    title, meta, sections = parse(md)
    out = render(title, meta, sections, args[2] if len(args) > 2 else None, internal=internal)
    open(args[1], 'w').write(out)
    nf = sum(1 for s in sections for f in s.get('findings', []) if not f.get('prose'))
    tag = ' [INTERNAL]' if internal else ''
    print(f"wrote {args[1]}{tag} — {len(sections)} sections, {nf} collapsible findings")

if __name__ == '__main__':
    main()
