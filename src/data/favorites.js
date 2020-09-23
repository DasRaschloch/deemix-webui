import { socket } from '@/utils/socket'

let favoritesData = {}
let cached = false

export function getFavoritesData() {
	if (cached) {
		return favoritesData
	} else {
		socket.emit('get_favorites_data')

		return new Promise((resolve, reject) => {
			socket.on('init_favorites', data => {
				favoritesData = data
				cached = true

				socket.off('init_favorites')
				resolve(data)
			})
		})
	}
}
