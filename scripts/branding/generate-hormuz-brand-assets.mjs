import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const rootDir = process.cwd();
const outputDir = path.join(rootDir, "public", "brand");
const run = promisify(execFile);

const baseSvg = ({ width, height }) => `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sea" x1="0" y1="0" x2="${width}" y2="${height}" gradientUnits="userSpaceOnUse">
      <stop stop-color="#071521"/>
      <stop offset="1" stop-color="#0F2741"/>
    </linearGradient>
    <linearGradient id="channel" x1="${width * 0.45}" y1="0" x2="${width * 0.58}" y2="${height}" gradientUnits="userSpaceOnUse">
      <stop stop-color="#A7D7EB" stop-opacity="0.18"/>
      <stop offset="0.45" stop-color="#8CC7E4" stop-opacity="0.92"/>
      <stop offset="1" stop-color="#D68863" stop-opacity="0.18"/>
    </linearGradient>
    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="${Math.max(width, height) * 0.012}"/>
    </filter>
  </defs>

  <rect width="${width}" height="${height}" rx="${Math.min(width, height) * 0.18}" fill="url(#sea)"/>
  <g opacity="0.16">
    ${Array.from({ length: 14 }).map((_, index) => {
      const y = (height / 14) * (index + 1);
      return `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="#E8F4FA" stroke-width="1"/>`;
    }).join("\n")}
    ${Array.from({ length: 14 }).map((_, index) => {
      const x = (width / 14) * (index + 1);
      return `<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="#E8F4FA" stroke-width="1"/>`;
    }).join("\n")}
  </g>

  <path d="M${width * 0.14} ${height * 0.1}C${width * 0.31} ${height * 0.14}, ${width * 0.34} ${height * 0.25}, ${width * 0.36} ${height * 0.43}C${width * 0.38} ${height * 0.63}, ${width * 0.29} ${height * 0.76}, ${width * 0.16} ${height * 0.86}L0 ${height * 0.9}V0H${width * 0.12}Z" fill="#1A3347"/>
  <path d="M${width * 0.79} ${height * 0.11}C${width * 0.66} ${height * 0.17}, ${width * 0.64} ${height * 0.27}, ${width * 0.62} ${height * 0.45}C${width * 0.59} ${height * 0.66}, ${width * 0.68} ${height * 0.8}, ${width * 0.84} ${height * 0.89}L${width} ${height * 0.93}V0H${width * 0.89}Z" fill="#102336"/>

  <rect x="${width * 0.43}" y="${height * 0.04}" width="${width * 0.14}" height="${height * 0.92}" rx="${width * 0.05}" fill="url(#channel)"/>
  <rect x="${width * 0.483}" y="${height * 0.1}" width="${width * 0.01}" height="${height * 0.78}" rx="${width * 0.004}" fill="#D9F1FB" fill-opacity="0.92"/>
  <rect x="${width * 0.515}" y="${height * 0.2}" width="${width * 0.008}" height="${height * 0.58}" rx="${width * 0.004}" fill="#D9F1FB" fill-opacity="0.6"/>

  <circle cx="${width * 0.26}" cy="${height * 0.21}" r="${width * 0.06}" fill="#D68863" fill-opacity="0.16" filter="url(#blur)"/>
  <circle cx="${width * 0.73}" cy="${height * 0.72}" r="${width * 0.08}" fill="#8BC5E1" fill-opacity="0.18" filter="url(#blur)"/>

  <text x="${width * 0.09}" y="${height * 0.13}" fill="#F0DDC5" font-size="${width * 0.062}" font-family="'Cormorant Garamond', Georgia, serif" font-weight="600" letter-spacing="${width * 0.003}">H</text>
  <text x="${width * 0.11}" y="${height * 0.2}" fill="#95B8CA" font-size="${width * 0.024}" font-family="'IBM Plex Sans', sans-serif" letter-spacing="${width * 0.012}" text-transform="uppercase">Transit / Risk / Signal</text>
</svg>
`;

const ogSvg = () => `
<svg width="1600" height="900" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sea" x1="0" y1="0" x2="1600" y2="900" gradientUnits="userSpaceOnUse">
      <stop stop-color="#06131F"/>
      <stop offset="1" stop-color="#10253A"/>
    </linearGradient>
    <linearGradient id="glow" x1="680" y1="0" x2="910" y2="900" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7FC4E4" stop-opacity="0.12"/>
      <stop offset="0.5" stop-color="#BFE4F4" stop-opacity="0.92"/>
      <stop offset="1" stop-color="#D68863" stop-opacity="0.14"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#sea)"/>
  <g opacity="0.15">
    ${Array.from({ length: 18 }).map((_, index) => {
      const y = 50 * (index + 1);
      return `<line x1="0" y1="${y}" x2="1600" y2="${y}" stroke="#EAF5FA" stroke-width="1"/>`;
    }).join("\n")}
    ${Array.from({ length: 24 }).map((_, index) => {
      const x = 64 * (index + 1);
      return `<line x1="${x}" y1="0" x2="${x}" y2="900" stroke="#EAF5FA" stroke-width="1"/>`;
    }).join("\n")}
  </g>
  <path d="M220 90C500 120 520 260 550 430C580 615 500 740 255 830L0 900V0H180Z" fill="#183147"/>
  <path d="M1260 90C1040 150 1020 280 995 448C965 655 1085 796 1350 862L1600 900V0H1422Z" fill="#0E2335"/>
  <rect x="690" y="40" width="210" height="820" rx="70" fill="url(#glow)"/>
  <rect x="772" y="96" width="12" height="700" rx="6" fill="#E1F4FB"/>
  <rect x="825" y="166" width="10" height="564" rx="5" fill="#E1F4FB" fill-opacity="0.65"/>
  <text x="120" y="200" fill="#8FB8CA" font-size="28" font-family="'IBM Plex Sans', sans-serif" letter-spacing="12">TIDAL LEDGER</text>
  <text x="120" y="350" fill="#FFF4E6" font-size="106" font-family="'Cormorant Garamond', Georgia, serif" font-weight="600">Hormuz Strait</text>
  <text x="120" y="446" fill="#FFF4E6" font-size="106" font-family="'Cormorant Garamond', Georgia, serif" font-weight="600">News Watch</text>
  <text x="120" y="540" fill="#9CBACA" font-size="32" font-family="'IBM Plex Sans', sans-serif">Real-time headlines, shipping risk, and energy chokepoint context.</text>
  <text x="120" y="720" fill="#F0DDC5" font-size="22" font-family="'IBM Plex Sans', sans-serif" letter-spacing="8">HUO-ER-MU-CI-HAI-XIA.HOMES</text>
</svg>
`;

await fs.mkdir(outputDir, { recursive: true });

const renderSvg = async ({ name, svg, output }) => {
  const svgPath = path.join(outputDir, `${name}.svg`);
  await fs.writeFile(svgPath, svg, "utf8");
  await run("magick", [svgPath, output]);
  await fs.unlink(svgPath);
};

await renderSvg({
  name: "hormuz-logo",
  svg: baseSvg({ width: 1024, height: 1024 }),
  output: path.join(outputDir, "hormuz-logo.png"),
});

await renderSvg({
  name: "hormuz-favicon",
  svg: baseSvg({ width: 256, height: 256 }),
  output: path.join(outputDir, "hormuz-favicon.png"),
});

await renderSvg({
  name: "hormuz-og",
  svg: ogSvg(),
  output: path.join(outputDir, "hormuz-og.png"),
});
