//Used for the loading local data into and saving the keys into storage as array
var keysArray = [];
var encryptedFileLinks = [];
var currentLink = window.location.href;
var pages;
var currentPage = 1;
var maxItemsOnPage = 6;


if(currentLink.includes("keys")) {
  window.onload = function () {
    createTable();
    if(keysArray.length > maxItemsOnPage) {
      pageControl();
    }
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

function pageControl(){
  //do control for page here but call this function after the create table function
  //Implement a table row with buttons for the amount of pages that there is, it will have to be dynamic.

  var table = document.getElementById("tableBody");
  var row = table.insertRow(maxItemsOnPage);
  row.setAttribute("id", "pageRow");

  for(let i = 0; i < pages.length; i++) {
    var cell = row.insertCell(i);

    //setting the first page to active
    if(i == 0) {
      cell.setAttribute("class", "col-1 page-item active btn btn-outline-primary");
    }
    else{
      cell.setAttribute("class", "col-1 page-item btn btn-outline-primary");
    }

    cell.setAttribute("id", "pageBtn" + i);
    cell.setAttribute("name", "pageBtn");
    cell.innerHTML = pages[i];
  }

  //This function is used to change the page when the user clicks on the page button
  document.getElementsByName("pageBtn").forEach(function (element) {
    element.addEventListener("click", function () {
      pageId = element.getAttribute("id");
      var pageNumber = pageId.replace("pageBtn", "");

      //Increment page number to get the correct index
      pageNumber++;
      currentPage = pageNumber;
      clearTable();
      createTable();

      //This is used to change the active page button
      var currentClass = element.getAttribute("class");
      currentClass = currentClass + " active";
      element.setAttribute("class", currentClass);

      //Search other buttons and remove active class
      document.getElementsByName("pageBtn").forEach(function (element) {
        if(element.getAttribute("id") != pageId) {
          var currentClass = element.getAttribute("class");
          currentClass = currentClass.replace(" active", "");
          element.setAttribute("class", currentClass);
        }
      });
    });
  });
}

function initPageCount()
{
  var pageCount = keysArray.length / maxItemsOnPage;
  pageCount = Math.ceil(pageCount);
  var page = new Array(pageCount);
  for (let i = 0; i < page.length; i++) {
    page[i] = i + 1;
  }
  pages = page;
}

function clearTable()
{
  var table = document.getElementById("tableBody");
  for (let i = table.rows.length - 1; i >= 0; i--) {
    if(table.rows[i].getAttribute("id") != "pageRow") {
      table.deleteRow(i);
    }
  }
}

function setupArrayForPageContent()
{
  var items = [];
  var pageCount = keysArray.length / maxItemsOnPage;
  pageCount = Math.ceil(pageCount);

  for(let i = 0; i < pageCount; i++) {
    items[i] = [];

    for(let j = 0; j < maxItemsOnPage; j++) {
      if(keysArray[j] != null) {
        items[i][j] = keysArray[j];
      }
    }
    keysArray.splice(0, maxItemsOnPage);
  }
  initLocalStorageArray();
  return items;
}

//This function will draw the table and list contents dynamically
function createTable() {
  var table = document.getElementById("tableBody");
  keysArray = JSON.parse(localStorage.getItem("keys"));

  if(keysArray != null) {
    //Setting up the page count and content for the page
    initPageCount();
    var pageContent = setupArrayForPageContent();


    document.getElementById("nokeys").hidden = true;
    document.getElementById("clearKeysBtn").hidden = false;

    //This loop will draw the table
    for (let i = 0; i <= pageContent[currentPage-1].length - 1; i++) {
      var row = table.insertRow(i);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      row.setAttribute("class", "row ps-3");


      //This is needed to draw the correct borders
      //IF last row
      if (i == pageContent[currentPage-1].length - 1) {
        cell1.setAttribute("class", "col-5 me-4 overflow-hidden keysElement keysElementEnd");
        cell2.setAttribute("class", "col-5 overflow-hidden keysElement keysElementEnd");
        cell1.setAttribute("name", "fileElement");
        cell2.setAttribute("name", "copyElement");
        var delCell = row.insertCell(2);
        delCell.setAttribute("class", "col-1 keyDelElement keysElementEnd");
        delCell.setAttribute("name", "delElement");
        delCell.innerHTML = "X";
      }
      //Else not last cell for that page
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

      cell1.innerHTML = pageContent[currentPage-1][i].files;
      cell2.innerHTML = pageContent[currentPage-1][i].keys;
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
    //End
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
  if(file.includes(".encrypted")) {
    return;
  }
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




