```markdown
# Design System Document: High-End Agricultural Intelligence

## 1. Overview & Creative North Star

### Creative North Star: "The Precision Ecosystem"
This design system moves away from the utilitarian, "boots-on-the-ground" look of traditional agriculture and ascends into the realm of **Agricultural Intelligence**. It treats the land not just as soil, but as a high-tech asset. The visual language is inspired by architectural blueprints, aerial precision, and the fluid motion of water.

To break the "template" look, we employ **Intentional Asymmetry**. Sections should not always be full-width; use the spacing scale to create offset columns where text breathes on one side while high-resolution imagery "bleeds" off the opposite edge. Overlapping elements—such as a title-lg heading partially masking a glassmorphic card—create a sense of three-dimensional depth and premium editorial craftsmanship.

---

## 2. Colors

The palette is rooted in the deep, authoritative greens of thriving crops, contrasted with technical, airy neutrals that suggest laboratory-grade precision.

### The Color Logic
- **Primary (`#00450d`) & Secondary (`#006e1c`):** Use these for deep immersion. High-impact sections should use `primary` backgrounds with `on-primary` text to establish industry leadership.
- **Tertiary (`#003d65`):** This "Slate Technical" blue is your data accent. Use it for technical specs, iconography, and subtle UI cues to signal "Technology" over "Nature."
- **CTA Accent (`#87f886`):** The `secondary_container` vibrant lime is reserved strictly for conversion points. It represents the "spark" of life and growth.

### Style Rules
- **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Definition must be achieved through background shifts. For example, a `surface-container-low` section should transition directly into a `surface` section.
- **Surface Hierarchy & Nesting:** UI depth is built by stacking. Place a `surface-container-highest` card on a `surface-container-low` background to create a "lifted" effect without heavy shadows.
- **The Glass & Gradient Rule:** For floating navigation or over-image overlays, use Glassmorphism. Apply a `surface` color at 70% opacity with a 20px backdrop blur. 
- **Signature Textures:** Main CTAs should use a subtle linear gradient from `primary` to `primary_container` at a 135-degree angle to provide a metallic, high-tech sheen.

---

## 3. Typography

The system utilizes a dual-typeface strategy to balance human-centric trust with technical authority.

- **Display & Headline (Plus Jakarta Sans):** A high-character, modern sans-serif. Use `display-lg` for hero statements with tight letter-spacing (-2%) to feel editorial and bold.
- **Title, Body, & Label (Inter):** The industry standard for legibility. Inter provides a "system-level" feel that reassures the user of the platform's reliability and technical accuracy.

**Editorial Hierarchy:**
- **Display-lg:** The "Vision" (e.g., "Future-Proof Your Harvest").
- **Headline-md:** The "Mission" (e.g., "Precision Pivot Technology").
- **Body-lg:** The "Details" (High-readability content).

---

## 4. Elevation & Depth

We move beyond traditional Material Design shadows into **Tonal Layering**.

- **The Layering Principle:** Rather than using a shadow to show a card, use a `surface-container-lowest` background for the card sitting on a `surface-container` page background. The slight shift in "brightness" creates a sophisticated, modern lift.
- **Ambient Shadows:** If a floating element (like a modal) requires a shadow, use a "Deep Bloom" shadow: 
  - `box-shadow: 0 20px 40px rgba(0, 34, 3, 0.06);` 
  - Note the use of a dark green tint (`on-primary-fixed`) instead of pure black to keep the shadow feeling "organic."
- **The "Ghost Border" Fallback:** For input fields or cards on complex backgrounds, use a `outline-variant` at 15% opacity. It should be felt, not seen.
- **Glassmorphism:** Use for "floating" interface elements over satellite imagery. This ensures the tech feels integrated into the environment, not separate from it.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), `xl` roundedness, `body-lg` (Inter Bold).
- **Secondary:** `surface-container-highest` background with `primary` text. No border.
- **Tertiary:** Text-only in `primary`, with an arrow icon that moves 4px on hover.

### Cards & Lists
- **The "No-Divider" Rule:** Forbid horizontal lines. Separate list items using `12` (3rem) of vertical whitespace or by alternating background tones between `surface` and `surface-container-low`.
- **Image Containers:** High-quality imagery must use `xl` (1.5rem) corner radius. Use "Inner Glow" shadows on images to make them feel like polished screens.

### Input Fields
- **Styling:** `surface-container-lowest` fill, no border, `md` roundedness. 
- **States:** On focus, transition the background to `surface-bright` and add a 1px "Ghost Border" of `primary` at 20% opacity.

### Additional Signature Component: "The Stats Pulse"
For an agricultural tech firm, data is key. Create a "Live Stat" chip using `tertiary_container` with a small, slow-pulsing dot in `secondary_fixed`. This communicates real-time monitoring and high-tech reliability.

---

## 6. Do's and Don'ts

### Do
- **Do** use large amounts of negative space. A "premium" feel is defined by what you leave out.
- **Do** use high-quality, high-contrast photography (aerial shots of pivots, macro shots of healthy crops).
- **Do** align text-heavy content to a narrow central column (max-width: 680px) for an editorial feel.

### Don't
- **Don't** use pure black `#000000` for text; use `on-surface` (`#171d18`) to maintain tonal warmth.
- **Don't** use "Default" shadows. If it looks like a standard web template, it has failed.
- **Don't** use more than one vibrant lime CTA per viewport. It is a "signal," not a decoration.
- **Don't** use sharp 90-degree corners. Everything in nature and high-end tech (like smartphones) is subtly rounded.```