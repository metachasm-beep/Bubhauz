# Goal Description
The current implementation uses `ScrollTrigger`, which relies on extending the physical height of the webpage (adding thousands of pixels of scroll space) and "pinning" the visual content. Even though it's pinned, the browser still registers physical scrolling, which causes scrollbars to appear and can result in jitter or a feeling of "physically scrolling down".

To achieve a true "locked viewport" where the webpage is strictly 100vh tall and the mouse wheel ONLY drives the animation, we need to completely abandon native scrolling.

## User Review Required
> [!IMPORTANT]  
> I will refactor the codebase to use GSAP's **Observer** plugin instead of `ScrollTrigger`.
> This means the website's physical height will be locked to exactly 100% of your screen height (`overflow: hidden`). 
> There will be **no scrollbars**, and the page will **never physically scroll**. 
> Instead, we will listen directly to your mouse wheel (or trackpad/touch swipes) to manually scrub the animation timeline forward and backward. 

## Proposed Changes
1. **Remove ScrollTrigger**: I will strip out all `ScrollTrigger` and pinning logic from `ScrollAnimator.tsx`.
2. **Lock Body Overflow**: I will ensure `page.tsx` and the container are locked to `100vh` with `overflow-hidden`.
3. **Implement GSAP Observer**: I will use `gsap/Observer` to capture `onWheel` and `onDrag` events, translating your physical gestures directly into timeline progress (e.g., every scroll tick advances the animation by a set percentage).
