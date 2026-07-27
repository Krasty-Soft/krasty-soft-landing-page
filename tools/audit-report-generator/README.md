# Audit Report Generator

Turns a Markdown audit document into a **self-contained, Krasty-Soft-branded HTML report** —
dark theme, Sora, brand red, the logo mark, and **collapsible finding cards** so the reader gets a
scannable list instead of a wall of text.

Built for our security / architecture audit deliverables. One command, no build step, no
dependencies beyond Python 3. Output is a single `.html` file that works offline and prints/exports
to PDF cleanly.

![what it produces: a dark, branded report with severity tiles and collapsible findings]

---

## Usage

```bash
python3 audit_to_html.py <input.md> <output.html> ["Report Title"] [--internal]
```

Example:

```bash
python3 tools/audit-report-generator/audit_to_html.py \
  detailed_audit_report.md \
  detailed_audit_report.html \
  "AcmeCorp — Detailed Audit Report"
```

- `<input.md>` — the audit document in the format below.
- `<output.html>` — where to write the branded HTML (overwritten each run).
- `"Report Title"` — optional; overrides the `# H1` from the Markdown for the cover + tab title.

Open the result in any browser, or **Print → Save as PDF** (the print stylesheet flips to a white
background and auto-expands every finding so nothing is hidden in the PDF).

**`--internal`** — for internal working docs (a findings register with true severities and sales
framing that must *not* reach the client). Adds a sticky red **"INTERNAL — DO NOT SEND TO CLIENT"**
banner and an "Internal Working Document" kicker, so a branded internal file can't be mistaken for a
client deliverable. Example:

```bash
python3 audit_to_html.py findings_register.md INTERNAL_register.html "Findings Register" --internal
```

> **Regenerate, don't hand-edit.** The `.html` is generated. Edit the Markdown source and re-run —
> editing the HTML directly is silently lost on the next run.

---

## Expected Markdown format

The generator is tuned to our house audit format. It's forgiving, but follows these conventions:

```markdown
# Report Title                          ← cover H1 (overridable by the 3rd arg)

**Prepared by:** Krasty Soft · **Date:** …   ← any lines before the first `##` become the cover meta
> A callout note here renders as a highlighted box under the cover.

## 1. Section name                      ← `##` = a report section

### F1 — Finding title · **Critical** · 4–6 h
**Reference:** `path/to/file.ts:42`
Body paragraphs, lists, tables, `code`, **bold**, > quotes …
**Fix:** what to do. **4–6 h.**

### F2 — Another finding · **High** · 2–3 h
…
```

**Finding heading grammar** (this is what makes a card collapsible):

```
### <ID> — <Title> · **<Severity>** · <Hours>
```

- `<ID>` — short id (`A1`, `S4`, `AI6`, `§2.4` …). Shown in the collapsed row.
- `<Severity>` — one of `Critical` / `High` / `Medium` / `Low` (drives the badge + accent colour).
- `<Hours>` — free text (`4–6 h`, `included in S2`, `⚠️`). Shown right-aligned.

An alternate heading form is also recognised (used by our internal registers), where the severity
sits inline before the title and there are no hours:

```
### 2.4 CRITICAL — No spend control on any AI endpoint
### 2.33 MEDIUM ⚠️ — A second confirmed drift item
### 2.13 A finding with no severity tag
```

The heading must begin with an **id-like token** (`A1`, `AI6`, `2.4`, `2.14.1`, `§2.4`). Multi-word
headings (`## Must fix before beta`, `### Sequencing constraints`) are treated as section prose,
not findings — so tier tables and sub-sections render normally.

Anything under a `### …` heading (until the next `###`) becomes that card's expandable body.

**Sections without any `###` findings** (an executive summary, a rubric table, a next-steps
section) render as normal static content — headings, paragraphs, **tables**, lists, blockquotes,
and fenced code all work. The severity summary tiles only appear when the document actually
contains findings.

---

## What it produces

- **Sticky header** with the logo mark + `KRASTY SOFT` wordmark and Expand-all / Collapse-all
  buttons.
- **Cover** with kicker, title, meta line, and any callout note.
- **Severity summary tiles** — Critical / High / Medium / Low counts, colour-coded (findings docs
  only).
- **Collapsible finding cards**, collapsed by default: each row shows `ID · title · severity badge
  · hours`; click to reveal the full body. Left-edge accent colour matches severity.
- **Print/PDF stylesheet** — white background, all findings expanded.

---

## Branding

Design tokens are lifted straight from this repo's `src/app/globals.css` so the report always
matches the live site:

| Token | Value |
|---|---|
| Brand red | `#e50606` |
| Background | `#0a0a0a` (cards `#121212` / `#1a1a1a`) |
| Font | **Sora** (loaded from Google Fonts) |
| Logo | inlined from `src/app/icon.svg` |

Severity accent colours: Critical = brand red, High = `#ff7a1a`, Medium = `#ffc400`, Low =
`#8a8a8a`. To retheme, edit the `:root { … }` block near the top of the `TEMPLATE` string in
`audit_to_html.py` — nothing else references colours.

If we change the site's palette or logo, update the tokens/`KRASTY_ICON` in the script to keep the
reports in sync (they're copied inline, not imported, so the report stays self-contained).

---

## Requirements

Python 3.8+. No third-party packages — standard library only.

## Notes / limitations

- Markdown coverage is intentionally targeted at our audit format: headings, paragraphs, bold,
  italic, inline code, fenced code, `-`/`1.` lists, `|` tables, `>` blockquotes, `---` rules,
  `####` sub-headings. It is **not** a general-purpose Markdown engine (no images, nested lists,
  or reference links).
- Output is a single file; fonts come from Google Fonts at view time (works offline once cached;
  for a fully air-gapped PDF, print to PDF once online).
- Keep internal-only documents (true-severity registers, sales framing) out of the client HTML —
  generate HTML only from the client-facing Markdown.
