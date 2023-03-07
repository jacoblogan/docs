import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let csvData = 'url,updated';

    let response = await page.goto('http://localhost:3000/sitemap.xml');

    const urlsToCheck = [];

    if (response && response.status() && response.status() === 200) {
      const urlTags = await page.evaluateHandle(() => {
        return document.getElementsByTagName('loc');
      });

      const numOfLinks = await page.evaluate((e) => e.length, urlTags);

      for (let i = 0; i < numOfLinks; i++) {
        let url = await page.evaluate(
          (urlTags, i) => urlTags[i].innerHTML,
          urlTags,
          i
        );
        urlsToCheck.push(url);
      }

      if (urlsToCheck.length) {
        for (let i = 0; i < urlsToCheck.length; i++) {
          let nextUrl = urlsToCheck[i];
          console.log(nextUrl);
          let response2 = await page.goto(nextUrl);
          if (response2 && response2.status() && response2.status() === 200) {
            const updatedText = await page.evaluate(() => {
              let node = document.getElementById('page-last-updated');
              return node ? node.textContent : '';
            });
            if (updatedText) {
              const dateRegex = /page updated (.*)/gi;
              let matches = dateRegex.exec(updatedText);
              if (matches[1]) {
                let date = new Date(matches[1]);
                csvData += `\n${nextUrl},${date.toISOString()}`;
              }
            }
          }
        }
      }
    }

    await browser.close();

    fs.writeFile('./updatedDates.csv', csvData, 'utf8', () => {});
  } catch (e) {
    console.log(e);
    await browser.close();
  }
})();
