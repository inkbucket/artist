const fs = require('fs-extra');
const version = process.argv[2];
const archiveMetaFile = './docs/assets/archived-versions.json';

async function archiveFiles() {
  try {
    await fs.copy('./dist/artist-app', `./dist/${version}`);
    await fs.copy(`./dist/${version}`, `./dist/artist-app/${version}`);
    let archivedData = await fs.readJson(archiveMetaFile);
    archivedData = archivedData || {};
    archivedData[version] = Date.now();
    await fs.writeJson(archiveMetaFile, archivedData);
    console.log(`successfully archived version ${version}!`);
  } catch (err) {
    console.error(err);
  }
}

archiveFiles();
