# Button

The pill-shaped action button, in five variants and four sizes; `accent` (brand red) is the one main action in a view.

## When to use

- `accent` for the single primary action of a section: "Get started today", "Send".
- `primary` (dark with a red hover glow) and `outline` for secondary actions next to it.
- `secondary` and `ghost` for quiet actions in toolbars and menus.
- Never place two `accent` buttons side by side.

## What the consumer provides

- `children` or `title`: the label, a short verb phrase in sentence case.
- `variant`: `primary` | `secondary` | `accent` (default) | `ghost` | `outline`.
- `size`: `sm` (14px, 8×16 padding) | `md` (default, 16px, 12×24) | `lg` (18px, 16×32) | `xl` (20px, 20×40).
- Optional `leftIcon` / `rightIcon` (a Lucide icon), `loading` (spinner, disables), `fullSize` (full width), `disabled`, `onClick`.

## Style

`radius-full`, 1px border, weight 500. Hover scales to 1.02 and presses to 0.98 (framer-motion). Focus: 2px `brand-red` ring, offset 2px against `bg-primary`. Disabled: 50% opacity.

## Accessibility

White on `brand-red` is 4.82:1. On hover the accent fill becomes `brand-red-light`, where white is 4.0:1, under AA for 16px text. The site keeps it as it is; it's flagged for a fix.

Static rendition hand-written from `src/components/ui/button/index.tsx`.
