# Krasty Soft — Document Generator

Turns a Markdown deliverable into a **self-contained, branded HTML document** — dark theme, Sora,
brand red, logo mark, sticky table of contents, collapsible cards, and a print stylesheet that
produces a clean client PDF.

Built for **commercial proposals and effort estimates**; also handles audits and generic client
documents. One command, no build step, no dependencies beyond Python 3.

```bash
python3 docgen.py <input.md> <output.html> ["Title"] [options]
```

```bash
# client-facing proposal
python3 tools/doc-generator/docgen.py Proposal.md Proposal.html "AcmeCorp — Proposal"

# internal estimate, red banner
python3 tools/doc-generator/docgen.py Estimate.md Estimate.html "AcmeCorp — Estimate" --internal

# light theme, for a PDF that goes to the client
python3 tools/doc-generator/docgen.py Proposal.md Proposal_print.html --theme=light
```

| Option | Effect |
|---|---|
| `--type=proposal\|estimate\|audit\|generic` | Cover kicker, header tag, footer text. Auto-detected from the filename/title if omitted |
| `--theme=dark\|light` | Screen theme. Print output is always light regardless |
| `--internal` | Sticky red **INTERNAL — DO NOT SEND TO CLIENT** banner and an internal kicker |

> **Regenerate, don't hand-edit.** The `.html` is generated. Edit the Markdown and re-run — edits to
> the HTML are silently lost on the next run.

---

## Relationship to `audit-report-generator/`

This is a superset. `audit_to_html.py` is unchanged and still drives existing audit pipelines; use
whichever fits. What this one adds:

- **Four heading levels** — `#` doc title, then `#` parts, `##` sections, `###` cards. A proposal
  structured as *Part 1 → 1.1 → A-1* renders correctly; the audit tool assumes only three.
- **Sticky table of contents** with scroll-spy and deep links. A 60-page proposal is unusable
  without one.
- **Free-text card metadata** (hours, price, status) instead of a fixed Critical/High/Medium/Low
  model. Severities still work, so audit documents render unchanged.
- **Summary tiles declared in the document** rather than inferred from severity counts.
- **Print stylesheet** with per-part page breaks, auto-expanded cards, and a light palette.
- **Light theme** for client-facing PDFs.

---

## Document structure

````markdown
# Document title                     ← cover H1 (overridable by the 3rd argument)
## Subtitle line                     ← rendered as cover meta, not a section
**Prepared by:** Krasty Soft · **Date:** …

<!--tiles
Baseline effort | 3,137–4,697 h | accent
Calendar        | ~10.4 months
-->

> A blockquote here renders as a callout under the cover.

# 1. Part name                       ← top-level nav entry, page break in print
## 1.1 Section name                  ← nav entry
Prose, tables, lists, code …

### A-1 · Finding title              ← collapsible card
Body until the next `###`.

### O-1 · Option title · **+70 – 105 h**   ← trailing ` · meta` shows right-aligned
### M3 — Milestone · 588–890 h
````

**Tiles.** An HTML comment so the block stays invisible in raw Markdown. One tile per line,
`Label | Value | [accent]`. The value renders large, the label small underneath. Omit the block and
no tiles appear.

**Card grammar.** A `###` heading becomes a collapsible card when it starts with an id-like token
followed by `·`, `—` or `-`:

- `A-1`, `O-11`, `F-9`, `B-2`, `M0`, `S4`, `AI6` — letters plus digits
- `§2.4`, `1.2.1` — numeric
- `Assumption W`, `Block 1`, `Option 3`, `Phase 2`, `Milestone 0`, `Annex A`, `Appendix B`

Anything else (`### Further assumptions`, `### How we work`) renders as ordinary prose in place, so
sub-sections inside a card-bearing section are never swallowed.

A trailing ` · <meta>` becomes the right-aligned label when it is ≤64 characters and contains a
digit or is bold — `278–410 h`, `**mandatory**`, `+70 – 105 h`. Titles that merely contain `·`
are left intact.

**Audit compatibility.** `### A1 — Title · **Critical** · 4–6 h` and
`### 2.4 CRITICAL — Title` both still produce severity badges and coloured left edges.

---

## Markdown coverage

Headings `#`–`######`, paragraphs, `**bold**`, `*italic*`, `` `code` ``, `[links](url)`, fenced
code, `-`/`*`/`1.` lists with **one level of nesting**, blockquotes (including headings inside),
`---` rules, and tables **with column alignment** (`---:` right, `:---:` centre).

Escaped pipes `\|` inside table cells are honoured — necessary whenever a table quotes code or a
range like `20 \| 85`, because splitting on a bare `|` shifts every later column in that row and the
damage is invisible in the output.

Not supported: images, reference links, footnotes, HTML passthrough, nested tables.

---

## What it produces

- **Sticky header** — logo, document tag, Expand all / Collapse all / Print.
- **Sticky TOC** with scroll-spy; hidden below 1080 px and in print.
- **Cover** — kicker, title, meta, optional callout.
- **Tiles**, if declared.
- **Collapsible cards**, collapsed by default: `id · title · meta`. Deep-linking to a card's anchor
  opens it.
- **Print/PDF** — light palette, cards expanded, page break before each part, no orphaned headings,
  `@page` margins set.

## Branding

Tokens mirror `src/app/globals.css`: brand red `#e50606`, background `#0a0a0a` (cards `#121212`),
Sora from Google Fonts, logo inlined from `src/app/icon.svg`. To retheme, edit the `:root` block
near the top of `TEMPLATE` — nothing else references colour. Tokens are copied inline rather than
imported so the output stays a single portable file; if the site palette changes, update them here
too.

## Requirements

Python 3.8+, standard library only.
