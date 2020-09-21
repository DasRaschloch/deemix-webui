import Vuex from 'vuex'
import Vue from 'vue'

import settings from '@/store/modules/settings'
import defaultSettings from '@/store/modules/defaultSettings'
import spotifyCredentials from '@/store/modules/spotifyCredentials'
import favorites from '@/store/modules/favorites'
import about from '@/store/modules/about'
import login from '@/store/modules/login'
import errors from '@/store/modules/errors'

// Load Vuex
Vue.use(Vuex)

// Create store
export default new Vuex.Store({
	modules: {
		settings,
		defaultSettings,
		spotifyCredentials,
		favorites,
		about,
		login,
		errors
	},
	strict: process.env.NODE_ENV !== 'production'
})
