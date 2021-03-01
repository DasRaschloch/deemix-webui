import { socket } from '@/utils/socket'
import { fetchData } from '@/utils/api'

let chartsData = {}
let cached = false

export function getChartsData() {
	if (cached) {
		return chartsData
	} else {
		socket.emit('get_charts_data')
		fetchData('getCharts')

		return new Promise((resolve, reject) => {
			socket.on('init_charts', data => {
				chartsData = data
				cached = true

				socket.off('init_charts')
				resolve(data)
			})
		})
	}
}
