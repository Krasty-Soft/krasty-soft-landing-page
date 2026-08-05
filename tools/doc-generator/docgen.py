#!/usr/bin/env python3
"""
Krasty Soft — corporate document generator.

Markdown -> self-contained, branded HTML for proposals, estimates, audits and
generic client deliverables. One command, no build step, standard library only.

    python3 docgen.py <input.md> <output.html> [options]

Superset of tools/audit-report-generator/audit_to_html.py, which is kept for
compatibility with existing audit pipelines. Differences that matter:

  * four heading levels — `#` doc title, `#` parts, `##` sections, `###` cards
  * sticky table of contents with scroll-spy (proposals run to 60+ pages)
  * card metadata is free text (hours, price, status) instead of a fixed
    Critical/High/Medium/Low severity model — severities still work for audits
  * summary tiles are declared in the document, not inferred
  * print stylesheet with per-part page breaks, and a light theme for PDFs
    that go to a client

Design tokens lifted from krasty-soft-landing-page/src/app/globals.css.
"""
import sys, re, html, os, datetime

# ── brand ────────────────────────────────────────────────────────────────────
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

PRESETS = {
    'proposal': dict(kicker='Krasty Soft &middot; Commercial Proposal', tag='Proposal',
                     foot='Krasty Soft &mdash; progressive B2B software development. '
                          'This proposal is confidential and prepared for the named client.'),
    'estimate': dict(kicker='Krasty Soft &middot; Effort Estimate', tag='Effort Estimate',
                     foot='Krasty Soft &mdash; internal effort estimate. Feeds the commercial proposal.'),
    'audit':    dict(kicker='Krasty Soft &middot; Confidential Audit', tag='Security &amp; Architecture Audit',
                     foot='Krasty Soft &mdash; progressive B2B software development. '
                          'This audit is confidential and prepared for the named client.'),
    'generic':  dict(kicker='Krasty Soft', tag='Document',
                     foot='Krasty Soft &mdash; progressive B2B software development. Confidential.'),
}

SEV = {'critical': '#e50606', 'high': '#ff7a1a', 'medium': '#ffc400', 'low': '#8a8a8a'}


# ── inline markdown ──────────────────────────────────────────────────────────
def inline(t):
    t = html.escape(t)
    t = re.sub(r'`([^`]+)`', r'<code>\1</code>', t)
    t = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', t)
    t = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', t)
    t = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<em>\1</em>', t)
    return t


def slug(s, seen=None):
    s = re.sub(r'<[^>]+>', '', s)
    s = re.sub(r'[^\w\s-]', '', html.unescape(s)).strip().lower()
    s = re.sub(r'[\s_]+', '-', s) or 'section'
    if seen is not None:
        base, n = s, 2
        while s in seen:
            s = f'{base}-{n}'; n += 1
        seen.add(s)
    return s


def cells(row):
    """Split one markdown table row on unescaped pipes.

    `\\|` is the only way to put a literal pipe inside a cell, and it turns up
    whenever a table quotes code or a band like `20 \\| 85`. Splitting on a bare
    '|' silently shifts every later column in the row, which is invisible in the
    rendered output — so escaping has to be honoured here, not worked around in
    the source documents."""
    r = row.strip()
    if r.startswith('|'):
        r = r[1:]
    if r.endswith('|') and not r.endswith('\\|'):
        r = r[:-1]
    return [c.strip().replace('\\|', '|') for c in re.split(r'(?<!\\)\|', r)]


# ── block markdown ───────────────────────────────────────────────────────────
def blocks(lines, depth=0):
    """Markdown lines -> HTML. Handles tables (with alignment), lists (2 levels),
    blockquotes (incl. headings inside), fences, rules, h3–h6."""
    out, i, n = [], 0, len(lines)
    while i < n:
        s = lines[i].strip()
        if not s:
            i += 1; continue

        # table
        if s.startswith('|') and i + 1 < n and set(lines[i + 1].strip()) <= set('|-: '):
            head = cells(s)
            spec = cells(lines[i + 1])
            align = ['right' if c.endswith(':') and not c.startswith(':')
                     else 'center' if c.startswith(':') and c.endswith(':')
                     else 'left' for c in spec]
            i += 2
            rows = []
            while i < n and lines[i].strip().startswith('|'):
                rows.append(cells(lines[i])); i += 1
            def al(k): return f' style="text-align:{align[k]}"' if k < len(align) and align[k] != 'left' else ''
            th = ''.join(f'<th{al(k)}>{inline(h)}</th>' for k, h in enumerate(head))
            trs = ''.join('<tr>' + ''.join(f'<td{al(k)}>{inline(c)}</td>' for k, c in enumerate(r)) + '</tr>'
                          for r in rows)
            out.append(f'<div class="twrap"><table><thead><tr>{th}</tr></thead><tbody>{trs}</tbody></table></div>')
            continue

        # blockquote
        if s.startswith('>'):
            q = []
            while i < n and lines[i].strip().startswith('>'):
                q.append(re.sub(r'^\s*>\s?', '', lines[i])); i += 1
            inner = blocks(q, depth + 1)
            cls = ' warn' if re.search(r'INTERNAL|DO NOT SEND|⚠', ' '.join(q)[:400], re.I) else ''
            out.append(f'<blockquote class="bq{cls}">{inner}</blockquote>')
            continue

        # fenced code
        if s.startswith('```'):
            i += 1; code = []
            while i < n and not lines[i].strip().startswith('```'):
                code.append(lines[i]); i += 1
            i += 1
            out.append('<pre><code>' + html.escape('\n'.join(code)) + '</code></pre>')
            continue

        # bullet list (2 levels)
        if re.match(r'^[-*+] ', s):
            items, i = _list(lines, i, r'^[-*+] ')
            out.append('<ul>' + items + '</ul>')
            continue

        # ordered list
        if re.match(r'^\d+[.)] ', s):
            items, i = _list(lines, i, r'^\d+[.)] ')
            out.append('<ol>' + items + '</ol>')
            continue

        if re.fullmatch(r'-{3,}|\*{3,}|_{3,}', s):
            if not (out and out[-1] == '<hr>'):
                out.append('<hr>')
            i += 1; continue

        # headings inside a body / blockquote
        m = re.match(r'^(#{1,6})\s+(.*)$', s)
        if m:
            lvl = min(len(m.group(1)) + 2, 6)
            out.append(f'<h{lvl}>{inline(m.group(2))}</h{lvl}>'); i += 1; continue

        # paragraph
        para = []
        while i < n and lines[i].strip() and not re.match(
                r'^([-*+] |\d+[.)] |> |\||#{1,6} |```)|^(-{3,}|\*{3,}|_{3,})$', lines[i].strip()):
            para.append(lines[i].strip()); i += 1
        if para:
            out.append(f'<p>{inline(" ".join(para))}</p>')
        else:
            i += 1
    return '\n'.join(out)


def _list(lines, i, pat):
    """Collect a list, supporting one level of indented nesting."""
    n, html_items = len(lines), []
    while i < n:
        raw = lines[i]
        s = raw.strip()
        if not s:
            nxt = lines[i + 1].strip() if i + 1 < n else ''
            if re.match(pat, nxt) or re.match(r'^\s{2,}[-*+\d]', lines[i + 1] if i + 1 < n else ''):
                i += 1; continue
            break
        indent = len(raw) - len(raw.lstrip())
        if indent >= 2 and re.match(r'^[-*+] |^\d+[.)] ', s) and html_items:
            sub, i = _list(lines, i, r'^[-*+] |^\d+[.)] ')
            html_items[-1] = html_items[-1][:-5] + f'<ul>{sub}</ul></li>'
            continue
        if not re.match(pat, s):
            break
        html_items.append(f'<li>{inline(re.sub(pat, "", s))}</li>')
        i += 1
    return ''.join(html_items), i


# ── card headings ────────────────────────────────────────────────────────────
# Recognised ids:  A-1  O-11  F-9  B-2  M0  M3  §2.4  1.2.1  S4  AI6
#                  "Assumption W"  "Block 1"  "Option 3"  "Phase 2"
ID = (r'(?:(?:Assumption|Block|Option|Phase|Milestone|Annex|Appendix)\s+[A-Z0-9]+'
      r'|§?\d+(?:\.\d+)*'
      r'|[A-Z]{1,4}-?\d+)')
SEP = r'[·—–-]'
META_OK = re.compile(r'\d|^\*\*|^_')


def parse_card(line):
    """'### A-1 · Title · meta' -> dict, or None if it is ordinary prose."""
    if not line.startswith('### '):
        return None
    h = line[4:].strip()
    m = re.match(rf'^({ID})\s*{SEP}\s*(.+)$', h)
    if not m:
        return None
    cid, rest = m.group(1), m.group(2).strip()

    # audit compatibility: "Title · **Critical** · 4–6 h"
    a = re.match(r'^(.*?)\s+·\s+\*\*(Critical|High|Medium|Low)\*\*\s+·\s+(.+)$', rest, re.I)
    if a:
        return dict(id=cid, title=a.group(1).strip(), sev=a.group(2).lower(), meta=a.group(3).strip())

    sev = ''
    s2 = re.match(r'^(CRITICAL|HIGH|MEDIUM|LOW)\s*(?:⚠️)?\s*[·—–-]\s*(.+)$', rest)
    if s2:
        sev, rest = s2.group(1).lower(), s2.group(2).strip()

    # trailing " · <meta>" — hours, price, status tag
    meta = ''
    parts = rest.split(' · ')
    if len(parts) > 1:
        tail = parts[-1].strip()
        if len(tail) <= 64 and META_OK.search(tail):
            meta, rest = tail, ' · '.join(parts[:-1]).strip()
    return dict(id=cid, title=rest, sev=sev, meta=meta)


# ── document parse ───────────────────────────────────────────────────────────
def parse(md):
    lines = md.split('\n')

    # anything before the first "# " is a leading note (e.g. an internal banner block)
    start = next((k for k, l in enumerate(lines) if l.startswith('# ')), None)
    lead, title = [], 'Document'
    if start is None:
        start = 0
    else:
        lead = [l for l in lines[:start]]
        title = lines[start][2:].strip()
        start += 1

    # A "## " before the first "# " part is a subtitle, not a section — but only
    # in a document that has parts at all. In a flat document (estimate, audit)
    # "## " starts the first section immediately and must not be swallowed.
    doc_has_parts = any(l.startswith('# ') for l in lines[start:])
    stop = r'^# ' if doc_has_parts else r'^#{1,2} '

    # meta / subtitle lines until the first structural heading
    meta, notes, tiles, i = [], [], [], start
    while i < len(lines) and not re.match(stop, lines[i]):
        s = lines[i]
        if s.strip().startswith('<!--tiles'):
            i += 1
            while i < len(lines) and not lines[i].strip().startswith('-->'):
                row = [c.strip() for c in lines[i].split('|')]
                if row and row[0]:
                    tiles.append(row)
                i += 1
        elif s.strip().startswith('>'):
            notes.append(s)
        elif s.strip() and not re.fullmatch(r'-{3,}', s.strip()):
            if s.strip().startswith('## '):
                meta.append(s.strip()[3:])
            else:
                meta.append(s.strip())
        i += 1

    body = lines[i:]
    has_parts = any(l.startswith('# ') for l in body)

    parts, cur_part, cur_sec = [], None, None

    def new_part(name):
        p = dict(name=name, sections=[])
        parts.append(p)
        return p

    def new_sec(name):
        s = dict(name=name, lines=[])
        cur_part['sections'].append(s)
        return s

    cur_part = new_part('') if not has_parts else None
    for l in body:
        if l.startswith('# '):
            cur_part = new_part(l[2:].strip()); cur_sec = None; continue
        if l.startswith('## '):
            if cur_part is None:
                cur_part = new_part('')
            cur_sec = new_sec(l[3:].strip()); continue
        if cur_sec is None:
            if cur_part is None:
                cur_part = new_part('')
            cur_sec = new_sec('')
        cur_sec['lines'].append(l)

    # split each section into intro + cards
    seen = set()
    for p in parts:
        p['anchor'] = slug(p['name'] or 'part', seen) if p['name'] else ''
        for s in p['sections']:
            s['anchor'] = slug(s['name'] or 'sec', seen)
            sl = s['lines']
            if not any(parse_card(x) for x in sl):
                s['static'] = blocks(sl); s['cards'] = []; s['intro'] = ''
                continue
            k = 0
            intro = []
            while k < len(sl) and not sl[k].startswith('### '):
                intro.append(sl[k]); k += 1
            cards = []
            while k < len(sl):
                hd = parse_card(sl[k])
                if hd or sl[k].startswith('### '):
                    if not hd:
                        hd = dict(prose=True, id='', title=sl[k][4:].strip(), sev='', meta='')
                    k += 1
                    b = []
                    while k < len(sl) and not sl[k].startswith('### '):
                        b.append(sl[k]); k += 1
                    hd['body'] = blocks(b)
                    cards.append(hd)
                else:
                    k += 1
            s['intro'] = blocks(intro); s['cards'] = cards; s['static'] = None
    return dict(title=title, meta=meta, notes=notes, tiles=tiles, lead=lead, parts=parts)


# ── render ───────────────────────────────────────────────────────────────────
def render(doc, cfg):
    tiles_html = ''
    if doc['tiles']:
        cells = []
        for row in doc['tiles']:
            label = row[0]
            val = row[1] if len(row) > 1 else ''
            cls = row[2] if len(row) > 2 else ''
            cells.append(f'<div class="tile {cls}"><div class="tnum">{inline(val)}</div>'
                         f'<div class="tlbl">{inline(label)}</div></div>')
        tiles_html = '<div class="summary">' + ''.join(cells) + '</div>'

    toc, body = [], []
    multi = len([p for p in doc['parts'] if p['name']]) > 0
    for p in doc['parts']:
        if p['name']:
            toc.append(f'<a class="t1" href="#{p["anchor"]}">{inline(p["name"])}</a>')
            body.append(f'<section class="part" id="{p["anchor"]}"><h1 class="parth">{inline(p["name"])}</h1>')
        for s in p['sections']:
            if s['name']:
                toc.append(f'<a class="t2" href="#{s["anchor"]}">{inline(s["name"])}</a>')
            head = f'<h2 id="{s["anchor"]}">{inline(s["name"])}</h2>' if s['name'] else ''
            if s['cards']:
                body.append(f'<section class="scope">{head}')
                if s['intro']:
                    body.append(f'<div class="intro">{s["intro"]}</div>')
                for c in s['cards']:
                    if c.get('prose'):
                        body.append(f'<h3>{inline(c["title"])}</h3>')
                        if c['body']:
                            body.append(f'<div class="intro">{c["body"]}</div>')
                        continue
                    sev = f' sev-{c["sev"]}' if c['sev'] else ''
                    badge = (f'<span class="badge {c["sev"]}">{c["sev"].capitalize()}</span>'
                             if c['sev'] else '')
                    meta = f'<span class="cmeta">{inline(c["meta"])}</span>' if c['meta'] else ''
                    body.append(
                        f'<details class="card{sev}">'
                        f'<summary><span class="cid">{inline(c["id"])}</span>'
                        f'<span class="ctitle">{inline(c["title"])}</span>{badge}{meta}'
                        f'<span class="chev">&#9656;</span></summary>'
                        f'<div class="cbody">{c["body"]}</div></details>')
                body.append('</section>')
            else:
                body.append(f'<section class="static">{head}{s["static"]}</section>')
        if p['name']:
            body.append('</section>')

    lead_html = blocks(doc['lead']) if any(x.strip() for x in doc['lead']) else ''
    note_html = f'<div class="topnote">{blocks(doc["notes"])}</div>' if doc['notes'] else ''
    meta_html = ' &nbsp;&middot;&nbsp; '.join(inline(m) for m in doc['meta'])

    banner = ('<div class="internal-banner">&#9679; INTERNAL &mdash; DO NOT SEND TO CLIENT</div>'
              if cfg['internal'] else '')
    kicker = ('Krasty Soft &middot; <span style="color:#ff6b6b">INTERNAL WORKING DOCUMENT</span>'
              if cfg['internal'] else cfg['kicker'])

    out = TEMPLATE
    for k, v in dict(
        DOCTITLE=html.escape(cfg['doctitle']), ICON=KRASTY_ICON, TITLE=inline(doc['title']),
        META=meta_html, LEAD=lead_html, NOTE=note_html, TILES=tiles_html,
        TOC=''.join(toc), BODY='\n'.join(body), BANNER=banner, KICKER=kicker,
        TAG=cfg['tag'], FOOT=cfg['foot'], THEME=cfg['theme'],
        TOCCLS='' if toc else ' notoc', DATE=cfg['date'],
    ).items():
        out = out.replace('%%' + k + '%%', v)
    return out


TEMPLATE = r'''<!DOCTYPE html>
<html lang="en" data-theme="%%THEME%%"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>%%DOCTITLE%% — Krasty Soft</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#0a0a0a; --bg2:#121212; --bg3:#1a1a1a;
  --red:#e50606; --red-glow:rgba(229,6,6,.30); --red-border:rgba(229,6,6,.25);
  --tx:#ffffff; --tx2:#e5e5e5; --tx3:#8a8a8a; --bd:#2a2a2a; --bd2:#3a3a3a;
  --orange:#ff7a1a; --amber:#ffc400; --gray:#8a8a8a; --codetx:#ffb3b3; --codebg:#000;
}
html[data-theme="light"]{
  --bg:#ffffff; --bg2:#f7f7f8; --bg3:#eeeef0;
  --tx:#0a0a0a; --tx2:#26262b; --tx3:#6b6b73; --bd:#e2e2e6; --bd2:#cfcfd6;
  --codetx:#a11; --codebg:#f4f4f6;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--tx2);font-family:'Sora',system-ui,sans-serif;
  font-size:15px;line-height:1.62;-webkit-font-smoothing:antialiased}
a{color:var(--red);text-decoration:none}
a:hover{text-decoration:underline}
code{font-family:ui-monospace,'SFMono-Regular',Menlo,monospace;font-size:.86em;
  background:var(--codebg);border:1px solid var(--bd);border-radius:5px;padding:1px 6px;color:var(--codetx)}
strong{color:var(--tx);font-weight:600}
hr{border:0;border-top:1px solid var(--bd);margin:22px 0}

.internal-banner{position:sticky;top:0;z-index:40;background:var(--red);color:#fff;text-align:center;
  font-weight:700;font-size:12px;letter-spacing:.06em;padding:7px 16px;text-transform:uppercase;
  box-shadow:0 0 22px var(--red-glow)}
header.top{position:sticky;top:0;z-index:30;background:color-mix(in srgb,var(--bg) 88%,transparent);
  backdrop-filter:blur(12px);border-bottom:1px solid var(--bd)}
.internal-banner + header.top{top:31px}
.topbar{max-width:1360px;margin:0 auto;padding:13px 24px;display:flex;align-items:center;gap:12px}
.brand{display:flex;align-items:center;gap:11px}
.brand .wm{font-weight:700;letter-spacing:.14em;font-size:14px;color:var(--tx)}
.brand .wm b{color:var(--red)}
.spacer{flex:1}
.tag{font-size:12px;color:var(--tx3)}
.actions{display:flex;gap:8px}
.btn{font:inherit;font-size:12px;font-weight:500;color:var(--tx2);background:var(--bg3);
  border:1px solid var(--bd2);border-radius:8px;padding:6px 12px;cursor:pointer;transition:all .15s}
.btn:hover{border-color:var(--red-border);color:var(--tx);box-shadow:0 0 12px var(--red-glow)}

.shell{max-width:1360px;margin:0 auto;padding:0 24px 96px;display:grid;
  grid-template-columns:262px minmax(0,1fr);gap:44px;align-items:start}
.shell.notoc{grid-template-columns:minmax(0,1fr);max-width:1000px}
nav.toc{position:sticky;top:86px;max-height:calc(100vh - 110px);overflow-y:auto;
  padding:26px 0 30px;font-size:13px;scrollbar-width:thin}
nav.toc .tochd{color:var(--tx3);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;
  font-weight:700;margin-bottom:12px}
nav.toc a{display:block;color:var(--tx3);padding:4px 10px;border-left:2px solid var(--bd);
  line-height:1.4;transition:all .12s}
nav.toc a:hover{color:var(--tx2);border-left-color:var(--bd2);text-decoration:none}
nav.toc a.t1{color:var(--tx2);font-weight:600;margin-top:14px}
nav.toc a.t2{padding-left:20px;font-size:12.4px}
nav.toc a.on{color:var(--red);border-left-color:var(--red);background:linear-gradient(90deg,var(--red-glow),transparent 70%)}
main{min-width:0;padding-top:8px}

.cover{padding:52px 0 18px;border-bottom:1px solid var(--bd);margin-bottom:10px}
.cover .kicker{color:var(--red);font-weight:600;font-size:11.5px;letter-spacing:.22em;text-transform:uppercase}
.cover h1{font-size:2.45rem;line-height:1.14;color:var(--tx);font-weight:700;margin:.36em 0 .28em}
.cover .meta{color:var(--tx3);font-size:13px;line-height:1.9}
.topnote,.leadnote{margin-top:18px}

.summary{display:flex;gap:14px;flex-wrap:wrap;margin:32px 0 8px}
.tile{flex:1;min-width:150px;background:var(--bg2);border:1px solid var(--bd);border-radius:14px;
  padding:17px 19px;position:relative;overflow:hidden}
.tile:before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--bd2)}
.tile.accent:before{background:var(--red);box-shadow:0 0 18px var(--red-glow)}
.tile .tnum{font-size:1.5rem;font-weight:700;color:var(--tx);line-height:1.15}
.tile .tlbl{font-size:11px;color:var(--tx3);margin-top:7px;letter-spacing:.07em;text-transform:uppercase}

section{margin:34px 0}
section.part{margin:0}
h1.parth{font-size:1.72rem;color:var(--tx);font-weight:700;margin:56px 0 6px;padding-top:22px;
  border-top:2px solid var(--red)}
h2{font-size:1.28rem;color:var(--tx);font-weight:600;margin:34px 0 14px;padding-bottom:9px;
  border-bottom:1px solid var(--bd);scroll-margin-top:90px}
h3{color:var(--tx);font-size:1.06rem;font-weight:600;margin:24px 0 8px}
h4,h5,h6{color:var(--tx);font-size:.97rem;font-weight:600;margin:16px 0 6px}
p{margin:.55em 0}
ul,ol{margin:.5em 0;padding-left:22px}
li{margin:.3em 0}

.card{background:var(--bg2);border:1px solid var(--bd);border-left:3px solid var(--bd2);
  border-radius:12px;margin:10px 0;overflow:hidden;transition:border-color .15s,box-shadow .15s}
.card[open]{box-shadow:0 6px 22px rgba(0,0,0,.35)}
.card.sev-critical{border-left-color:var(--red)}
.card.sev-high{border-left-color:var(--orange)}
.card.sev-medium{border-left-color:var(--amber)}
.card.sev-low{border-left-color:var(--gray)}
summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:12px;padding:13px 18px;user-select:none}
summary::-webkit-details-marker{display:none}
summary:hover{background:color-mix(in srgb,var(--tx) 4%,transparent)}
.cid{font-weight:700;color:var(--red);font-size:12.5px;min-width:52px;font-family:ui-monospace,monospace;
  letter-spacing:.02em}
.ctitle{flex:1;color:var(--tx);font-weight:500;font-size:14.4px;line-height:1.4}
.cmeta{font-size:12px;color:var(--tx3);white-space:nowrap;text-align:right}
.cmeta strong{color:var(--tx2);font-weight:600}
.badge{font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:3px 9px;
  border-radius:20px;white-space:nowrap}
.badge.critical{background:rgba(229,6,6,.16);color:#ff6b6b;border:1px solid var(--red-border)}
.badge.high{background:rgba(255,122,26,.14);color:#ffa866;border:1px solid rgba(255,122,26,.3)}
.badge.medium{background:rgba(255,196,0,.13);color:#ffd84d;border:1px solid rgba(255,196,0,.3)}
.badge.low{background:rgba(138,138,138,.14);color:#b8b8b8;border:1px solid var(--bd2)}
.chev{color:var(--tx3);transition:transform .2s;font-size:12px}
.card[open] .chev{transform:rotate(90deg);color:var(--red)}
.cbody{padding:4px 20px 18px;border-top:1px solid var(--bd);color:var(--tx2)}

.twrap{overflow-x:auto;margin:14px 0;border:1px solid var(--bd);border-radius:10px}
table{border-collapse:collapse;width:100%;font-size:13.3px}
th,td{text-align:left;padding:9px 13px;border-bottom:1px solid var(--bd);vertical-align:top}
th{color:var(--tx3);font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.05em;
  background:var(--bg3);white-space:nowrap}
tbody tr:last-child td{border-bottom:0}
tr:hover td{background:color-mix(in srgb,var(--tx) 3%,transparent)}

blockquote.bq{border-left:3px solid var(--bd2);background:var(--bg2);padding:2px 18px;margin:14px 0;
  border-radius:0 8px 8px 0;color:var(--tx2)}
blockquote.bq.warn{border-left-color:var(--red);background:color-mix(in srgb,var(--red) 7%,var(--bg2))}
blockquote.bq h3,blockquote.bq h4{margin-top:12px}
pre{background:var(--codebg);border:1px solid var(--bd);border-radius:10px;padding:14px 16px;
  overflow-x:auto;margin:12px 0}
pre code{background:none;border:0;padding:0;color:var(--tx2)}

footer{border-top:1px solid var(--bd);margin-top:64px;padding:26px 0;color:var(--tx3);font-size:12px;
  display:flex;align-items:center;gap:10px}

@media (max-width:1080px){
  .shell{grid-template-columns:minmax(0,1fr);gap:0}
  nav.toc{display:none}
}
@media print{
  html[data-theme]{--bg:#fff;--bg2:#fff;--bg3:#f4f4f6;--tx:#000;--tx2:#1a1a1a;--tx3:#555;
    --bd:#d0d0d4;--bd2:#b8b8c0;--codebg:#f4f4f6;--codetx:#a11}
  header.top,nav.toc,.actions,.internal-banner{display:none!important}
  .shell{display:block;max-width:none;padding:0}
  .card{break-inside:avoid;box-shadow:none;background:#fff}
  .card>summary{background:#f7f7f8}
  section.part{break-before:page}
  section.part:first-of-type{break-before:auto}
  h1.parth,h2,h3{break-after:avoid}
  table,.twrap{break-inside:auto}
  tr{break-inside:avoid}
  .cbody{display:block!important}
  a{color:#000;text-decoration:none}
  @page{margin:16mm 14mm}
}
</style></head>
<body>
%%BANNER%%
<header class="top"><div class="topbar">
  <span class="brand">%%ICON%%<span class="wm">KRASTY<b>SOFT</b></span></span>
  <span class="spacer"></span>
  <span class="tag">%%TAG%%</span>
  <span class="actions">
    <button class="btn" onclick="document.querySelectorAll('details.card').forEach(d=>d.open=true)">Expand all</button>
    <button class="btn" onclick="document.querySelectorAll('details.card').forEach(d=>d.open=false)">Collapse all</button>
    <button class="btn" onclick="document.querySelectorAll('details.card').forEach(d=>d.open=true);window.print()">Print / PDF</button>
  </span>
</div></header>

<div class="shell%%TOCCLS%%">
  <nav class="toc"><div class="tochd">Contents</div>%%TOC%%</nav>
  <main>
    <div class="cover">
      <div class="kicker">%%KICKER%%</div>
      <h1>%%TITLE%%</h1>
      <div class="meta">%%META%%</div>
      %%NOTE%%
    </div>
    <div class="leadnote">%%LEAD%%</div>
    %%TILES%%
    %%BODY%%
    <footer>%%ICON%%<span>%%FOOT%% &middot; %%DATE%%</span></footer>
  </main>
</div>
<script>
(function(){
  var links=[].slice.call(document.querySelectorAll('nav.toc a'));
  if(!links.length)return;
  var map={};links.forEach(function(a){var t=document.getElementById(a.hash.slice(1));if(t)map[a.hash.slice(1)]=a;});
  var obs=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){links.forEach(function(l){l.classList.remove('on');});
        var a=map[e.target.id];if(a){a.classList.add('on');
          if(a.offsetTop<a.parentNode.scrollTop||a.offsetTop>a.parentNode.scrollTop+a.parentNode.clientHeight-40)
            a.parentNode.scrollTop=a.offsetTop-120;}}
    });
  },{rootMargin:'-88px 0px -72% 0px',threshold:0});
  Object.keys(map).forEach(function(id){obs.observe(document.getElementById(id));});
  // deep-link into a collapsed card
  function openTarget(){var h=location.hash;if(!h)return;var el=document.querySelector(h);
    while(el){if(el.tagName==='DETAILS')el.open=true;el=el.parentElement;}}
  window.addEventListener('hashchange',openTarget);openTarget();
})();
</script>
</body></html>'''


def main():
    argv = sys.argv[1:]
    flags = {a for a in argv if a.startswith('--')}
    pos = [a for a in argv if not a.startswith('--')]

    def opt(name, default=None):
        for a in argv:
            if a.startswith(f'--{name}='):
                return a.split('=', 1)[1]
        return default

    if len(pos) < 2:
        print(__doc__.strip())
        print("\nusage: docgen.py <input.md> <output.html> [\"Title\"] "
              "[--type=proposal|estimate|audit|generic] [--theme=dark|light] [--internal]")
        sys.exit(1)

    src, dst = pos[0], pos[1]
    md = open(src, encoding='utf-8').read()
    doc = parse(md)

    dtype = opt('type')
    if not dtype:
        hay = (src + ' ' + doc['title']).lower()
        dtype = ('estimate' if 'estimate' in hay else
                 'proposal' if 'proposal' in hay else
                 'audit' if 'audit' in hay else 'generic')
    preset = PRESETS.get(dtype, PRESETS['generic'])

    cfg = dict(preset)
    cfg.update(
        internal='--internal' in flags,
        theme=opt('theme', 'dark'),
        doctitle=pos[2] if len(pos) > 2 else doc['title'],
        date=datetime.date.today().isoformat(),
    )
    if len(pos) > 2:
        doc['title'] = pos[2]

    open(dst, 'w', encoding='utf-8').write(render(doc, cfg))

    ncards = sum(1 for p in doc['parts'] for s in p['sections']
                 for c in s['cards'] if not c.get('prose'))
    nsec = sum(len(p['sections']) for p in doc['parts'])
    print(f"wrote {dst}  [{dtype}{'/internal' if cfg['internal'] else ''}] — "
          f"{len([p for p in doc['parts'] if p['name']])} parts, {nsec} sections, "
          f"{ncards} cards, {len(doc['tiles'])} tiles")


if __name__ == '__main__':
    main()
