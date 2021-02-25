import store from '@/store'

class CustomSocket extends WebSocket {
  constructor(args) {
    super(args)
		console.log(args)
  }

	emit(key, data) {
		console.log("emit:", key, data)
		console.log(this.readyState)
		if (this.readyState != WebSocket.OPEN) return false
		this.send(JSON.stringify({key:key, data:data}))
	}

	on(key, callback) {
		this.addEventListener('message', function(event){
			console.log(event.data)
			let data = JSON.parse(event.data)
			if (data.key == key) callback(data.data)
		})
	}
}

export const socket = new CustomSocket('ws://' + location.host + '/')
