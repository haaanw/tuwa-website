# Update app screenshots

Small asset refresh: replace old website app screenshots with current AppStoreScreenshots exports.

Sources: /Users/hanwen/Desktop/AppStoreScreenshots/*.png

## Correction

- The first replacement used the Desktop `AppStoreScreenshots` exports, which were still the old April app UI.
- Re-ran the app's current `ScreenshotTests` on iPhone 17 Pro Max and extracted fresh attachments from `/tmp/tuwa-current-screenshots.xcresult`.

## Changes

- Replaced the four site screenshot assets with current simulator captures:
  - `src/assets/screenshots/dashboard.png`
  - `src/assets/screenshots/active-workout.png`
  - `src/assets/screenshots/recovery.png`
  - `src/assets/screenshots/workload.png`
- Updated stale screenshot descriptions in English, French, and Chinese where the old wording no longer matched the current screens.
- Polished the website device frame so the screenshot border, screen clipping, side buttons, home indicator, and Dynamic Island treatment look less harsh.

## Verification

- Confirmed all four source images are 1320x2868.
- Ran `npm run build`; build completed successfully and generated new optimized image filenames.
- Checked the local preview for home, recovery, workload, and smart-templates pages; all returned 200.
- Browser check confirmed each page loads the new optimized screenshot asset with the updated alt text.
- Cleaned stale duplicate files from `dist`, rebuilt, and deployed the corrected output to Cloudflare Pages: https://098e2427.tuwa-website.pages.dev
- Verified `https://tuwa.app/`, recovery, workload, and smart-template pages serve the current screenshot assets and visually show the current app UI.
- Built and visually checked the device-frame polish locally on desktop and mobile crops before redeploying.
- Deployed the device-frame polish to Cloudflare Pages: https://6d305674.tuwa-website.pages.dev
