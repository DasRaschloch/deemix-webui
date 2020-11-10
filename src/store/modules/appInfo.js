/**
 * @typedef		{object}	AppInfo
 * @property	{string}	currentCommit
 * @property	{string}	latestCommit
 * @property	{boolean}	updateAvailable
 * @property	{string}	deemixVersion
 * @property	{number}	previewVolume
 */

/**
 * @returns	{AppInfo}
 */
const state = () => ({
	currentCommit: null,
	latestCommit: null,
	updateAvailable: false,
	deemixVersion: null,
	previewVolume: Number(localStorage.getItem('previewVolume')) || 100
})

const actions = {
	/**
	 * @param {any}			action
	 * @param {AppInfo}	payload
	 */
	setAppInfo({ commit }, payload) {
		commit('SET_CURRENT_COMMIT', payload.currentCommit)
		commit('SET_LATEST_COMMIT', payload.latestCommit)
		commit('SET_UPDATE_AVAILABLE', payload.updateAvailable)
		commit('SET_DEEMIX_VERSION', payload.deemixVersion)
	},
	/**
	 * @param {any}												action
	 * @param {AppInfo['previewVolume']}	payload
	 */
	setPreviewVolume({ commit }, payload) {
		commit('SET_PREVIEW_VOLUME', payload)
		localStorage.setItem('previewVolume', payload.toString())
	}
}

const getters = {
	/**
	 * @param		{AppInfo}	state
	 * @returns	{AppInfo}
	 */
	getAppInfo: state => state,
	/**
	 * @param		{AppInfo}	state
	 * @returns	{AppInfo['previewVolume']}
	 */
	getPreviewVolume: state => state.previewVolume
}

const mutations = {
	/**
	 * @param {AppInfo} state
	 * @param {AppInfo['currentCommit']} payload
	 */
	SET_CURRENT_COMMIT(state, payload) {
		state.currentCommit = payload
	},
	/**
	 * @param {AppInfo} state
	 * @param {AppInfo['latestCommit']} payload
	 */
	SET_LATEST_COMMIT(state, payload) {
		state.latestCommit = payload
	},
	/**
	 * @param {AppInfo} state
	 * @param {AppInfo['updateAvailable']} payload
	 */
	SET_UPDATE_AVAILABLE(state, payload) {
		state.updateAvailable = payload
	},
	/**
	 * @param {AppInfo} state
	 * @param {AppInfo['deemixVersion']} payload
	 */
	SET_DEEMIX_VERSION(state, payload) {
		state.deemixVersion = payload
	},
	/**
	 * @param {AppInfo} state
	 * @param {AppInfo['previewVolume']} payload
	 */
	SET_PREVIEW_VOLUME(state, payload) {
		state.previewVolume = payload
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
