# Pill

A small rounded tag that labels case studies and blog posts, or filters them.

## When to use

- The `bordered` variant (default look) is the red-tinted tag on case-study cards and pages: `pill-red-fill` with `brand-red` text.
- `bordered` with `hoverable` plus `active` / `filled` make a filter row: the selected filter is `active` (solid `brand-red`, white text).

## What the consumer provides

- `title`: the tag text. It's passed through `formatTagLabel`, so "fintech" shows as "FinTech".
- `variant`: `bordered` | `active` | `filled`.
- Optional `onSelect` (makes it a button) and `hoverable`.

## Style

12px, weight 600, tracking 0.01em, `radius-full`, 6×14 padding, 16px backdrop blur. Hover scales to 1.05.

## Accessibility

`brand-red` on `pill-red-fill` is 3.16:1 at 12px, under AA. It's flagged; if you fix it, raise the text to `text-primary` and keep the red fill.

Static rendition hand-written from `src/components/ui/pill/index.tsx`.
