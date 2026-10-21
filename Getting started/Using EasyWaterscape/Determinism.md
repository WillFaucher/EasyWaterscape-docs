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
    <img src="/EasyWaterscapeDocs_OfflineRendering.png" alt="The Offline Rendering tab">
    <figcaption>The Offline Rendering tab in EasyWaterscape's detail panel</figcaption>
  </figure>
</div>

## Deterministic Checkbox
Drives the ocean from Wave Time instead of the engine clock (Time nodes) so every frame renders the same. Keyframe "Wave Time" in Sequencer to make the water move.

When Deterministic is enabled, this automatically uncaps EasyWaterscape's "Water Framerate" variable. This means you don't need to worry about changing your water framerate to match your render framerate, it will always tick forward with every sample for best results (and more importantly, ensuring seamless transitions between render sessions).

## Wave Time
The water's time in seconds, used when Deterministic is on. Keyframe it in Sequencer: the slope of the keys sets the speed.
- 0 at 0s and 10 at 10s = normal speed
- 0 at 0s and 20 at 10s = double speed
- 0 at 0s and 5 at 10s = half speed (slow motion)

Always use **Linear** keys (select the keys, right-click, Linear). Sequencer's default keys ease in and out, which makes the waves speed up and slow down.
Set pre-infinity and post-infinity to Linear so the water keeps moving before the first key and after the last one.
The Wave Speed setting still applies on top, as usual.

Measures the simulation time in seconds, used when Deterministic is on. 
In Sequencer, add EasyWaterscape to the sequence, then keyframe it on the EasyWaterscape actor with linear keys: 0 on the first frame and 10 at 10 s is normal speed, a steeper slope is faster. 
Set post-infinity to Linear so it keeps going past the last key.


> [!TIP] Workflow: For a 10 second shot (240 frames @24fps) at normal speed
> 1. Have a Level Sequence open in your scene.
> 2. Add EasyWaterscape into your Sequence (drag and drop).
> 3. Press "Run EasyWater". Scroll down to the 06-Offline Rendering section and enable Deterministic. The waves will stop moving, this is normal.
> 4. Keyframe Wave Time to 0 at frame 0.
> 5. Keyframe Wave Time to 10 at frame 240 (10 seconds).
> 6. Select both keys, right-click, and choose Linear.
> 7. Scrub through the timeline with the playhead and see the waves move.
> 8. (Optional but Recommended) In Sequencer's Curve Editor Set Pre and Post Infinity to Linear as well for good measure, see image below.

<div class="img-row">
  <figure>
    <img src="/EasyWaterscapeDocs_OfflineRendering_02.png" alt="Pre and Post Infinity Linear">
    <figcaption>Setting Pre and Post Infinity to Linear can prevent sudden stops at the first and last frames</figcaption>
  </figure>
</div>

Run EasyWater is only needed to see the waves move while scrubbing in the editor. Shore waves, swells and wind ripples follow Wave Time without it, and Movie Render Queue and Play don't need it.

> [!NOTE] Multiple water bodies
> Enable Deterministic and keyframe Wave Time on the body that has **Simulate Waves** ticked. The other bodies follow it automatically.

## Caveats To Be Aware Of
1. **Foam needs a few seconds of pre-roll.** Waves, shore waves, swells and ripples are exact on any frame, but Foam has "history": the long trailing foam builds up over a few seconds. Rendering the same frame range twice gives identical foam, but a render that starts in the middle of a shot starts with shorter trails.
   
   To match, give the render about 3 seconds of moving pre-roll: enable **Use Camera Cut for Warm Up** in Movie Render Queue and start your camera cut about 3 seconds before the first frame you render. **Engine Warm Up Count on its own is not enough**: it holds the sequence on the first frame, so the water doesn't move during the warm-up.
2. **Scrubbing backwards resets the foam** to the wave crests. The trails rebuild within 2-3 seconds of moving forward again.
3. **Buoyant objects are physics-driven.** After a jump on the timeline they need a moment to settle back onto the waves. GPU floaters and Shore Spray (BETA) are particle effects with history and are not deterministic.
4. **No Wave Time keys = still water.** With Deterministic on, the water only moves when Wave Time changes.

Since this is a new feature, please reach out on [Discord](https://discord.com/invite/PjY9wEq9wG) if you have any questions.