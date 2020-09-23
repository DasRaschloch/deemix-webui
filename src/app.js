import Vue from 'vue'

// Object is needed for vue change detection
window.vol = {
	preview_max_volume: 100
}

import App from '@components/App.vue'
import i18n from '@/plugins/i18n'
import router from '@/router'
import store from '@/store'

import { socket } from '@/utils/socket'
import { toast } from '@/utils/toasts'
import { init as initTabs } from '@js/tabs.js'

import { isValidURL } from '@/utils/utils'
import Downloads from '@/utils/downloads'
import EventBus from '@/utils/EventBus.js'

/* ===== App initialization ===== */

function startApp() {
	setLocale()
	mountApp()
	initTabs()
}

function setLocale() {
	let storedLocale = localStorage.getItem('locale')

	if (storedLocale) {
		i18n.locale = storedLocale
	}
}

function mountApp() {
	new Vue({
		store,
		router,
		i18n,
		render: h => h(App)
	}).$mount('#app')
}

function initClient() {
	store.dispatch('setClientMode', true)
}

document.addEventListener('DOMContentLoaded', startApp)
window.addEventListener('pywebviewready', initClient)

/* ===== Global shortcuts ===== */

document.addEventListener('paste', pasteEvent => {
	let pasteText = pasteEvent.clipboardData.getData('Text')

	if (pasteEvent.target.localName != 'input') {
		if (isValidURL(pasteText)) {
			if (window.main_selected === 'analyzer_tab') {
				EventBus.$emit('linkAnalyzerTab:reset')
				socket.emit('analyzeLink', pasteText)
			} else {
				Downloads.sendAddToQueue(pasteText)
			}
		} else {
			let searchbar = document.querySelector('#searchbar')
			searchbar.select()
			searchbar.setSelectionRange(0, 99999)
		}
	}
})

document.addEventListener('keydown', e => {
	if (e.keyCode == 70 && e.ctrlKey) {
		e.preventDefault()
		document.querySelector('#searchbar').focus()
	}
})

/* ===== Socketio listeners ===== */

// Debug messages for socketio
socket.on('message', function(msg) {
	console.log(msg)
})

socket.on('logging_in', function() {
	toast(i18n.t('toasts.loggingIn'), 'loading', false, 'login-toast')
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
	const { status, user } = data

	switch (status) {
		case 1:
		case 3:
			// Login ok
			toast(i18n.t('toasts.loggedIn'), 'done', true, 'login-toast')

			store.dispatch('login', data)
			break
		case 2:
			// Already logged in
			toast(i18n.t('toasts.alreadyLogged'), 'done', true, 'login-toast')

			store.dispatch('setUser', user)
			break
		case 0:
			// Login failed
			toast(i18n.t('toasts.loginFailed'), 'close', true, 'login-toast')

			store.dispatch('removeARL')
			break
		case -1:
			toast(i18n.t('toasts.deezerNotAvailable'), 'close', true, 'login-toast')
			return
		// TODO
		// $('#open_login_prompt').show()
		// document.getElementById('logged_in_info').classList.add('hide')
		// $('#settings_username').text('Not Logged')
		// $('#settings_picture').attr('src', `https://e-cdns-images.dzcdn.net/images/user/125x125-000000-80-0-0.jpg`)
		// document.getElementById('home_not_logged_in').classList.remove('hide')
	}
})

socket.on('logged_out', function() {
	toast(i18n.t('toasts.loggedOut'), 'done', true, 'login-toast')

	store.dispatch('logout')
})

socket.on('restoringQueue', function() {
	toast(i18n.t('toasts.restoringQueue'), 'loading', false, 'restoring_queue')
})

socket.on('cancellingCurrentItem', function(uuid) {
	toast(i18n.t('toasts.cancellingCurrentItem'), 'loading', false, 'cancelling_' + uuid)
})

socket.on('currentItemCancelled', function(uuid) {
	toast(i18n.t('toasts.currentItemCancelled'), 'done', true, 'cancelling_' + uuid)
})

socket.on('startAddingArtist', function(data) {
	toast(i18n.t('toasts.startAddingArtist', { artist: data.name }), 'loading', false, 'artist_' + data.id)
})

socket.on('finishAddingArtist', function(data) {
	toast(i18n.t('toasts.finishAddingArtist', { artist: data.name }), 'done', true, 'artist_' + data.id)
})

socket.on('startConvertingSpotifyPlaylist', function(id) {
	toast(i18n.t('toasts.startConvertingSpotifyPlaylist'), 'loading', false, 'spotifyplaylist_' + id)
})

socket.on('finishConvertingSpotifyPlaylist', function(id) {
	toast(i18n.t('toasts.finishConvertingSpotifyPlaylist'), 'done', true, 'spotifyplaylist_' + id)
})

socket.on('errorMessage', function(error) {
	toast(error, 'error')
})

socket.on('queueError', function(queueItem) {
	if (queueItem.errid) {
		toast(i18n.t(`errors.ids.${queueItem.errid}`), 'error')
	} else {
		toast(queueItem.error, 'error')
	}
})

socket.on('alreadyInQueue', function(data) {
	toast(i18n.t('toasts.alreadyInQueue', { item: data.title }), 'playlist_add_check')
})

socket.on('loginNeededToDownload', function(data) {
	toast(i18n.t('toasts.loginNeededToDownload'), 'report')
})
