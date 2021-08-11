import { ref } from '@vue/composition-api'

import store from '@/store'
import { fetchData } from '@/utils/api'

const favoriteArtists = ref([])
const favoriteAlbums = ref([])
const favoriteSpotifyPlaylists = ref([])
const favoritePlaylists = ref([])
const favoriteTracks = ref([])

const isRefreshingFavorites = ref(false)

const setAllFavorites = data => {
	const { tracks, albums, artists, playlists } = data

	isRefreshingFavorites.value = false

	favoriteArtists.value = artists
	favoriteAlbums.value = albums
	favoritePlaylists.value = playlists
	favoriteTracks.value = tracks
}

const refreshFavorites = ({ isInitial = false }) => {
	if (!isInitial) {
		isRefreshingFavorites.value = true
	}

	fetchData('getUserFavorites').then(setAllFavorites).catch(console.error)

	if (store.getters.isLoggedWithSpotify) {
		fetchData('getUserSpotifyPlaylists', {
			spotifyUser: store.getters.getSpotifyUser.id
		})
			.then(spotifyPlaylists => {
				favoriteSpotifyPlaylists.value = spotifyPlaylists
			})
			.catch(console.error)
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
