<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { withBase } from "vitepress";

// Hero logo with a live water underline.
// The PNG's static underline (rows 401-411, x 25-576 of the 2696 x 476 logo) is swapped for a moving wave line
// once WebGL2 is running. Without WebGL2, or for visitors who turn off animations, the original logo stays.

const LOGO = withBase("/LogoEasyWaterscape_01.png");
const LOGO_NO_LINE = withBase("/LogoEasyWaterscape_01_NoUnderline.png");
const SDF = withBase("/LogoEasyWaterscape_01_UnderlineSDF.png"); // distance to the letters, 720 x 90, +-64 px

const HEIGHT = 0.75;     // wave height (1 = 6.5 logo px main wave)
const CHOPPINESS = 0.5;  // 0 = smooth rolls, 1 = pointed peaks
const SPEED = 1.0;

// Everything below is in logo pixels. The canvas covers x 0-720, y 360-450.
const X0 = 0, Y0 = 360, RW = 720, RH = 90;
const LINE = { y: 406, half: 5.5, x0: 25, x1: 700 }; // x1 ends hidden inside the y
const GAP = 7;           // clear space around the letters, like the original line where it passes behind the y
const MAX_PTS = 100;

const wrap = ref(null);
const img = ref(null);
const canvas = ref(null);
let stop = () => {};

const TAU = Math.PI * 2;
const sstep = (a, b, x) => { const t = Math.min(Math.max((x - a) / (b - a), 0), 1); return t * t * (3 - 2 * t); };

// Gerstner wave line: two waves travelling right, a wave group that rolls along, calm at both ends.
function wavePoints(t, out) {
  const Xg = -150 + ((t * 160) % 950);
  const A1max = 6.5 * HEIGHT, A2max = 1.6 * HEIGHT, q = 0.92 * CHOPPINESS;
  let n = 0;
  for (let a = LINE.x0 + LINE.half; n < MAX_PTS; a += 7) {
    const x = Math.min(a, LINE.x1);
    const env = sstep(LINE.x0, LINE.x0 + 120, x) * (1 - sstep(520, 610, x));
    const grp = 0.5 + 0.5 * Math.exp(-(((x - Xg) / 170) ** 2));
    const A1 = A1max * grp * env, A2 = A2max * env;
    const th1 = (TAU / 110) * (x - 70 * t), th2 = (TAU / 60) * (x - 50 * t) + 1.1;
    // Sideways motion sharpens the crests (choppiness); it scales with the local height so the ends stay put.
    const D1 = ((0.85 * q * A1) / A1max) * (110 / TAU), D2 = ((0.15 * q * A2) / A2max) * (60 / TAU);
    const lean = 0.1 * A1 * CHOPPINESS * Math.max(Math.cos(th1), 0) ** 4;
    out[n * 2] = x - D1 * Math.sin(th1) - D2 * Math.sin(th2) + lean;
    out[n * 2 + 1] = LINE.y - A1 * Math.cos(th1) - A2 * Math.cos(th2);
    n++;
    if (x >= LINE.x1) break;
  }
  return n;
}

const VS = `#version 300 es
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`;

const FS = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform vec2 uPts[${MAX_PTS}];
uniform int uN;
uniform sampler2D uSdf;
out vec4 outColor;
void main() {
  vec2 uv = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uRes;
  vec2 P = vec2(${X0}.0, ${Y0}.0) + uv * vec2(${RW}.0, ${RH}.0);
  float px = ${RW}.0 / uRes.x;
  float d = 1e5;
  for (int i = 0; i < ${MAX_PTS - 1}; i++) {
    if (i >= uN - 1) break;
    vec2 pa = P - uPts[i], ba = uPts[i + 1] - uPts[i];
    d = min(d, length(pa - ba * clamp(dot(pa, ba) / max(dot(ba, ba), 1e-4), 0.0, 1.0)));
  }
  float letters = (texture(uSdf, uv).r * 255.0 - 127.5) / 127.5 * 64.0;
  float a = clamp(0.5 - (d - ${LINE.half}) / px, 0.0, 1.0) * clamp((letters - ${GAP}.0) / px + 0.5, 0.0, 1.0);
  outColor = vec4(a);
}`;

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = src;
  });
}

function start() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cv = canvas.value, logo = img.value;
  const gl = cv.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
  if (!gl) return;

  const shader = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = shader(gl.VERTEX_SHADER, VS), fs = shader(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  const uRes = gl.getUniformLocation(prog, "uRes"), uPts = gl.getUniformLocation(prog, "uPts");
  const uN = gl.getUniformLocation(prog, "uN"), uSdf = gl.getUniformLocation(prog, "uSdf");
  const vao = gl.createVertexArray();
  const tex = gl.createTexture();
  const pts = new Float32Array(MAX_PTS * 2);

  let alive = true, visible = true, raf = 0, t = 0, last = 0;

  const draw = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(cv.clientWidth * dpr)), h = Math.max(1, Math.round(cv.clientHeight * dpr));
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(prog);
    gl.bindVertexArray(vao);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.uniform1i(uSdf, 0);
    gl.uniform2f(uRes, w, h);
    gl.uniform1i(uN, wavePoints(t, pts));
    gl.uniform2fv(uPts, pts);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 1 / 20);
    last = now;
    if (!visible) return;
    t += dt * SPEED;
    draw();
  };

  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
  io.observe(wrap.value);

  const restore = () => {
    alive = false;
    cancelAnimationFrame(raf);
    io.disconnect();
    logo.src = LOGO;
  };
  cv.addEventListener("webglcontextlost", restore);

  Promise.all([loadImage(SDF), loadImage(LOGO_NO_LINE)]).then(([sdf]) => {
    if (!alive) return;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, gl.RED, gl.UNSIGNED_BYTE, sdf);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    draw(); // water first, then swap the logo, so the line never blinks
    logo.src = LOGO_NO_LINE;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }).catch(() => {});

  return restore;
}

onMounted(() => { stop = start() || stop; });
onBeforeUnmount(() => stop());
</script>

<template>
  <div ref="wrap" class="landing-logo logo-water">
    <img ref="img" :src="LOGO" alt="EasyWaterscape">
    <canvas ref="canvas" aria-hidden="true"></canvas>
  </div>
</template>

<style scoped>
/* Same box as the old <img>: the logo's own width, capped by .landing .landing-logo. */
.logo-water { position: relative; width: 2696px; }
.logo-water img { display: block; width: 100%; height: auto; }
/* Canvas = logo px x 0-720, y 360-450. */
.logo-water canvas { position: absolute; left: 0; top: 75.630%; width: 26.706%; height: 18.908%; pointer-events: none; }
</style>
