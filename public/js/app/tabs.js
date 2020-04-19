var search_selected = ''
var main_selected = ''
var windows_stack = []
var currentStack = {}

function changeTab(evt, section, tabName) {
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
		document.getElementById('content').offsetHeight >= document.getElementById('content').scrollHeight &&
		main_selected == 'search_tab' &&
		['track_search', 'album_search', 'artist_search', 'playlist_search'].indexOf(search_selected) != -1
	) {
		scrolledSearch(window[search_selected.split('_')[0] + 'Search'])
	}
}

function showTab(type, id, back=false) {
	if (windows_stack.length == 0) windows_stack.push({ tab: main_selected })
	else if (!back) windows_stack.push(currentStack)
	if (type == 'artist') tab = 'artist_tab'
	else tab = 'tracklist_tab'
	currentStack = { type: type, id: id }
	let tabcontent = document.getElementsByClassName('main_tabcontent')
	for (let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none'
	}
	document.getElementById(tab).style.display = 'block'
}

function backTab() {
	if (windows_stack.length == 1) {
		clickElement('main_' + main_selected + 'link')
	} else {
		let tabObj = windows_stack.pop()
		if (tabObj.type == 'artist') resetArtistTab()
		else resetTracklistTab()
		socket.emit('getTracklist', {type: tabObj.type, id: tabObj.id})
		showTab(tabObj.type, tabObj.id, true)
	}
}

/**
 * Handles click Event on the sidebar and changes tab
 * according to clicked icon.
 * Uses event delegation
 * @param		{Event}		event
 * @since		?.?.?
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

document.getElementById('sidebar').addEventListener('click', handleSidebarClick)
