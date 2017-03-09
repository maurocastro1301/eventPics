
$(window).load(function() {
	$(".loader").fadeOut("slow");

})
    var guestbook_maxId=0;
		var maxId;
    var idPhoto;

/*Inicio Document ready*/
    $(document).ready(function() {

        document.addEventListener("deviceready",onDeviceReady,false);


    function onDeviceReady() {

       pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        StatusBar.overlaysWebView(false);

    }

	countdown_fill();
		get_photos();
		guestbook_select();


		setInterval(function() {
			reload_photo();
		  guestbook_select();
		}, 60 * 1000);

    });
		/*Fin document ready*/

function img_error(image){
	image.onerror = null;
     setTimeout(function (){
         image.src += '?' + +new Date;
      }, 1000);
}


function get_photos(){
	var url = "http://mncphonegap.esy.es/phpmysql/photo.php?event_id="+localStorage.event_id;
	/*var url = "http://mncphonegap.esy.es/phpmysql/photo.php";*/
	$.getJSON(url, function(result) {
			console.log(result);
			$.each(result, function(i, field) {
					var id = field.id;
					var url = field.url;
					var thumbnail = field.thumbnail;
					maxId  = field.id;

$("#grid").prepend("<div class='home w5'><a href='#page-content' id='"+id+"' onClick='reply_click(this.id)'><img src='"+thumbnail+"' onerror='img_error(this)'></a></div>");
			});
	});

	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth();
	var curr_year = d.getFullYear();
	var curr_hour = addZero(d.getHours());
	var curr_min = addZero(d.getMinutes());
	var curr_sec = addZero(d.getSeconds());

document.getElementById('last_refresh_feed').innerHTML = "Última actualización: "+ curr_date + "/" + curr_month + "/" + curr_year+ " "+ curr_hour +":"+curr_min+":"+curr_sec;

}

		function countdown_fill(){
			document.getElementById('bio-img').src= localStorage.event_bio_img;
			$("#bio-content").append(localStorage.event_bio_html);

			var countDownDate = new Date(localStorage.event_date).getTime();
			// Update the count down every 1 second
			var x = setInterval(function() {
			    // Get todays date and time
			    var now = new Date().getTime();
			    // Find the distance between now an the count down date
			    var distance = countDownDate - now;
			    // Time calculations for days, hours, minutes and seconds
			    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			    // Output the result in an element with id="demo"
			    document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
			    + minutes + "m " + seconds + "s ";
			    // If the count down is over, write some text
			    if (distance < 0) {
			        clearInterval(x);
			        document.getElementById("countdown").innerHTML = localStorage.event_countdown_message;
			    }
			}, 1000);
		}

		function guestbook_select(){

			var url = "http://mncphonegap.esy.es/phpmysql/guestbook_select.php?event_id="+localStorage.event_id+"&max_id="+guestbook_maxId;
			$.getJSON(url, function(result) {
					console.log(result);
					$.each(result, function(i, field) {
						var guestbook_id = field.id;
							var guestbook_date = field.date;
							var guestbook_comment = field.comment;
							var guestbook_user_name = field.name;
							var guestbook_user_surname = field.surname;
							guestbook_maxId  = guestbook_id;

$("#guestbook_div").prepend("<p><strong>"+guestbook_user_name+" "+guestbook_user_surname+": </strong>"+ guestbook_comment+" ("+guestbook_date+")</p>");
					});
			});
			var d = new Date();
			var curr_date = d.getDate();
			var curr_month = d.getMonth();
			var curr_year = d.getFullYear();
			var curr_hour = addZero(d.getHours());
			var curr_min = addZero(d.getMinutes());
			var curr_sec = addZero(d.getSeconds());

			document.getElementById('last_refresh_guestbook').innerHTML = "Última Actualización: "+ curr_date + "/" + curr_month + "/" + curr_year+ " "+ curr_hour +":"+curr_min+":"+curr_sec;

		}

		$(document).on("pageshow","#page-feed",function(){
		   document.getElementById('title_feed').innerHTML = localStorage.event_title;
		});

		$(document).on("pageshow","#page-bio",function(){
		   document.getElementById('title_bio').innerHTML = localStorage.event_title;
		});

		$(document).on("pageshow","#page-guestbook",function(){
		   document.getElementById('title_guestbook').innerHTML = localStorage.event_title;
		});


function reply_click(clicked_id)
{
    idPhoto= clicked_id;
}

$(document).on('pagebeforeshow', '#page-content', function(){
 document.getElementById("contenido").innerHTML="<div class='loader'></div>"

        var url = "http://mncphonegap.esy.es/phpmysql/photoById.php?photo_id="+ idPhoto;
        $.getJSON(url, function(result) {
            console.log(result);
            $.each(result, function(i, field) {
                var id = field.id;
                var url = field.url;
                //var thumbnail = field.thumbnail;
                var user  = field.user_name + " " +field.user_surname;
				var fecha = field.datecreate;;
				var descripcion = field.descripcion;
                maxId  = field.id;

                if (descripcion == null){
                    var descripcion = "";
                }

 document.getElementById("contenido").innerHTML= "<div class='photo-box'>"+
                "<div class='image-wrap'>"+
                     "<div class='user'>Creado por: "+ user + " </div>"+
                     "<center><img src='"+ url + "'></center>"+
                "</div>"+
                "<div class='description'>"+ descripcion+
                    "<div class='dateCustom'>Publicado: "+ fecha +"</div>"+
                "</div>"+
            "</div>";

            });
        });
});



$(document).on('click', '#reload_button', function() {
reload_photo();
 });


 $(document).on('click', '#reload_button_guestbook', function() {
 guestbook_select();
  });


function reload_photo(){
	var url = "http://mncphonegap.esy.es/phpmysql/photoId.php?photo_id="+ maxId+"&event_id="+localStorage.event_id;
	$.getJSON(url, function(result) {
			console.log(result);
			$.each(result, function(i, field) {
					var id = field.id;
					var url = field.url;
					var thumbnail = field.thumbnail;
					maxId  = field.id;
$("#grid").prepend("<div class='home w5'><a href='#page-content' id='"+id+"' onClick='reply_click(this.id)'><img src='"+thumbnail+"'></a></div>");
			});
	});

var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth();
var curr_year = d.getFullYear();
var curr_hour = addZero(d.getHours());
var curr_min = addZero(d.getMinutes());
var curr_sec = addZero(d.getSeconds());

document.getElementById('last_refresh_feed').innerHTML = "Última Actualización: "+ curr_date + "/" + curr_month + "/" + curr_year+ " "+ curr_hour +":"+curr_min+":"+curr_sec;

	}

	function addZero(i) {
	    if (i < 10) {
	        i = "0" + i;
	    }
	    return i;
	}


	function locationPage() {
	//window.location.href = "Photoswipe/photoswipe.html"
	window.location.href = "camera.html"
}

$(document).on('click', '#test', function() {
 //swal("OOK", "", "success");
window.location.href = "#page-feed";
 });

 $(document).on('click', '#button_page1', function() {
window.location.href = "#page-bio";
 });

 $(document).on('click', '#leftpanel_button', function() {
	var bio_title = document.getElementById("title_leftpanel");
	bio_title.innerHTML = localStorage.user_name + " " + localStorage.user_surname;
 });

 $(document).on('click', '#leftpanel_button_guestbook', function() {
	var guestbook_title = document.getElementById("title_leftpanel_guestbook");
	guestbook_title.innerHTML = localStorage.user_name + " " + localStorage.user_surname;
 });

 $(document).on('click', '#leftpanel_button_feed', function() {
 var feed_title = document.getElementById("title_leftpanel_feed");
 feed_title.innerHTML = localStorage.user_name + " " + localStorage.user_surname;
 });

  $(document).on('click', '#cerrar_sesion', function() {
		localStorage.login="false";
		localStorage.email_user="";
		localStorage.user_id="";
		localStorage.user_name="";
		localStorage.user_surname="";
		localStorage.event_id="";
		localStorage.event_code="";
		localStorage.event_date="";
		localStorage.event_bio_html="";
		localStorage.event_bio_img="";
		localStorage.event_title="";
 	window.location.href = "index.html";

  });


$(document).on('click', '#button_page2', function() {
window.location.href = "#page-feed";
 });

 $(document).on('click', '#button_page3', function() {
 window.location.href = "#page-guestbook";
  });




$(document).on('click', '#camera_button', function() {
    //swal("Camera", "", "success");
navigator.camera.getPicture(onPhotoURISuccess, onFail, {
          targetWidth: 1200,
        targetHeight: 1200,
         allowEdit : true,
          quality: 90,
          correctOrientation: 1
        });
 });


	  function onPhotoURISuccess(imageURI) {

		window.location.href = "#page-camera";

      var largeImage = document.getElementById('smallImage');

      largeImage.style.display = 'block';

      largeImage.src = imageURI;

//var mauro = document.getElementById("smallImage").src;
//alert(mauro.substr(mauro.lastIndexOf('/') + 1));

//	  document.getElementById('tomarfoto').style.display = 'none';
//	  document.getElementById('galeria').style.display = 'none';
	  document.getElementById('subirfoto').style.display = 'block';
    }

		$(document).on('click', '#guardar_mensaje', function() {
			var mensaje_guestbook=encodeURIComponent($("#comentario_txt").val());

		//	mensaje_guestbook= encodeURIComponent(mensaje_guestbook);

			if($.trim(mensaje_guestbook).length>0){
				var dataString="mensaje_guestbook="+mensaje_guestbook+"&user_id="+localStorage.user_id+"&event_id="+localStorage.event_id+"&guestbook=";

				$.ajax({
				type: "POST",
				url: "http://mncphonegap.esy.es/phpmysql/guestbook_insert.php",
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function(){
					$.mobile.loading( "show", {
				             text: "Procesando",
				             textVisible: true,
				             theme: "a",
				             html: ""
				     });
				 },
				success: function(data){
				if(data=="success")
				{
					$.mobile.loading("hide");
				swal("Mensaje Guardado Correctamente", "", "success");
				window.location.href = "#page-guestbook";
				localStorage.guestbook_add="true";
				document.getElementById('guestbook_add_button').href= "#";
				guestbook_select();
				}else{
					$.mobile.loading("hide");
				swal("Oops...", "Surgió un error al intentar guardar el Mensaje", "error");
				}
			}

				});

			}else{
				swal("Oops...", "Debe Ingresar un Mensaje", "error");
			}


		});


		$(document).on('click', '#guestbook_add_button', function() {
		if (localStorage.guestbook_add == "true"){
			swal("", "Ya ingreso un comentario", "warning");
			//window.location.href = "#page-guestbook";
		}else
			window.location.href = "#page-guestbook-add";

		 });
