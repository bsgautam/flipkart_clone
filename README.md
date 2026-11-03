# 🛍️ Flipkart Clone with Cool Animations

A high-fidelity, interactive Flipkart e-commerce web application featuring authentic Flipkart branding, responsive modern UI, fluid animations, and a complete Login/Sign Up authentication experience.

## ✨ Cool Animations & Micro-Interactions

1. **🚀 Parabolic Flying-to-Cart Animation**:
   - Clicking "Add to Cart" creates a flying clone of the product image that arcs in a 3D parabolic trajectory straight into the shopping cart icon in the navbar.
   - Triggers cart badge wobble animation and audio feedback.

2. **🔐 Interactive Flipkart Login & OTP Flow (`login.html`)**:
   - Signature Flipkart two-column split layout with brand graphics and floating animated reward badges.
   - Dynamic view switching between **Login**, **6-Digit OTP Verification** (with auto-focus & backspace navigation), and **New Account Sign Up**.
   - Instant Demo Login option ("Rahul Sharma") and 30-second resend OTP timer.
   - Session persistence across the website via `localStorage` with a dynamic user profile navbar dropdown.

3. **🎊 Full-Screen Confetti Celebration**:
   - Completing an order or verifying login triggers multi-directional confetti bursts and reveals animated success dialogs.

4. **⭐ Shimmering Flipkart Assured Badge**:
   - Authentic Flipkart Assured badge with continuous diagonal light shimmer reflecting across the badge.

5. **🔊 Native Web Audio Sound Effects**:
   - Synthesizer generated sound cues using the Web Audio API (zero external audio files needed):
     - Soft button taps
     - Pleasant ascending two-tone cart add chimes
     - Harp ping on wishlist toggle
     - Triumphant victory fanfare upon order placement
   - Toggleable directly from the top navigation bar.

6. **⏱️ Live Deals of the Day Countdown**:
   - Real-time countdown timer with flipped digit boxes and pulsing deal indicator.

7. **✨ 3D Micro-Tilt & Hover Glow Cards**:
   - Product cards lift dynamically with soft shadow dispersion and image zoom on hover.

8. **🪙 SuperCoins Gamification & Balance Counter**:
   - SuperCoins counter with rotating 3D coin animation.
   - Earn SuperCoins upon checkout and toggle SuperCoin discounts directly inside the cart drawer.

9. **⚡ Hero Promotional Slider**:
   - Auto-sliding promotional carousel with 3D floating hero product renders, depth glow effects, and interactive navigation dots.

10. **🌓 Dark Mode & Light Mode**:
   - Toggle between Flipkart's iconic blue/white daylight theme and a cyber-Flipkart dark theme with smooth color transitions.

---

## 📦 Project Structure

- [**`index.html`**](index.html): Main store page with categories, deals, dynamic product grid, cart drawer, quick-view, express checkout, and authenticated user header.
- [**`login.html`**](login.html): Dedicated Flipkart login, sign up, and OTP verification page with instant demo login.
- [**`styles.css`**](styles.css): Custom animation keyframes, shimmer shine, card physics, custom scrollbars, and floating badge effects.
- [**`app.js`**](app.js): Application state management, cart operations, Web Audio synthesizer, live filters, user authentication, and checkout simulation.

---

## 🚀 How to Run

1. Open `index.html` directly in your favorite web browser (Google Chrome, Microsoft Edge, Firefox, Brave):
   ```powershell
   Start-Process "C:\Users\badal\.gemini\antigravity\scratch\flipkart-clone\index.html"
   ```
2. Or open `login.html` directly:
   ```powershell
   Start-Process "C:\Users\badal\.gemini\antigravity\scratch\flipkart-clone\login.html"
   ```
3. Or navigate to `C:\Users\badal\.gemini\antigravity\scratch\flipkart-clone\` and double-click `index.html` or `login.html`.
