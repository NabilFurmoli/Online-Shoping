
const { Builder, By, until } = require('selenium-webdriver');

(async function test() {
    let driver = new Builder()
        .forBrowser('chrome')
        .build();

    let targetUrl = 'https://nabilfurmoli.github.io/Online-Shoping/';

    driver.get(targetUrl);

    driver.wait(until.elementLocated({ name: 'image-2' }), 50000).then((element) => {
        driver.sleep(40000);
        console.log(element)
        element.click();
    });

})();