const socket = io();
var receiver_id="";
socket.emit('user_id', window.localStorage.getItem('user_id'));
$.ajax({
	url: API+"/chat/getusers",
	type: "GET",
	dataType: "json",
	success:function(data){
		if(data.success){
			// console.log(data.data);
		  $("#contacts ul").empty();
		  var id_count=1;
		  data.data.forEach(element => {
			  if(element._id!=window.localStorage.getItem('user_id')){

				  var html ='<li class="contact" id="user_count_'+id_count+'" onclick=getchatdet("'+element._id+'","'+element.name+'");>';
				  html+=' <div class="wrap">';
				  html+=' <span class="contact-status online"></span>';
				  html+=' <img src="/assets/images/male-user.png" alt="" />';
				  html+=' <div class="meta">';
				  html+=' <p class="name">'+element.name+'</p>';
				  html+=' <p class="preview">You just got LITT up, Mike.</p>';
				  html+=' </div>';
				  html+=' </div>';
				  html+=' </li';
				  $("#contacts ul").append(html);
			  }
			  id_count++;
		  });
		 
	
		  // $('form#register-form')[0].reset();
		  $("#user_count_1").trigger('click');
		}
	}
});
$(".messages").animate({ scrollTop: $(document).height() }, "fast");

$("#profile-img").click(function() {
	$("#status-options").toggleClass("active");
});

$(".expand-button").click(function() {
  $("#profile").toggleClass("expanded");
	$("#contacts").toggleClass("expanded");
});

$("#status-options ul li").click(function() {
	$("#profile-img").removeClass();
	$("#status-online").removeClass("active");
	$("#status-away").removeClass("active");
	$("#status-busy").removeClass("active");
	$("#status-offline").removeClass("active");
	$(this).addClass("active");
	
	if($("#status-online").hasClass("active")) {
		$("#profile-img").addClass("online");
	} else if ($("#status-away").hasClass("active")) {
		$("#profile-img").addClass("away");
	} else if ($("#status-busy").hasClass("active")) {
		$("#profile-img").addClass("busy");
	} else if ($("#status-offline").hasClass("active")) {
		$("#profile-img").addClass("offline");
	} else {
		$("#profile-img").removeClass();
	};
	
	$("#status-options").removeClass("active");
});

function newMessage() {
	message = $(".message-input input").val();
	if($.trim(message) == '') {
		return false;
	}else{
		var send_data={};
		send_data.sender_id=window.localStorage.getItem('user_id');
		send_data.receiver_id=receiver_id;
		send_data.message=message;
		send_data.attach_file="";
		send_data.content_type="type/text";
		socket.emit('send_message',send_data);
	}
	socket.on('r_send_msg',function(msg){
		if(window.localStorage.getItem('user_id')==msg.sender_id){
			$('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + msg.message + '</p></li>').appendTo($('.messages ul'));
			$('.message-input input').val(null);
			$('.contact.active .preview').html('<span>You: </span>' + message);
			
		}else{
			$('<li class="replies"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + msg.message + '</p></li>').appendTo($('.messages ul'));

		}
	})
	$(".messages").animate({ scrollTop: $(document).height() }, "fast");
};

$('.submit').click(function(){
  newMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    newMessage();
    return false;
  }
});

function getchatdet(id,name){
	receiver_id=id;
	// console.log(receiver_id,name);
	$.ajax({
		url: API+"/chat/conversation",
		type: "POST",
		data:{receiver_id:receiver_id,sender_id:window.localStorage.getItem('user_id')},
		dataType: "json",
		success:function(data){
			if(data.success){
				var det=data.data;
				$(".messages ul").empty();
				$(".contact-profile p").text(name);

				det.forEach(dt => {
					// console.log(dt);
					conv_ui(dt);
				});
			}else{
				$(".messages ul").empty();
				conv_ui(false);
			}
		}
	});

			  
			  
	// console.log(id);
}
function conv_ui(data){
	// console.log(data);
	var html='';
	if(data){
		// console.log('one');
		if(data.sender_id==window.localStorage.getItem('user_id')){
			html+='<li class="sent">';
			html+='<img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />';
			html+='<p>'+data.message+'</p>';
			html+='</li>';
	
		}else{
			html+='<li class="replies">';
			html+='<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />';
			html+='<p>'+data.message+'</p>';
			html+='</li>';
	
		}
		
	}else{

		html+='<li class="sent text-center">';
			html+='<p class="text-center"> Not Chated Yet</p>';
			html+='</li>';
	}
	$(".messages ul").append(html);
}