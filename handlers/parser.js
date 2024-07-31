const axios = require('axios');
const cheerio = require('cheerio');
const storeUrl = process.env.STORE_URL;

const parseStore = async (category) => {
  let items = [];
  let currentPageUrl = storeUrl + category;

  try {
    while (currentPageUrl) {
      const response = await axios.get(currentPageUrl);
      const $ = cheerio.load(response.data);

      $('.srp-results > li.s-item').each((index, element) => {
        const title = $(element).find('div > div.s-item__info.clearfix > a > div').text().trim();
        const price = $(element).find('span.s-item__price').text().trim();
        const link = $(element).find('a.s-item__link').attr('href');

        items.push({
          title,
          price,
          link
        });
      });

      // Find the link to the next page
      const nextPageLink = $('a.pagination__next').attr('href');
      currentPageUrl = nextPageLink || null;
    }

    return items;
  } catch (error) {
    console.error('Error fetching the eBay store:', error);
    return [];
  }
};

module.exports = { parseStore };