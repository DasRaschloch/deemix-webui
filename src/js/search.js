import Utils from '@/js/utils.js'
import Downloads from '@/js/downloads.js'
import Tabs from '@/js/tabs.js'
import EventBus from '@/js/EventBus.js'

function linkListeners() {
	document.getElementById('content').addEventListener('scroll', Utils.debounce(handleContentScroll, 100))
	document.getElementById('searchbar').addEventListener('keyup', handleSearchBarKeyup)
}

// Load more content when the search page is at the end
function handleContentScroll(event) {
	let contentElement = event.target

	if (contentElement.scrollTop + contentElement.clientHeight < contentElement.scrollHeight) return

	if (
		main_selected === 'search_tab' &&
		['track_search', 'album_search', 'artist_search', 'playlist_search'].indexOf(search_selected) != -1
	) {
		EventBus.$emit('mainSearch:scrolledSearch', search_selected.split('_')[0])
	}
}

function handleSearchBarKeyup(e) {
	// Enter key
	if (e.keyCode !== 13) return

	let term = this.value

	if (Utils.isValidURL(term)) {
		if (e.ctrlKey) {
			// ! Temporary
			App.$root.$emit('QualityModal:open', term)
		} else {
			if (window.main_selected == 'analyzer_tab') {
				Tabs.analyzeLink(term)
			} else {
				Downloads.sendAddToQueue(term)
			}
		}
	} else {
		if (term === '') return

		EventBus.$emit('mainSearch:showNewResults', term, main_selected)
	}
}

export default {
	linkListeners
}
