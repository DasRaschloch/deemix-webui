// Initialization
const socket = io.connect(window.location.href)
var localStorage = window.localStorage
// toasts stuff
var toastsWithId = {}
// settings
var lastSettings = {}
var lastCredentials = {}

function toast(msg, icon = null, dismiss = true, id = null) {
	if (toastsWithId[id]) {
		let toastObj = toastsWithId[id]
		let toastDOM = $(`div.toastify[toast_id=${id}]`)
		if (msg) {
			toastDOM.find('.toast-message').html(msg)
		}
		if (icon) {
			if (icon == 'loading') icon = `<div class="circle-loader"></div>`
			else icon = `<i class="material-icons">${icon}</i>`
			toastDOM.find('.toast-icon').html(icon)
		}
		if (dismiss !== null && dismiss) {
			setTimeout(function () {
				toastObj.hideToast()
				delete toastsWithId[id]
			}, 3000)
		}
	} else {
		if (icon == null) icon = ''
		else if (icon == 'loading') icon = `<div class="circle-loader"></div>`
		else icon = `<i class="material-icons">${icon}</i>`
		let toastObj = Toastify({
			text: `<span class="toast-icon">${icon}</span><span class="toast-message">${msg}</toast>`,
			duration: dismiss ? 3000 : 0,
			gravity: 'bottom',
			position: 'left'
		}).showToast()
		if (id) {
			toastsWithId[id] = toastObj
			$(toastObj.toastElement).attr('toast_id', id)
		}
	}
}

/* ===== Socketio listeners ===== */
socket.on('toast', data => {
	toast(data.msg, data.icon || null, data.dismiss !== undefined ? data.dismiss : true, data.id || null)
})

// Debug messages for socketio
socket.on('message', function (msg) {
	console.log(msg)
})

// Login stuff

function loginButton() {
	let arl = document.querySelector('#login_input_arl').value
	if (arl != '' && arl != localStorage.getItem('arl')) {
		socket.emit('login', arl, true)
	}
}

socket.on('logging_in', function () {
	toast('Logging in', 'loading', false, 'login-toast')
})

socket.on('logged_in', function (data) {
	switch (data.status) {
		case 1:
		case 3:
			toast('Logged in', 'done', true, 'login-toast')
			if (data.arl) {
				localStorage.setItem('arl', data.arl)
				$('#login_input_arl').val(data.arl)
			}
			$('#open_login_prompt').hide()
			if (data.user) {
				$('#settings_username').text(data.user.name)
				$('#settings_picture').attr(
					'src',
					`https://e-cdns-images.dzcdn.net/images/user/${data.user.picture}/125x125-000000-80-0-0.jpg`
				)
				$('#logged_in_info').show()
			}
			break
		case 2:
			toast('Already logged in', 'done', true, 'login-toast')
			if (data.user) {
				$('#settings_username').text(data.user.name)
				$('#settings_picture').attr(
					'src',
					`https://e-cdns-images.dzcdn.net/images/user/${data.user.picture}/125x125-000000-80-0-0.jpg`
				)
				$('#logged_in_info').show()
			}
			break
		case 0:
			toast("Couldn't log in", 'close', true, 'login-toast')
			localStorage.removeItem('arl')
			$('#login_input_arl').val('')
			$('#open_login_prompt').show()
			$('#logged_in_info').hide()
			$('#settings_username').text('Not Logged')
			$('#settings_picture').attr('src', `https://e-cdns-images.dzcdn.net/images/user/125x125-000000-80-0-0.jpg`)
			break
	}
})

socket.on('logged_out', function () {
	toast('Logged out', 'done', true, 'login-toast')
	localStorage.removeItem('arl')
	$('#login_input_arl').val('')
	$('#open_login_prompt').show()
	$('#logged_in_info').hide()
	$('#settings_username').text('Not Logged')
	$('#settings_picture').attr('src', `https://e-cdns-images.dzcdn.net/images/user/125x125-000000-80-0-0.jpg`)
})



/**
 * Adds event listeners.
 * @returns		{void}
 * @since			0.1.0 (?)
 */
function linkEventListeners() {
	document.getElementById('toggle_download_tab').addEventListener('click', toggleDownloadTab)
	document.getElementById('modal_quality').addEventListener('click', modalQualityButton)
	document.getElementById('settings_btn_updateArl').addEventListener('click', loginButton)
}

/**
 * App initialization.
 * @returns		{void}
 * @since			0.1.0 (?)
 */
function init() {
	linkEventListeners()

	if ('true' === localStorage.darkMode) {
		document.documentElement.classList.add('dark-theme')
	}

	if (localStorage.getItem('arl')) {
		let arl = localStorage.getItem('arl')

		socket.emit('login', arl)
		$('#login_input_arl').val(arl)
	}

	// Check if download tab should be open
	if ('true' === localStorage.getItem('downloadTabOpen')) {
		document.querySelector('#download_tab_container').classList.remove('tab_hidden')
	}

	// Open default tab
	document.getElementById('main_home_tablink').click()
}

document.addEventListener('DOMContentLoaded', init)