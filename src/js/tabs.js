import TrackPreview from '@/js/track-preview.js'
import { socket } from '@/js/socket.js'
import EventBus from '@/js/EventBus'

/* ===== Globals ====== */
window.search_selected = ''
window.main_selected = ''
window.windows_stack = []

/* ===== Locals ===== */
let currentStack = {}

// Exporting this function out of the default export
// because it's used in components that are needed
// in this file too
export function showView(viewType, event) {
	// console.error('SHOW VIEW')
	const {
		currentTarget: {
			dataset: { id }
		}
	} = event

	switch (viewType) {
		case 'artist':
			EventBus.$emit('artistTab:reset')
			break
		case 'album':
		case 'playlist':
		case 'spotifyplaylist':
			EventBus.$emit('tracklistTab:reset')
			break

		default:
			break
	}

	socket.emit('getTracklist', { type: viewType, id })
	showTab(viewType, id)
}

export function showErrors(event) {
	EventBus.$emit('showErrors', event.data.item)
	changeTab(event.target, 'main', 'errors_tab')
}

export function updateSelected(newSelected) {
	currentStack.selected = newSelected
}

function analyzeLink(link) {
	EventBus.$emit('linkAnalyzerTab:reset')
	socket.emit('analyzeLink', link)
}

export function changeTab(sidebarEl, section, tabName) {
	// console.error('CHANGE TAB')
	// console.log(Array.from(arguments))
	windows_stack = []
	currentStack = {}

	// * The visualized content of the tab
	// ! Can be more than one per tab, happens in MainSearch and Favorites tab
	// ! because they have more tablinks (see below)
	const tabContent = document.getElementsByClassName(`${section}_tabcontent`)

	for (let i = 0; i < tabContent.length; i++) {
		tabContent[i].style.display = 'none'
	}

	// * Tabs inside the actual tab (like albums, tracks, playlists...)
	const tabLinks = document.getElementsByClassName(`${section}_tablinks`)

	for (let i = 0; i < tabLinks.length; i++) {
		tabLinks[i].classList.remove('active')
	}

	if (tabName === 'settings_tab' && main_selected !== 'settings_tab') {
		EventBus.$emit('settingsTab:revertSettings')
		EventBus.$emit('settingsTab:revertCredentials')
	}

	document.getElementById(tabName).style.display = 'block'

	if (section === 'main') {
		main_selected = tabName
	} else if ('search' === section) {
		search_selected = tabName
	}

	sidebarEl.classList.add('active')

	// Check if you need to load more content in the search tab
	if (
		main_selected === 'search_tab' &&
		['track_search', 'album_search', 'artist_search', 'playlist_search'].indexOf(search_selected) !== -1
	) {
		EventBus.$emit('mainSearch:checkLoadMoreContent', search_selected)
	}
}

function showTab(type, id, back = false) {
	// console.error('SHOW TAB')
	if (windows_stack.length == 0) {
		windows_stack.push({ tab: main_selected })
	} else if (!back) {
		if (currentStack.type === 'artist') {
			EventBus.$emit('artistTab:updateSelected')
		}

		windows_stack.push(currentStack)
	}

	window.tab = type == 'artist' ? 'artist_tab' : 'tracklist_tab'

	currentStack = { type, id }
	let tabcontent = document.getElementsByClassName('main_tabcontent')

	for (let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none'
	}

	document.getElementById(tab).style.display = 'block'
	TrackPreview.stopStackedTabsPreview()
}

function backTab() {
	// console.error('BACL TAB')
	if (windows_stack.length == 1) {
		document.getElementById(`main_${main_selected}link`).click()
	} else {
		// Retrieving tab type and tab id
		let data = windows_stack.pop()
		let { type, id } = data

		if (type === 'artist') {
			EventBus.$emit('artistTab:reset')

			if (data.selected) {
				EventBus.$emit('artistTab:changeTab', data.selected)
			}
		} else {
			EventBus.$emit('tracklistTab:reset')
		}

		socket.emit('getTracklist', { type, id })
		showTab(type, id, true)
	}

	TrackPreview.stopStackedTabsPreview()
}

function linkListeners() {
	const backButtons = Array.from(document.getElementsByClassName('back-button'))

	backButtons.forEach(button => {
		button.addEventListener('click', backTab)
	})
}

function init() {
	// Open default tab
	changeTab(document.getElementById('main_home_tablink'), 'main', 'home_tab')

	linkListeners()
}

export default {
	init,
	changeTab,
	showView,
	analyzeLink,
	showErrors
}
