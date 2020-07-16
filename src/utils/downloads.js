import { socket } from '@/utils/socket'

function sendAddToQueue(url, bitrate = null) {
	if (url != '') {
		socket.emit('addToQueue', { url: url, bitrate: bitrate }, () => {})
	}
}

export default {
	sendAddToQueue
}
