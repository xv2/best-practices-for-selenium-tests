const { Builder, until } = require("selenium-webdriver");

(async () => {
  const driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://yandex.ru");

    await driver.wait(until, titleIs("Yandex"), 2000);
  } finally {
    await driver.quit();
  }
})();
