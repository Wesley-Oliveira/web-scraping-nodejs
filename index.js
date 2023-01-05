const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 60000,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  await page.goto('https://youtube.com');
  await page.waitForSelector("div [id='contents']");
  const titleComponents = await page.$$("div [id='video-title']");

  const titles = (await Promise.all(
    titleComponents.map(async (titleComponent) => {
        const title = await titleComponent.getProperty('ariaLabel');
        return title.jsonValue();
  }))).filter((item) => item);

  console.log(titles);

  await browser.close();
})();