
const { Builder, By, until } = require('selenium-webdriver');

(async function test() {
    let driver = new Builder()
        .forBrowser('chrome')
        .build();

    let targetUrl = 'https://nabilfurmoli.github.io/Online-Shoping/';

    driver.get(targetUrl);

    driver.wait(until.elementLocated({ name: 'image-2' }), 50000).then((element) => {
        
        // Although triggering sleep is not ideal when running this automated test script.
        // But I have added it here to allow the user see the interaction of chrome driver with the web page.
        driver.sleep(40000);
        console.log(element)
        element.click();
    });

})();
