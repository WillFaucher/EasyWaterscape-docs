---
order: 30
---

# CoastMaker
CoastMaker automatically generates shoreline waves and foam around land that is found within the “Coverage Size” volume (The big volume box that surrounds the island shown below)
<br>Image of CoastMaker Volume Box
<br>"Land" in this context refers to landscapes, static meshes, skeletal meshes, PCG, etc.
<br> You can *EXCLUDE* meshes from being captured by CoastMaker, see the [Excluding Meshes](#excluding-meshes) section below.
> [!TIP] Open the **L_Example_CoastMaker** example level to follow along.


1. Click **Run Easy Water**.
2. Go to the **CoastMaker** section and click **CoastMaker**.

Waves and foam will appear along the coastline.
> The **Coast** settings under the Foam submenu have no effect until you've generated a coast with CoastMaker.
## Settings


| Setting | Description |
|---|---|
| **Coverage Position** | Place it wherever you need coastline coverage. You can paste the coordinates directly in the X Y Z slots, or use the "Coverage Position" viewport gizmo to place it. |
| **Coverage** | Resizes the capture area. |
| **Resolution** | Resolution of the generated maps. |
| **Clear CoastMaker** | Wipes the baked data. Useful when switching levels and a previous bake is still showing. |
| **CoastMaker Coverage Size Debug** | Toggles the Coverage Size Debug visualizer to make it easier to see the coverage area. |

CoastMaker runs automatically **once** at runtime, so there is no ongoing performance cost after your game starts. You can disable it from running if you don't need it by ticking off "Run CoastMaker at Runtime".

## Coast Foam

**Foam > Coast** has the same settings as Open Ocean foam (Intensity, Threshold, Decay, etc.). It works especially well for rocky coasts.

## Coastline Waves

In the **CoastMaker > Coastline** section, you control the shoreline waves themselves: intensity, amount, speed, breaking foam, and more.

## Adjusting for Capture Size and Resolution

When you change the capture area or resolution, the waves may start to look different, because several settings are tied to the size and resolution of the CoastMaker texture. Adjust:

- **Distortion**
- **Distance from Shore**
- **Wave Amount**

For example, if you cram 50 waves into 5 meters, each wave will look odd. Spread them out and art-direct for your level; there's no one-size-fits-all setting.

## Overhangs and Caves

With the mesh terrain features in UE 5.8, landscapes can have overhangs and caves. If yours does, lower **Capture Height Z** to below the overhang. Otherwise CoastMaker captures the top of the landscape instead of the shoreline.

## Excluding Meshes

To prevent coast waves from appearing around a specific static mesh:
>1. Select the mesh.
>2. In the Details panel, search for **scene capture**.
>3. Enable **Hidden in Scene Capture**.

However, some games or projects need those actors to be visible in Scene Capture. So as of the October 2026 update, we can now exclude actors (and PCG) from the CoastMaker capture using a single tag: EWS_HideFromCoastMaker

>1. Select the actor you want to hide from CoastMaker (Static Mesh, PCG, Skeletal Mesh, whatever)
>2. Under search “Tag” in the details panel
>3. Click the + to add a new tag (Shown below)
>4. enter “EWS_HideFromCoastMaker”
>5. Click CoastMaker again to recapture.
>6. Your actor will now no longer be visible in CoastMaker.


## Advanced Settings

The **Advanced** tab should generally be left alone, except in some specific situations:
<br>
<br>In very tight areas, incoming waves can look bad. "Bathymetry Blur" and "JFA Blur" settings help smooth things out. Increase these values to, say, 20 or 30, then click **CoastMaker** again to preview the result.
<br>
<br>Alternatively, sometimes the default values are already too high for the given scale of a level, and odd artifacts can show up as a result. (Example below) Reduce the Bathymetry and JFA Blur values to 0, see if that solves the artifacts, then increase to 2, or 5, for improved visuals. See the Common Issues section for more information on this.
<br>*example of odd artifact*

## Windward mask

Because oceans or lakes can have wind directionality, coast waves and foam arriving from the opposite side of an island can look unnatural. (See example below) The **windward mask** limits coast waves and foam to the side the wind is coming from, effectively sheltering the leeward side of your island.
<br> comparison of windward mask using IMG sli

## Limitations & Best Use Cases

Shoreline waves breaking on beaches are currently the weakest part of the tool. Long breaking waves over shallow shorelines don't look as convincing as they should. Improved shoreline waves are planned for a future update.

EasyWaterscape shines in environments with **steeper cliffs**, where water crashes directly against rocks. A **Niagara splash system** is included for a convincing effect at a distance.
