const { parseStore } = require('./parser');
const { readItemsFromFile } = require('../helpers/reader');
const { saveItemsToFile } = require('../helpers/saver');
const { sendNewItemsToTelegram } = require('./telegram');


const checkForNewListings = async (category) => {
  const oldItems = readItemsFromFile(`data/${category}.json`);
  console.log(`In file ${oldItems.length} items in the store`);
  const newItems = await parseStore(category);
  console.log(`Found ${newItems.length} items in the store`);

  const oldItemsLinks = new Set(oldItems.map(item => item.link).filter(link => link !== undefined && link !== null));
  console.log(`In file ${oldItemsLinks.size} unique links`);
  const newlyListedItems = newItems.filter(item => item.link !== undefined && item.link !== null && !oldItemsLinks.has(item.link));

  console.log(`Found ${newlyListedItems.length} new items`);
  console.log('Newly listed items:', newlyListedItems);

  if (newlyListedItems.length > 0) {
    saveItemsToFile(newItems, `data/${category}.json`);
    sendNewItemsToTelegram(newlyListedItems, category);
  }
};

module.exports = { checkForNewListings };