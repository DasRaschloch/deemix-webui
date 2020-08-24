import Vue from 'vue'

const state = {
	albums: {
		data: [],
		total: 0
	},
	artists: {
		data: [],
		total: 0
	},
	playlists: {
		data: [],
		total: 0
	},
	podcasts: {
		data: [],
		total: 0
	},
	tracks: {
		data: [],
		total: 0
	}
}

let homeDataCached = false

const actions = {
	cacheHomeData({ commit }, payload) {
		if (homeDataCached) return

		commit('SET_HOME_ALBUMS', payload.albums)
		commit('SET_HOME_ARTISTS', payload.artists)
		commit('SET_HOME_PLAYLISTS', payload.playlists)
		commit('SET_HOME_PODCASTS', payload.podcasts)
		commit('SET_HOME_TRACKS', payload.tracks)

		homeDataCached = true
	}
}

const getters = {
	getHomeData: state => state,
	getHomeAlbums: state => state.albums,
	getHomeArtists: state => state.artists,
	getHomePlaylists: state => state.playlists,
	getHomePodcasts: state => state.podcasts,
	getHomeTracks: state => state.tracks
}

const mutations = {
	SET_HOME_ALBUMS: (state, payload) => {
		Vue.set(state.albums, 'data', payload.data)
		// state.albums.data = payload.data
		state.albums.total = payload.total
	},
	SET_HOME_ARTISTS: (state, payload) => {
		Vue.set(state.artists, 'data', payload.data)
		// state.artists.data = payload.data
		state.artists.total = payload.total
	},
	SET_HOME_PLAYLISTS: (state, payload) => {
		Vue.set(state.playlists, 'data', payload.data)
		// state.playlists.data = payload.data
		state.playlists.total = payload.total
	},
	SET_HOME_PODCASTS: (state, payload) => {
		Vue.set(state.podcasts, 'data', payload.data)
		// state.podcasts.data = payload.data
		state.podcasts.total = payload.total
	},
	SET_HOME_TRACKS: (state, payload) => {
		Vue.set(state.tracks, 'data', payload.data)
		// state.tracks.data = payload.data
		state.tracks.total = payload.total
	}
}

export default {
	state,
	actions,
	getters,
	mutations
}
