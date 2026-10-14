---
order: 50
---
# Ocean Solver

The Ocean Solver chooses **how** EasyWaterscape calculates the waves. Both options give you the same waves; the difference is how much work your PC does to get there.

You'll find it in the Details panel under **03-Optimization & Troubleshooting**.

![Ocean Solver dropdown in the Details panel](/EasyWaterscape_Docs_OceanSolver.png)

## GPUCompute (Recommended)

The new default, and the one you should use. The whole wave simulation runs on a single Niagara GPU simulation, which makes it substantially faster than **Legacy (Compatibility)**

## Legacy (Compatibility)

The original solver EasyWaterscape launched with. It builds the waves out of a long chain of render target passes, about 60 of them every time the water updates. The water looks the same, but it costs a lot more, mostly on the CPU.

Only use Legacy if GPUCompute doesn't work in your project, for example if the water stays flat or doesn't move. 

This will eventually be deprecated, unless there is a niche use-case for it. Let us know on [Discord](https://discord.com/invite/PjY9wEq9wG) if you have a specific need for it!

## Performance

In our test scene (2560×1440, Water Framerate 30), going from Legacy to GPUCompute:

| | Legacy | GPUCompute |
| --- | --- | --- |
| Frame rate | 159 fps | 217 fps |
| Time spent on the ocean | 2.69 ms | 1.01 ms |

That's about **60% less time spent on the ocean**. Most of the saving is on the CPU side (the render thread), not the graphics card. Your numbers will vary with your hardware and settings.

## Good To Know

- **Set it in the Details panel.** The solver is picked when the water starts, so changing it from a Blueprint while the game is running won't do anything.
- **Water Resolution and Water Framerate** (right above it) are the biggest performance settings, whichever solver you use.
- **Simulate Waves:** when it's off, this EasyWaterscape doesn't simulate waves at all, so the Ocean Solver setting has no effect.
- **Apple Silicon, AMD, and Intel graphics cards:** GPUCompute was tested on NVIDIA cards. If you run into problems on another card, switch to Legacy and let us know on [Discord](https://discord.com/invite/PjY9wEq9wG).


