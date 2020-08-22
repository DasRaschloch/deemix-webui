import Vuex from 'vuex'
import Vue from 'vue'

import home from '@/store/modules/home'

// Load Vuex
Vue.use(Vuex)

console.log(process.env.NODE_ENV)

// Create store
export default new Vuex.Store({
	modules: {
		home
	},
	strict: process.env.NODE_ENV !== 'production'
})
