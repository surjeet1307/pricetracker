const pup = require('puppeteer');
let track = 'Bitcoin';


(async function () {
    try {
        let brow = pup.launch();
        console.log("Currency --> "+track);
        let page = await (await brow).newPage();
        await page.goto('https://coinmarketcap.com/');
        await page.click('path[d="M16.4153 16.4153L20 20M18.5455 11.2727C18.5455 15.2893 15.2894 18.5454 11.2728 18.5454C7.25612 18.5454 4 15.2893 4 11.2727C4 7.2561 7.25612 4 11.2728 4C15.2894 4 18.5455 7.2561 18.5455 11.2727Z"]');
        await waitandclick('input[placeholder="What are you looking for?"]', page)
        await page.type('input[placeholder="What are you looking for?"]', track, { delay: 200 });
        await page.keyboard.press('Enter');
        let html = await waitandurl('.priceValue span', page);
        console.log("Price --> " + html);
        await setInterval(async () => {
            let html = await waitandurl('.priceValue span', page);
            console.log("Price --> " + html);
        }, 10000);

    } catch (err) {
        console.log(err);
    }
})()

async function waitandclick(selector, page) {
    try {
        await page.waitForSelector(selector);
        await page.click(selector);
    }
    catch (err) {
        console.log(err);
    }
}
async function waitandurl(selector, page) {
    try {
        await page.waitForSelector(selector);
        let url = await page.$(selector);
        let price = await (await url.getProperty('textContent')).jsonValue();
        return price;
    }
    catch (err) {
        console.log(err);
    }
}