import { socket } from '@/utils/socket'
import EventBus from '@/utils/EventBus'
import router from '@/router'

/* ===== Globals ====== */
window.search_selected = ''
window.main_selected = ''
window.windows_stack = []
window.currentStack = {}

/**
 * Changes the tab to the wanted one
 * Need to understand the difference from showTab
 *
 * Needs EventBus
 */
export function changeTab(sidebarEl, section, tabName) {
	window.windows_stack = []
	window.currentStack = {}

	// hideTabContent(section)
	// * Only in section search
	updateTabLink(section)

	// * Only when clicking the settings icon in the sidebar
	resetSettings(tabName)

	// showSelectedTab(tabName)

	// * Only in section main & search
	setSelectedTab(section, tabName)

	// setSidebarElementActive(sidebarEl)

	// * Only if window.main_selected === 'search_tab'
	checkNeedToLoadMoreContent()
}

function setSelectedTab(section, tabName) {
	if (section === 'main') {
		window.main_selected = tabName
	} else if (section === 'search') {
		window.search_selected = tabName
	}
}

function checkNeedToLoadMoreContent() {
	// * Check if you need to load more content in the search tab
	// * Happens when the user changes the tab in the main search
	if (
		window.main_selected === 'search_tab' &&
		['track_search', 'album_search', 'artist_search', 'playlist_search'].indexOf(window.search_selected) !== -1
	) {
		EventBus.$emit('mainSearch:checkLoadMoreContent', window.search_selected)
	}
}

function setSidebarElementActive(sidebarEl) {
	sidebarEl.classList.add('active')
}

function showSelectedTab(tabName) {
	// * The tab we want to show
	console.log('Tabs who get display block')
	if (document.getElementById(tabName)) {
		document.getElementById(tabName).style.display = 'block'
	}
}

function resetSettings(tabName) {
	if (tabName === 'settings_tab' && window.main_selected !== 'settings_tab') {
		EventBus.$emit('settingsTab:revertSettings')
		EventBus.$emit('settingsTab:revertCredentials')
	}
}

function hideTabContent(section) {
	// * The visualized content of the tab
	// ! Can be more than one per tab, happens in MainSearch and Favorites tab
	// ! because they have more tablinks (see below)

	const tabContent = document.getElementsByClassName(`${section}_tabcontent`)

	for (let i = 0; i < tabContent.length; i++) {
		if (!tabContent[i] || tabContent[i].matches('.main_tabcontent')) continue

		tabContent[i].style.display = 'none'
	}
}

function updateTabLink(section) {
	// * Tabs inside the actual tab (like albums, tracks, playlists...)
	// * or sidebar links
	if (section == 'main') return

	const tabLinks = document.getElementsByClassName(`${section}_tablinks`)
	// console.log(tabLinks)
	// console.trace()

	for (let i = 0; i < tabLinks.length; i++) {
		tabLinks[i].classList.remove('active')
	}
}

export function showView(viewType, event) {
	const {
		currentTarget: {
			dataset: { id }
		}
	} = event
	const isArtist = viewType === 'artist'
	const name = isArtist ? 'Artist' : 'Tracklist'
	const params = isArtist ? { id } : { type: viewType, id }

	router.push({
		name,
		params
	})

	// showTab(viewType, id)
}

/**
 * Shows the passed tab, keeping track of the one that the user is coming from.
 *
 * Needs EventBus
 */
function showTab(type, id, back = false) {
	return
	// updateStack(type, id, back)
	window.tab = type === 'artist' ? 'artist_tab' : 'tracklist_tab'
	// displayTabs()
}

function updateStack(type, id, back) {
	if (window.windows_stack.length === 0) {
		window.windows_stack.push({
			tab: window.main_selected
		})
	} else if (!back) {
		if (window.currentStack.type === 'artist') {
			EventBus.$emit('artistTab:updateSelected')
		}

		window.windows_stack.push(window.currentStack)
	}

	window.currentStack = { type, id }
}

function displayTabs() {
	let tabcontent = document.getElementsByClassName('main_tabcontent')

	for (let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none'
	}

	let newTab = document.getElementById(window.tab)

	if (newTab) {
		newTab.style.display = 'block'
	}
}

/**
 * Goes back to the previous tab according to the global window stack.
 *
 * Needs EventBus and socket
 */
export function backTab() {
	router.back()

	// ! Need to implement the memory of the opened artist tab
	return

	if (window.windows_stack.length == 1) {
		console.log(window.main_selected)
		if (document.getElementById(`main_${window.main_selected}link`)) {
			// document.getElementById(`main_${window.main_selected}link`).click()
		}
	} else {
		// Retrieving tab type and tab id
		let data = window.windows_stack.pop()
		let { type, id, selected } = data

		if (type === 'artist' && selected) {
			EventBus.$emit('artistTab:changeTab', selected)
		}

		// showTab(type, id, true)
	}
}

export function init() {
	// Open default tab
	changeTab(document.getElementById('main_home_tablink'), 'main', 'home_tab')
}
