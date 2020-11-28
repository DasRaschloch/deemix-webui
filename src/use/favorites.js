import { ref } from '@vue/composition-api'

import store from '@/store'
import { socket } from '@/utils/socket'

const favoriteArtists = ref([])
const favoriteAlbums = ref([])
const favoriteSpotifyPlaylists = ref([])
const favoritePlaylists = ref([])
const favoriteTracks = ref([])

const isRefreshingFavorites = ref(false)

if (store.getters.isLoggedIn) {
	refreshFavorites({ isInitial: true })
}

function refreshFavorites({ isInitial = false }) {
	if (!isInitial) {
		isRefreshingFavorites.value = true
	}

	socket.emit('get_favorites_data')

	if (store.getters.isLoggedWithSpotify) {
		socket.emit('update_userSpotifyPlaylists', store.getters.getSpotifyUser.id)
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

	favoriteArtists.value = artists
	favoriteAlbums.value = albums
	favoritePlaylists.value = playlists
	favoriteTracks.value = tracks
}

socket.on('updated_userFavorites', data => {
	setAllFavorites(data)
	// Commented out because the corresponding emit function is never called at the moment
	// therefore isRefreshingFavorites is never set to true
	// isRefreshingFavorites.value = false
})
socket.on('init_favorites', data => {
	setAllFavorites(data)
	isRefreshingFavorites.value = false
})

socket.on('updated_userSpotifyPlaylists', data => {
	favoriteSpotifyPlaylists.value = data
})
socket.on('updated_userSpotifyPlaylists', data => {
	favoriteSpotifyPlaylists.value = data
})
socket.on('updated_userPlaylists', data => {
	favoritePlaylists.value = data
})
socket.on('updated_userAlbums', data => {
	favoriteAlbums.value = data
})
socket.on('updated_userArtist', data => {
	favoriteArtists.value = data
})
socket.on('updated_userTracks', data => {
	favoriteTracks.value = data
})
