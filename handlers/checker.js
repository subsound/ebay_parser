import { parseStore } from './parser';
import { readItemsFromFile } from '../helpers/reader';
import { saveItemsToFile } from '../helpers/saver';
import { sendNewItemsToTelegram } from './telegram';

export const checkForNewListings = async () => {
  const oldItems = readItemsFromFile();
  const newItems = await parseStore();

  const oldItemsLinks = new Set(oldItems.map(item => item.link));
  const newlyListedItems = newItems.filter(item => !oldItemsLinks.has(item.link));

  if (newlyListedItems.length > 0) {
    saveItemsToFile(newItems);
    sendNewItemsToTelegram(newlyListedItems);
  }
};