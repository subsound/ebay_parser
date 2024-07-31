const fs = require('fs').promises;
const { parseStore } = require('./parser');
const { saveItemsToFile } = require('../helpers/saver');

const initParse = async (category) => {
  const filePath = `data/${category}.json`;
  let shouldSave = false;

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    if (fileContent.trim() === '') {
      console.log(`File ${filePath} is empty. Proceeding to save new items.`);
      shouldSave = true;
    } else {
      console.log(`File ${filePath} is not empty. Skipping save.`);
      return;
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`File ${filePath} not found. Proceeding to save new items.`);
      shouldSave = true;
    } else {
      console.error(`Error reading file ${filePath}:`, error);
      return;
    }
  }

  if (shouldSave) {
    const newItems = await parseStore(category);
    saveItemsToFile(newItems, filePath);
    console.log(`New items saved to ${filePath}`);
  }
}



module.exports = { initParse };