/* ===== Imports ===== */

import * as Utils from './modules/utils.js'

/* ===== Vue components ===== */
import { MainSearch } from './modules/main-search.js'
import { SettingsTab } from './modules/settings-tab.js'

import { resetTracklistTab } from './modules/tracklist-tab.js'
import { resetArtistTab } from './modules/artist-tab.js'
import { toast } from './modules/toasts.js'
import { socket } from './modules/socket.js'

/* ===== Globals ===== */

/* ===== Socketio listeners ===== */

// Debug messages for socketio
socket.on('message', function (msg) {
	console.log(msg)
})

socket.on('toast', data => {
	toast(data.msg, data.icon || null, data.dismiss !== undefined ? data.dismiss : true, data.id || null)
})

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
 * Adds all event listeners.
 * @returns		{void}
 * @since			0.1.0 (?)
 */
function linkEventListeners() {
	document.getElementById('toggle_download_tab').addEventListener('click', toggleDownloadTab)
	document.getElementById('modal_quality').addEventListener('click', modalQualityButton)
	document.getElementById('sidebar').addEventListener('click', handleSidebarClick)
	document.getElementById('search_tab').addEventListener('click', handleTabClick)

	const backButtons = Array.from(document.getElementsByClassName('back-button'))

	backButtons.forEach(button => {
		button.addEventListener('click', backTab)
	})

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
	// is delegated, so it refers to #sidebar
	evt.target.classList.add('active')

	// Check if you need to load more content in the search tab
	if (
		main_selected == 'search_tab' &&
		['track_search', 'album_search', 'artist_search', 'playlist_search'].indexOf(search_selected) != -1 &&
		MainSearch.results[search_selected.split('_')[0] + 'Tab'].data.length == 0
	) {
		search(search_selected.split('_')[0])
	}
}

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

/* stackedTabs.js */

window.artistView = function (ev) {
	let id = ev.currentTarget.dataset.id
	resetArtistTab()
	socket.emit('getTracklist', { type: 'artist', id: id })
	showTab('artist', id)
}
window.albumView = function (ev) {
	let id = ev.currentTarget.dataset.id
	resetTracklistTab()
	socket.emit('getTracklist', { type: 'album', id: id })
	showTab('album', id)
}
window.playlistView = function (ev) {
	let id = ev.currentTarget.dataset.id
	resetTracklistTab()
	socket.emit('getTracklist', { type: 'playlist', id: id })
	showTab('playlist', id)
}

/* search.js */
// Load more content when the search page is at the end
$('#content').on('scroll', function () {
	if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
		if (
			main_selected == 'search_tab' &&
			['track_search', 'album_search', 'artist_search', 'playlist_search'].indexOf(search_selected) != -1
		) {
			scrolledSearch(search_selected.split('_')[0])
		}
	}
})

window.search = function (type) {
	let query = MainSearch.results.query
	socket.emit('search', {
		term: query,
		type: type,
		start: MainSearch.results[type + 'Tab'].next,
		nb: 30
	})
}

window.scrolledSearch = function (type) {
	let query = MainSearch.results.query
	if (MainSearch.results[type + 'Tab'].next < MainSearch.results[type + 'Tab'].total) {
		socket.emit('search', {
			term: query,
			type: type,
			start: MainSearch.results[type + 'Tab'].next,
			nb: 30
		})
	}
}

window.sendAddToQueue = function (url, bitrate = null) {
	if (url.indexOf(';') != -1) {
		urls = url.split(';')
		urls.forEach(url => {
			socket.emit('addToQueue', { url: url, bitrate: bitrate })
		})
	} else if (url != '') {
		socket.emit('addToQueue', { url: url, bitrate: bitrate })
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

// Search section
$('#searchbar').keyup(function (e) {
	if (e.keyCode == 13) {
		let term = this.value
		if (Utils.isValidURL(term)) {
			if (e.ctrlKey) {
				openQualityModal(term)
			} else {
				sendAddToQueue(term)
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

/* settings.js */

/* downloadList.js */
// Show/Hide Download Tab
function toggleDownloadTab(ev) {
	ev.preventDefault()

	let isHidden = document.querySelector('#download_tab_container').classList.toggle('tab_hidden')

	localStorage.setItem('downloadTabOpen', !isHidden)
}

var queueList = {}
var queue = []
var queueComplete = []

socket.on('init_downloadQueue', function (data) {
	if (data.queueComplete.length) {
		data.queueComplete.forEach(item => {
			addToQueue(data.queueList[item])
		})
	}
	if (data.currentItem) {
		addToQueue(data['queueList'][data.currentItem], true)
	}
	data.queue.forEach(item => {
		addToQueue(data.queueList[item])
	})
})

window.addToQueue = function (queueItem, current = false) {
	queueList[queueItem.uuid] = queueItem
	if (queueItem.downloaded + queueItem.failed == queueItem.size) queueComplete.push(queueItem.uuid)
	else queue.push(queueItem.uuid)
	$('#download_list').append(
		`<div class="download_object" id="download_${queueItem.uuid}" data-deezerid="${queueItem.id}">
		<div class="download_info">
			<img width="75px" class="rounded coverart" src="${queueItem.cover}" alt="Cover ${queueItem.title}"/>
			<div class="download_info_data">
				<span class="download_line">${queueItem.title}</span> <span class="download_slim_separator"> - </span>
				<span class="secondary-text">${queueItem.artist}</span>
			</div>
			<div class="download_info_status">
				<span class="download_line"><span class="queue_downloaded">${queueItem.downloaded + queueItem.failed}</span>/${
			queueItem.size
		}</span>
			</div>
		</div>
		<div class="download_bar">
			<div class="progress"><div id="bar_${queueItem.uuid}" class="indeterminate"></div></div>
			<i onclick="downloadAction(event)" class="material-icons queue_icon" data-uuid="${queueItem.uuid}">remove</i>
		</div>
	</div>`
	)
	if (queueItem.progress > 0 || current) {
		$('#bar_' + queueItem.uuid)
			.removeClass('indeterminate')
			.addClass('determinate')
	}
	$('#bar_' + queueItem.uuid).css('width', queueItem.progress + '%')
	if (queueItem.failed >= 1) {
		$('#download_' + queueItem.uuid + ' .download_info_status').append(
			`<span class="secondary-text inline-flex"><span class="download_slim_separator">(</span><span class="queue_failed">${queueItem.failed}</span><i class="material-icons">error_outline</i><span class="download_slim_separator">)</span></span>`
		)
	}
	if (queueItem.downloaded + queueItem.failed == queueItem.size) {
		let result_icon = $('#download_' + queueItem.uuid).find('.queue_icon')
		if (queueItem.failed == 0) {
			result_icon.text('done')
		} else if (queueItem.failed == queueItem.size) {
			result_icon.text('error')
		} else {
			result_icon.text('warning')
		}
	}
}

socket.on('addedToQueue', addToQueue)

window.downloadAction = function (evt) {
	let icon = $(evt.currentTarget).text()
	let uuid = $(evt.currentTarget).data('uuid')
	switch (icon) {
		case 'remove':
			socket.emit('removeFromQueue', uuid)
			break
		default:
	}
}

socket.on('removedFromQueue', function (uuid) {
	let index = queue.indexOf(uuid)
	if (index > -1) {
		queue.splice(index, 1)
		$(`#download_${queueList[uuid].uuid}`).remove()
		delete queueList[uuid]
	}
})

socket.on('startDownload', function (uuid) {
	$('#bar_' + uuid)
		.removeClass('indeterminate')
		.addClass('determinate')
})

socket.on('finishDownload', function (uuid) {
	if (queue.indexOf(uuid) > -1) {
		toast(`${queueList[uuid].title} finished downloading.`, 'done')
		$('#bar_' + uuid).css('width', '100%')
		let result_icon = $('#download_' + uuid).find('.queue_icon')
		if (queueList[uuid].failed == 0) {
			result_icon.text('done')
		} else if (queueList[uuid].failed >= queueList[uuid].size) {
			result_icon.text('error')
		} else {
			result_icon.text('warning')
		}
		let index = queue.indexOf(uuid)
		if (index > -1) {
			queue.splice(index, 1)
			queueComplete.push(uuid)
		}
		if (queue.length <= 0) {
			toast('All downloads completed!', 'done_all')
		}
	}
})

socket.on('removedAllDownloads', function (currentItem) {
	queueComplete = []
	if (currentItem == '') {
		queue = []
		queueList = {}
		$('#download_list').html('')
	} else {
		queue = [currentItem]
		let tempQueueItem = queueList[currentItem]
		queueList = {}
		queueList[currentItem] = tempQueueItem
		$('.download_object').each(function (index) {
			if ($(this).attr('id') != 'download_' + currentItem) $(this).remove()
		})
	}
})

socket.on('removedFinishedDownloads', function () {
	queueComplete.forEach(item => {
		$('#download_' + item).remove()
	})
	queueComplete = []
})

socket.on('updateQueue', function (update) {
	if (update.uuid && queue.indexOf(update.uuid) > -1) {
		if (update.downloaded) {
			queueList[update.uuid].downloaded++
			$('#download_' + update.uuid + ' .queue_downloaded').text(
				queueList[update.uuid].downloaded + queueList[update.uuid].failed
			)
		}
		if (update.failed) {
			queueList[update.uuid].failed++
			$('#download_' + update.uuid + ' .queue_downloaded').text(
				queueList[update.uuid].downloaded + queueList[update.uuid].failed
			)
			if (queueList[update.uuid].failed == 1) {
				$('#download_' + update.uuid + ' .download_info_status').append(
					`<span class="secondary-text inline-flex"><span class="download_slim_separator">(</span><span class="queue_failed">1</span> <i class="material-icons">error_outline</i><span class="download_slim_separator">)</span></span>`
				)
			} else {
				$('#download_' + update.uuid + ' .queue_failed').text(queueList[update.uuid].failed)
			}
		}
		if (update.progress) {
			queueList[update.uuid].progress = update.progress
			$('#bar_' + update.uuid).css('width', update.progress + '%')
		}
	}
})

/* modals.js */
// quality modal stuff
var modalQuality = document.getElementById('modal_quality')
var $modalQuality = $(modalQuality)
modalQuality.open = false

window.onclick = function (event) {
	if (event.target == modalQuality && modalQuality.open) {
		$modalQuality.addClass('animated fadeOut')
	}
}

$modalQuality.on('webkitAnimationEnd', function () {
	if (modalQuality.open) {
		$modalQuality.removeClass('animated fadeOut')
		$modalQuality.css('display', 'none')
		modalQuality.open = false
	} else {
		$modalQuality.removeClass('animated fadeIn')
		$modalQuality.css('display', 'block')
		modalQuality.open = true
	}
})

window.openQualityModal = function (link) {
	$modalQuality.data('url', link)
	$modalQuality.css('display', 'block')
	$modalQuality.addClass('animated fadeIn')
}

function modalQualityButton(event) {
	if (!event.target.matches('.quality-button')) {
		return
	}

	let bitrate = event.target.dataset.qualityValue

	var url = $modalQuality.data('url')
	sendAddToQueue(url, bitrate)
	$modalQuality.addClass('animated fadeOut')
}
