---
order: 30
---

# Using CoastMaker
CoastMaker automatically generates shoreline waves and foam around static meshes and landscapes that are found within the “Coverage Size” volume (The big square volume that surrounds the island as shown here)
> The **Coast** settings under the Foam submenu have no effect until you've generated a coast with CoastMaker.

### Quick start

> Open the **CoastMaker** example level to follow along.

1. Click **Run Easy Water**.
2. Go to the **CoastMaker** section and click **CoastMaker**.

Waves and foam will appear along the coastline.

### How it works

CoastMaker captures all land within its **bounding box**.

| Setting | Description |
|---|---|
| **Bounding box** | Place it wherever you need coastline coverage. |
| **Coverage** | Resizes the capture area. |
| **Resolution** | Resolution of the generated maps. |
| **Clear CoastMaker** | Wipes the baked data. Useful when switching levels and a previous bake is still showing. |

CoastMaker runs automatically **once** at runtime, so there is no ongoing performance cost after your game starts. You can disable it from running if you don't need it.

### Coast foam

**Foam → Coast** has the same settings as Open Ocean foam (Intensity, Threshold, Decay, etc.). It works especially well for rocky coasts.

### Coastline waves

In the **CoastMaker → Coastline** section, you control the shoreline waves themselves: intensity, amount, speed, breaking foam, and more.

### Adjusting for capture size and resolution

When you change the capture area or resolution, the waves may start to look different, because several settings are tied to the size and resolution of the CoastMaker texture. Adjust:

- **Distortion**
- **Distance from Shore**
- **Wave Amount**

For example, if you cram 50 waves into 5 meters, each wave will look odd. Spread them out and art-direct for your level; there's no one-size-fits-all setting.

### Overhangs and caves

With the mesh terrain features in UE 5.8, landscapes can have overhangs and caves. If yours does, lower **Capture Height Z** to below the overhang. Otherwise CoastMaker captures the top of the landscape instead of the shoreline.

### Excluding meshes

To prevent coast waves from appearing around a specific static mesh:

1. Select the mesh.
2. In the Details panel, search for **scene capture**.
3. Enable **Hidden in Scene Capture**.

### Advanced settings

The **Advanced** tab should generally be left alone. One useful exception: in very tight areas, incoming waves can look bad. The Advanced settings blur the generated maps to smooth this out. Increase them a fair amount, then click **CoastMaker** again to 

Alternatively, sometimes the default values are already too high for the given scale of a level, and odd artifacts can show up as a result. Reduce the Bathymetry and JFA Blur values to 0, see if that solves the artifacts, then increase to 2, or 5, for improved visuals. See the Common Issues section for more information on this.

### Windward mask

Because the ocean has directionality, coast waves and foam arriving from the opposite side of an island can look unnatural. The **windward mask** limits coast waves and foam to the side the wind is coming from, effectively sheltering the leeward side of your island.

### Limitations & best use cases

Shoreline waves breaking on beaches are currently the weakest part of the tool. Long breaking waves over shallow shorelines don't look as convincing as they should. Improved shoreline waves are planned for a future update.

EasyWaterscape shines in environments with **steeper cliffs**, where water crashes directly against rocks. A **Niagara splash system** is included for a convincing effect at a distance.
