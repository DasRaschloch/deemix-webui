import EventBus from '@/utils/EventBus'
import router from '@/router'

/* ===== Globals ====== */
window.search_selected = ''
window.main_selected = ''
window.windows_stack = []
window.currentStack = {}

// Used only in errors tab
export function changeTab(sidebarEl, section, tabName) {
	window.windows_stack = []
	window.currentStack = {}

	// * Only in section search
	updateTabLink(section)

	// * Only when clicking the settings icon in the sidebar
	// resetSettings(tabName)

	// * Only in section search
	setSelectedTab(section, tabName)

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

function resetSettings(tabName) {
	if (tabName === 'settings_tab' && window.main_selected !== 'settings_tab') {
		EventBus.$emit('settingsTab:revertSettings')
		EventBus.$emit('settingsTab:revertCredentials')
	}
}

function updateTabLink(section) {
	// * Tabs inside the actual tab (like albums, tracks, playlists...)
	// * or sidebar links
	if (section == 'main') return

	const tabLinks = document.getElementsByClassName(`${section}_tablinks`)

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
}

/**
 * Goes back to the previous tab according to the global window stack.
 */
export function backTab() {
	// ! Need to implement the memory of the opened artist tab
	router.back()
}

export function init() {
	// Open default tab
	changeTab(document.getElementById('main_home_tablink'), 'main', 'home_tab')
}
