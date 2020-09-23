import Vue from 'vue'

const state = {}

const actions = {
	setDefaultSettings({ commit }, payload) {
		for (const settingName in payload) {
			if (!payload.hasOwnProperty(settingName)) return

			const settingValue = payload[settingName]
			commit('SET_UNKNOWN_DEFAULT_SETTING', { settingName, settingValue })
		}
	}
}

const getters = {
	getDefaultSettings: state => state
}

const mutations = {
	SET_UNKNOWN_DEFAULT_SETTING(state, payload) {
		Vue.set(state, payload.settingName, payload.settingValue)
	}
}

export default {
	state,
	actions,
	getters,
	mutations
}
