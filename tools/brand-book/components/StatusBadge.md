# StatusBadge

A pill-shaped live-status chip with a pulsing dot, used to signal availability or progress.

## When to use

- Above a hero or in a careers block to say something is live ("Taking new projects").
- One per view. It's an attention device, like the red button.

## What the consumer provides

- `status`: the word or short phrase. Always present; colour never carries the meaning alone.
- Optional `subtitle` (muted second line), `variant`: `default` (brand red) | `success` | `warning` | `info`, `animated` (default true), `className`.

## Style

`bg-secondary` fill, 1px border at 30% of the status colour, 12×24 padding, `radius-full`. The animated version pulses the dot (1.5s) and a radial glow (2s) behind it.

## Accessibility

`status-success` and `status-warning` text is about 10:1 on `bg-secondary`. `status-info` text is 3.88:1 and `brand-red` text is 3.89:1, both under AA at 14px. The dots are fine; the small text is flagged.

Static rendition hand-written from `src/components/ui/status-badge/index.tsx` (without the pulse).
