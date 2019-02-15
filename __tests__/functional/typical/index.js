import { Builder, Capabilities, By, Key } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import chromedriver from 'chromedriver';

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

const HOME_URL = 'http://localhost:8080/';

const getHelper = driver => ({
  getText: async xpath => driver.findElement(By.xpath(xpath)).getText(),

  sendKeys: async (xpath, keys) => driver.findElement(By.xpath(xpath)).sendKeys(keys)
});

(async () => {
  const driver = await new Builder().withCapabilities(Capabilities.chrome()).build();
  try {
    await driver.get(HOME_URL);

    // Begin test code
    const { getText, sendKeys } = getHelper(driver);

    await sendKeys('//*[@id="email"]', 'no-reply@site.com');
    await sendKeys('//*/input[2]', 'qwerty');
    await driver.findElement(By.xpath('//*/button')).sendKeys(Key.ENTER);

    if ((await getText('//*/div[4]')) !== '77') {
      throw new Error('checkSum is wrong');
    }
    // End test code
  } finally {
    await driver.quit();
  }
})().catch(console.log);
