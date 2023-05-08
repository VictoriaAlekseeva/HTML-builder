const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const {readdir, mkdir, copyFile, rm} = require('fs/promises')

const dirPath = path.join(__dirname, 'files');
const newDir = path.join(__dirname, 'files-copy');

// await fsPromises.rmdir(newDir, { recursive: true });

async function createDir(dirPath, newDir) {
  try {
    await rm(newDir, { recursive: true });
    await mkdir(newDir, { recursive: true });
    const files = await readdir(dirPath, {withFileTypes: true});
    for (const file of files) {
      const sourceDir = path.join(dirPath, file.name);
      const destinationDir = path.join(newDir, file.name);
      if (file.isDirectory()) {
        await createDir(sourceDir, destinationDir);
      } else {
      await copyFile(sourceDir, destinationDir);
    }
    }

  } catch (err) {
    console.error(err.message);
  }
}

createDir(dirPath, newDir);