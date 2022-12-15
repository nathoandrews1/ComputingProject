var encrypted;
var decrypted;

//On Click function to for encrypt button
document.getElementById("encryptBtn").onclick = function() {
  if(checkInputFields()) {
    encrypt();
  } else {
    alert("Please fill in all fields.");
  }
}

//On Click function to for decrypt button
if(document.getElementById("decryptBtn")) {
  document.getElementById("decryptBtn").onclick = function () {
    if(checkInputFields()) {
      decrypt();
    } else {
      alert("Please fill in all fields.");
    }
  }
}

if(document.getElementById("saltBtn")) {
  document.getElementById("saltBtn").onclick = function() {
    var salt = document.getElementById("salt");
    salt.value = generateSalt();
  }
}

//encrypt function using cryptoJS
function encrypt() {
  var key = document.getElementById("key").value;
  var file = document.getElementById("file").value;
  try {
    encrypted = CryptoJS.AES.encrypt(file, key);
    document.getElementById("encrypted").innerHTML = encrypted.toString();
  } catch (e) {
    alert("Error Encrypting try again.");
  }
}

//decrypt function using cryptoJS
function decrypt() {
  var key = document.getElementById("key").value;
  var file = document.getElementById("file").value;
  try {
    decrypted = CryptoJS.AES.decrypt(file, key);

    if(decrypted.toString(CryptoJS.enc.Utf8) == "") {
      alert("Wrong key, try again.");
    }

    document.getElementById("decrypted").innerHTML = decrypted.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    document.getElementById("decrypted").innerHTML = "Incorrect key";
  }
}

//function to encrypt a file with cryptojs
function encryptFile() {
  var file = document.getElementById("file").files[0];
  var key = document.getElementById("key").value;
  var reader = new FileReader();
  reader.onload = function (e) {
    var fileData = e.target.result;
    var encrypted = CryptoJS.AES.encrypt(fileData, key);
    var blob = new Blob([encrypted], {type: "text/plain"});
    var link = document.getElementById("download");
    link.setAttribute("href", window.URL.createObjectURL(blob));
    link.href = window.URL.createObjectURL(blob);
    link.download = file.name + ".encrypted";
    link.click();
  }
}

//function to decrypt a file with cryptojs
function decryptFile() {
  var file = document.getElementById("file").files[0];
  var key = document.getElementById("key").value;
  var reader = new FileReader();
  reader.onload = function (e) {
    var fileData = e.target.result;
    var decrypted = CryptoJS.AES.decrypt(fileData, key);
    var blob = new Blob([decrypted], {type: "text/plain"});
    var link = document.getElementById("download");
    link.href = window.URL.createObjectURL(blob);
    link.download = file.name;
    link.click();
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
  var inputFilled = false;
  if(key == "" || file == "") {
    inputFilled = false;
  } else {
    inputFilled = true;
  }
  return inputFilled;
}

