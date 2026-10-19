---
order: 50
---
# Single Layer Water vs. Default Lit
![Single Layer Water looks fantastic](/EasyWaterscape_Docs_SLW.png)

**Single Layer Water** is the gold standard for water in Unreal Engine and looks fantastic, providing caustics support, refraction, scattering & absorption.

You can adjust the Single Layer Water settings by going to the 01-EasyWater menu, under **"Surface PBR"**:
<div class="img-row">
  <figure>
    <img src="/EasyWaterscape_Docs_SLWSettings.png" alt="Single Layer Water Settings">
    <figcaption>You'll find the SLW settings in the details panel here</figcaption>
  </figure>
</div>

> [!TIP] Explore the possibilities of SLW
> For information on how Single Layer Water works, [click here](https://dev.epicgames.com/documentation/unreal-engine/single-layer-water-shading-model-in-unreal-engine).

But there are a few downsides too:

For starters, it does not self-shadow (meaning waves won't cast shadows onto themselves or break up specular reflections) and secondly, it only casts and receives shadows from the primary directional light. In shots lit by Spotlights or Pointlights, missing shadows can break the illusion as shown here:


[/EasyWaterscape_Docs_SLWOff.png|/EasyWaterscape_Docs_SLWOn.png|Default Lit|Single Layer Water]

**Default Lit** works much better in those shots, as long as you don't need the translucency/caustic effects. It suits dark, deep water. Setting **Metallic to 1** can improve the look and make things far more realistic as well.

| Feature | Single Layer Water | Default Lit |
| --- | --- | --- |
| Translucency/Absorption/Scattering | ✅ | ❌ |
| Caustics | ✅ | ❌ |
| Shadows from lights other than the primary directional light | ❌ | ✅ |
| Best for | Most shots | Dramatic lighting with local lights; dark, deep water |


### Switching shading model

1. Open your EasyWaterscape **material instance**.
2. Search for **Shading Model**.
3. Change it suit your needs.

<div class="img-row">
  <figure>
    <img src="/EasyWaterscape_Docs_SLWToggle_02.png" alt="An exaggerated demonstration of the water being denser nearest the camera">
    <figcaption>Open the Material Instance found in EasyWaterscape's details panel</figcaption>
  </figure>
</div>

<div class="img-row">
  <figure>
    <img src="/EasyWaterscape_Docs_SLWToggle_01.png" alt="An exaggerated demonstration of the water being denser nearest the camera">
    <figcaption>Change the Shading Model here</figcaption>
  </figure>
</div>
Neither one is “better” than the other, they depend on your needs, and the shot you’re trying to render.