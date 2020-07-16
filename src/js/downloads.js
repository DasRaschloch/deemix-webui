import { socket } from '@/js/socket.js'

function sendAddToQueue(url, bitrate = null) {
	if (url != '') {
		socket.emit('addToQueue', { url: url, bitrate: bitrate }, () => {})
	}
}

export default {
	sendAddToQueue
}
