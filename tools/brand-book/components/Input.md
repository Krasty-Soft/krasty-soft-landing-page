# Input

A single-line text field with label, helper text, and error and success states.

## When to use

- Contact, careers and newsletter forms. The main contact form lives in the site footer on every page.
- Use `default` on `bg-primary`; use `outline` on `bg-secondary` panels; use `ghost` inline.

## What the consumer provides

- `label`, `placeholder`, and the native input props (`type`, `value`, `onChange`, `name`, `required`).
- Optional `helperText`, `error` (a sentence saying what to fix), `success`, `icon` (a Lucide icon at the left), `variant`: `default` | `outline` | `ghost`, `size`: `sm` | `md` (default) | `lg`.

## Style

`bg-elevated`, 1px `border-default`, 12px corners, 12×16 padding, 16px Sora. Hover: `border-strong`. Focus: `brand-red` border plus a 2px `state-focus` halo. Error: a red border (Tailwind red-500, #ef4444) and the label and message in `status-error`. Success uses a green border.

Browser autofill is forced to stay dark (#141416 fill, white text).

Static rendition hand-written from `src/components/ui/input/index.tsx`.
