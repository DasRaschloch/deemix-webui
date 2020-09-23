import { socket } from '@/utils/socket'

let homeData = {}
let cached = false

export function getHomeData() {
	if (cached) {
		return homeData
	} else {
		socket.emit('get_home_data')

		return new Promise((resolve, reject) => {
			socket.on('init_home', data => {
				homeData = data
				cached = true

				socket.off('init_home')
				resolve(data)
			})
		})
	}
}
