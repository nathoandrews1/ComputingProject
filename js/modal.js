var msgEncrypHelp = "Type a message into the message box and enter a password and click encrypt, the generated encrypted message will be displayed in the encrypted message box that will appear.<br><br>";
var msgDecryptHelp = "Paste an encrypted message hash into the encrypted message box and enter the password used to encrypt the message and click decrypt, the decrypted message will be displayed in the decrypted message box that will appear.<br><br>";
var encryptedFileHelpMsg = "Click choose file and select the file from your system you want to encrypt. Next enter a key and click encrypt.<br><br>If the file is < 5mb it will be stored in the vault and available for download. If the file is > 5mb it will be downloaded to your system." +
  "<br><br>Your encrypted file will have a .encrypted file type";
var aesEncryptUse = "To use all you have to do is have both people have the application, share the file to your friend along with your decryption key/password and they can decrypt the file";
var decryptedMsgHelp = "Choose an encrypted file from your system, enter the key and click decrypt. A download will begin for the file if the key is correct.<br><br>";
var otherDecryptMessage = "This is meant to show visually how encryption works. Encryption completely hides the original item. For more practical use of encrypting messages, save text to a file and encrypt the file. This will allow you to decrypt the file later and view the original text.";
var publicKeyEncryptionMsg = "To use public and private key encryption, we have to first generate a key pair. This will generate a public and private key files. The public key is used to encrypt and the private key is used to decrypt. The public key can be shared with anyone, but the private key should be kept secret. The private key is used to decrypt that which was encrypted with the public key. The public key is used to encrypt files that can only be decrypted with the private key."
var privateKeyDecryptMessage = "To decrypt a file that was encrypted with a public key, you must use the private key that was generated with the public key. The private key is used to decrypt that which was encrypted with the public key. The public key is used to encrypt files that can only be decrypted with the private key."
+ "<br><br>";
var publicKeyUsage = "First you generate a key pair. This will download a privateKey and publicKey file. Each user should keep their private key safe and secret. If you want to share files you can share the public key and ask the user to use the app and encrypt with that file. Then you can use your own private key to decrypt. Completely safe";
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

    $('<h2>').html("How to Use:").appendTo('#modalContent');
    $('<p>').html(aesEncryptUse).appendTo('#modalContent')

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

    $('<h2>').html("How to use:").appendTo('#modalContent');
    $('<p>').html(publicKeyUsage).appendTo('#modalContent');

    createBlur();
  }
})

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

    $('<h2>').html("How to use:").appendTo('#modalContent');
    $('<p>').html(publicKeyUsage).appendTo('#modalContent');

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
