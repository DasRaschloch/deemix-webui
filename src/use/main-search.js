import { ref, computed } from '@vue/composition-api'
import { socket } from '@/utils/socket'

const searchResult = ref({})
const lastTermSearched = ref(null)

function performMainSearch(searchTerm) {
	if (searchTerm === lastTermSearched.value) return

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
		performMainSearch
	}
}
