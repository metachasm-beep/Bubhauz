# Goal Description
You requested a "universal" parallax transition between folds. Since our homepage is a strict zero-scroll app powered by GSAP Observer, I will refactor the `ScrollAnimator` to automatically generate a parallax slide effect for *any* number of folds passed into it, making the logic truly universal.

## Proposed Changes
1. **Universal Parallax Engine**: I will rewrite the GSAP timeline in `ScrollAnimator.tsx` to dynamically loop through its `children`.
2. **The Parallax Effect**: For every transition between Fold A and Fold B:
   - Fold A will slide up slightly (e.g., `yPercent: -40`) to create a slower, background depth effect.
   - Fold B will start off-screen at the bottom (`yPercent: 100`) and slide up to `yPercent: 0` (faster foreground effect), overlapping Fold A.
3. **Dynamic Folds**: This means you can add `<FeatureOverlay>`, `<StoryOverlay>`, etc. to `page.tsx` in the future, and the `ScrollAnimator` will automatically give them the exact same parallax transition without needing any new GSAP code!
4. **Canvas Backgrounds**: The canvas animations will still run underneath these parallax sliding overlays.

## Open Questions
> [!IMPORTANT]
> The current canvas animation draws sequence 1 (nursery) and then sequence 2 (clouds) overlapping. If we have more than 2 folds in the future, how do you want the canvas backgrounds handled? For now, I will keep the canvas tied to the first transition, but make the *UI overlays* universally parallax. Does this sound correct?
