---
order: 90
---
# Determinism for Offline Rendering

> [!WARNING] This feature is in not yet published on FAB.

Studios using Unreal Engine for offline rendering with Movie Render Queue/Movie Render Graph often have the need for a fully deterministic approach. Meaning, if one renders frame 100-500, then later renders frames 500 to 1000, frame 500 needs to be a perfect match, the water needs to be identical. Users often need to be able to scrub through Sequencer and see the waves move and be at the exact same place frame by frame.
This is why we've added the Deterministic toggle.

<div class="img-row">
  <figure>
    <video src="/EasyWaterscape_Docs_Determinism_01.mp4" autoplay loop muted playsinline></video>
    <figcaption>Scrubbing Sequencer: the waves follow the keyed Wave Time, so the same frame always looks the same.</figcaption>
  </figure>
</div>

This replaces the engine time with a predertermined, deterministic value that you set yourself

You will find both variables you need to work with in the 06-OfflineRendering section of EasyWaterscape:
<div class="img-row">
  <figure>
    <img src="/EasyWaterscapeDocs_OfflineRendering.png" alt="The Optimizations tab">
    <figcaption>The Offline Rendering tab in EasyWaterscape's detail panel</figcaption>
  </figure>
</div>

## Deterministic Checkbox
Drives the ocean from Wave Time instead of the engine clock (Time nodes) so every frame renders the same. Keyframe "Wave Time" in Sequencer to make the water move.

## Wave Time
Measures the simulation time in seconds, used when Deterministic is on. 
In Sequencer, add EasyWaterscape to the sequence, then keyframe it on the EasyWaterscape actor with linear keys: 0 on the first frame and 10 at 10 s is normal speed, a steeper slope is faster. 
Set post-infinity to Linear so it keeps going past the last key.

> [!TIP] Workflow: For a 10 second shot (240 frames @24fps) at normal speed
> 1. Have a Level Sequence open in your scene.
> 2. Add EasyWaterscape into your Sequence (Drag and drop).
> 3. Press "Run EasyWater"Scroll down the 06-Offline Rendering section, enable Deterministic. The waves will stop moving, this is normal.
> 4. Keyframe WaveTime 0 at frame 0. 
> 5. Keyframe WaveTime to 10 at frame 239
> 6. Scrub through the timeline with the playhead and see the waves move.

## Caveats To Be Aware Of
The **only** thing that is not 100% deterministic is the ocean foam. The reason for this is due to the fact that it has "history", this allows waves to have the long, trailing foam that remains for multiple seconds.
The solution to this is to ensure you render enough handle frames/preroll. Once it has enough build up, subsequent frames will be identical to previous renders.

Since this is a new feature, please reach out on [Discord](https://discord.com/invite/PjY9wEq9wG) if you have any questions. 