const state = {
	currentCommit: null,
	latestCommit: null,
	updateAvailable: false,
	deemixVersion: null
}

const actions = {
	setAboutInfo({ commit }, payload) {
		commit('SET_CURRENT_COMMIT', payload.currentCommit)
		commit('SET_LATEST_COMMIT', payload.latestCommit)
		commit('SET_UPDATE_AVAILABLE', payload.updateAvailable)
		commit('SET_DEEMIX_VERSION', payload.deemixVersion)
	}
}

const getters = {
	getAboutInfo: state => state
}

const mutations = {
	SET_CURRENT_COMMIT: (state, payload) => {
		state.currentCommit = payload
	},
	SET_LATEST_COMMIT: (state, payload) => {
		state.latestCommit = payload
	},
	SET_UPDATE_AVAILABLE: (state, payload) => {
		state.updateAvailable = payload
	},
	SET_DEEMIX_VERSION: (state, payload) => {
		state.deemixVersion = payload
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
