import { socket } from '@/utils/socket'

let chartsData = {}
let cached = false

export function getChartsData() {
	if (cached) {
		return chartsData
	} else {
		socket.emit('get_charts_data')

		return new Promise((resolve, reject) => {
			socket.on('init_charts', data => {
				chartsData = data
				cached = true

				resolve(data)
			})
		})
	}
}
