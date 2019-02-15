import { Builder, Capabilities, Key } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import chromedriver from 'chromedriver';
import { getPageModel } from './page-model';

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

const HOME_URL = 'http://localhost:8080/';

(async () => {
  const driver = await new Builder().withCapabilities(Capabilities.chrome()).build();
  try {
    await driver.get(HOME_URL);

    // Begin test code
    const { emailInput, passwordInput, checkSumDiv, loginButton } = await getPageModel(driver);

    await emailInput.sendKeys('no-reply@site.com');
    await passwordInput.sendKeys('qwerty');
    await loginButton.sendKeys(Key.ENTER);

    if ((await checkSumDiv.getText()) !== '77') {
      throw new Error('checkSum is wrong');
    }
    // End test code
  } finally {
    await driver.quit();
  }
})().catch(console.log);
