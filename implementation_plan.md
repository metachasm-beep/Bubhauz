# Goal Description
The "zero physical scroll" approach failed because the CSS `:has()` pseudo-selector (which I used to hide the scrollbar and footer) is not fully supported in all browser environments, causing the rule to be ignored. As a result, the browser still generated a physical scrollbar and scrolled down to the global footer.

To fix this with 100% cross-browser reliability, I will use React's `useEffect` hook to aggressively apply inline styles that lock the viewport and hide the global footer via JavaScript when the homepage loads.

## User Review Required
> [!IMPORTANT]  
> This approach uses JavaScript to directly manipulate the `<body>` and `<html>` tags the moment you land on the homepage, forcing them to `overflow: hidden` and `height: 100vh`. 
> This is a bulletproof method that bypasses any CSS compatibility issues, ensuring the browser is physically incapable of scrolling.

## Proposed Changes
1. **Bulletproof Viewport Lock**: Update `ScrollAnimator.tsx` to include a `useEffect` hook that explicitly sets `document.body.style.overflow = 'hidden'` and `document.documentElement.style.overflow = 'hidden'` on mount (and restores them on unmount).
2. **Hide Global Footer**: Add `id="global-footer"` to `SiteFooter.tsx`, and use JavaScript in `ScrollAnimator.tsx` to hide it when on the homepage, leaving only our fade-in overlay footer.
3. **Remove CSS Hack**: Remove the brittle `:has()` selectors from `globals.css`.
