

window.onload = function () {
  //Hide labels and output areas
  document.getElementById("privateKeyRow").hidden = true;
}

//Key Generate Button
document.getElementById("keyPairBtn").addEventListener("click", async function () {
  await generateKeyPair();
});

//Decrypt button
document.getElementById("decryptBtn").addEventListener("click", async function () {
  if(document.getElementById("privateKeyRow").hidden == true) {
    document.getElementById("privateKeyRow").hidden = false;
    document.getElementById("publicKeyRow").hidden = true;
    document.getElementById("fileLabel").innerHTML = "Encrypted File:";
    return;
  }
  else {
    var privateKeyFile = document.getElementById("privateKey").files[0];
    if(privateKeyFile != null) {

      if(privateKeyFile.name.endsWith(".pem")) {
        //File is a PEM file
        const file = document.getElementById("file").files[0];

        await decryptFiles(file,privateKeyFile);
      }
      else {
        alert("Please select a PEM private key file");
      }
    }
    else {
      alert("Please select a private key file");
    }
  }
});

//ENCRYPT BUTTON
document.getElementById("encryptBtn").addEventListener("click", async function () {
  if(document.getElementById("publicKeyRow").hidden == true) {
    document.getElementById("publicKeyRow").hidden = false;
    document.getElementById("privateKeyRow").hidden = true;
    document.getElementById("fileLabel").innerHTML = "File to Encrypt:";
    return;
  }
  else {
    const publicKeyFile = document.getElementById("publicKey").files[0];
    if(publicKeyFile != null) {

      if(publicKeyFile.name.endsWith(".pem")) {
        //File is a PEM file
        const file = document.getElementById("file").files[0];
        await encryptFiles(file,publicKeyFile);
      }
      else {
        alert("Please select a PEM public key file");
      }
    }
    else {
      alert("Please select a public key file");
    }
  }
});

async function encryptFiles(file, publicKeyFile) {
  try {
    // Read binary file as an array buffer
    const fileBuffer = await file.arrayBuffer();

    // Generate a random AES key
    const aesKey = await window.crypto.subtle.generateKey(
      {
        name: "AES-CBC",
        length: 256
      },
      true,
      ["encrypt", "decrypt"]
    );

    // Encrypt the file data using AES
    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    const encryptedFileData = await window.crypto.subtle.encrypt(
      {
        name: "AES-CBC",
        iv: iv
      },
      aesKey,
      fileBuffer
    );

    // Export the AES key as a JWK
    const aesKeyJwk = await window.crypto.subtle.exportKey(
      "jwk",
      aesKey
    );

    // Read public key file as a string
    const publicKeyString = await publicKeyFile.text();

    // Parse public key from string
    const publicKeyData = publicKeyString.match(/-----BEGIN PUBLIC KEY-----\n([A-Za-z0-9+/\n=]*)\n-----END PUBLIC KEY-----/)[1];
    const publicKeyBuffer = Uint8Array.from(atob(publicKeyData), c => c.charCodeAt(0));

    // Import public key
    const publicKey = await window.crypto.subtle.importKey(
      "spki",
      publicKeyBuffer,
      {
        name: "RSA-OAEP",
        hash: {name: "SHA-256"}
      },
      true,
      ["encrypt"]
    );

    // Encrypt the AES key using RSA
    const encryptedAesKey = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP"
      },
      publicKey,
      new TextEncoder().encode(JSON.stringify(aesKeyJwk))
    );

    // Concatenate the encrypted AES key and the IV with the encrypted file data
    const encryptedFileDataWithHeader = new Uint8Array(encryptedAesKey.byteLength + iv.byteLength + encryptedFileData.byteLength);
    encryptedFileDataWithHeader.set(new Uint8Array(encryptedAesKey), 0);
    encryptedFileDataWithHeader.set(iv, encryptedAesKey.byteLength);
    encryptedFileDataWithHeader.set(new Uint8Array(encryptedFileData), encryptedAesKey.byteLength + iv.byteLength);

    // Create encrypted file and download link
    const encryptedFile = new File([encryptedFileDataWithHeader], file.name + ".enc", {type: file.type});
    const encryptedFileUrl = URL.createObjectURL(encryptedFile);
    const encryptedFileLink = document.createElement('a');
    encryptedFileLink.setAttribute("href", encryptedFileUrl);
    encryptedFileLink.setAttribute("download", file.name + ".enc");
    encryptedFileLink.click();
    URL.revokeObjectURL(encryptedFileUrl);
  } catch (e) {
    alert("Error encrypting file:\nPlease make sure you have selected a public key file and a file to encrypt");
  }
}

async function decryptFiles(file, privateKeyFile) {
  try {
    // Read binary file as an array buffer
    const fileBuffer = await file.arrayBuffer();

    // Parse the header to extract the encrypted AES key and IV
    const encryptedAesKey = fileBuffer.slice(0, 256);
    const iv = fileBuffer.slice(256, 272);
    const encryptedFileData = fileBuffer.slice(272);

    // Read private key file as a string
    const privateKeyString = await privateKeyFile.text();

    // Parse private key from string
    const privateKeyData = privateKeyString.match(/-----BEGIN PRIVATE KEY-----\n([A-Za-z0-9+/\n=]*)\n-----END PRIVATE KEY-----/)[1];
    const privateKeyBuffer = Uint8Array.from(atob(privateKeyData), c => c.charCodeAt(0));

    // Import private key
    const privateKey = await window.crypto.subtle.importKey(
      "pkcs8",
      privateKeyBuffer,
      {
        name: "RSA-OAEP",
        hash: {name: "SHA-256"}
      },
      true,
      ["decrypt"]
    );

    // Decrypt the AES key using RSA
    const aesKeyJwkString = new TextDecoder().decode(await window.crypto.subtle.decrypt(
      {
        name: "RSA-OAEP"
      },
      privateKey,
      encryptedAesKey
    ));
    const aesKey = await window.crypto.subtle.importKey(
      "jwk",
      JSON.parse(aesKeyJwkString),
      {
        name: "AES-CBC",
        length: 256
      },
      true,
      ["encrypt", "decrypt"]
    );

    // Decrypt the file data using AES
    const decryptedFileData = await window.crypto.subtle.decrypt(
      {
        name: "AES-CBC",
        iv: iv
      },
      aesKey,
      encryptedFileData
    );

    // Create decrypted file and download link
    const decryptedFile = new File([decryptedFileData], file.name.replace(".enc", ""), {type: file.type});
    const decryptedFileUrl = URL.createObjectURL(decryptedFile);
    const decryptedFileLink = document.createElement('a');
    decryptedFileLink.setAttribute("href", decryptedFileUrl);
    decryptedFileLink.setAttribute("download", file.name.replace(".enc", ""));
    decryptedFileLink.click();
    URL.revokeObjectURL(decryptedFileUrl);
  } catch (e) {
    alert("Error decrypting file:\nPlease make sure you have selected the correct private key file and that the file is encrypted.");
  }
}


async function generateKeyPair() {
  try {
    // Generate RSA key pair
    window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: {name: "SHA-256"}
      },
      true,
      ["encrypt", "decrypt"]
    )
      .then(function (keyPair) {
        // Get public and private keys
        var publicKey = keyPair.publicKey;
        var privateKey = keyPair.privateKey;

        // Export public key and create download link
        window.crypto.subtle.exportKey(
          "spki",
          publicKey
        )
          .then(function (publicKeyData) {
            var publicKeyText = '-----BEGIN PUBLIC KEY-----\n' + btoa(String.fromCharCode.apply(null, new Uint8Array(publicKeyData))) + '\n-----END PUBLIC KEY-----\n';
            var publicKeyFile = new File([new TextEncoder().encode(publicKeyText)], "publicKey.pem", {type: "application/x-pem-file"});
            var publicKeyUrl = URL.createObjectURL(publicKeyFile);
            var publicKeyLink = document.createElement('a');
            publicKeyLink.href = publicKeyUrl;
            publicKeyLink.download = "publicKey.pem";
            publicKeyLink.innerHTML = "Download Public Key";
            document.body.appendChild(publicKeyLink);
            publicKeyLink.click();
            document.body.removeChild(publicKeyLink);
          })
          .catch(function (err) {
            console.error(err);
          });

        // Export private key and create download link
        window.crypto.subtle.exportKey(
          "pkcs8",
          privateKey
        )
          .then(function (privateKeyData) {
            var privateKeyText = '-----BEGIN PRIVATE KEY-----\n' + btoa(String.fromCharCode.apply(null, new Uint8Array(privateKeyData))) + '\n-----END PRIVATE KEY-----\n';
            var privateKeyFile = new File([new TextEncoder().encode(privateKeyText)], "privateKey.pem", {type: "application/x-pem-file"});
            var privateKeyUrl = URL.createObjectURL(privateKeyFile);
            var privateKeyLink = document.createElement('a');
            privateKeyLink.href = privateKeyUrl;
            privateKeyLink.download = "privateKey.pem";
            privateKeyLink.innerHTML = "Download Private Key";
            document.body.appendChild(privateKeyLink);
            privateKeyLink.click();
            document.body.removeChild(privateKeyLink);
          })
          .catch(function (err) {
            console.error(err);
          });
      })
      .catch(function (err) {
        console.error(err);
      });
  } catch (e) {
    alert("Error generating key pair:\nPlease make sure you have a secure connection");
  }
}















