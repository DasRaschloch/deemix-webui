import Vue from 'vue'

const state = {
	albums: [],
	artists: [],
	playlists: [],
	tracks: []
}

const actions = {
	setFavorites({ commit, dispatch }, payload) {
		payload.playlists.forEach((playlist, index) => {
			commit('SET_FAVORITES_PLAYLISTS', { index, data: playlist })
		})

		payload.albums.forEach((album, index) => {
			commit('SET_FAVORITES_ALBUMS', { index, data: album })
		})

		payload.artists.forEach((artist, index) => {
			commit('SET_FAVORITES_ARTISTS', { index, data: artist })
		})

		dispatch('setFavoritesTracks', payload.tracks)
	},
	setFavoritesTracks({ commit }, payload) {
		payload.forEach((track, index) => {
			commit('SET_FAVORITES_TRACKS', { index, data: track })
		})
	}
}

const getters = {
	getFavorites: state => state,
	getFavoritesAlbums: state => state.albums,
	getFavoritesArtists: state => state.artists,
	getFavoritesPlaylists: state => state.playlists,
	getFavoritesTracks: state => state.tracks
}

const mutations = {
	SET_FAVORITES_ALBUMS: (state, payload) => {
		Vue.set(state.albums, payload.index, payload.data)
	},
	SET_FAVORITES_ARTISTS: (state, payload) => {
		Vue.set(state.artists, payload.index, payload.data)
	},
	SET_FAVORITES_PLAYLISTS: (state, payload) => {
		Vue.set(state.playlists, payload.index, payload.data)
	},
	SET_FAVORITES_TRACKS: (state, payload) => {
		Vue.set(state.tracks, payload.index, payload.data)
	}
}

export default {
	state,
	actions,
	getters,
	mutations
}
