var msgEncrypHelp = "Type a message into the message box and enter a password and click aesEncrypt, the generated encrypted message will be displayed in the encrypted message box that will appear.<br><br>";
var msgDecryptHelp = "Paste an encrypted message hash into the encrypted message box and enter the password used to aesEncrypt the message and click decrypt, the decrypted message will be displayed in the decrypted message box that will appear.<br><br>";
var encryptedFileHelpMsg = "Click choose file and select the file from your system you want to aesEncrypt. Next enter a key and click aesEncrypt.<br><br>If the file is less than 5mb it will be stored in the vault and available for download. If the file is greater than 5mb it will be downloaded to your system." +
  "<br><br>Your encrypted file will have a .encrypted file type";
var decryptedMsgHelp = "Choose an encrypted file from your system, enter the key and click decrypt. A download will begin for the file if the key is correct.<br><br>";
var otherDecryptMessage = "This is meant to show visually how encryption works. Encryption completely hides the original item. For more practical use of encrypting messages, save text to a file and aesEncrypt the file. This will allow you to decrypt the file later and view the original text.";
var publicKeyEncryptionMsg = "To use we first generate a key pair. This will download a public and private key to your system. We can think of the public key as a way to lock but not unlock files. Share the public key (lock) with your friends. They can use the app and the key to aesEncrypt files and send them to you. You can then use the private key to decrypt the files. Keep the private key safe. This is the key that will unlock the files and as long as this key is not shared with anyone, your files will be safe.";
var privateKeyDecryptMessage = "To decrypt a file you need the private key that was generated alongside the public key. In the private key file input, select your private key. Then select the .enc file that was encrypted with the corresponding public key. If successful, the decrypted file will be downloaded to your system.";
+ "<br><br>";
var modalActive = false;

//Help button for encrpt page symmetric encryption
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

//Help button for message encryption
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

//Help button for the public private key page
$('#publicKeyHelpBtn').click(function ()
{
  if (modalActive == false)
  {
    modalActive = true;
    $('#modal-container').removeAttr('class').addClass('one');
    $('body').addClass('modal-active');
    $('<h2>').html("Public Key Encryption:").appendTo('#modalContent');
    $('<p>').html(publicKeyEncryptionMsg).appendTo('#modalContent').attr('id', 'marginMessage');

    $('<h2>').html("Private Key Decryption:").appendTo('#modalContent');
    $('<p>').html(privateKeyDecryptMessage).appendTo('#modalContent');

    createBlur();
  }
})

//Same as above but for the private key help button
$('#privateKeyHelpBtn').click(function ()
{
  if (modalActive == false)
  {
    modalActive = true;
    $('#modal-container').removeAttr('class').addClass('one');
    $('body').addClass('modal-active');
    $('<h2>').html("Public Key Encryption:").appendTo('#modalContent');
    $('<p>').html(publicKeyEncryptionMsg).appendTo('#modalContent').attr('id', 'marginMessage');

    $('<h2>').html("Private Key Decryption:").appendTo('#modalContent');
    $('<p>').html(privateKeyDecryptMessage).appendTo('#modalContent')

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
