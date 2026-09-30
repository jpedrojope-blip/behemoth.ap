# Contact specification

## Overview

- Target file: `index.html`, `.contact` in `styles.css`
- Interaction model: click-driven local demo form
- Visual: dark canvas, oversized `Get in touch`, two-column message area, fine-line inputs, pale full-width submit button.

## Content

Fields: Name, Email, Where are you from?, Message. Submit: Send message.

## Behaviors

Native validation handles required fields. On valid submit, no network request occurs; the form resets and announces local confirmation via `role=status`.

## Responsive behavior

Desktop keeps heading and form side-by-side. Mobile stacks contact copy above the form.
