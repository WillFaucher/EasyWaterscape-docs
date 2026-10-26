---
order: 30
---
# Buoyancy

> [!TIP] Tip: Example Level
> Open the Buoyancy Example Level to follow along.

EasyWaterscape offers three buoyancy methods:

| Method | Cost | Quality | Best for |
| --- | --- | --- | --- |
| **Material Function** | Cheapest | Lowest (no physics) | Simple background movement |
| **Niagara Blueprint** | Low (GPU) | Great | Debris, floating rubble, most use cases. **Recommended default.** |
| **Blueprint Component** | Higher | Great | Hero objects needing logic or gameplay |

### 1. Material Function

Add the function to any material and connect it to the **World Position Offset** pin. It fakes buoyancy by sampling the ocean waves. There's no actual physics involved, so it's best for simple background motion.

### 2. Niagara Blueprint (BP_EasyWater_Buoyancy)

1. Drop the Niagara Blueprint into your level.
2. Assign a static mesh.
3. Adjust the number of spawned objects, radius, scale, and scale variation.

This is the method you should use most of the time. It runs on the GPU, and is highly performant. If something isn't lining up or looks slightly floaty, nudge it and it will snap into place. 
    
#### Enable Drifting:
Enables an additional drift effect where you can configure how far a buoyant mesh drifts away from its initial position. Great for simulating the effects of currents pushing objects away, slowly.

#### Enable Swaying: [New as of 2026-10-26:](</Knowledgebase/Change Log.md#2026-10-26>)
Buoyancy now has a "Enable Swaying" checkbox.

**Enabled:** Ideal for debris and small floating objects that should following the swaying of the waves. (See Below)

**Disabled**: floaters stay where they are placed and bob as the waves pass under them. Best for buoys and larger objects like boats. (See Below)

<div class="img-row">
  <figure>
    <video src="/EasyWaterscape_Docs_BuoyancySwaying_On.mp4" autoplay loop muted playsinline></video>
    <figcaption>Enable Swaying on: the floaters drift back and forth with the waves.</figcaption>
  </figure>
  <figure>
    <video src="/EasyWaterscape_Docs_BuoyancySwaying_Off.mp4" autoplay loop muted playsinline></video>
    <figcaption>Enable Swaying off: the floaters stay in place and bob as the waves pass.</figcaption>
  </figure>
</div>

### 3. Blueprint Component (BP_EasyWater_BuoyancyComponent)

> [!Warning] Heads-up: Performance & Future Updates
> This BP Component is the most performance intensive of the three, and we are not 100% satisfied with it's current state. This is going to be one of the first thing we revamp/improve in the near future, including support for driveable boats.
> 

Can be added to almost anything: static meshes, cameras, and more. It behaves like the Niagara Blueprint, with the same controls.

1. Select your actor.
2. In the details panel, click **Add Component** and search for **easywater**.
3. Use **PIE** or **Simulate in Editor** to see the result.

The **tick rate limiter** can improve performance, but directly affects quality. **60 FPS** is usually the right value for performance/quality ratio.

## Main Controls

Both the Buoyancy Component and the Niagara Blueprint have the same control settings and behave the same way.

| Setting | Tooltip |
| --- | --- |
| Stiffness | Spring force strength for height bobbing. Higher = snappier response to wave changes, lower = slower and floatier. Works with DampingFactor. 1 - 3: Heavy, slow response large ships, barges 5 - 10: Medium, natural feel — small boats, buoys 15 - 2500+: Responsive, bouncy — light debris, corks. If you notice small objects being a bit too floaty, not tightly snapping to the surface of the water, increase stiffness to 1000+.
| Dampening | Controls floating/bobbing oscillation. Lower than 1 = Soft, bouncy buyoant  feeling. 1 = no overshoot. Higher than 1 = Very stiff feeling. Recommended: 0.2 - 0.8 for smooth, natural wave bobbing |
| **Sample Distance** | Samples and averages points for surface normal calculation. Larger = Averages the surface area for smoother tilt. Too high a value might skip waves. Smaller surface area = more detailed/snappier  rotation. |
| Height Multiplier | Amplify or reduce the intensity of the bobbing height feedback. Indirectly affects rotation intensity. |
| Rotation Multiplier | Amplify or reduce the intensity of the bobbing rotation feedback. |
| Swaying | Adds a swaying effect, useful for debris and small floating objects that should following the swaying of the waves. |
| Drifting | Adds a subtle horizontal bobbing effect to simulate gentle wave drifting. |


> **Developer’s Note:** Buoyancy will continue to evolve based on user feedback. Let us know on Discord what your project needs.
>