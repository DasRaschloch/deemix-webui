import Vuex from 'vuex'
import Vue from 'vue'

import home from '@/store/modules/home'
import settings from '@/store/modules/settings'

// Load Vuex
Vue.use(Vuex)

// Create store
export default new Vuex.Store({
	modules: {
		home,
		settings
	},
	strict: process.env.NODE_ENV !== 'production'
})
