import assert from "assert";
import { Builder, By, Key } from "selenium-webdriver";

const HOME_URL = "http://localhost:8080/";

const getHelper = driver => ({
  getText: async xpath => driver.findElement(By.xpath(xpath)).getText(),

  getValue: async xpath =>
    driver.findElement(By.xpath(xpath)).getAttribute("value"),

  sendKeys: async (xpath, keys) =>
    driver.findElement(By.xpath(xpath)).sendKeys(keys)
});

(async () => {
  const driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(HOME_URL);

    // Begin test code
    const { getText, getValue, sendKeys } = getHelper(driver);

    await sendKeys('//*[@id="pass"]', "mySecretPassword1234");

    await driver
      .findElement(By.xpath('//*[@id="root"]/div[3]/button'))
      .sendKeys(Key.ENTER);

    assert.equal(
      await getText('//*[@id="checkSum"]'),
      243,
      "checkSum is wrong"
    );

    assert.equal(await getValue('//*[@id="pin"]'), "1234", "pin is wrong");
    // End test code
  } finally {
    await driver.quit();
  }
})().catch(console.log);
