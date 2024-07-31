const cron = require('node-cron');
import { checkForNewListings } from './handlers/checker';

console.log(`Starting application with store URL: ${process.env.STORE_URL}`);

// Initial run
checkForNewListings();

// Schedule to run every 30 minutes
cron.schedule('*/30 * * * *', () => {
  checkForNewListings();
});
