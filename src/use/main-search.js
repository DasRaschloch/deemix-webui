import { ref } from '@vue/composition-api'
import { fetchApi } from '@/utils/api'

const searchResult = ref({})

function performMainSearch(searchTerm) {
	fetchApi('mainSearch', { term: searchTerm }).then(data => {
		searchResult.value = data
	})
}

export function useMainSearch() {
	return {
		searchResult,
		performMainSearch
	}
}
