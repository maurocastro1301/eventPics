 document.addEventListener("deviceready",onDeviceReady,false);
  
  
    // PhoneGap is ready to be used!
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
	
    }
 
 function getImage() {
 navigator.camera.getPicture(uploadPhoto, function(message) {
 //alert('get picture failed');
 }, {
 quality: 100,
 destinationType: navigator.camera.DestinationType.FILE_URI,
 sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
 });
}


function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
	 //  alert('Capturar Foto');
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 85, correctOrientation: 1});
	 
	  var options = {

      /*  quality: 50,

        destinationType: Camera.DestinationType.DATA_URL,

        sourceType: Camera.PictureSourceType.CAMERA,

        allowEdit: false,

        encodingType: Camera.EncodingType.JPEG,

        targetWidth: 500,

        targetHeight: 500,

        popoverOptions: CameraPopoverOptions,

        saveToPhotoAlbum: false*/
	
      };
	  /*
	  navigator.camera.getPicture(onPhotoURISuccess, onFail, { 
	  quality: 95,
  correctOrientation: 1
	  });*/
	  
	 
    }


	  function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);
      // Get image handle
      //
	  
	 // alert('onPhotoURISuccess');
	  
      var largeImage = document.getElementById('smallImage');
      // Unhide image elements
      //
      largeImage.style.display = 'block';
      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
	  
	  document.getElementById('tomarfoto').style.display = 'none';
	  document.getElementById('galeria').style.display = 'none';
	  document.getElementById('subirfoto').style.display = 'block';
	  
	  
    }
  

function onFail(message) {
      //alert('Failed because: ' + message);
    }


function test() {
     
	$.mobile.loading( "show", {
            text: "Procesando",
            textVisible: true,
            theme: "a",
            html: ""
    });
	 
	}
	
	
function uploadPhotoPreview() {

 
 $.mobile.loading( "show", {
            text: "Procesando",
            textVisible: true,
            theme: "a",
            html: ""
    });
	
var imageURI = document.getElementById("smallImage").src;

//document.getElementById('smallImage').style.display = 'none';

 var options = new FileUploadOptions();
 options.fileKey = "file";
 options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
 options.mimeType = "image/jpeg";
 console.log(options.fileName);
 var params = new Object();
 params.value1 = "test";
 params.value2 = "param";
 options.params = params;
 options.chunkedMode = false;

var ft = new FileTransfer();
 ft.upload(imageURI, "http://mncphonegap.esy.es/phpmysql/upload_new.php?event_id="+localStorage.event_id+"&user_id="+localStorage.user_id, function(result){
 console.log(JSON.stringify(result));
  $.mobile.loading("hide");
  
swal("Foto Subida Correctamente", "", "success");
 }, function(error){
 $.mobile.loading("hide");
 //alert('Failed because: ' + error);
 console.log(JSON.stringify(error));
 }, options);
 }

function uploadPhoto(imageURI) {

$.mobile.loading( "show", {
            text: "Procesando",
            textVisible: true,
            theme: "a",
            html: ""
    });
 
 var options = new FileUploadOptions();
 options.fileKey = "file";
 options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
 options.mimeType = "image/jpeg";
 console.log(options.fileName);
 var params = new Object();
 params.value1 = "test";
 params.value2 = "param";
 options.params = params;
 options.chunkedMode = false;

var ft = new FileTransfer();

 ft.upload(imageURI, "http://mncphonegap.esy.es/phpmysql/upload_new.php?event_id="+localStorage.event_id+"&user_id="+localStorage.user_id, function(result){
 console.log(JSON.stringify(result));
 $.mobile.loading("hide");
swal("Foto Subida Correctamente", "", "success");
 }, function(error){
$.mobile.loading("hide");
 // alert('Failed because: ' + error);
 console.log(JSON.stringify(error));
 }, options);
 }