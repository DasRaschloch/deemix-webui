import ArtistTab from './components/artist-tab.js'
import TracklistTab from './components/tracklist-tab.js'
import LinkAnalyzerTab from './components/link-analyzer-tab.js'
import HomeTab from './components/home-tab.js'
import ChartsTab from './components/charts-tab.js'
import FavoritesTab from './components/favorites-tab.js'
import ErrorsTab from './components/errors-tab.js'
import { socket } from './socket.js'
import SettingsTab from './components/settings-tab.js'
import MainSearch from './components/main-search.js'
import TrackPreview from './track-preview.js'

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
	const {
		currentTarget: {
			dataset: { id }
		}
	} = event

	switch (viewType) {
		case 'artist':
			ArtistTab.reset()
			break
		case 'album':
		case 'playlist':
		case 'spotifyplaylist':
			TracklistTab.reset()
			break

		default:
			break
	}

	socket.emit('getTracklist', { type: viewType, id })
	showTab(viewType, id)
}

export function showErrors(event) {
	ErrorsTab.showErrors(event.data.item)
	changeTab(event.target, 'main', 'errors_tab')
}

function analyzeLink(link) {
	LinkAnalyzerTab.reset()
	socket.emit('analyzeLink', link)
}

function linkListeners() {
	document.getElementById('search_tab').addEventListener('click', handleSearchTabClick)
	document.getElementById('favorites_tab').addEventListener('click', handleFavoritesTabClick)
	document.getElementById('sidebar').addEventListener('click', handleSidebarClick)

	const backButtons = Array.from(document.getElementsByClassName('back-button'))

	backButtons.forEach(button => {
		button.addEventListener('click', backTab)
	})
}

/**
 * Handles click Event on the sidebar and changes tab
 * according to clicked icon.
 * Uses event delegation
 * @param		{Event}		event
 * @since		0.1.0
 */
function handleSidebarClick(event) {
	const { target } = event

	const wantToChangeTab = target.matches('.main_tablinks') || target.parentElement.matches('.main_tablinks')
	const wantToChangeTheme = target.matches('.theme_toggler')

	if (!(wantToChangeTab || wantToChangeTheme)) return

	let sidebarEl
	let targetID

	if (wantToChangeTab) {
		sidebarEl = target.matches('.main_tablinks') ? target : target.parentElement
		targetID = sidebarEl.id
	} else {
		sidebarEl = target
		targetID = 'theme_toggler'
	}

	switch (targetID) {
		case 'main_search_tablink':
			changeTab(sidebarEl, 'main', 'search_tab')
			break
		case 'main_home_tablink':
			changeTab(sidebarEl, 'main', 'home_tab')
			break
		case 'main_charts_tablink':
			changeTab(sidebarEl, 'main', 'charts_tab')
			break
		case 'main_favorites_tablink':
			changeTab(sidebarEl, 'main', 'favorites_tab')
			break
		case 'main_analyzer_tablink':
			changeTab(sidebarEl, 'main', 'analyzer_tab')
			break
		case 'main_settings_tablink':
			changeTab(sidebarEl, 'main', 'settings_tab')
			break
		case 'main_about_tablink':
			changeTab(sidebarEl, 'main', 'about_tab')
			break
		case 'theme_toggler':
			document.querySelector('.theme_toggler--active').classList.remove('theme_toggler--active')
			sidebarEl.classList.add('theme_toggler--active')

			const {
				dataset: { themeVariant }
			} = sidebarEl

			document.documentElement.setAttribute('data-theme', themeVariant)

			localStorage.setItem('selectedTheme', themeVariant)

			document.querySelectorAll('*').forEach(el => {
				el.style.transition = 'all 200ms ease-in-out'
			})

			document.documentElement.addEventListener('transitionend', function transitionHandler() {
				document.querySelectorAll('*').forEach(el => {
					el.style.transition = ''
				})

				document.documentElement.removeEventListener('transitionend', transitionHandler)
			})

			break

		default:
			break
	}
}

function handleSearchTabClick(event) {
	const {
		target,
		target: { id }
	} = event

	switch (id) {
		case 'search_all_tab':
			changeTab(target, 'search', 'main_search')
			break
		case 'search_track_tab':
			changeTab(target, 'search', 'track_search')
			break
		case 'search_album_tab':
			changeTab(target, 'search', 'album_search')
			break
		case 'search_artist_tab':
			changeTab(target, 'search', 'artist_search')
			break
		case 'search_playlist_tab':
			changeTab(target, 'search', 'playlist_search')
			break

		default:
			break
	}
}

function handleFavoritesTabClick(event) {
	const {
		target,
		target: { id }
	} = event

	switch (id) {
		case 'favorites_playlist_tab':
			changeTab(target, 'favorites', 'playlist_favorites')
			break
		case 'favorites_album_tab':
			changeTab(target, 'favorites', 'album_favorites')
			break
		case 'favorites_artist_tab':
			changeTab(target, 'favorites', 'artist_favorites')
			break
		case 'favorites_track_tab':
			changeTab(target, 'favorites', 'track_favorites')
			break

		default:
			break
	}
}

function changeTab(sidebarEl, section, tabName) {
	windows_stack = []
	currentStack = {}
	var i, tabcontent, tablinks
	tabcontent = document.getElementsByClassName(section + '_tabcontent')
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none'
	}
	tablinks = document.getElementsByClassName(section + '_tablinks')
	// tablinks = document.getElementsByClassName('section-tabs__tab')
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].classList.remove('active')
	}
	if (tabName == 'settings_tab' && main_selected != 'settings_tab') {
		SettingsTab.settings = { ...SettingsTab.lastSettings }
		SettingsTab.spotifyCredentials = { ...SettingsTab.lastCredentials }
		SettingsTab.spotifyUser = (' ' + SettingsTab.lastUser).slice(1)
	}

	document.getElementById(tabName).style.display = 'block'

	if ('main' === section) {
		main_selected = tabName
	} else if ('search' === section) {
		search_selected = tabName
	}

	sidebarEl.classList.add('active')

	// Check if you need to load more content in the search tab
	if (
		main_selected == 'search_tab' &&
		['track_search', 'album_search', 'artist_search', 'playlist_search'].indexOf(search_selected) != -1 &&
		MainSearch.results[search_selected.split('_')[0] + 'Tab'].data.length == 0
	) {
		// console.log(search_selected.split('_')[0] + 'Tab')

		MainSearch.search(search_selected.split('_')[0])
	}
}

function showTab(type, id, back = false) {
	if (windows_stack.length == 0) {
		windows_stack.push({ tab: main_selected })
	} else if (!back) {
		if (currentStack.type === 'artist') currentStack.selected = ArtistTab.getCurrentTab()
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
	if (windows_stack.length == 1) {
		document.getElementById(`main_${main_selected}link`).click()
	} else {
		// Retrieving tab type and tab id
		let data = windows_stack.pop()
		let { type, id } = data

		if (type === 'artist') {
			ArtistTab.reset()
			if (data.selected) ArtistTab.changeTab(data.selected)
		} else {
			TracklistTab.reset()
		}
		socket.emit('getTracklist', { type, id })
		showTab(type, id, true)
	}

	TrackPreview.stopStackedTabsPreview()
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
