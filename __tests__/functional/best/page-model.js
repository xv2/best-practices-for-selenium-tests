import { By } from "selenium-webdriver";

export const getPageModel = async driver => {
  const findElement = async xpath => driver.findElement(By.xpath(xpath));

  const getChain = element => ({
    getText: () => element.getText(),

    getValue: () => element.getAttribute("value"),

    sendKeys: keys => element.sendKeys(keys)
  });

  const draftModel = {
    passInput: '//*[@id="pass"]',
    pinInput: '//*[@id="pin"]',
    checkSumDiv: '//*[@id="checkSum"]',
    okButton: '//*[@id="root"]/div[3]/button'
  };

  const keys = Object.keys(draftModel);
  const promises = keys.map(key => findElement(draftModel[key]));
  const elements = await Promise.all(promises);

  return keys.reduce(
    (acc, key, index) => ({ ...acc, [key]: getChain(elements[index]) }),
    {}
  );
};