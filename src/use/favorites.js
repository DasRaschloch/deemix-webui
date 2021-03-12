import { ref } from '@vue/composition-api'

import store from '@/store'
import { socket } from '@/utils/socket'
import { fetchData } from '@/utils/api'

const favoriteArtists = ref([])
const favoriteAlbums = ref([])
const favoriteSpotifyPlaylists = ref([])
const favoritePlaylists = ref([])
const favoriteTracks = ref([])

const isRefreshingFavorites = ref(false)

if (store.getters.isLoggedIn) {
	refreshFavorites({ isInitial: true })
}

async function refreshFavorites({ isInitial = false }) {
	if (!isInitial) {
		isRefreshingFavorites.value = true
	}

	const favorites = await fetchData('getUserFavorites')

	setAllFavorites(favorites)

	if (store.getters.isLoggedWithSpotify) {
		// TODO
		const spotifyPlaylists = await fetchData('getUserSpotifyPlaylists', {
			spotifyUser: store.getters.getSpotifyUser.id
		})
		console.log({ spotifyPlaylists })
		favoriteSpotifyPlaylists.value = spotifyPlaylists
	}
}

export function useFavorites() {
	return {
		favoriteArtists,
		favoriteAlbums,
		favoriteSpotifyPlaylists,
		favoritePlaylists,
		favoriteTracks,
		isRefreshingFavorites,
		refreshFavorites
	}
}

function setAllFavorites(data) {
	const { tracks, albums, artists, playlists } = data

	isRefreshingFavorites.value = false

	favoriteArtists.value = artists
	favoriteAlbums.value = albums
	favoritePlaylists.value = playlists
	favoriteTracks.value = tracks
}
