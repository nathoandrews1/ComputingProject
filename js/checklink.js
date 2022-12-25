var currentLink = window.location.href;

var homeButton = document.getElementsByName("index")[0];
var vaultButton = document.getElementsByName("vault")[0];
var keysButton = document.getElementsByName("keys")[0];
var encryptButton = document.getElementsByName("encrypt")[0];

window.onload = function(event) {
  if(currentLink.includes("index")) {
    homeButton.setAttribute("class","page-item active")
  }
  if(currentLink.includes("vault")) {
    vaultButton.setAttribute("class","page-item active")
  }
  if(currentLink.includes("keys")) {
    keysButton.setAttribute("class","page-item active")
  }
  if(currentLink.includes("encrypt")) {
    encryptButton.setAttribute("class","page-item active")
  }
}



