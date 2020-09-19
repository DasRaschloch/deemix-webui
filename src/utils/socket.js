import store from '@/store'

export const socket = io.connect(window.location.href)

socket.on('connect', () => {
	document.getElementById('start_app_placeholder').classList.add('loading_placeholder--hidden')
})

socket.on('init_charts', charts => {
	store.dispatch('cacheCharts', charts)
})

socket.on('init_favorites', favorites => {
	store.dispatch('setFavorites', favorites)
})

socket.on('init_settings', (settings, credentials, defaults) => {
	store.dispatch('setSettings', settings)
	store.dispatch('setDefaultSettings', defaults)
	store.dispatch('setCredentials', credentials)
})

socket.on('init_home', data => {
	store.dispatch('cacheHomeData', data)
})

socket.on('init_update', data => {
	store.dispatch('setAboutInfo', data)
})
