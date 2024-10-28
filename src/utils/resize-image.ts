import sharp from 'sharp';

export async function resizeImage(path: string) {
  const buffer = await sharp(path)
    .resize({ width: 500, height: 500 })
    .toBuffer();
  return sharp(buffer).toFile(path);
}
