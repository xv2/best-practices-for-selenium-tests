import assert from 'assert';
import { Builder, By, Key } from 'selenium-webdriver';

const HOME_URL = 'http://localhost:8080/';

const getHelper = driver => ({
  getText: async xpath => driver.findElement(By.xpath(xpath)).getText(),

  getValue: async xpath => driver.findElement(By.xpath(xpath)).getAttribute('value'),

  sendKeys: async (xpath, keys) => driver.findElement(By.xpath(xpath)).sendKeys(keys)
});

(async () => {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get(HOME_URL);

    // Begin test code
    const { getText, getValue, sendKeys } = getHelper(driver);

    await sendKeys('//*[@id="email"]', 'no-reply@site.com');
    await sendKeys('//*/input[2]', 'qwerty');
    await driver.findElement(By.xpath('//*/button')).sendKeys(Key.ENTER);

    assert.equal(await getText('//*/div/div[4]/div'), 77, 'checkSum is wrong');
    // End test code
  } finally {
    await driver.quit();
  }
})().catch(console.log);
