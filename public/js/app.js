/* ===== Imports ===== */

import * as Utils from './modules/utils.js'

/* ===== Vue components ===== */
import MainSearch from './modules/main-search.js'
import SettingsTab from './modules/settings-tab.js'

import { socket } from './modules/socket.js'
import { toast } from './modules/toasts.js'
import { resetTracklistTab } from './modules/tracklist-tab.js'
import { resetArtistTab } from './modules/artist-tab.js'
import Downloads from './modules/downloads.js'
import QualityModal from './modules/quality-modal.js'

/* ===== Socketio listeners ===== */

// Debug messages for socketio
socket.on('message', function (msg) {
	console.log(msg)
})

// Needs:
// 1. toast
socket.on('logging_in', function () {
	toast('Logging in', 'loading', false, 'login-toast')
})

// Needs:
// 1. toast
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

// Needs:
// 1. toast
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
 * Adds all event listeners.
 * @returns		{void}
 * @since			0.1.0 (?)
 */
function linkEventListeners() {
	document.getElementById('sidebar').addEventListener('click', handleSidebarClick)
	document.getElementById('search_tab').addEventListener('click', handleTabClick)

	// Back buttons
	const backButtons = Array.from(document.getElementsByClassName('back-button'))

	backButtons.forEach(button => {
		button.addEventListener('click', backTab)
	})

	// Queue buttons
	document.getElementById('clean_queue').addEventListener('click', () => {
		socket.emit('removeFinishedDownloads')
	})

	document.getElementById('cancel_queue').addEventListener('click', () => {
		socket.emit('cancelAllDownloads')
	})
}

/* ===== App initialization ===== */
function init() {
	linkEventListeners()
	Downloads.linkListeners()
	QualityModal.init()

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

/* tabs.js */
window.search_selected = ''
window.main_selected = ''
window.windows_stack = []
window.currentStack = {}

// Needs:
// 1. windows_stack
// 2. currentStack
// 3. main_selected
// 4. SettingsTab
// 5. lastSettings
// 6. search_selected
// 7. MainSearch
window.changeTab = function (evt, section, tabName) {
	windows_stack = []
	currentStack = {}
	var i, tabcontent, tablinks
	tabcontent = document.getElementsByClassName(section + '_tabcontent')
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none'
	}
	tablinks = document.getElementsByClassName(section + '_tablinks')
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].classList.remove('active')
	}
	if (tabName == 'settings_tab' && main_selected != 'settings_tab') {
		SettingsTab.settings = { ...lastSettings }
	}

	document.getElementById(tabName).style.display = 'block'
	window[section + '_selected'] = tabName

	// Not choosing .currentTarget beacuse the event
	// is delegated
	evt.target.classList.add('active')

	// Check if you need to load more content in the search tab
	if (
		main_selected == 'search_tab' &&
		['track_search', 'album_search', 'artist_search', 'playlist_search'].indexOf(search_selected) != -1 &&
		MainSearch.results[search_selected.split('_')[0] + 'Tab'].data.length == 0
	) {
		MainSearch.search(search_selected.split('_')[0])
	}
}

// Needs:
// 1. windows_stack
// 2. main_selected
// 3. currentStack
window.showTab = function (type, id, back = false) {
	if (windows_stack.length == 0) windows_stack.push({ tab: main_selected })
	else if (!back) windows_stack.push(currentStack)
	if (type == 'artist') {
		window.tab = 'artist_tab'
	} else {
		window.tab = 'tracklist_tab'
	}
	currentStack = { type: type, id: id }
	let tabcontent = document.getElementsByClassName('main_tabcontent')
	for (let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none'
	}
	document.getElementById(tab).style.display = 'block'
}

// Needs:
// 1. windows_stack
// 2. main_selected
// 3. resetArtistTab
// 4. resetTracklistTab
// 5. socket
// 6. showTab
function backTab() {
	if (windows_stack.length == 1) {
		document.getElementById(`main_${main_selected}link`).click()
	} else {
		let tabObj = windows_stack.pop()
		if (tabObj.type == 'artist') {
			resetArtistTab()
		} else {
			resetTracklistTab()
		}
		socket.emit('getTracklist', { type: tabObj.type, id: tabObj.id })
		showTab(tabObj.type, tabObj.id, true)
	}
}

/* search.js */
// Load more content when the search page is at the end
// Needs:
// 1. main_selected
// 2. search_selected
// 3. MainSearch
$('#content').on('scroll', function () {
	if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
		if (
			main_selected == 'search_tab' &&
			['track_search', 'album_search', 'artist_search', 'playlist_search'].indexOf(search_selected) != -1
		) {
			MainSearch.scrolledSearch(search_selected.split('_')[0])
		}
	}
})

// Search section
// Needs:
// 1. QualityModal
// 2. Downloads
// 3. socket
// 4. MainSearch
// 5. main_selected
$('#searchbar').keyup(function (e) {
	if (e.keyCode == 13) {
		let term = this.value
		if (Utils.isValidURL(term)) {
			if (e.ctrlKey) {
				QualityModal.open(term)
			} else {
				Downloads.sendAddToQueue(term)
			}
		} else {
			if (term != MainSearch.query || main_selected == 'search_tab') {
				document.getElementById('search_tab_content').style.display = 'none'
				socket.emit('mainSearch', { term: term })
			} else {
				document.getElementById('search_all_tab').click()
				document.getElementById('search_tab_content').style.display = 'block'
				document.getElementById('main_search_tablink').click()
			}
		}
	}
})

/* ===== Handlers ===== */

/**
 * Handles click Event on the sidebar and changes tab
 * according to clicked icon.
 * Uses event delegation
 * @param		{Event}		event
 * @since		0.1.0
 */
function handleSidebarClick(event) {
	let targetID = event.target.id

	switch (targetID) {
		case 'main_search_tablink':
			changeTab(event, 'main', 'search_tab')
			break
		case 'main_home_tablink':
			changeTab(event, 'main', 'home_tab')
			break
		case 'main_charts_tablink':
			changeTab(event, 'main', 'charts_tab')
			break
		case 'main_favorites_tablink':
			changeTab(event, 'main', 'favorites_tab')
			break
		case 'main_analyzer_tablink':
			changeTab(event, 'main', 'analyzer_tab')
			break
		case 'main_settings_tablink':
			changeTab(event, 'main', 'settings_tab')
			break
		case 'main_about_tablink':
			changeTab(event, 'main', 'about_tab')
			break

		default:
			break
	}
}

function handleTabClick(event) {
	let targetID = event.target.id

	switch (targetID) {
		case 'search_all_tab':
			changeTab(event, 'search', 'main_search')
			break
		case 'search_track_tab':
			changeTab(event, 'search', 'track_search')
			break
		case 'search_album_tab':
			changeTab(event, 'search', 'album_search')
			break
		case 'search_artist_tab':
			changeTab(event, 'search', 'artist_search')
			break
		case 'search_playlist_tab':
			changeTab(event, 'search', 'playlist_search')
			break

		default:
			break
	}
}
