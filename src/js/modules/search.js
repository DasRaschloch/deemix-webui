import MainSearch from './components/main-search.js'
import Utils from './utils.js'
import QualityModal from './quality-modal.js'
import Downloads from './downloads.js'
import { socket } from './socket.js'
import Tabs from './tabs.js'

function linkListeners() {
	document.getElementById('content').addEventListener('scroll', Utils.debounce(handleContentScroll, 100))
	document.getElementById('searchbar').addEventListener('keyup', handleSearchBarKeyup)
}

// Load more content when the search page is at the end
function handleContentScroll(event) {
	let contentElement = event.target

	if (contentElement.scrollTop + contentElement.clientHeight >= contentElement.scrollHeight) {
		if (
			main_selected === 'search_tab' &&
			['track_search', 'album_search', 'artist_search', 'playlist_search'].indexOf(search_selected) != -1
		) {
			MainSearch.scrolledSearch(search_selected.split('_')[0])
		}
	}
}

function handleSearchBarKeyup(e) {
	// Enter key
	if (e.keyCode !== 13) return

	let term = this.value

	if (Utils.isValidURL(term)) {
		if (e.ctrlKey) {
			QualityModal.open(term)
		} else {
			if (window.main_selected == 'analyzer_tab') {
				Tabs.analyzeLink(term)
			} else {
				Downloads.sendAddToQueue(term)
			}
		}
	} else {
		if (term === '') return

		if (term !== MainSearch.results.query || main_selected == 'search_tab') {
			document.getElementById('search_tab_content').style.display = 'none'
			socket.emit('mainSearch', { term })

			// Showing loading placeholder
			document.getElementById('content').style.display = 'none'
			document.getElementById('search_placeholder').classList.toggle('loading_placeholder--hidden')
		} else {
			document.getElementById('search_tab_content').style.display = 'block'
			document.getElementById('main_search_tablink').click()
		}
	}
}

export default {
	linkListeners
}
