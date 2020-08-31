import Vue from 'vue'

const state = {
	list: []
}

let chartsCached = false

const actions = {
	/**
	 * @param {object} context
	 * @param {object[]} payload
	 */
	cacheCharts({ commit }, payload) {
		if (chartsCached) return

		payload.forEach((chartObj, index) => {
			commit('SET_UNKNOWN_CHART', { index, chartObj })
		})

		chartsCached = true
	}
}

const getters = {
	getCharts: state => state.list
}

const mutations = {
	SET_UNKNOWN_CHART(state, payload) {
		Vue.set(state.list, payload.index, payload.chartObj)
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
