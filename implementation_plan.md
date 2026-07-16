# Goal Description
The user is still experiencing a "vertical scroll" and a "black gap".
1. **Vertical Scroll Prevention**: To completely and totally guarantee zero physical scroll, I will apply `position: fixed` and `inset: 0` directly to the `<main>` container on the homepage. This physically detaches the app from the document flow, making vertical scrolling impossible regardless of device or browser quirks.
2. **Black Gap Fix**: The images in Sequence 2 might have transparent backgrounds. When the canvas clears to draw Sequence 2, it reveals the black background container. I will modify the canvas drawing logic so that the last frame of Sequence 1 remains painted as a background layer, and Sequence 2 animates directly on top of it.

## User Review Required
> [!IMPORTANT]
> - I am permanently locking the homepage to the screen using `position: fixed`. This is the strongest possible lock in web development. If you still see vertical movement after this, it is an optical illusion from the images themselves (the camera panning down in the images) or the text fading up.
> - I am keeping the last frame of the Hero animation on-screen when the Wardrobe animation starts, so the clouds will animate directly over the nursery instead of a black background.

## Proposed Changes
1. **`page.tsx`**: Change `<main>` to be `fixed inset-0 w-full h-[100dvh] overflow-hidden`.
2. **`ScrollAnimator.tsx`**: Rewrite the `drawFrame` logic to accept two indices. It will always draw Sequence 1 (either the current frame, or the final frame if we've moved to phase 2), and then draw Sequence 2 on top if applicable. This eliminates the "black gap".
