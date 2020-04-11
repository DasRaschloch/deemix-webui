// Initialization
const socket = io.connect(window.location.href)
localStorage = window.localStorage;
search_selected = ""
main_selected=""
toastsWithId = {}

function toast(msg, icon=null, dismiss=true, id=null){
	if (id && $(`div.toastify[toast_id=${id}]`).length)
		return
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

socket.on("toast", (data)=>{
	toast(data.msg, data.icon || null, data.dismiss !== undefined ? data.dismiss : true, data.id || null)
})

socket.on("updateToast", (data)=>{
	if (toastsWithId[data.id]){
		toastObj = toastsWithId[data.id]
		toastDOM = $(`div.toastify[toast_id=${data.id}]`)
		if (data.msg){
			toastDOM.find(".toast-message").html(data.msg)
		}
		if (data.icon){
			if (data.icon=='loading')
				icon = `<div class="circle-loader"></div>`
			else
				icon = `<i class="material-icons">${data.icon}</i>`
			toastDOM.find(".toast-icon").html(icon)
		}
		if (data.dismiss !== null && data.dismiss){
			setTimeout(function(){ toastObj.hideToast() }, 3000);
		}
	}else{
		toast(data.msg, data.icon || null, data.dismiss !== null ? data.dismiss : true, data.id || null)
	}
})
