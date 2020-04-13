// Initialization
const socket = io.connect(window.location.href)
localStorage = window.localStorage;
// tabs stuff
search_selected = ""
main_selected=""
// toasts stuff
toastsWithId = {}
// track previews stuff
let preview_track = document.getElementById('preview-track')
let preview_stopped = true
let preview_max_volume;

preview_track.volume = 0
preview_max_volume = parseFloat(localStorage.getItem("previewVolume"))
if (preview_max_volume === null){
	preview_max_volume = 0.8
	localStorage.setItem("previewVolume", preview_max_volume)
}

function toast(msg, icon=null, dismiss=true, id=null){
	if (toastsWithId[id]){
		toastObj = toastsWithId[id]
		toastDOM = $(`div.toastify[toast_id=${id}]`)
		if (msg){
			toastDOM.find(".toast-message").html(msg)
		}
		if (icon){
			if (icon=='loading')
				icon = `<div class="circle-loader"></div>`
			else
				icon = `<i class="material-icons">${icon}</i>`
			toastDOM.find(".toast-icon").html(icon)
		}
		if (dismiss !== null && dismiss){
			setTimeout(function(){
				toastObj.hideToast()
				delete toastsWithId[id]
			}, 3000);
		}
	}else{
		if (icon == null)
			icon = ""
		else if (icon=='loading')
			icon = `<div class="circle-loader"></div>`
		else
			icon = `<i class="material-icons">${icon}</i>`
		toastObj = Toastify({
			text: `<span class="toast-icon">${icon}</span><span class="toast-message">${msg}</toast>`,
			duration: dismiss ? 3000 : 0,
			gravity: 'bottom',
			position: 'left'
		}).showToast()
		if (id){
			toastsWithId[id] = toastObj
			$(toastObj.toastElement).attr('toast_id', id)
		}
	}
}

socket.on("toast", (data)=>{
	toast(data.msg, data.icon || null, data.dismiss !== undefined ? data.dismiss : true, data.id || null)
})

socket.on("updateToast", (data)=>{
	toast(data.msg, data.icon || null, data.dismiss !== undefined ? data.dismiss : true, data.id || null)
})

window.addEventListener('pywebviewready', function() {
	$('#open_login_prompt').prop('disabled', false);
})

$(function(){
	socket.emit("init");
	if (localStorage.getItem("arl")){
		socket.emit("login", localStorage.getItem("arl"));
		$("#login_input_arl").val(localStorage.getItem("arl"))
	}
	// Check if download tab should be open
	if (eval(localStorage.getItem("downloadTabOpen")))
		$("#show_download_tab").click()
	else
		$("#hide_download_tab").click()

	// Open default tab
	document.getElementById("main_home_tablink").click();
})

// Show/Hide Download Tab
document.querySelector("#show_download_tab").onclick = (ev)=>{
	ev.preventDefault();
	document.querySelector("#download_tab_bar").style.display = "none";
	document.querySelector("#download_tab").style.display = "block";
	localStorage.setItem("downloadTabOpen", true)
}
document.querySelector("#hide_download_tab").onclick = (ev)=>{
	ev.preventDefault();
	document.querySelector("#download_tab_bar").style.display = "block";
	document.querySelector("#download_tab").style.display = "none";
	localStorage.setItem("downloadTabOpen", false)
}

// Login stuff
function openLoginPrompt(){
	socket.emit("loginpage")
}

function loginButton(){
	let arl = document.querySelector("#login_input_arl").value
	if (arl != "" && arl != localStorage.getItem("arl")){
		socket.emit("login", arl, true)
	}
}

function copyARLtoClipboard(){
	$("#login_input_arl").attr("type", "text");
	let copyText = document.querySelector("#login_input_arl")
	copyText.select();
	copyText.setSelectionRange(0, 99999);
	document.execCommand("copy");
	$("#login_input_arl").attr("type", "password");
	toast("ARL copied to clipboard", 'assignment')
}

function logout(){
	socket.emit("logout");
}

socket.on("logging_in", function(){
	toast("Logging in", "loading", false, "login-toast")
})

socket.on("logged_in", function(data){
	console.log(data)
	switch (data.status) {
		case 1:
		case 3:
			toast("Logged in", "done", true, "login-toast")
			if (data.arl){
				localStorage.setItem("arl", data.arl)
				$("#login_input_arl").val(data.arl)
			}
			$('#open_login_prompt').hide()
			if (data.user){
				$("#settings_username").text(data.user.name)
				$("#settings_picture").attr("src",`https://e-cdns-images.dzcdn.net/images/user/${data.user.picture}/125x125-000000-80-0-0.jpg`)
				$("#logged_in_info").show()
			}
		break;
		case 2:
			toast("Already logged in", "done", true, "login-toast")
			if (data.user){
				$("#settings_username").text(data.user.name)
				$("#settings_picture").attr("src",`https://e-cdns-images.dzcdn.net/images/user/${data.user.picture}/125x125-000000-80-0-0.jpg`)
				$("#logged_in_info").show()
			}
		break;
		case 0:
			toast("Couldn't log in", "close", true, "login-toast")
			localStorage.removeItem("arl")
			$("#login_input_arl").val("")
			$('#open_login_prompt').show()
			$("#logged_in_info").hide()
			$("#settings_username").text("Not Logged")
			$("#settings_picture").attr("src",`https://e-cdns-images.dzcdn.net/images/user/125x125-000000-80-0-0.jpg`)
		break;
	}
})

socket.on("logged_out", function(){
	toast("Logged out", "done", true, "login-toast")
	localStorage.removeItem("arl")
	$("#login_input_arl").val("")
	$('#open_login_prompt').show()
	$("#logged_in_info").hide()
	$("#settings_username").text("Not Logged")
	$("#settings_picture").attr("src",`https://e-cdns-images.dzcdn.net/images/user/125x125-000000-80-0-0.jpg`)
})
