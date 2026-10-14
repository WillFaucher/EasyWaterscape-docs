---
order: 3
---

# Common Issues

## Changing settings is not changing anything on my water.

## Buoyant Objects floating above the water

## Water looks blurry

## Black Patches on Water Surface

## CoastMaker not looking great

#### Issue 1

Coastmaker captures the scene in its capture area, and every level is a bit different, it cannot account for the scale and size of your specific world, so the default settings can, potentially, give you unexpected results.

If you encounter this kind of odd thing:

The solution is to adjust the Bathymetry and JFA Blur values found here:
Reduce the values to 0 to narrow down if this is the cause, then slowly bump up the values to 2 or 5.

#### Issue 2

The fix here is to adjust the Calm Range Min/Max values. This will fade out the ocean simulation and resort to only using the coastline waves.

The reason this isn’t on by default is because EasyWaterscape works best with rougher coastlines, the likes of which you’d see in the North Atlantic. We are very transparent about the fact that smooth rolling beaches do not look their best in EasyWaterscape, though our plan on the roadmap is to improve this in future updates.