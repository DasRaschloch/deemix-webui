import store from '@/store'

export const socket = io.connect('/')

socket.on('init_update', data => {
	store.dispatch('setAppInfo', data)
})
