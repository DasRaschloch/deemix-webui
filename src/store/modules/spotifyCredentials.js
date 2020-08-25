const state = {
	clientId: '',
	clientSecret: ''
}

const actions = {
	setCredentials({ commit }, payload) {
		commit('SET_CLIENT_ID', payload.clientId)
		commit('SET_CLIENT_SECRET', payload.clientSecret)
	}
}

const getters = {
	getCredentials: state => state
}

const mutations = {
	SET_CLIENT_ID(state, payload) {
		state.clientId = payload
	},
	SET_CLIENT_SECRET(state, payload) {
		state.clientSecret = payload
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
