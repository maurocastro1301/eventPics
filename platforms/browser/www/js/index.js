
 $(document).ready(function() {


 document.addEventListener("deviceready",onDeviceReady,false);

    function onDeviceReady() {

        StatusBar.overlaysWebView(false);
       // swal("onDeviceReady", "", "success");
    }


      });


function cameraPage() {
	//window.location.href = "Photoswipe/photoswipe.html"

	window.location.href = "camera.html"
}


 function Fedd() {
	//window.location.href = "Photoswipe/photoswipe.html"

	window.location.href = "gallery.html"
}

$(document).on('click', '#submit', function() {
$('#form1').validate({
    rules: {
        txtEmail: {
            required: true
        },
        txtPassword: {
            required: true
        }

    },
    messages: {
        txtEmail: {
            required: "Ingrese un Email Válido.",
			email : "Ingrese un Email Válido."
        },
        txtPassword: {
            required: "Ingrese una Contraseña."
        }

    },
    errorPlacement: function (error, element) {
        error.appendTo(element.parent().prev());
     // document.getElementById("submit").className="loginButton";
     // alert("ENTRO");

    },
submitHandler: function (form) {
var email=$("#email").val();
var password=$("#password").val();
var dataString="email="+email+"&password="+password+"&login=";
if($.trim(email).length>0 & $.trim(password).length>0)
{
$.ajax({
type: "POST",
url: "http://mncphonegap.esy.es/phpmysql/login.php",
data: dataString,
crossDomain: true,
cache: false,
beforeSend: function(){ $("#submit").html('Verificando...');},
success: function(data){
if(data=="failed")
{
swal("Oops...", "Login Incorrecto!!!", "error");
$("#submit").html('Login');
}else{

var obj = JSON.parse(data);
localStorage.login="true";
localStorage.email_user=obj[0].email;
localStorage.user_id=obj[0].id;
localStorage.user_name=obj[0].name;
localStorage.user_surname=obj[0].surname;
$("#submit").html('Login');



//window.location.href = "#page-event";

/* TODO  */

swal({
  title: "Unite a un Evento!",
  text: "Igrese el código de evento",
  type: "input",
  showCancelButton: true,
  closeOnConfirm: false,
  animation: "slide-from-top",
  showLoaderOnConfirm: true,
  inputPlaceholder: ""
},
function(inputValue){
  if (inputValue === false){

  document.getElementById('email').value="";
document.getElementById('password').value="";
clear_local_storage();

   return false;
   }
  if (inputValue === "") {
    swal.showInputError("Debe Ingresar un código de Evento");
    return false
  }

event(inputValue);

});

/* TODO  */


}


}
});
}return false;

}
});

});

$(document).on('click', '#signup', function() {
$('#form_register').validate({
    rules: {
        name_register : {
            required: true
        },
        surname_register: {
            required: true
        },
        email_register: {
            required: true
        },
        password_register: {
            required: true
        }

    },
    messages: {
        email_register: {
            required: "Ingrese un Email Válido.",
			email : "Ingrese un Email Válido."
        },
        password_register: {
            required: "Ingrese una Contraseña."
        },
        name_register :{
            required: "Ingrese un Nombre."
        },
        surname_register:{
            required: "Ingrese un Apellido."
        }

    },
    errorPlacement: function (error, element) {
        error.appendTo(element.parent().prev());

    },
    submitHandler: function (form) {


var name=$("#name_register").val();
var surname=$("#surname_register").val();
var email=$("#email_register").val();
var password=$("#password_register").val();
var dataString="name="+name+"&surname="+surname+"&email="+email+"&password="+password+"&signup=";

if($.trim(name).length>0 & $.trim(surname).length>0 & $.trim(email).length>0 & $.trim(password).length>0)
{
$.ajax({
type: "POST",
url: "http://mncphonegap.esy.es/phpmysql/signup.php",
data: dataString,
crossDomain: true,
cache: false,
beforeSend: function(){ $("#signup").val('Conectando...');},
success: function(data){

    //alert (data);
if(data=="success")
{

swal("Gracias por registrarte!", "Ya podés inicar sesión", "success");
window.location.href = "#page-signin";
}
else if(data="exist")
{
swal("Oops...", "El correo electrónico ya se encuentra registrado!", "error");
}
else if(data="failed")
{
swal("Oops...", "Algo Salio Mal", "error");
}
}
});
}return false;

}
});
});

$(document).on('click', '#event_submit', function() {
$('#form_event').validate({
    rules: {
        event_txt: {
            required: true
        }
    },
    messages: {
        event_txt: {
            required: "Ingrese código del evento."
        }

    },
    errorPlacement: function (error, element) {
        error.appendTo(element.parent().prev());

    },
    submitHandler: function (form) {

var event_code=$("#event_txt").val();

var dataString="event_code="+event_code+"&event=";
if($.trim(event_code).length>0)
{
$.ajax({
type: "POST",
url: "http://mncphonegap.esy.es/phpmysql/event.php",
data: dataString,
crossDomain: true,
cache: false,
beforeSend: function(){ $("#event_submit").html('Verificando...');},
success: function(data){
if(data=="failed")
{
//alert("Login error");
swal("Oops...", "Código de Evento Incorrecto", "error");

document.getElementById('email').value=" ";


$("#event_submit").html('Unirse');
}else{

var obj = JSON.parse(data);
localStorage.event_id=obj[0].id;
localStorage.event_code=obj[0].code;
window.location.href = "gallery.html";
}


}
});
}return false;

}
});

});

function event (inputValue){

//var event_code=$("#event_txt").val();
var event_code= inputValue;

var dataString="event_code="+event_code+"&event=";
if($.trim(event_code).length>0)
{
$.ajax({
type: "POST",
url: "http://mncphonegap.esy.es/phpmysql/event.php",
data: dataString,
crossDomain: true,
cache: false,
beforeSend: function(){ $("#event_submit").html('Verificando...');},
success: function(data){
if(data=="failed")
{
//alert("Login error");
swal("Oops...", "Código de Evento Incorrecto o inhabilitado", "error");

document.getElementById('email').value="";
document.getElementById('password').value="";
clear_local_storage();

$("#event_submit").html('Unirse');

}else{

var obj = JSON.parse(data);
localStorage.event_id=obj[0].id;
localStorage.event_code=obj[0].code;
localStorage.event_date=obj[0].date;
localStorage.event_bio_html=obj[0].bio_html;
localStorage.event_bio_img=obj[0].bio_img;
window.location.href = "gallery.html";
}
}
});
}return false;
}

function clear_local_storage(){

localStorage.login="false";
localStorage.email_user="";
localStorage.user_id="";
localStorage.user_name="";
localStorage.user_surname="";
}
