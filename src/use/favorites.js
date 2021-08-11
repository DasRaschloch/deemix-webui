import { ref, computed, watchEffect } from '@vue/composition-api'

import store from '@/store'
import { fetchData } from '@/utils/api'
import { SPOTIFY_STATUS } from '@/constants'

const favoriteArtists = ref([])
const favoriteAlbums = ref([])
const favoriteSpotifyPlaylists = ref([])
const favoritePlaylists = ref([])
const favoriteTracks = ref([])
const isLoggedWithSpotify = computed(() => store.getters.isLoggedWithSpotify)

const isRefreshingFavorites = ref(false)

const setAllFavorites = data => {
	const { tracks, albums, artists, playlists } = data

	isRefreshingFavorites.value = false

	favoriteArtists.value = artists
	favoriteAlbums.value = albums
	favoritePlaylists.value = playlists
	favoriteTracks.value = tracks
}

const setSpotifyPlaylists = response => {
	if (response.error === 'spotifyNotEnabled') {
		favoriteSpotifyPlaylists.value = []

		store.dispatch('setSpotifyStatus', SPOTIFY_STATUS.DISABLED).catch(console.error)
		return
	}

	favoriteSpotifyPlaylists.value = response
}

const refreshFavorites = async ({ isInitial = false }) => {
	if (!isInitial) {
		isRefreshingFavorites.value = true
	}

	await store.dispatch('refreshSpotifyStatus')

	fetchData('getUserFavorites').then(setAllFavorites).catch(console.error)

	if (isLoggedWithSpotify.value) {
		const spotifyUser = store.getters.getSpotifyUser.id

		fetchData('getUserSpotifyPlaylists', { spotifyUser }).then(setSpotifyPlaylists).catch(console.error)
	} else {
		favoriteSpotifyPlaylists.value = []
	}
}

export const useFavorites = () => ({
	favoriteArtists,
	favoriteAlbums,
	favoriteSpotifyPlaylists,
	favoritePlaylists,
	favoriteTracks,
	isRefreshingFavorites,
	refreshFavorites
})
