import MainSearch from './main-search.js'
import Utils from './utils.js'
import QualityModal from './quality-modal.js'
import Downloads from './downloads.js'
import { socket } from './socket.js'
import { analyzeLink } from './tabs.js'

export default class Search {
	static linkListeners() {
		document.getElementById('content').addEventListener('scroll', Utils.debounce(Search.handleContentScroll, 100))
		document.getElementById('searchbar').addEventListener('keyup', Search.handleSearchBarKeyup)
	}

	// Load more content when the search page is at the end
	static handleContentScroll(event) {
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

	static handleSearchBarKeyup(e) {
		if (e.keyCode == 13) {
			let term = this.value
			if (Utils.isValidURL(term)) {
				if (e.ctrlKey) {
					QualityModal.open(term)
				} else {
          if (window.main_selected  == 'analyzer_tab'){
            analyzeLink(term)
          }else{
            Downloads.sendAddToQueue(term)
          }
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
	}
}
