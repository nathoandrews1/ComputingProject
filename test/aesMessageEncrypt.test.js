const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

const extensionUnpackedPath = 'C:\\____College Year 4\\Final_Project';

const chromeOptions = new chrome.Options();
chromeOptions.addArguments(`--load-extension=${extensionUnpackedPath}`);

describe('AES Message Encryption', function () {
  this.timeout(0);
  let driver;

  beforeEach(async function () {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();

    await driver.manage().window().setRect({ width: 375, height: 500 }); // Set the window size
    await driver.get('chrome://extensions');
    const extensionId = 'ipadndggfcndjdbjiaadoloemlmcnlcb';
    await driver.get(`chrome-extension://${extensionId}/index.html`);
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('Encrypt a text message with AES', async function () {
    const message = 'Hello World';
    const key = '1234567890123456';

    await driver.findElement(By.name("encrypt")).click();
    await driver.findElement(By.id("messageEncryptBtn")).click();
    await driver.findElement(By.id("message")).sendKeys(message);
    await driver.findElement(By.id("key")).sendKeys(key);
    await driver.findElement(By.id("encryptBtn")).click();
    const encryptedResult = await driver.findElement(By.id("encrypted")).getText();
    expect(encryptedResult).to.not.equal(message);
  });
});

