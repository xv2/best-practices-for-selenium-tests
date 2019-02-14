import assert from "assert";
import { Builder, By, Key } from "selenium-webdriver";
import { getPageModel } from "./page-model";

const HOME_URL = "http://localhost:8080/";

(async () => {
  const driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(HOME_URL);

    // Begin test code
    const { passInput, pinInput, checkSumDiv, okButton } = await getPageModel(
      driver
    );

    await passInput.sendKeys("mySecretPassword1234");
    await okButton.sendKeys(Key.ENTER);

    assert.equal(await checkSumDiv.getText(), 243, "checkSum is wrong");
    assert.equal(await pinInput.getValue(), "1234", "pin is wrong");
    // End test code
  } finally {
    await driver.quit();
  }
})().catch(console.log);
