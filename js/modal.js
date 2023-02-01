var msgEncrypHelp = "Type a message into the message box and enter a password and click encrypt, the generated encrypted message will be displayed in the encrypted message box that will appear.<br><br>";
var msgDecryptHelp = "Paste an encrypted message hash into the encrypted message box and enter the password used to encrypt the message and click decrypt, the decrypted message will be displayed in the decrypted message box that will appear.<br><br>";
var encryptedFileHelpMsg = "Click choose file and select the file from your system you want to encrypt. Next enter a key and click encrypt.<br><br>If the file is < 5mb it will be stored in the keys tab and available for download. If the file is > 5mb it will be downloaded to your system." +
  "<br><br>Your encrypted file will have a .encrypted file type";
var decryptedMsgHelp = "Choose an encrypted file from your system, enter the key and click decrypt. A download will begin for the file if the key is correct.";
var otherDecryptMessage = "This is meant to show visually how encryption works. Encryption completely hides the original item. For more practical use of encrypting messages, save text to a file and encrypt the file. This will allow you to decrypt the file later and view the original text.";
var modalActive = false;


$('#helpButton').click(function ()
{
  if (modalActive == false)
  {
    modalActive = true;
    $('#modal-container').removeAttr('class').addClass('one');
    $('body').addClass('modal-active');
    $('<h2>').html("File Encryption:").appendTo('#modalContent');
    $('<p>').html(encryptedFileHelpMsg).appendTo('#modalContent').attr('id', 'marginMessage');

    $('<h2>').html("File Decryption:").appendTo('#modalContent');
    $('<p>').html(decryptedMsgHelp).appendTo('#modalContent')

    createBlur();
  }
})

$('#helpButtonMsg').click(function () {
  if (modalActive == false)
  {
    modalActive = true;
    $('#modal-container').removeAttr('class').addClass('one');
    $('body').addClass('modal-active');
    $('<h2>').html("Message Encryption:").appendTo('#modalContent');
    $('<p>').html(msgEncrypHelp).appendTo('#modalContent')
    $('<h2>').html("Message Decryption:").appendTo('#modalContent');
    $('<p>').html(msgDecryptHelp).appendTo('#modalContent');
    $('<h2>').html("Message Info:").appendTo('#modalContent');
    $('<p>').html(otherDecryptMessage).appendTo('#modalContent');

    createBlur();
  }
})

$('#modal-container').click(function ()
{
  $(this).addClass('out');
  $('body').removeClass('modal-active');
  $('#modalBlur').removeClass('active');
  $('#modalBlur').remove();
  $('#modalContent').empty();
  modalActive = false;
});

function createBlur(){
  var blurDiv = $('<div>').attr('id', 'modalBlur');
  blurDiv.appendTo('#main');
  blurDiv.addClass('active');
}
