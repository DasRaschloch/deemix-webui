import Vuex from 'vuex'
import Vue from 'vue'

import home from '@/store/modules/home'
import settings from '@/store/modules/settings'
import defaultSettings from '@/store/modules/defaultSettings'
import spotifyCredentials from '@/store/modules/spotifyCredentials'
import charts from '@/store/modules/charts'
import favorites from '@/store/modules/favorites'
import about from '@/store/modules/about'
import login from '@/store/modules/login'
import errors from '@/store/modules/errors'

// Load Vuex
Vue.use(Vuex)

// Create store
export default new Vuex.Store({
	modules: {
		home,
		settings,
		defaultSettings,
		spotifyCredentials,
		charts,
		favorites,
		about,
		login,
		errors
	},
	strict: process.env.NODE_ENV !== 'production'
})
