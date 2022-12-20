var encrypted;
var decrypted;

window.onload = function () {
  //Hide labels and output areas
  document.getElementById("encrypted").hidden = true;
  document.getElementById("encryptedLabel").hidden = true;
  document.getElementById("decrypted").hidden = true;
  document.getElementById("decryptedLabel").hidden = true;
}

//On Click function for encrypt button
document.getElementById("encryptBtn").onclick = function () {
  //Checking inputs fields are not empty
  //The number 2 here means to use file encryption
  if (checkInputsForType() == 2) {
    encryptFile();
  }
  //The number 1 here means to use message encryption
  else if (checkInputsForType() == 1) {
    encrypt();
  }
  else {
    alertBadInputs();
  }
}

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

    if(document.getElementById("decrypted").hidden == false) {
      document.getElementById("decrypted").hidden = true;
      document.getElementById("decryptedLabel").hidden = true;
    }

    //Unhide labels and output areas and inject output
    document.getElementById("encrypted").hidden = false;
    document.getElementById("encryptedLabel").hidden = false;
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

    if(document.getElementById("encrypted").hidden == false) {
      document.getElementById("encrypted").hidden = true;
      document.getElementById("encryptedLabel").hidden = true;
    }

    //Unhide labels and output areas and inject output
    document.getElementById("decrypted").hidden = false;
    document.getElementById("decryptedLabel").hidden = false;
    document.getElementById("decrypted").innerHTML = decrypted.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    document.getElementById("decrypted").innerHTML = "Incorrect key";
  }
}

//Function to encrypt a file with cryptojs and download it
function encryptFile() {
  var file = document.getElementById("file").files[0];
  var key = document.getElementById("key").value;
  var reader = new FileReader();
  reader.onload = function (e) {
    var fileData = e.target.result;
    var encrypted = CryptoJS.AES.encrypt(fileData, key);
    var blob = new Blob([encrypted], {type: "text/plain"});
    var link = document.getElementById("download");
    link.setAttribute("href", "data:application/octet-stream," + encrypted);
    link.setAttribute("download", file.name + ".encrypted");
    //link.href = window.URL.createObjectURL(encrypted);
    link.click();
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
  reader.readAsText(file);
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

  if(message == "") {
    inputFilled = false;
    if(file != "")
    {
      inputFilled = true;
    }
  }
  else if(file == "")
  {
    inputFilled = false;
    if(message != "")
    {
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
    alert("Please select a file or type a message to encrypt");
    return;
  }
  else if(checkInputFields() == true && document.getElementById("key").value == "") {
    alert("Please enter a key to encrypt with");
    return;
  }
}
