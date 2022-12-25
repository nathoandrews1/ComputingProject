var keysArray = [];


if(currentLink.includes("keys")) {
  window.onload = function () {
    createTable();
    if(document.readyState === 'interactive') {
      document.getElementById("nokeys").hidden = true;
    }
  }
}


//Button Events Start
if(document.getElementById("load")) {
  document.getElementById("load").onclick = function () {
    if(keysArray == null) {
      alert("No keys to load");
    }
    else {
      getLink();
    }
  }
}

if(document.getElementById("save")) {
  document.getElementById("save").onclick = function () {
    saveLocalStorage();
  }
}

if(document.getElementById("clear")) {
  document.getElementById("clear").onclick = function () {
    clearStorage();
    alert("Storage cleared");
  }
}

if(document.getElementById("encryptBtn")) {
  document.getElementById("encryptBtn").addEventListener("click", function () {
    var key = document.getElementById("key").value;
    var file = document.getElementById("file").value;
    var newFile = file.replace("C:\\fakepath\\", "");
    saveLocalStorageEncryptBtn(key, newFile);
    getLink();
  });
}
//Button Events End

function clearStorage() {
  localStorage.clear();
}

function createTable() {
  var table = document.getElementById("tableBody");
  keysArray = JSON.parse(localStorage.getItem("keys"));

  if(keysArray != null) {
    document.getElementById("nokeys").hidden = true;
    for (let i = 0; i <= keysArray.length - 1; i++) {
      var row = table.insertRow(i);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      row.setAttribute("class","row ps-3");
      cell1.setAttribute("class", "col-6  overflow-hidden");
      cell2.setAttribute("class", "col-6 overflow-hidden");

      cell1.innerHTML = keysArray[i].files;
      cell2.innerHTML = keysArray[i].keys;
    }
  }
  else {
    document.getElementById("nokeys").hidden = false;
  }
}

function saveLocalStorage()
{
  var key = document.getElementById("keyinput").value;
  var file = document.getElementById("fileinput").value;
  loadLocalStorage();
  if(key != "" && file != "") {
    var newKey = {'keys': key, 'files': file};
    keysArray.push(newKey);
    localStorage.setItem("keys", JSON.stringify(keysArray));}
}

function saveLocalStorageEncryptBtn(key, file)
{
  loadLocalStorage();
  if(key != "" && file != "") {
    var newKey = {'keys': key, 'files': file};
    keysArray.push(newKey);
    localStorage.setItem("keys", JSON.stringify(keysArray));
  }
}

function loadLocalStorage()
{
  keysArray = JSON.parse(localStorage.getItem("keys"));
  if(keysArray == null) {
    keysArray = [];
  }
}

function getLink() {
  document.getElementById("download").addEventListener("click", function () {
    var file = document.getElementById("download").getAttribute("download");
  });

}
