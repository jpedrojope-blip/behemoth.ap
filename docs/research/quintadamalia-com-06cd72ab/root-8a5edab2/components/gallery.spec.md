# Gallery and stats specification

## Overview

- Target file: `index.html`, `.gallery` and `.stats-row` in `styles.css`
- Interaction model: CSS card float + scroll reveal + counter animation
- Visual: dark field, four rounded portrait cards in opposing perspective, central `20+` metric, ruled stat strip.

## Assets

`home-4.jpg`, `home-9.jpg`, `home-14.jpg`, `home-18.jpg`, `slide-2.jpg`.

## Behaviors

Gallery cards animate with transform-only movement. Counters animate once when visible: `20+`, `160`, `535k`, plus the static `70m²` fact. Reduced motion skips interpolation.

## Responsive behavior

Desktop spreads cards across the stage. Mobile reduces card width and stage height, then stacks stats vertically.
