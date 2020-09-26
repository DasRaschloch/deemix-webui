import router from '@/router'

/* ===== Globals ====== */
window.main_selected = ''

export function showView(viewType, event) {
	const {
		currentTarget: {
			dataset: { id }
		}
	} = event
	const isArtist = viewType === 'artist'
	const name = isArtist ? 'Artist' : 'Tracklist'
	const params = isArtist ? { id } : { type: viewType, id }

	router.push({
		name,
		params
	})
}
