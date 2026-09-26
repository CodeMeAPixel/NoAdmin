import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { logoSvg } from "../src/lib/brand.ts";

const root = join(import.meta.dirname, "..");

async function png(svg: string, size: number): Promise<Buffer> {
  return sharp(Buffer.from(svg), {
    density: Math.max(72, (72 * size * 4) / 64),
  })
    .resize(size, size)
    .png()
    .toBuffer();
}

function ico(images: { size: number; data: Buffer }[]): Buffer {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach((img, i) => {
    const entry = 6 + i * 16;
    header.writeUInt8(img.size >= 256 ? 0 : img.size, entry);
    header.writeUInt8(img.size >= 256 ? 0 : img.size, entry + 1);
    header.writeUInt8(0, entry + 2);
    header.writeUInt8(0, entry + 3);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(img.data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += img.data.length;
  });
  return Buffer.concat([header, ...images.map((img) => img.data)]);
}

const files: [string, string][] = [
  ["public/logo.svg", logoSvg("mark")],
  ["public/logo-solid.svg", logoSvg("tile")],
  ["public/favicon.svg", logoSvg("tile")],
  ["src/app/icon.svg", logoSvg("tile")],
];

for (const [path, svg] of files) {
  await writeFile(join(root, path), `${svg}\n`);
  console.log("wrote", path);
}

const icoSizes = [16, 32, 48];
const images = await Promise.all(
  icoSizes.map(async (size) => ({
    size,
    data: await png(logoSvg("tile"), size),
  })),
);
await writeFile(join(root, "src/app/favicon.ico"), ico(images));
console.log("wrote src/app/favicon.ico", icoSizes.join("/"));
