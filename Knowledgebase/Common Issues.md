---
order: 3
---

# Common Issues

## Changing settings is not changing anything on my water.
You simply need to make sure that you click "Run EasyWater". If the water is not running, you won't see the changes being applied to your water. Totally normal!

![Project Settings Popup](/EasyWaterscape_Docs_RunEasyWater.png)
## Buoyant Objects floating above the water
Worry not! If using the Niagara buoyancy blueprint (BP_EasyWater_Buoyancy), simply grab that blueprint, and move it, it should snap right back to the water surface. This only happens in the viewport/simulate mode. At runtime, this shouldn't happen.

## Water looks blurry
> [!TIP] October 2026 Update
> EasyWaterscape, when  using [Clipmap](<../Getting started/Using EasyWaterscape/Water Mesh.md#clipmap>), now correctly generates Motion Vectors, providing a superior visual quality than we had at launch, which helps with the smearing issue, see below:
<div class="img-row">
  <figure>
    <video src="/clip_2_smaller.mp4" autoplay loop muted playsinline></video>
    <figcaption>October 2026 Update - 85% screen percentage, very clean.</figcaption>
  </figure>
</div>
<div class="img-row">
  <figure>
    <video src="/clip_3_smaller.mp4" autoplay loop muted playsinline></video>
    <figcaption>Old version, 85% screen percentage, much blurrier, less crisp. Zoom in to see the difference clearly.
    </figcaption>
  </figure>
</div>


If you're still experiencing smearing, there's two usual suspects here.

1. Ghosting and smearing is likely due to Temporal Super Resolution (TSR) and the fact that, by default, the Unreal Engine viewport is **not** running at native resolution. It is upsampled, running at anywhere between 60-90% screen percentage. Raise your screen percentage to 100, or, for absolute best results, 125-150%, and the smearing will disappear. An alternative is to use an AA method that is not TSR. See the provided tutorial for more examples of this and how to fix it. That said, the October 2026 Update should help you be able to stick with screen percentages well below 100% while still remaining sharp.

2. In Unreal Engine 5.8, IF you are using the [Disc Mesh](<../Getting started/Using EasyWaterscape/Water Mesh.md#disc-legacy>), when this message pops up, you'll need to enable it.
![Project Settings Popup](/EasyWaterscape_Docs_AssetGuidelines_01.png)

If you missed it, you can manually set the following project setting: 
![Project Settings Popup](/EasyWaterscape_Docs_ProjectSetting.png)
This is only necessary to enable ***IF*** and ***ONLY IF*** you need to use the legacy [Disc Mesh](<../Getting started/Using EasyWaterscape/Water Mesh.md#disc-legacy>) approach.
If you plan on sticking with the new defaults, you don't need to change this.
## Black Patches on Water Surface

[/EasyWaterscape_Docs_BlackPatches.png|/EasyWaterscape_Docs_NoBlackPatches.png|Lumen Fix Offset 0|Lumen Fix Offset 50]

## Screen-Space Reflection Issues Along Frame Edges

[/EasyWaterscape_Docs_LumenFixOffset_01.png|/EasyWaterscape_Docs_LumenFixOffset_02.png|Lumen Fix Offset 0|Lumen Fix Offset 50]

## CoastMaker Woes (Artifacts, or not looking great)

#### Issue 1

Coastmaker captures the scene in its capture area, and every level is a bit different, it cannot account for the scale and size of your specific world, so the default settings can, potentially, give you unexpected results.

If you encounter this kind of odd thing:

The solution is to adjust the Bathymetry and JFA Blur values found here:
Reduce the values to 0 to narrow down if this is the cause, then slowly bump up the values to 2 or 5.

#### Issue 2

The fix here is to adjust the Calm Range Min/Max values. This will fade out the ocean simulation and resort to only using the coastline waves.

The reason this isn’t on by default is because EasyWaterscape works best with rougher coastlines, the likes of which you’d see in the North Atlantic. We are very transparent about the fact that smooth rolling beaches do not look their best in EasyWaterscape, though our plan on the roadmap is to improve this in future updates.