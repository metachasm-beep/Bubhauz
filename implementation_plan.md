# Goal Description
The user wants a strict "zero physical scroll" experience on the homepage. The webpage should behave like a locked viewport where scrolling the mouse wheel ONLY drives the animation timelines.
Currently, after the final animation phase completes, the section unpins, and the page physically scrolls down to reveal the `SiteFooter` (which is located in the global `layout.tsx`).

## User Review Required
> [!IMPORTANT]  
> Because the global `SiteFooter` is physically located at the bottom of the page, the browser naturally scrolls down to it after the animation finishes. 
> To achieve a strict "zero physical scroll" experience on the homepage, we need to handle the footer differently.

## Proposed Changes
1. **Remove the Final Fade Out**: I will remove Phase 8 (the fade to black) from the end of the Wardrobe animation so that it gracefully rests on the final frame of the cloud animation.
2. **Hide the Physical Footer on the Homepage**: I will update `layout.tsx` (or `page.tsx`) so that the `SiteFooter` is completely hidden on the home page. This ensures there is absolutely zero content below the pinned animator, preventing any physical scrolling.
3. **Optional (Let me know)**: If you still want the footer links accessible on the homepage, I can add a final phase to the timeline that fades the footer in *as an overlay* at the very end of the animation, keeping the viewport locked. Let me know if you prefer this, otherwise I will simply hide it on the homepage.
