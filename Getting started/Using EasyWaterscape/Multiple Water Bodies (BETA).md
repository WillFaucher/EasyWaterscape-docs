---
order: 60
---
# Multiple Water Bodies (BETA)

> [!WARNING] As of October 2026, this feature is in BETA.

 > [!TIP] Open the "L_Example_MultipleWaterBodies_BETA" example level to follow along.

You can now have more than one instance of EasyWaterscape in your level, for example one ocean, and other lakes, or multiple lakes, though in its current state, has quite a few [Caveats](#caveats) to be aware of.

It works, and for many users this might be enough. But it is far from being a perfect system, and this will be developed and improved upon.

### Workflow
Here are the steps to get multiple water bodies in EasyWaterscape, this may be subject to change in the future as the experience gets polished.

1. Place EasyWaterscape in your level, and enable “Lake Mode”. This will be your MAIN. (For your own sake, it can be helpful to rename this main blueprint with the _MAIN suffix in the Outliner)

2. Duplicate the EasyWaterscape blueprint, and place it where you want. **This is your copy.** (Rename this copy to something like _COPY)

3. In your **COPY**, scroll down in the details panel to “Simulate Waves” checkbox (Found in [Optimization & Troubleshooting](<Optimization & Troubleshooting.md#Optimization-&-Troubleshooting>)), and make sure you uncheck it. If you have a  total of, say,  three water bodies in your level, ensure each COPY has [Simulate Waves](<Optimization & Troubleshooting.md#simulate-waves>) unchecked.

>Only your MAIN should have [Simulate Waves](<Optimization & Troubleshooting.md#simulate-waves>) enabled.

4. For your own clarity/sanity, rename your MAIN EasyWaterscape blueprint in the level outliner to “BP_EasyWaterscape_MAIN”. This will prevent some headaches.

5. From here, you can now edit your additional water bodies and give them a different color, material properties, etc.

### Caveats
1. This feature is in BETA, so it's going to have some wonky behaviour sometimes.
2. You can’t have different waves on the multiple water bodies. The waves and wave size will always be the same across all water bodies. But, you can change their material parameters, like color, single layer water settings, etc.
3. Buoyancy will only work on the MAIN water body's altitude. If you have three lakes at three different altitudes, buoyancy will only work on the main one.
4. CoastMaker can only be written from the MAIN as well. So if you need your coast to be captured on all three, extend the Coverage Distance of MAIN's Coast Maker to encapsulate all water bodies

5. It is not the most efficient system because of how Lake Mode works. Lake Mode is also in BETA, so we have two compounding BETA features here. 
   