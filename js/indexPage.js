
document.getElementById("aesBtn").addEventListener("click", function () {
  const title = document.getElementById("infoTitle");
  const info = document.getElementById("infoDescription");
  const quote = document.getElementById("snowdenQuote");
  quote.hidden = true;
  title.innerHTML = "AES Encryption";
  info.innerHTML = "AES (Advanced Encryption Standard) is efficient at encrypting large amounts of data. It is a symmetric encryption algorithm, meaning that the same key is used to aesEncrypt and decrypt the data. AES is a block cipher, meaning that it encrypts data in blocks of 128 bits. AES is a fast and secure encryption algorithm that is used in many applications. AES is a standard that is used by the US government and is approved by the National Institute of Standards and Technology (NIST).<br><br>Rest assured your file is safe. It cannot be tampered with or opened without the password as the actual bytes of the file are encrypted and altered until decrypted.";
});

document.getElementById("rsaBtn").addEventListener("click", function () {
  const title = document.getElementById("infoTitle");
  const info = document.getElementById("infoDescription");
  const quote = document.getElementById("snowdenQuote");
  quote.hidden = true;
  title.innerHTML = "RSA Encryption";
  info.innerHTML = "Public/Private key encryption. This is Asymmetric. Meaning that unlocking and locking the files are done using separate keys. This is a high level of security. This type of encryption is slow but strong and usually inefficient at encrypting files. In this application we use a hybrid solution in the end making the encryption even more secure. A file will be encrypted first using AES, then we will aesEncrypt that randomly generated AES key with the RSA public key. This way the file is encrypted with AES and the AES key is encrypted with RSA. This is a very secure way of encrypting files. The RSA key is generated on the fly and is never stored on a server. The RSA key is only stored in the browser memory. Once you close your browser it will be gone from the memory never to be seen again.";
});
