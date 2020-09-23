import Vuex from 'vuex'
import Vue from 'vue'

import about from '@/store/modules/about'
import login from '@/store/modules/login'
import errors from '@/store/modules/errors'

// Load Vuex
Vue.use(Vuex)

// Create store
export default new Vuex.Store({
	modules: {
		about,
		login,
		errors
	},
	strict: process.env.NODE_ENV !== 'production'
})
