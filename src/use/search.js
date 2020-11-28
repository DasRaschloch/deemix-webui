import { ref } from '@vue/composition-api'
import { socket } from '@/utils/socket'

const result = ref({})

function performSearch({ term, type, start = 0, nb = 30 }) {
	socket.emit('search', {
		term,
		type,
		start,
		nb
	})

	socket.on('search', data => {
		result.value = data

		socket.off('search')
	})
}

export function useSearch() {
	return {
		result,
		performSearch
	}
}
