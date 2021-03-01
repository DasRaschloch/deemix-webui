let wasEventListenerAdded = false

class CustomSocket extends WebSocket {
	constructor(args) {
		super(args)
	}
	emit(key, data) {
		if (this.readyState !== WebSocket.OPEN) return false

		this.send(JSON.stringify({ key, data }))
	}
	on(key, cb) {
		if (!wasEventListenerAdded) {
			wasEventListenerAdded = true

			this.addEventListener('message', event => {
				const messageData = JSON.parse(event.data)

				if (messageData.key === key) {
					cb(messageData.data)
				}
			})
		}
	}
	off() {
		console.log('off!')
		// this.removeEventListener('message')
	}
}

export const socket = new CustomSocket('ws://' + location.host + '/')
