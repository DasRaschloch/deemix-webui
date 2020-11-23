import { ref, computed } from '@vue/composition-api'
import { socket } from '@/utils/socket'

const searchResult = ref({})
const lastTermSearched = ref(null)

function performSearch(searchTerm) {
	if (searchTerm === lastTermSearched.value) return

	// TODO Handle multiple, subsequent calls
	// TODO Caching
	socket.emit('mainSearch', { term: searchTerm })

	socket.on('mainSearch', data => {
		lastTermSearched.value = searchTerm
		searchResult.value = data

		socket.off('mainSearch')
	})
}

export function useMainSearch() {
	return {
		searchResult,
		performSearch
	}
}

// socket.on('mainSearch', saveMainSearchResult)

// saveMainSearchResult(searchResult) {
// 	// Hide loading placeholder
// 	this.$root.$emit('updateSearchLoadingState', false)

// 	this.results.query = searchResult.QUERY

// 	this.results.allTab = searchResult
// 	this.results.allTab.TRACK.hasLoaded = true
// 	this.results.allTab.ALBUM.hasLoaded = true
// 	this.results.allTab.ARTIST.hasLoaded = true
// 	this.results.allTab.PLAYLIST.hasLoaded = true

// 	this.results.trackTab = { ...resetObj }
// 	this.results.albumTab = { ...resetObj }
// 	this.results.artistTab = { ...resetObj }
// 	this.results.playlistTab = { ...resetObj }
// },
