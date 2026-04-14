import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const renderSvg = async (inputPath, outputPath, width, height) => {
  const svg = await readFile(inputPath);
  await sharp(svg).resize(width, height).png().toFile(outputPath);
};

await renderSvg(
  "public/brand/quan-hong-chan-favicon.svg",
  "public/brand/quan-hong-chan-favicon.png",
  512,
  512
);

await renderSvg(
  "public/brand/quan-hong-chan-og.svg",
  "public/brand/quan-hong-chan-og.png",
  1200,
  630
);
