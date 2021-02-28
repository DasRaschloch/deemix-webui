import { ref } from '@vue/composition-api'
import { get } from '@/utils/api'

const result = ref({})

function performSearch({ term, type, start = 0, nb = 30 }) {
	get('search', {
		term,
		type,
		start,
		nb
	}).then(data => {
		result.value = data
	})
}

export function useSearch() {
	return {
		result,
		performSearch
	}
}
