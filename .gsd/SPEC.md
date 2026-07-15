# Bubhauz Specification

**Status:** FINALIZED

## Objective
A digital product catalogue and inquiry platform for Bubhauz, a premium baby essentials brand. 

## Design System
- **Vibe:** Playful, motherly, premium, safe.
- **Visuals:** Antigravity (soft floating elements, glassmorphism), rounded corners, smooth scroll transitions.
- **Colors:** Warm Peach (`#F4B393`), Gentle Mint (`#A3D5D3`), Warm Off-white (`#FFFBF9`).

## Key Features
1. **Seamless Hero Scroll:** Fold 1 seamlessly acts as the first frame for Fold 2's 3D canvas scroll animation (2 scrolls duration).
2. **Product Catalogue:** Clean, componentized lists of baby products.
3. **Inquiry Flow:** A "Let's Chat" form that submits inquiries to a backend.
4. **Backend:** Firebase integration for inquiry storage (decoupled via service layer).

## Constraints
- Solo dev + AI workflow (GSD optimized).
- Strict separation of concerns (atomic components).
- Empirical verification for backend changes.
