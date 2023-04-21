const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');

const extensionUnpackedPath = 'C:\\____College Year 4\\Final_Project';

const chromeOptions = new chrome.Options();
chromeOptions.addArguments(`--load-extension=${extensionUnpackedPath}`);

describe('RSA File Encryption', function () {
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

  it('Encrypt a file with RSA generate key pair and encrypt file with public key', async function () {
    //Setting up inputs

    const fileToEncrypt = path.resolve(__dirname + '/mockFiles/', 'test.txt');
    let found = false;
    const downloadDir ="C:\\Users\\losma\\Downloads";
    await driver.findElement(By.name("publicKey")).click();
    await driver.findElement(By.id("keyPairBtn")).click();
    await driver.sleep(1000);

    //Search the downloads for the public key
    let filesInDirectory = fs.readdirSync(downloadDir);

    for(let i = 0; i < filesInDirectory.length; i++){
      if(filesInDirectory[i].includes('publicKey')){
        found = true;
      }
    }
    expect(found).to.be.true;

    const publicKeyFile = path.resolve(downloadDir, 'publicKey.pem');
    await driver.findElement(By.id("publicKey"));
    await driver.findElement(By.id("file")).sendKeys(fileToEncrypt);
    await driver.findElement(By.id("publicKey")).sendKeys(publicKeyFile);
    await driver.findElement(By.id("encryptBtn")).click();
    await driver.sleep(1000);


    let foundEncryptedFile = false;
    filesInDirectory = fs.readdirSync(downloadDir);
    for(let i = 0; i < filesInDirectory.length; i++){
      if(filesInDirectory[i].includes('test.txt.enc')){
        foundEncryptedFile = true;
      }
    }
    expect(foundEncryptedFile).to.be.true;
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


