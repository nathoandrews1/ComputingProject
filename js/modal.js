var msgEncrypHelp = "Type a message into the message box and enter a password and click encrypt, the generated encrypted message will be displayed in the encrypted message box.";
var msgDecryptHelp = "Paste an encrypted message into the encrypted message box and enter the password used to encrypt the message and click decrypt, the decrypted message will be displayed in the decrypted message box.";
var encryptedFileHelpMsg = "Click choose file and select a file to encrypt or decrypt.\nNext enter a key and click encrypt";
var decryptedMsgHelp = "Select an encrypted file, enter the key and click decrypt. A download will begin for the deciphered file";
var modalActive = false;


$('#helpButton').click(function ()
{
  if (modalActive == false)
  {
    modalActive = true;
    $('#modal-container').removeAttr('class').addClass('one');
    $('body').addClass('modal-active');
    $('<h2>').text("File Encryption:").appendTo('#modalContent');
    $('<p>').text(encryptedFileHelpMsg).appendTo('#modalContent').attr('id', 'marginMessage');

    $('<h2>').text("File Decryption:").appendTo('#modalContent');
    $('<p>').text(decryptedMsgHelp).appendTo('#modalContent')
  }
})

$('#helpButtonMsg').click(function () {
  if (modalActive == false)
  {
    modalActive = true;
    $('#modal-container').removeAttr('class').addClass('one');
    $('body').addClass('modal-active');
    $('<h2>').text("Message Encryption:").appendTo('#modalContent');
    $('<p>').text(msgEncrypHelp).appendTo('#modalContent').addClass('mb-4')

    $('<h2>').text("Message Decryption:").appendTo('#modalContent');
    $('<p>').text(msgDecryptHelp).appendTo('#modalContent');
  }
})

$('#modal-container').click(function ()
{
  $(this).addClass('out');
  $('body').removeClass('modal-active');
  $('#modalContent').empty();
  modalActive = false;
});
