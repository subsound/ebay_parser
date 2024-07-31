const { parseStore } = require('./parser');
const { saveItemsToFile } = require('../helpers/saver');

const initParse = async (category) => {
  const newItems = await parseStore(category);
  saveItemsToFile(newItems, `data/${category}.json`);
}

module.exports = { initParse };