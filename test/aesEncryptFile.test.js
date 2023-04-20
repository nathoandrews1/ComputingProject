const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');

const extensionUnpackedPath = 'C:\\____College Year 4\\Final_Project';

const chromeOptions = new chrome.Options();
chromeOptions.addArguments(`--load-extension=${extensionUnpackedPath}`);

describe('AES File Encryption', function () {
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
    await driver.get(`chrome-extension://${extensionId}/index.html`)
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('Encrypt a file with AES and check it was added to vault and ownloaded', async function () {
    //Setting up inputs
    const key = '1234567890123456';
    const file = path.resolve(__dirname + '/mockFiles/', 'test.txt');
    const downloadDir ="C:\\Users\\losma\\Downloads";

    //Controlling the encryption flow
    await driver.findElement(By.name("encrypt")).click();
    await driver.findElement(By.id("file")).sendKeys(file);
    await driver.findElement(By.id("key")).sendKeys(key);
    await driver.findElement(By.id("encryptBtn")).click();
    //Wait for file to encrypt
    await driver.sleep(1000);
    await driver.switchTo().alert().accept();
    await driver.findElement(By.id("vaultBtn")).click();
    await driver.findElement(By.name('fileElement')).click();
    //Wait for file to download
    await driver.sleep(1000);

    // Filter files based on the search string
    let found = false;
    let foundAmount = 0;
    const filesInDirectory = fs.readdirSync(downloadDir);
    for(let i = 0; i < filesInDirectory.length; i++){
      if(filesInDirectory[i].toLocaleLowerCase().includes('test.txt.encrypted')){
        found = true;
        foundAmount++;
      }
    }

    expect(found).to.be.true;
    expect(foundAmount).to.greaterThan(0);
  });
});

