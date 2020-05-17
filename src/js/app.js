import $ from 'jquery'
import { socket } from './modules/socket.js'
import { toast } from './modules/toasts.js'
import Downloads from './modules/downloads.js'
import QualityModal from './modules/quality-modal.js'
import Tabs from './modules/tabs.js'
import Search from './modules/search.js'
import TrackPreview from './modules/track-preview.js'

/* ===== App initialization ===== */

function startApp() {
	// Setting current theme
	setUserTheme()

	Downloads.init()
	QualityModal.init()
	Tabs.init()
	Search.linkListeners()
	TrackPreview.init()
}

function initClient(){
	console.log("ClientMode")
	document.getElementById("settings_btn_appLogin").removeAttribute("disabled")
	window.clientMode = true;
}

window.addEventListener('pywebviewready', initClient)
document.addEventListener('DOMContentLoaded', startApp)

/* ===== General functions ===== */

/**
 * Sets the current theme according to
 * the localStorage saved theme.
 * @since		0.1.6
 */
function setUserTheme() {
	let selectedTheme = localStorage.getItem('selectedTheme')

	if (selectedTheme) {
		let activeClass = 'theme_toggler--active'

		document.querySelector(`.${activeClass}`).classList.remove(activeClass)
		document.querySelector(`.theme_toggler[data-theme-variant="${selectedTheme}"]`).classList.add(activeClass)
	}
}

/* ===== Socketio listeners ===== */

// Debug messages for socketio
socket.on('message', function (msg) {
	console.log(msg)
})

socket.on('logging_in', function () {
	toast('Logging in', 'loading', false, 'login-toast')
})

socket.on('init_autologin', function () {
	let arl = localStorage.getItem('arl')
	if (arl) socket.emit('login', arl)
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
				// $('#logged_in_info').show()
				document.getElementById('logged_in_info').classList.remove('hide')
			}
			document.getElementById('home_not_logged_in').classList.add('hide')
			document.getElementById('settings_btn_appLogin').classList.add('hide')
			break
		case 2:
			toast('Already logged in', 'done', true, 'login-toast')
			if (data.user) {
				$('#settings_username').text(data.user.name)
				$('#settings_picture').attr(
					'src',
					`https://e-cdns-images.dzcdn.net/images/user/${data.user.picture}/125x125-000000-80-0-0.jpg`
				)
				// $('#logged_in_info').show()
				document.getElementById('logged_in_info').classList.remove('hide')
			}
			document.getElementById('home_not_logged_in').classList.add('hide')
			document.getElementById('settings_btn_appLogin').classList.add('hide')
			break
		case 0:
			toast("Couldn't log in", 'close', true, 'login-toast')
			localStorage.removeItem('arl')
			$('#login_input_arl').val('')
			$('#open_login_prompt').show()
			document.getElementById('logged_in_info').classList.add('hide')
			// $('#logged_in_info').hide()
			$('#settings_username').text('Not Logged')
			$('#settings_picture').attr('src', `https://e-cdns-images.dzcdn.net/images/user/125x125-000000-80-0-0.jpg`)
			document.getElementById('home_not_logged_in').classList.remove('hide')
			document.getElementById('settings_btn_appLogin').classList.remove('hide')
			break
	}
})

socket.on('logged_out', function () {
	toast('Logged out', 'done', true, 'login-toast')
	localStorage.removeItem('arl')
	$('#login_input_arl').val('')
	$('#open_login_prompt').show()
	document.getElementById('logged_in_info').classList.add('hide')
	$('#settings_username').text('Not Logged')
	$('#settings_picture').attr('src', `https://e-cdns-images.dzcdn.net/images/user/125x125-000000-80-0-0.jpg`)
	document.getElementById('home_not_logged_in').classList.remove('hide')
	document.getElementById('settings_btn_appLogin').classList.remove('hide')
})
