require('dotenv').config();
const cron = require('node-cron');
const { checkForNewListings } = require('./handlers/checker');
const { initParse } = require('./handlers/initRun');
const { cleanDataFiles } = require('./helpers/cleaner');

console.log(`Starting application with store URL: ${process.env.STORE_URL}`);

async function runWithDelay() {
  await initParse('dell');
  await new Promise(resolve => setTimeout(resolve, 30000)); // 60000 milliseconds = 1 minute
  await initParse('alienware');
  // Schedule to run every 30 minutes
  cron.schedule('*/5 * * * *', () => {
    checkForNewListings('dell');
    setTimeout(() => {
      checkForNewListings('alienware');
    }, 60000);
  });
}

runWithDelay();


