---
order: 4
---

# Benchmark Results

## RTX 5090

- 1440p: 0.54ms
- 1080: 0.51ms

## RTX 3080TI

- 1440p: 1.41ms
- 1080p: 1.22ms

## Benchmark Test Conditions
- Level: Basic exterior lighting setup (Sky Atmosphere, Directional Light, Skylight)
- Test A: Running EasyWaterscape @Mid settings:
  - Water Resolution: 512
  - Water Framerate 30
  - Mesh Density: Medium
- Test B: Same level, EasyWaterscape replaced with a large, reflective plane + basic material with roughness 0. The benchmark needs something to reflect in order to be a fair comparison, as reflections have a cost. It would not be an apples to apples comparison to test EasyWaterscape vs. an empty scene.

Ran the benchmark for 20 seconds, 5 times. Measured the average ms, then subtracted the difference between test A and B.

- Example:
  - Test A measured an average of 4.30ms on RTX 5090 @1440p
  - Test B measured an average of 3.76ms on RTX 5090 @1440p.
  - 4.30 - 3.76 = 0.54ms
