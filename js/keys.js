//Used for the loading local data into and saving the keys into storage as array
var keysArray = [];
var encryptedFileLinks = [];
var currentLink = window.location.href;


if(currentLink.includes("keys")) {
  window.onload = function () {
    createTable();

    //This function runs before the above createTable function
    if(document.readyState === 'interactive') {
      document.getElementById("download").hidden = true;
      document.getElementById("clearKeysBtn").hidden = true;
      document.getElementById("nokeys").hidden = true;
    }
  }
}

//Button Events Start
if(document.getElementById("clearKeysBtn")) {
  document.getElementById("clearKeysBtn").onclick = function () {
    clearStorage();
    refreshPage();
  }
}

//This functions detects if the user is on the encrypt page, then adding file to storage.
if(document.getElementById("encryptBtn")) {
  document.getElementById("encryptBtn").addEventListener("click", function () {
    var key = document.getElementById("key").value;
    var file = document.getElementById("file").value;
    var newFile = file.replace("C:\\fakepath\\", "");
    saveLocalStorageEncryptBtn(key, newFile);
  });
}
//Button Events End

function clearStorage() {
  localStorage.clear();
}

//This function will draw the table and list contents dynamically
function createTable() {
  var table = document.getElementById("tableBody");
  keysArray = JSON.parse(localStorage.getItem("keys"));

  if(keysArray != null) {
    document.getElementById("nokeys").hidden = true;
    document.getElementById("clearKeysBtn").hidden = false;
    for (let i = 0; i <= keysArray.length - 1; i++) {
      var row = table.insertRow(i);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      row.setAttribute("class", "row ps-3");


      //This loop is need to draw the correct borders
    //if first row
      if (i == keysArray.length - 1) {
        cell1.setAttribute("class", "col-5 me-4 overflow-hidden keysElement keysElementEnd");
        cell2.setAttribute("class", "col-5 overflow-hidden keysElement keysElementEnd");
        cell1.setAttribute("name", "fileElement");
        cell2.setAttribute("name", "copyElement");
        var delCell = row.insertCell(2);
        delCell.setAttribute("class", "col-1 keyDelElement keysElementEnd");
        delCell.setAttribute("name", "delElement");
        delCell.innerHTML = "X";
      }
      //Else cell is the last cell
      else {
        cell1.setAttribute("class", "col-5 me-4 overflow-hidden keysElement");
        cell2.setAttribute("class", "col-5 overflow-hidden keysElement");
        cell1.setAttribute("name", "fileElement");
        cell2.setAttribute("name", "copyElement");

        //Adding cell to end of row for deletion of data.
        var delCell = row.insertCell(2);
        delCell.setAttribute("class", "col-1 keyDelElement");
        delCell.setAttribute("name", "delElement");
        delCell.innerHTML = "X";
      }

      cell1.innerHTML = keysArray[i].files;
      cell2.innerHTML = keysArray[i].keys;
    }

    //Adding event listeners to copy buttons
    document.getElementsByName("copyElement").forEach(function (element) {
      element.addEventListener("click", function () {
        var copyText = element.innerHTML;
        navigator.clipboard.writeText(copyText);
        element.innerHTML = "Copied!";
        setInterval(function () {
          element.innerHTML = copyText;
        }, 1500);
      });
    });

    //Adding event listeners file element to download encrypted file
    document.getElementsByName("fileElement").forEach(function (element) {
      element.addEventListener("click", function () {
        loadFile(element.innerHTML);
      });
    });


    //Adding delete onclick function for delCell above to delete
    document.getElementsByName("delElement").forEach(function (element) {
      element.addEventListener("click", function () {
        var row = element.parentNode;
        var index = row.rowIndex;
        keysArray.splice(index - 1, 1);
        localStorage.setItem("keys", JSON.stringify(keysArray));
        row.remove();
        refreshPage();

        if(keysArray.length <= 0) {
          localStorage.clear();
        }
      });
    });
  }
  //if there is no keys in storage do below
  else {
    document.getElementById("nokeys").hidden = false;
    document.getElementById("clearKeysBtn").hidden = true;
  }
}
//end of display

function saveLocalStorage()
{
  var key = document.getElementById("keyinput").value;
  var file = document.getElementById("fileinput").value;
  initLocalStorageArray();
  if(key != "" && file != "")
  {
    var newKey = {'keys': key, 'files': file};
    keysArray.push(newKey);
    localStorage.setItem("keys", JSON.stringify(keysArray));
  }
}

function saveLocalStorageEncryptBtn(key, file)
{
  initLocalStorageArray();
  if(key != "" && file != "") {
    var newKey = {'keys': key, 'files': file};
    keysArray.push(newKey);
    localStorage.setItem("keys", JSON.stringify(keysArray));
  }
}

function initLocalStorageArray()
{
  keysArray = JSON.parse(localStorage.getItem("keys"));
  if(keysArray == null) {
    keysArray = [];
  }
}

//This function is used to load elements above in the table when the user clicks on the file name
function loadFile(fileName)
{
  var url = localStorage.getItem(fileName);
  var link = document.getElementById("download");
  link.setAttribute("href", "data:application/octet-stream," + url);
  link.setAttribute("download", fileName + ".encrypted");
  link.click();
}

function refreshPage()
{
  window.open(currentLink, "_self");
}




