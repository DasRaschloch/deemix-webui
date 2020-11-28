import { ref } from '@vue/composition-api'
import { socket } from '@/utils/socket'

const searchResult = ref({})

function performMainSearch(searchTerm) {
	socket.emit('mainSearch', { term: searchTerm })

	socket.on('mainSearch', data => {
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
