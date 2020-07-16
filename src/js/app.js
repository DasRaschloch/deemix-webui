import Vue from 'vue'

// Object is needed for vue proxy (what does this mean?)
window.vol = {
	preview_max_volume: 100
}

import App from '@/js/App.vue'

import $ from 'jquery'
import { socket } from '@/js/socket.js'
import { toast } from '@/js/toasts.js'
import { init as initTabs } from '@/js/tabs.js'

/* ===== App initialization ===== */

function startApp() {
	mountApp()
	initTabs()
}

function mountApp() {
	// TODO Remove the App instance from the window when deemix will be a complete Vue App
	window.App = new Vue({
		render: h => h(App)
	}).$mount('#app')
}

function initClient() {
	window.clientMode = true
	document.querySelector(`#open_downloads_folder`).classList.remove('hide')
}

document.addEventListener('DOMContentLoaded', startApp)
window.addEventListener('pywebviewready', initClient)

/* ===== Socketio listeners ===== */

// Debug messages for socketio
socket.on('message', function(msg) {
	console.log(msg)
})

socket.on('logging_in', function() {
	toast('Logging in', 'loading', false, 'login-toast')
})

socket.on('init_autologin', function() {
	let arl = localStorage.getItem('arl')
	let accountNum = localStorage.getItem('accountNum')
	if (arl) {
		arl = arl.trim()
		if (accountNum != 0) {
			socket.emit('login', arl, true, accountNum)
		} else {
			socket.emit('login', arl)
		}
	}
})

socket.on('logged_in', function(data) {
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
			break
	}
})

socket.on('logged_out', function() {
	toast('Logged out', 'done', true, 'login-toast')
	localStorage.removeItem('arl')
	$('#login_input_arl').val('')
	$('#open_login_prompt').show()
	document.getElementById('logged_in_info').classList.add('hide')
	$('#settings_username').text('Not Logged')
	$('#settings_picture').attr('src', `https://e-cdns-images.dzcdn.net/images/user/125x125-000000-80-0-0.jpg`)
	document.getElementById('home_not_logged_in').classList.remove('hide')
})

socket.on('cancellingCurrentItem', function(uuid) {
	toast('Cancelling current item.', 'loading', false, 'cancelling_' + uuid)
})

socket.on('currentItemCancelled', function(uuid) {
	toast('Current item cancelled.', 'done', true, 'cancelling_' + uuid)
})

socket.on('startAddingArtist', function(data) {
	toast(`Adding ${data.name} albums to queue`, 'loading', false, 'artist_' + data.id)
})

socket.on('finishAddingArtist', function(data) {
	toast(`Added ${data.name} albums to queue`, 'done', true, 'artist_' + data.id)
})

socket.on('startConvertingSpotifyPlaylist', function(id) {
	toast('Converting spotify tracks to deezer tracks', 'loading', false, 'spotifyplaylist_' + id)
})

socket.on('finishConvertingSpotifyPlaylist', function(id) {
	toast('Spotify playlist converted', 'done', true, 'spotifyplaylist_' + id)
})

socket.on('errorMessage', function(error) {
	toast(error, 'error')
})

socket.on('alreadyInQueue', function(data) {
	toast(`${data.title} is already in queue!`, 'playlist_add_check')
})
