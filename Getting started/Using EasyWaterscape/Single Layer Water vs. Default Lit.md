---
order: 50
---
# Single Layer Water vs. Default Lit
![Single Layer Water looks fantastic](/EasyWaterscape_Docs_SLW.png)

**Single Layer Water** is the gold standard for water in Unreal Engine and looks fantastic, providing caustics support, refraction, scattering & absorption. But there are a few downsides too: 

For starters, it does not self-shadow (meaning waves won't cast shadows onto themselves or break up specular reflections) and secondly, it only casts and receives shadows from the primary directional light. In shots lit by Spotlights or Pointlights, missing shadows can break the illusion as shown here:
<div class="img-row">
  <figure>
    <img src="/EasyWaterscape_Docs_SLWOff.png" alt="Default Lit">
    <figcaption>Default Lit</figcaption>
  </figure>
  <figure>
    <img src="/EasyWaterscape_Docs_SLWOn.png" alt="Single Layer Water">
    <figcaption>Single Layer Water</figcaption>
  </figure>
</div>

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
    <img src="/EasyWaterscape_Docs_SLWToggle_02.png" alt="The Material Function in EasyWaterscape's Detail Panel">
    <figcaption>The Material Instance in EasyWaterscape's Detail Panel</figcaption>
  </figure>
  <figure>
    <img src="/EasyWaterscape_Docs_SLWToggle_01.png" alt="Change the Shading Model Here">
    <figcaption>Change the Shading Model Here</figcaption>
  </figure>
</div>

Neither one is “better” than the other, they depend on your needs, and the shot you’re trying to render.