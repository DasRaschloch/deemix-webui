import { ref } from '@vue/composition-api'
import { get } from '@/utils/api'

const searchResult = ref({})

function performMainSearch(searchTerm) {
	get('mainSearch', { term: searchTerm })
	.then(data => {
		searchResult.value = data
	})
}

export function useMainSearch() {
	return {
		searchResult,
		performMainSearch
	}
}
