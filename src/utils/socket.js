import store from '@/store'

export const socket = io.connect(window.location.href)

socket.on('init_update', data => {
	store.dispatch('setAboutInfo', data)
})
