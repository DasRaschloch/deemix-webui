import store from '@/store'
import io from 'socket.io-client'

export const socket = io.connect('/')

socket.on('init_update', data => {
	store.dispatch('setAppInfo', data)
})
