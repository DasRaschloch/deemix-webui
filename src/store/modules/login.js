const getDefaultState = () => {
	return {
		arl: '',
		status: null,
		user: {
			id: null,
			name: '',
			picture: ''
		}
	}
}

const state = getDefaultState()

const actions = {
	login({ commit }, payload) {
		const { arl, user, status } = payload

		commit('SET_ARL', arl)
		commit('SET_USER', user)
		commit('SET_STATUS', status)
	},
	logout({ commit }) {
		console.log('logout')
		commit('RESET_LOGIN')

		localStorage.removeItem('arl')
	},
	setARL({ commit }, payload) {
		const { arl, saveOnLocalStorage } = payload

		commit('SET_ARL', arl)

		if (saveOnLocalStorage) {
			localStorage.setItem('arl', arl)
		}
	},
	removeARL({ commit }) {
		commit('SET_ARL', '')

		localStorage.removeItem('arl')
	},
	setUser({ commit }, payload) {
		commit('SET_USER', payload)
	}
}

const getters = {
	getARL: state => state.arl,
	getUser: state => state.user,
	isLoggedIn: state => [1, 2, 3].indexOf(state.status) !== -1
}

const mutations = {
	SET_ARL(state, payload) {
		state.arl = payload
	},
	SET_STATUS(state, payload) {
		state.status = payload
	},
	SET_USER(state, payload) {
		state.user = payload
	},
	RESET_LOGIN(state) {
		// Needed for reactivity
		Object.assign(state, getDefaultState())
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
