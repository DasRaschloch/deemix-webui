// Initialization
const socket = io.connect(window.location.href)
localStorage = window.localStorage;
search_selected = ""
main_selected=""
toastsWithId = {}

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
			setTimeout(function(){ toastObj.hideToast() }, 3000);
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

function openLoginPrompt(){
	socket.emit("loginpage")
}

socket.emit("init");
if (localStorage.getItem("arl")){
	socket.emit("login", localStorage.getItem("arl"));
}

socket.on("logging_in", function(){
	toast("Logging in", "loading", false, "login-toast")
})

socket.on("logged_in", function(data){
	if (data.status != 0){
		console.log(data)
		toast("Logged in", "done", true, "login-toast")
		if (data.arl && data.status == 1) localStorage.setItem("arl", data.arl)
	}else{
		toast("Couldn't log in", "close", true, "login-toast")
	}
})
