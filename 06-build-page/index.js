const path = require('path');
const {mkdir, readdir, rm, copyFile, readFile, appendFile, writeFile} = require('fs/promises');

async function copyDir(dirPath, newDir) {
  try {
    await rm(newDir, { recursive: true, force: true });
    await mkdir(newDir, { recursive: true });
    const files = await readdir(dirPath, {withFileTypes: true});
    for (const file of files) {
      const sourceDir = path.join(dirPath, file.name);
      const destinationDir = path.join(newDir, file.name);
      if (file.isDirectory()) {
        await copyDir(sourceDir, destinationDir);
      } else {
        await copyFile(sourceDir, destinationDir);
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

async function createStylesBundle() {

  const soursePath = path.join(__dirname, 'styles' );
  const bundleFolder = path.join(__dirname, 'project-dist');
  const bundleFile = path.join(bundleFolder, 'style.css');

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

async function createTemplate() {
  const templateFile = path.join(__dirname, 'template.html');
  const HTMLComponents = path.join(__dirname, 'components');
  const indexFile = path.join(__dirname, 'project-dist', 'index.html');

  const componentsList = await readdir(HTMLComponents);

  await copyFile (templateFile, indexFile);
  let templateData = await readFile(indexFile, 'utf8');

  for (let component of componentsList) {
    if (path.extname(component) === '.html') {
      const template = await readFile(path.join(HTMLComponents, `${component}`), 'utf-8');
      component = component.toString().split('.')[0];
      templateData = await replaceWithComponent(templateData, component, template);
    }
  }

  await writeFile (indexFile, templateData);


}

async function replaceWithComponent(templateData, component, template) {
  const regexp = new RegExp(`{{${component}}}`, 'ig');
  const updatedData = templateData.replace(regexp, template);
  return updatedData;
}

async function bundleProject() {
  const bundleFolder = path.join(__dirname, 'project-dist');
  const assetsFolder = path.join(__dirname, 'assets');

  const taskFolder = await readdir(__dirname, {withFileTypes: true});

  for (const file of taskFolder) {
    if (file.name === 'project-dist') {
      await rm(bundleFolder, { recursive: true });
    }
  }

  await mkdir(bundleFolder);

  // await open(indexFile, 'w');

  // await open(stylesFile, 'w');

  copyDir(assetsFolder, path.join(bundleFolder, 'assets'));
  createStylesBundle();
  createTemplate();
}

bundleProject();