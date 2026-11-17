# Krasty Soft — Brand Book

`krasty-soft-brand-book.html` is the corporate design book: logo, colour, type, spacing,
shapes, motion, icons, imagery, voice and copy rules, and the UI components. It's one
self-contained file (font, logos and icons embedded), so it opens offline and can be sent
as-is.

```bash
python3 tools/brand-book/build.py            # writes tools/brand-book/krasty-soft-brand-book.html
python3 tools/brand-book/build.py out.html   # or anywhere else
```

> **Regenerate, don't hand-edit.** Edit the sources below and re-run.

| File | What |
|---|---|
| `brand.md` | The book's text. Each `## ` heading is a section; visual blocks are added after Logo, Colour, Typography, Layout and spacing, Shape, Iconography, Imagery and Components |
| `tokens.json` | Colours, type styles, spacing, radii, shadows, layout — copied from `src/app/globals.css` and the UI components |
| `components/<Name>.html` / `.md` | Example markup and guidance per component |
| `components.css` | Styles of the component examples (mirrors `src/components/ui`) |
| `assets-*.md` | Notes for the logo, icon, illustration and imagery groups |

Logos, icons, the Sora font and `public/og-image.png` are read from the repo at build time.
When `globals.css` or a UI component changes, update `tokens.json` / the component files
and rebuild. No dependencies beyond Python 3.
