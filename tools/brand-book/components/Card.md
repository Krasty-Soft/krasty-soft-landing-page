# Card

The base surface for services, case studies and features, in four variants that differ by fill, border and shadow.

## When to use

- `default` (`bg-secondary`, `border-subtle`) for grids of equal items.
- `elevated` (`bg-elevated`, `border-default`, `shadow-card`) for the one item that should stand out, or for floating panels.
- `outline` on busy backgrounds; `ghost` when only the hover lift is wanted.
- `GlassCard` (the same file) is a blurred translucent variant for content over imagery.

## What the consumer provides

- `children`: the content. Usually a title in `text-primary` and a line in `text-muted`.
- `variant`: `default` | `elevated` | `outline` | `ghost`. `padding`: `none` | `sm` (16px) | `md` (default, 24px) | `lg` (32px) | `xl` (40px).
- Optional `hover` (default true: lifts 4px and scales to 1.02), `clickable`, `onClick`, `className`.

## Style

12px corners (Tailwind `rounded-xl`, the value of `radius-lg`), 1px border, 200ms colour transition.

Static rendition hand-written from `src/components/ui/card/index.tsx`.
