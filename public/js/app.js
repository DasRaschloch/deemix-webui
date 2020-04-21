import * as Utils from './modules/utils.js'
import { MainSearch } from './modules/search-tab/main-search.js'

const socket = io.connect(window.location.href)
const localStorage = window.localStorage

// Toasts stuff
window.toastsWithId = {}

// Settings
window.lastSettings = {}
window.lastCredentials = {}

window.toast = function (msg, icon = null, dismiss = true, id = null) {
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

window.loginButton = function () {
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

window.backTab = function () {
	if (windows_stack.length == 1) {
		clickElement('main_' + main_selected + 'link')
	} else {
		let tabObj = windows_stack.pop()
		if (tabObj.type == 'artist') resetArtistTab()
		else resetTracklistTab()
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
window.handleSidebarClick = function (event) {
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

document.getElementById('sidebar').addEventListener('click', handleSidebarClick)

/* stackedTabs.js */
var artistTab = new Vue({
	el: '#artist_tab',
	data: {
		currentTab: '',
		sortKey: 'release_date',
		sortOrder: 'desc',
		title: '',
		image: '',
		type: '',
		link: '',
		head: null,
		body: null
	},
	methods: {
		addToQueue: function (e) {
			e.stopPropagation()
			sendAddToQueue(e.currentTarget.dataset.link)
		},
		openQualityModal: function (e) {
			e.preventDefault()
			openQualityModal(e.currentTarget.dataset.link)
		},
		moreInfo: function (url, e) {
			if (e) e.preventDefault()
			showTrackListSelective(url, true)
		},
		sortBy: function (key) {
			if (key == this.sortKey) {
				this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc'
			} else {
				this.sortKey = key
				this.sortOrder = 'asc'
			}
		},
		changeTab: function (tab) {
			this.currentTab = tab
		},
		checkNewRelease: function (date) {
			var g1 = new Date()
			var g2 = new Date(date)
			g2.setDate(g2.getDate() + 3)
			g1.setHours(0, 0, 0, 0)
			if (g1.getTime() <= g2.getTime()) {
				return true
			} else {
				return false
			}
		}
	},
	computed: {
		showTable() {
			if (this.body) return _.orderBy(this.body[this.currentTab], this.sortKey, this.sortOrder)
			else return []
		}
	}
})

var tracklistTab = new Vue({
	el: '#tracklist_tab',
	data: {
		title: '',
		metadata: '',
		release_date: '',
		label: '',
		explicit: false,
		image: '',
		type: '',
		link: '',
		head: null,
		body: []
	},
	methods: {
		addToQueue: function (e) {
			e.stopPropagation()
			sendAddToQueue(e.currentTarget.dataset.link)
		},
		openQualityModal: function (e) {
			e.preventDefault()
			openQualityModal(e.currentTarget.dataset.link)
		},
		toggleAll: function (e) {
			this.body.forEach(item => {
				if (item.type == 'track') {
					item.selected = e.currentTarget.checked
				}
			})
		},
		selectedLinks: function () {
			var selected = []
			if (this.body) {
				this.body.forEach(item => {
					if (item.type == 'track' && item.selected) selected.push(item.link)
				})
			}
			return selected.join(';')
		},
		convertDuration(duration) {
			//convert from seconds only to mm:ss format
			let mm, ss
			mm = Math.floor(duration / 60)
			ss = duration - mm * 60
			//add leading zero if ss < 0
			if (ss < 10) {
				ss = '0' + ss
			}
			return mm + ':' + ss
		}
	}
})

window.resetArtistTab = function () {
	artistTab.title = 'Loading...'
	artistTab.image = ''
	artistTab.type = ''
	artistTab.currentTab = ''
	artistTab.sortKey = 'release_date'
	artistTab.sortOrder = 'desc'
	artistTab.link = ''
	artistTab.head = []
	artistTab.body = null
}

window.resetTracklistTab = function () {
	tracklistTab.title = 'Loading...'
	tracklistTab.image = ''
	tracklistTab.metadata = ''
	tracklistTab.label = ''
	tracklistTab.release_date = ''
	tracklistTab.explicit = false
	tracklistTab.type = ''
	tracklistTab.head = []
	tracklistTab.body = []
}

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

socket.on('show_artist', function (data) {
	artistTab.title = data.name
	artistTab.image = data.picture_xl
	artistTab.type = 'Artist'
	artistTab.link = `https://www.deezer.com/artist/${data.id}`
	artistTab.currentTab = Object.keys(data.releases)[0]
	artistTab.sortKey = 'release_date'
	artistTab.sortOrder = 'desc'
	artistTab.head = [
		{ title: 'Title', sortKey: 'title' },
		{ title: 'Release Date', sortKey: 'release_date' },
		{ title: '', width: '32px' }
	]
	if (_.isEmpty(data.releases)) {
		artistTab.body = null
	} else {
		artistTab.body = data.releases
	}
})

socket.on('show_album', function (data) {
	tracklistTab.type = 'Album'
	tracklistTab.link = `https://www.deezer.com/album/${data.id}`
	tracklistTab.title = data.title
	tracklistTab.explicit = data.explicit_lyrics
	tracklistTab.label = data.label
	tracklistTab.metadata = `${data.artist.name} • ${data.tracks.length} songs`
	tracklistTab.release_date = data.release_date.substring(0, 10)
	tracklistTab.image = data.cover_xl
	tracklistTab.head = [
		{ title: '<i class="material-icons">music_note</i>', width: '24px' },
		{ title: '#' },
		{ title: 'Song' },
		{ title: 'Artist' },
		{ title: '<i class="material-icons">timer</i>', width: '40px' }
	]
	if (_.isEmpty(data.tracks)) {
		tracklistTab.body = null
	} else {
		tracklistTab.body = data.tracks
	}
})

socket.on('show_playlist', function (data) {
	tracklistTab.type = 'Playlist'
	tracklistTab.link = `https://www.deezer.com/playlist/${data.id}`
	tracklistTab.title = data.title
	tracklistTab.image = data.picture_xl
	tracklistTab.release_date = data.creation_date.substring(0, 10)
	tracklistTab.metadata = `by ${data.creator.name} • ${data.tracks.length} songs`
	tracklistTab.head = [
		{ title: '<i class="material-icons">music_note</i>', width: '24px' },
		{ title: '#' },
		{ title: 'Song' },
		{ title: 'Artist' },
		{ title: 'Album' },
		{ title: '<i class="material-icons">timer</i>', width: '40px' }
	]
	if (_.isEmpty(data.tracks)) {
		tracklistTab.body = null
	} else {
		tracklistTab.body = data.tracks
	}
})

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

window.searchUpdate = function (result) {
	let next = 0
	if (result.next) next = parseInt(result.next.match(/index=(\d*)/)[1])
	else next = result.total
	if (MainSearch.results[result.type + 'Tab'].total != result.total)
		MainSearch.results[result.type + 'Tab'].total = result.total
	if (MainSearch.results[result.type + 'Tab'].next != next) {
		MainSearch.results[result.type + 'Tab'].next = next
		MainSearch.results[result.type + 'Tab'].data = MainSearch.results[result.type + 'Tab'].data.concat(result.data)
	}
	MainSearch.results[result.type + 'Tab'].loaded = true
}

socket.on('search', function (result) {
	searchUpdate(result)
})

window.clickElement = function (button) {
	return document.getElementById(button).click()
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

window.handleTabClick = function (event) {
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

document.getElementById('search_tab').addEventListener('click', handleTabClick)

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

window.mainSearchHandler = function (result) {
	let resetObj = { data: [], next: 0, total: 0, loaded: false }
	MainSearch.results.allTab = result
	MainSearch.results.query = result.QUERY
	MainSearch.results.trackTab = { ...resetObj }
	MainSearch.results.albumTab = { ...resetObj }
	MainSearch.results.artistTab = { ...resetObj }
	MainSearch.results.playlistTab = { ...resetObj }
	document.getElementById('search_all_tab').click()
	document.getElementById('search_tab_content').style.display = 'block'
	document.getElementById('main_search_tablink').click()
}

socket.on('mainSearch', function (result) {
	mainSearchHandler(result)
})

/* settings.js */
const SettingsTab = new Vue({
	el: '#settings_tab',
	data: {
		settings: { tags: {} },
		spotifyFeatures: {}
	},
	methods: {
		addListeners() {
			document.getElementById('settings_btn_save').addEventListener('click', window.saveSettings)
			document.getElementById('settings_btn_copyArl').addEventListener('click', window.copyARLtoClipboard)
			document.getElementById('settings_btn_logout').addEventListener('click', window.logout)
		}
	},
	mounted() {
		this.addListeners()
	}
})

socket.on('init_settings', function (settings, credentials) {
	loadSettings(settings, credentials)
	toast('Settings loaded!', 'settings')
})

socket.on('updateSettings', function (settings, credentials) {
	loadSettings(settings, credentials)
	toast('Settings updated!', 'settings')
})

window.loadSettings = function (settings, spotifyCredentials) {
	lastSettings = { ...settings }
	lastCredentials = { ...spotifyCredentials }
	SettingsTab.settings = settings
	SettingsTab.spotifyFeatures = spotifyCredentials
}

window.saveSettings = function () {
	lastSettings = { ...SettingsTab.settings }
	lastCredentials = { ...SettingsTab.spotifyFeatures }
	socket.emit('saveSettings', lastSettings, lastCredentials)
}

window.copyARLtoClipboard = function () {
	$('#login_input_arl').attr('type', 'text')
	let copyText = document.querySelector('#login_input_arl')
	copyText.select()
	copyText.setSelectionRange(0, 99999)
	document.execCommand('copy')
	$('#login_input_arl').attr('type', 'password')
	toast('ARL copied to clipboard', 'assignment')
}

window.logout = function () {
	socket.emit('logout')
}

/* downloadList.js */
// Show/Hide Download Tab
window.toggleDownloadTab = function (ev) {
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

socket.on('addedToQueue', function (queueItem) {
	addToQueue(queueItem)
})

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

$('#clean_queue').on('click', function () {
	socket.emit('removeFinishedDownloads')
})

$('#cancel_queue').on('click', function () {
	socket.emit('cancelAllDownloads')
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
modalQuality.open = false

window.onclick = function (event) {
	if (event.target == modalQuality && modalQuality.open) {
		$(modalQuality).addClass('animated fadeOut')
	}
}

$(modalQuality).on('webkitAnimationEnd', function () {
	if (modalQuality.open) {
		$(this).removeClass('animated fadeOut')
		$(this).css('display', 'none')
		modalQuality.open = false
	} else {
		$(this).removeClass('animated fadeIn')
		$(this).css('display', 'block')
		modalQuality.open = true
	}
})

window.openQualityModal = function (link) {
	$(modalQuality).data('url', link)
	$(modalQuality).css('display', 'block')
	$(modalQuality).addClass('animated fadeIn')
}

window.modalQualityButton = function (event) {
	if (!event.target.matches('.quality-button')) {
		return
	}

	let bitrate = event.target.dataset.qualityValue

	var url = $(modalQuality).data('url')
	sendAddToQueue(url, bitrate)
	$(modalQuality).addClass('animated fadeOut')
}
