import sharp from "sharp";
import fs from "fs";
import path from "path";

const imagesDir = path.join(process.cwd(), "public", "images");
const publicDir = path.join(process.cwd(), "public");
const appDir = path.join(process.cwd(), "app");

async function compressImages() {
  console.log("Starting image compression...");

  // 1. Process me.png -> me.webp (and me.png compressed)
  const mePath = path.join(imagesDir, "me.png");
  if (fs.existsSync(mePath)) {
    const meBuffer = fs.readFileSync(mePath);
    console.log(`Original me.png size: ${(meBuffer.length / (1024 * 1024)).toFixed(2)} MB`);

    // Create optimized me.webp
    await sharp(meBuffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(imagesDir, "me.webp"));
    
    const webpSize = fs.statSync(path.join(imagesDir, "me.webp")).size;
    console.log(`Compressed me.webp size: ${(webpSize / 1024).toFixed(2)} KB`);

    // Also overwrite me.png with compressed PNG version just in case
    await sharp(meBuffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 8 })
      .toFile(path.join(imagesDir, "me_compressed.png"));
    
    fs.renameSync(path.join(imagesDir, "me_compressed.png"), mePath);
    console.log(`Compressed me.png size: ${(fs.statSync(mePath).size / 1024).toFixed(2)} KB`);

    // Generate proper favicon.ico (32x32) & icon.png (192x192)
    const icon32 = await sharp(meBuffer)
      .resize(32, 32, { fit: "cover" })
      .png()
      .toBuffer();
    
    const icon192 = await sharp(meBuffer)
      .resize(192, 192, { fit: "cover" })
      .png()
      .toBuffer();

    fs.writeFileSync(path.join(publicDir, "favicon.ico"), icon32);
    fs.writeFileSync(path.join(appDir, "favicon.ico"), icon32);
    fs.writeFileSync(path.join(publicDir, "icon.png"), icon192);
    console.log(`Generated proper favicon.ico (32x32, ${(icon32.length / 1024).toFixed(2)} KB)`);
  }

  // 2. Remove giant icon files from app/ and public/
  const filesToDelete = [
    path.join(appDir, "icon.png"),
    path.join(appDir, "icon.svg"),
    path.join(publicDir, "icon.svg"),
    path.join(publicDir, "favicon.svg"),
  ];

  for (const file of filesToDelete) {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`Deleted giant icon file: ${path.basename(file)}`);
    }
  }

  // 3. Compress all other images in public/images
  const files = fs.readdirSync(imagesDir);
  for (const file of files) {
    if (file === "me.png" || file === "me.webp") continue;

    const filePath = path.join(imagesDir, file);
    const ext = path.extname(file).toLowerCase();

    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
      const baseName = path.basename(file, ext);
      const inputBuffer = fs.readFileSync(filePath);
      const originalSizeKb = inputBuffer.length / 1024;

      // WebP output
      const webpPath = path.join(imagesDir, `${baseName}.webp`);
      await sharp(inputBuffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(webpPath);
      
      const webpSizeKb = fs.statSync(webpPath).size / 1024;

      // Compress original PNG file in place as well
      const compressedBuffer = await sharp(inputBuffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .png({ quality: 80, compressionLevel: 8 })
        .toBuffer();
      
      fs.writeFileSync(filePath, compressedBuffer);
      const newSizeKb = compressedBuffer.length / 1024;

      console.log(`Compressed ${file}: ${originalSizeKb.toFixed(0)} KB -> ${newSizeKb.toFixed(0)} KB (WebP: ${webpSizeKb.toFixed(0)} KB)`);
    }
  }

  console.log("Image compression complete!");
}

compressImages().catch(console.error);
