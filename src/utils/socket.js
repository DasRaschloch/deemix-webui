import store from '@/store'

export const socket = io.connect(window.location.href)

socket.on('connect', () => {
	document.getElementById('start_app_placeholder').classList.add('loading_placeholder--hidden')
})

// socket.on('init_charts', data => {
// 	console.log(data)
// })

socket.on('init_settings', (settings, credentials, defaults) => {
	console.log(credentials)
	store.dispatch('setSettings', settings)
	store.dispatch('setDefaultSettings', defaults)
	store.dispatch('setCredentials', credentials)
})

socket.on('init_home', data => {
	store.dispatch('cacheHomeData', data)
})
