---
order: 10
---

# Changelog / Patch Notes

## 2026-10-15
**Major update.**

## 2026-09-10
Users no longer need to click “Stop EasyWater” before using PIE/Play mode in editor, or before rendering with MovieRenderQueue/Graph.


Fixed an issue where CoastMaker would cause major artifacts at runtime in a packaged build. This was due to resizing of Render Targets. Issue solved.


Fixed an issue with Caustics looking completely incorrect when either disabled, using lower scalability settings, or when set to black.


Fixed an issue with odd artifacts in the horizon at oblique angles. Adjust this with DisplacementFadeStart/End variables exposed in EasyWaterscape directly.

## 2026-09-04
Added a prompt for 5.8 Users. When adding EasyWaterscape to the project in 5.8, users will receive a prompt about missing project settings. This will be a notable quality improvement. 5.8 Introduced a change to how SLW handles velocities, this prompt fixes smearing issues caused by this. 
