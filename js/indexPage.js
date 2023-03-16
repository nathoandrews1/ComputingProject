
document.getElementById("aesBtn").addEventListener("click", function () {
  const title = document.getElementById("infoTitle");
  const info = document.getElementById("infoDescription");
  const quote = document.getElementById("snowdenQuote");
  quote.hidden = true;
  title.innerHTML = "AES Encryption";
  info.innerHTML = "AES (Advanced Encryption Standard) is efficient at encrypting large amounts of data. It is a symmetric encryption algorithm, meaning that the same key is used to encrypt and decrypt the data. AES is a block cipher, meaning that it encrypts data in blocks of 128 bits. AES is a fast and secure encryption algorithm that is used in many applications. AES is a standard that is used by the US government and is approved by the National Institute of Standards and Technology (NIST).<br><br>Rest assured your file is safe. It cannot be tampered with or opened without the password as the actual bytes of the file are encrypted and altered until decrypted.";
});

document.getElementById("rsaBtn").addEventListener("click", function () {
  const title = document.getElementById("infoTitle");
  const info = document.getElementById("infoDescription");
  const quote = document.getElementById("snowdenQuote");
  quote.hidden = true;
  title.innerHTML = "RSA Encryption";
  info.innerHTML = "In this application we use a Hybrid Encryption solution. When we use the public key to encrypt we generate an AES encryption key, then we encrypt the large file using AES. We then encrypt the AES key using the RSA public key. The private key then decrypts the file using the AES key. The AES key generated is encrypted using the RSA public key and the file is encrypted using the AES key. This means that the file is encrypted twice, once using the AES key and then again using the RSA public key. This is a very secure way of encrypting files";
});
