# Behavior bible

## Navigation

- Fixed at the top of the viewport.
- Desktop: centered pill navigation with active-section highlight.
- Mobile/tablet: a Menu button expands a wrapped pill nav; clicking a link closes it.
- Anchor navigation uses native smooth scrolling.

## Motion

- `.reveal` elements fade and translate up when entering the viewport via `IntersectionObserver`.
- Gallery cards float subtly with a slow alternating CSS animation.
- Hero collage receives a low-amplitude scroll parallax through a single `requestAnimationFrame` listener.
- Stats count from zero once visible; reduced motion shows final values immediately.
- Apartment images scale on hover without changing layout bounds.

## Responsive observations

- Desktop uses a fixed pill nav, split editorial sections, four apartment columns, and three-column stats.
- Around 980px, the menu collapses and split layouts become single-column; apartment cards become two columns.
- Around 640px, hero cards narrow, stats stack, apartment cards stack, amenities become single-column, and contact form follows the copy.

## Forms

- All fields have visible labels and native types.
- Submission stays local, resets the form, and announces a status message. No third-party data is transmitted.

## Reduced motion/accessibility

- Skip link, heading hierarchy, alt text, visible focus, keyboard-capable controls, labelled form fields, and `aria-live` feedback included.
- `prefers-reduced-motion: reduce` disables parallax, reveal movement, and long-running animation.
