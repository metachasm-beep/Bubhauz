# Layout Redesign for Mobile

This plan addresses the two layout requests for mobile responsiveness and navigation.

## Proposed Changes

### 1. Thin Sticky Top Bar
We will replace the floating bottom macOS-style `SiteDock` with a sleek, thin, sticky top navigation bar (`SiteHeader`).
- It will be pinned to the very top (`fixed top-0 w-full`).
- It will have a premium glassmorphic background (`backdrop-blur-md bg-black/20`).
- It will house the logo on the left and the navigation links on the right.

### 2. Intelligent Mobile Canvas Framing
Currently, the scroll videos are exactly centered on mobile, leaving two small slivers of empty space at the top and bottom. The text blocks are too large to fit in just one sliver, causing them to overlap the video.
- **The Fix**: On mobile, we will shift the sharp video frame to the **top half** of the screen (just below the new top nav bar). 
- This will open up a massive, contiguous block of empty space in the **bottom half** of the screen.
- We will then anchor all the text overlays to this bottom half. They will no longer overlap the video subjects at all!

## User Review Required
> [!IMPORTANT]
> The bottom dock will be completely removed in favor of a traditional (but premium) top navigation bar. Are you happy to proceed with this structural change?
