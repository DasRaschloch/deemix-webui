var search_selected = ''
var main_selected = ''
var windows_stack = []
var currentStack = {}

function changeTab(evt, section, tabName) {
	console.log( {evt, section, tabName} );
	windows_stack = []
	currentStack = {}
	var i, tabcontent, tablinks
	tabcontent = document.getElementsByClassName(section + '_tabcontent')
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none'
	}
	tablinks = document.getElementsByClassName(section + '_tablinks')
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(' active', '')
	}
	if (tabName == 'settings_tab' && main_selected != 'settings_tab') {
		settingsTab.settings = { ...lastSettings }
	}
	console.log( {tabName} );
	
	document.getElementById(tabName).style.display = 'block'
	window[section + '_selected'] = tabName
	evt.currentTarget.className += ' active'
	// Check if you need to load more content in the search tab
	if (
		document.getElementById('content').offsetHeight >= document.getElementById('content').scrollHeight &&
		main_selected == 'search_tab' &&
		['track_search', 'album_search', 'artist_search', 'playlist_search'].indexOf(search_selected) != -1
	) {
		scrolledSearch(window[search_selected.split('_')[0] + 'Search'])
	}
}

function showTab(type, id){
	if (windows_stack.length == 0)
		windows_stack.push({tab: main_selected})
	else
		windows_stack.push(currentStack)
	if (type == 'artist')
		tab = 'artist_tab'
	else
		tab = 'tracklist_tab'
	currentStack = {type: type, id: id}
	let tabcontent = document.getElementsByClassName('main_tabcontent')
	for (let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none'
	}
	document.getElementById(tab).style.display = 'block'
}

function backTab(){
	if (windows_stack.length == 1){
		clickElement("main_"+main_selected+"link")
	}else{
		let tabObj = windows_stack.pop()
		showTab(tabObj.type, tabObj.id)
	}
}
