function checkLink() {
    var currentLink = window.location.href;
    var nextButton = document.getElementsByName("next")[0];
    nextButton.onclick = function() {
      alert("Current link is: " + currentLink);
    }
}
