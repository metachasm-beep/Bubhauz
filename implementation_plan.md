# Goal Description

Combine the Hero fold and "The Mini Wardrobe" fold into a single pinned scroll experience. Instead of scrolling down the page physically, the user will scroll within a pinned container to seamlessly transition from the first animation sequence (Hero) to the second animation sequence (The Mini Wardrobe) on the same `<canvas>`.

## User Review Required

> [!WARNING]
> This requires refactoring `ScrollAnimator.tsx` to handle two separate image sequences (`/heroscroll/` and `/scroll2/`) within one master GSAP timeline.
> Since you previously requested to remove all folds without a scroll background, the page will now primarily consist of this one massive pinned section that plays both sequences back-to-back.

## Proposed Changes

### `src/components/home/ScrollAnimator.tsx`
- Refactor the image loader to load both `heroscroll` (Sequence 1) and `scroll2` (Sequence 2) arrays.
- Extend the GSAP timeline's scroll distance (e.g., from `+=400%` to `+=800%`) to accommodate both sequences.
- Add new timeline phases:
  - After Phase 4 (Hero Fade Out), introduce Phase 5: Fade in "The Mini Wardrobe" text.
  - Phase 6: Play the `scroll2` image sequence on the canvas.
  - Phase 7: Fade out "The Mini Wardrobe" text and canvas.
- Update the `drawFrame` logic to accept which sequence array to draw from.

### `src/components/home/HeroOverlay.tsx`
- No major changes needed, it will remain the first child.

### `src/components/home/MiniWardrobeOverlay.tsx` [NEW]
- Extract the text elements from `MiniWardrobeFold.tsx` into an overlay component similar to `HeroOverlay.tsx`.
- Class names like `.wardrobe-text` will be animated by the master timeline in `ScrollAnimator.tsx`.

### `src/app/page.tsx`
- Update the layout to wrap both `HeroOverlay` and `MiniWardrobeOverlay` inside `ScrollAnimator`.
- Remove `FeatureGrid` and `MiniWardrobeFold` completely as they are no longer needed (since everything happens within the pinned `ScrollAnimator`).

## Verification Plan

### Manual Verification
- Scroll down the page.
- Verify the Hero text animates in, the first sequence plays, and then fades out.
- Verify the page *remains pinned* and immediately transitions into fading in "The Mini Wardrobe" text while playing the `scroll2` cloud animation sequence.
- Ensure the canvas rendering is smooth and switches image arrays correctly without flickering.
