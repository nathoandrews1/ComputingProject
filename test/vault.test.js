const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');

const extensionUnpackedPath = 'C:\\____College Year 4\\Final_Project';

const chromeOptions = new chrome.Options();
chromeOptions.addArguments(`--load-extension=${extensionUnpackedPath}`);

describe('Vault Full Test', function () {
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
    clearDownloads();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('Check All Vault Functionality', async function () {
    //Setting up inputs
    const key = '1234567890123456';
    const file = path.resolve(__dirname + '/mockFiles/', 'test.txt');
    const downloadDir ="C:\\Users\\losma\\Downloads";
    const totalAomuntOfPages = 6 * 9;

    for(let i = 0; i < totalAomuntOfPages; i++) {
      //Controlling the encryption flow
      await driver.findElement(By.name("encrypt")).click();
      await driver.findElement(By.id("file")).sendKeys(file);
      await driver.findElement(By.id("key")).sendKeys(key + i);
      await driver.findElement(By.id("encryptBtn")).click();
      //Wait for file to encrypt
      await driver.sleep(50);
      await driver.switchTo().alert().accept();
    }

    //Checking last page button exists
    await driver.findElement(By.id("vaultBtn")).click();
    let lastPageBtn = await driver.findElement(By.id('pageBtn8'));
    expect(lastPageBtn).not.to.be.null;

    await driver.findElement(By.name("delElement")).click();

    //Test Clear Keys Button
    await driver.findElement(By.id('clearKeysBtn')).click();
    try {
      lastPageBtn = await driver.findElement(By.id('pageBtn8'));
    } catch (e) {
      lastPageBtn = null;
    }
    expect(lastPageBtn).to.be.null;

  });
});

function clearDownloads(){
  const downloadDir ="C:\\Users\\losma\\Downloads";
  const downloadsDirectory = fs.readdirSync(downloadDir);

  for(let i = 0; i < downloadsDirectory.length; i++){
    if(downloadsDirectory[i].includes('publicKey') || downloadsDirectory[i].includes('privateKey')){
      fs.unlinkSync(path.resolve(downloadDir, downloadsDirectory[i].toString()));
    }
    if(downloadsDirectory[i].includes('test.txt.enc') || downloadsDirectory[i].includes('test.txt')){
      fs.unlinkSync(path.resolve(downloadDir, downloadsDirectory[i].toString()));
    }
  }
}

