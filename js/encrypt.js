var encrypted;
var decrypted;
var filesArray = [];
var keysArray = [];

window.onload = function () {
  //Hide labels and output areas
  document.getElementById("decryptedMsgRow").hidden = true;
  document.getElementById("encryptedMsgRow").hidden = true;
  document.getElementById("messageRow").hidden = true;
}


document.getElementById("encryptBtn").addEventListener("click", function () {
  //Checking inputs fields are not empty
  //The number 2 here means to use file encryption
  if (checkInputsForType() == 2) {
    encryptFile();

    var key = document.getElementById("key").value;
    var file = document.getElementById("file").value;

  }
  //The number 1 here means to use message encryption
  else if (checkInputsForType() == 1) {
    encrypt();

    var key = document.getElementById("key").value;
    var file = document.getElementById("file").value;
  }
  else {
    alertBadInputs();
  }
});

//On Click function for decrypt button
if (document.getElementById("decryptBtn")) {
  document.getElementById("decryptBtn").onclick = function () {
    if (checkInputsForType() == 2) {
      decryptFile();
    }
    //The number 1 here means to use message decryption
    else if (checkInputsForType() == 1) {
      decrypt();
    }
    else {
      alertBadInputs();
    }
  }
}

//Single msg / Encrypted file button
if(document.getElementById("messageEncryptBtn")) {
  document.getElementById("messageEncryptBtn").onclick = function () {
    if(document.getElementById("messageRow").hidden == false) {
      document.getElementById("messageRow").hidden = true;
      document.getElementById("fileRow").hidden = false;
      document.getElementById("messageEncryptBtn").innerHTML = "Single Msg";
      return;
    }
    if(document.getElementById("messageRow").hidden == true) {
      document.getElementById("messageRow").hidden = false;
      document.getElementById("fileRow").hidden = true;

      if(document.getElementById("message").hidden == false) {

      }
      document.getElementById("messageEncryptBtn").innerHTML = "Encrypt File";

      return;
    }
  }
}

if (document.getElementById("saltBtn")) {
  document.getElementById("saltBtn").onclick = function () {
    var salt = document.getElementById("salt");
    salt.value = generateSalt();
  }
}

//encrypt function using cryptoJS
function encrypt() {
  var key = document.getElementById("key").value;
  var message = document.getElementById("message").value;
  try {
    encrypted = CryptoJS.AES.encrypt(message, key);

    if(document.getElementById("decryptedMsgRow").hidden == false) {
      document.getElementById("decryptedMsgRow").hidden = true;
    }

    //Unhide labels and output areas and inject output
    document.getElementById("encryptedMsgRow").hidden = false;
    document.getElementById("encrypted").innerHTML = encrypted.toString();
  } catch (e) {
    alert("Error Encrypting try again.");
  }
}

//decrypt function using cryptoJS
function decrypt() {
  var key = document.getElementById("key").value;
  var message = document.getElementById("message").value;
  try {
    decrypted = CryptoJS.AES.decrypt(message, key);

    if (decrypted.toString(CryptoJS.enc.Utf8) == "") {
      alert("Wrong key, try again.");
      return;
    }

    if(document.getElementById("encryptedMsgRow").hidden == false) {
      document.getElementById("encryptedMsgRow").hidden = true;
    }

    //Unhide labels and output areas and inject output
    document.getElementById("decryptedMsgRow").hidden = false;
    document.getElementById("decrypted").innerHTML = decrypted.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    document.getElementById("decrypted").innerHTML = "Incorrect key";
  }
}

//Function to encrypt a file with cryptojs and download it
function encryptFile() {
  var file = document.getElementById("file").files[0];
  if(file.name.includes(".encrypted")) {
    alert("File already encrypted.");
    return;
  }
  var key = document.getElementById("key").value;
  var reader = new FileReader();
  reader.onload = function (e) {
    var fileData = e.target.result;
    var encrypted = CryptoJS.AES.encrypt(fileData, key);

    //Setting the file in storage
    try {
      localStorage.setItem(file.name, encrypted);
    } catch (QuotaExceededError) {
      alert("File cannot exceed 5mb, File not saved into storage. Downloading instead.");
      var link = document.getElementById("download");
      link.setAttribute("href", "data:application/octet-stream," + encrypted);
      link.setAttribute("download", file.name + ".encrypted");
      link.click();
    }

    alert("file saved to storage");
  }
  reader.readAsDataURL(file);
}

//Create function to decrypt a file with cryptojs and download it
function decryptFile() {
  var file = document.getElementById("file").files[0];
  var key = document.getElementById("key").value;
  var reader = new FileReader();
  reader.onload = function (e) {
    var fileData = e.target.result;
    var decrypted = CryptoJS.AES.decrypt(fileData, key).toString(CryptoJS.enc.Latin1);

    if (!/^data:/.test(decrypted)) {
      alert("Wrong key or file not encrypted, try again.");
      return;
    }

    //check if file is encrypted
    var blob = new Blob([decrypted], {type: "text/plain"});
    var link = document.getElementById("download");
    //link.href = window.URL.createObjectURL(decrypted);

    //remove .encrypted from file name
    var fileName = file.name;
    fileName = fileName.replace(".encrypted", "");
    link.setAttribute("download", fileName);
    link.setAttribute("href", decrypted);
    link.click();
  }
  try {
    reader.readAsText(file);
  } catch (e) {
    reader.readAsDataURL(file);
  }
}

//gereate salt for password
function generateSalt() {
  var salt = CryptoJS.lib.WordArray.salt(16);
  document.getElementById("salt").value = salt;
}

//Generate random key
function randomKey() {
  var key = CryptoJS.lib.WordArray.random(16);
  document.getElementById("key").value = key;
}

//Function for checking input fields are filled
function checkInputFields() {
  var key = document.getElementById("key").value;
  var file = document.getElementById("file").value;
  var message = document.getElementById("message").value;
  var inputFilled = false;

  if(document.getElementById("messageRow").hidden == false) {
    if (message != "") {
      inputFilled = true;
    }
  }
  else if(document.getElementById("fileRow").hidden == false) {
    if (file != "") {
      inputFilled = true;
    }
  }
  return inputFilled;
}

//Checking inputs to determine if encrypt message or file should be used
function checkInputsForType() {
  var key = document.getElementById("key").value;
  var message = document.getElementById("message").value;
  var file = document.getElementById("file").value;

  if (key != "" && message != "") {
    return 1;
  }
  else if (key != "" && file != "") {
    return 2;
  }
}

function alertBadInputs(){

  if(checkInputFields() == false) {
    if(document.getElementById("messageRow").hidden == false) {
      alert("Please enter a message and key.");
    }
    else {
      alert("Please select a file and key.");
    }
  }
  else if(checkInputFields() == true && document.getElementById("key").value == "") {
    alert("Please enter a key to encrypt with");
  }
}
