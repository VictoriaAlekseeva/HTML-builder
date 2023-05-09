const path = require('path');
const {readdir, readFile, appendFile, rm} = require('fs/promises');

const soursePath = path.join(__dirname, 'styles' );
const bundleFolder = path.join(__dirname, 'project-dist');
const bundleFile = path.join(bundleFolder, 'bundle.css');

async function createBundle() {
  const bundleFiles = await readdir(bundleFolder, {withFileTypes: true});

  for (const file of bundleFiles) {
    if (file.name === 'bundle.css') {
      await rm(bundleFile, { recursive: true });
    }
  }

  const files = await readdir(soursePath, {withFileTypes: true});

  const cssFiles = files.filter(file => file.isFile() && path.extname(file.name) === '.css');

  for (const file of cssFiles) {
    const css = await readFile(path.join(soursePath, file.name), 'utf-8');
    appendFile(bundleFile, css, (err) => {
      if (err) throw err;
    });

  }
}

createBundle();