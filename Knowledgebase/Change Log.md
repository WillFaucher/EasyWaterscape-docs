---
order: 10
---
# Changelog / Patch Notes

## 2026-10-15

#### Major Performance improvements
- Reduced per-frame cost of EasyWaterscape by about 67%, roughly a 200% performance increase.
- Optimized render target usage: Render Target Memory usage dropped by 75%. Foam uses 50% fewer draw calls.
>     For reference, on an RTX5090 @1440p, EasyWaterscape ran at 1.62ms.
>     With this new update: 0.54ms
>    - See the [Benchmarks](</Knowledgebase/Benchmarks.md>) section for more details
  

#### New Water Mesh System
**Higher detail *and* better performance.** See [Mesh Mode](</Getting started/Using EasyWaterscape/Water Mesh.md#mesh-mode>) for more information.
New toggle: [Mesh Mode](</Getting started/Using EasyWaterscape/Water Mesh.md#mesh-mode>). By default, uses the new Clipmesh system. The legacy ocean disc method that was previously used is still available here, if you decide you prefer that.

#### Optimized for Temporal Super Resolution
- Vastly reduced ghosting and smearing when screen percentage is below native resolution.

#### Underwater (BETA) Updates
- Improved the underwater results, and now comes with a water surface split that you can art direct.
  <div class="img-row">
    <figure>
      <video src="/EasyWaterscape_Homepage_Underwater.mp4" autoplay loop muted playsinline></video>
      <figcaption>Improved underwater results, and water level split</figcaption>
    </figure>
  </div>

#### Multiple water bodies (BETA)
Several BP_EasyWaterscape actors can now share one wave simulation, ideal for several
lakes in Lake Mode. Untick "Simulate Waves" on every body except one: the others reuse the main body' waves, foam and coast data at no extra simulation cost, while keeping their own material look.

#### Buoyancy

- **Buoyancy Resolution Fix**
    - An issue where buoyancy was not responding correctly when changing ocean resolution
    - Changed the delay position in the BeginPlay chain which affected buoyancy at times.
- **Added Z-Offset and Set Rotation Angle/Rotation Randomness variables to BP_EasyWater_Buoyancy.**
    - Z offset allows you to offset the position of the buoyancy up or down to align objects to the water surface better.
    - Set Rotation Angle/Randomness: Allows you to turn off randomness and set a specific rotation angle on your buoyant mesh particles.
- BP_EasyWater_Buoyancy is now framerate independent.
    - Fixed an issue where buoyancy would explode and objects would go crazy if the framerate dipped too low.

#### CoastMaker

- You can now use a tag to exclude large sets of assets, PCG systems, etc, from being picked up by CoastMaker. 
  
  Add this tag to hide objects from CoastMaker: **EWS_HideFromCoastMaker**. More details [here](</Getting started/Using EasyWaterscape/CoastMaker.md#excluding-meshes>)

#### General Fixes
- General node graph hygiene
- Fixed a bug causing a 1-frame delay on the foam, which led to foam showing up just barely behind the wave crests, rather than correctly in-place.
- Fixed an issue where foam lingered whenever Water Framerate exceeded the runtime fps; now real game time.
- Fixed stuttering when adjusting sliders. Now smooth.
- Mesh Center Focus by actor
- Made LOD0 a bit less ridiculous. Same  mesh density near the camera, optimized near the outer rim.

## 2026-09-10
- Users no longer need to click “Stop EasyWater” before using PIE/Play mode in editor, or before rendering with MovieRenderQueue/Graph.


- Fixed an issue where CoastMaker would cause major artifacts at runtime in a packaged build. This was due to resizing of Render Targets. Issue solved.


- Fixed an issue with Caustics looking completely incorrect when either disabled, using lower scalability settings, or when set to black.


- Fixed an issue with odd artifacts in the horizon at oblique angles. Adjust this with DisplacementFadeStart/End variables exposed in EasyWaterscape directly.

## 2026-09-04
- Added a prompt for 5.8 Users. When adding EasyWaterscape to the project in 5.8, users will receive a prompt about missing project settings. This will be a notable quality improvement. 5.8 Introduced a change to how SLW handles velocities, this prompt fixes smearing issues caused by this. 
di