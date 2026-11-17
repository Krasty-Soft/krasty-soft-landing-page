# CTABanner

The red gradient panel that closes a page and sends the reader to the contact form.

## When to use

- Once per page, near the end, after the content has made its case.
- The button scrolls to the footer form (`#contacts`) inside the `#app-scroll` container (`ScrollToContactsButton`); it never opens a new page.

## What the consumer provides

- `children`: a heading in `text-primary`, one sentence in `text-secondary`, and one button.
- The button is white with `cta-red-900` text, a 12px corner (`radius-lg`) and weight 600. It's the one place a white button appears.

## Style

A 135° gradient `cta-red-900` → `cta-red-800` (40%) → `cta-red-700`, `radius-xl`, 64×32 padding, centred. A soft white radial glow breathes slowly (3s) behind the content. On desktop it spans 80% of the column. It fades and scales in once when scrolled into view.

## Accessibility

White text is at least 6.47:1 on every gradient stop; the button text is 10:1.

Static rendition hand-written from `src/components/ui/cta-banner/index.tsx` and `src/components/blocks/audit-page/scroll-to-contacts.tsx` (the copy is an example).
