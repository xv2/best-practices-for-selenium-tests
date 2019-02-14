import { By } from 'selenium-webdriver';

export const getPageModel = async driver => {
  const getChain = element => ({
    getText: () => element.getText(),
    sendKeys: keys => element.sendKeys(keys)
  });

  const draftModel = {
    emailInput: '//*[@id="email"]',
    passwordInput: '//*/input[2]',
    checkSumDiv: '//*/div/div[4]/div',
    loginButton: '//*/button'
  };

  const keys = Object.keys(draftModel);
  const promises = keys.map(key => driver.findElement(By.xpath(draftModel[key])));
  const elements = await Promise.all(promises);

  return keys.reduce((acc, key, index) => ({ ...acc, [key]: getChain(elements[index]) }), {});
};
