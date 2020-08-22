const state = {
	homeData: {
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
}

let homeDataCached = false

const actions = {
	cacheHomeData({ commit }, payload) {
		if (!homeDataCached) {
			commit('SET_HOME_ALBUMS', payload.albums)
			commit('SET_HOME_ARTISTS', payload.artists)
			commit('SET_HOME_PLAYLISTS', payload.playlists)
			commit('SET_HOME_PODCASTS', payload.podcasts)
			commit('SET_HOME_TRACKS', payload.tracks)

			homeDataCached = true
		}
	}
}

const getters = {
	getHomeData: store => store.homeData,
	getHomeAlbums: store => store.homeData.albums,
	getHomeArtists: store => store.homeData.artists,
	getHomePlaylists: store => store.homeData.playlists,
	getHomePodcasts: store => store.homeData.podcasts,
	getHomeTracks: store => store.homeData.tracks
}

const mutations = {
	SET_HOME_DATA: (state, payload) => {
		state.homeData = payload
	},
	SET_HOME_ALBUMS: (state, payload) => {
		state.homeData.albums.data = payload.data
		state.homeData.albums.total = payload.total
	},
	SET_HOME_ARTISTS: (state, payload) => {
		state.homeData.artists.data = payload.data
		state.homeData.artists.total = payload.total
	},
	SET_HOME_PLAYLISTS: (state, payload) => {
		state.homeData.playlists.data = payload.data
		state.homeData.playlists.total = payload.total
	},
	SET_HOME_PODCASTS: (state, payload) => {
		state.homeData.podcasts.data = payload.data
		state.homeData.podcasts.total = payload.total
	},
	SET_HOME_TRACKS: (state, payload) => {
		state.homeData.tracks.data = payload.data
		state.homeData.tracks.total = payload.total
	}
}

export default {
	state,
	actions,
	getters,
	mutations
}
