const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');

const extensionUnpackedPath = 'C:\\____College Year 4\\Final_Project';

const chromeOptions = new chrome.Options();
chromeOptions.addArguments(`--load-extension=${extensionUnpackedPath}`);

describe('AES File Decryption', function () {
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

  it('Decrypt a file with AES and check it was downloaded', async function () {
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
    let encryptedFoundAmount = 0;
    let encryptedFile;
    const filesInDirectory = fs.readdirSync(downloadDir);

    //Check for encrypted file and grab last one in directory
    for(let i = 0; i < filesInDirectory.length; i++){
      if(filesInDirectory[i].toLocaleLowerCase().includes('txt.encrypted')){
        encryptedFoundAmount++;
        encryptedFile = filesInDirectory[i];
      }
    }


    //Controlling the decryption flow
    await driver.findElement(By.name("encrypt")).click();
    await driver.findElement(By.id("key")).clear();
    await driver.findElement(By.id("key")).sendKeys(key);
    await driver.findElement(By.id("file")).sendKeys(downloadDir + "\\" + encryptedFile);
    await driver.findElement(By.id("decryptBtn")).click();
    //Wait for file to decrypt
    await driver.sleep(1000);

    // Filter files based on the search string
    for(let i = 0; i < filesInDirectory.length; i++){
      if(filesInDirectory[i].toLocaleLowerCase().includes('test.txt')){
        found = true;
        foundAmount++;
        encryptedFile = filesInDirectory[i];
      }
    }
    if(encryptedFoundAmount > 1){
      foundAmount = foundAmount - (encryptedFoundAmount-1);
    }
    expect(found).to.equal(true);
    expect(foundAmount).to.greaterThanOrEqual(1);
  });
});

