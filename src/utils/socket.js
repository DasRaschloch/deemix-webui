import store from '@/store'

class CustomSocket extends WebSocket {
  constructor(args) {
    super(args)
  }

	emit(key, data) {
		if (this.readyState != WebSocket.OPEN) return false
		this.send(JSON.stringify({key:key, data:data}))
	}

	on(key, callback) {
		this.addEventListener('message', function(event){
			let data = JSON.parse(event.data)
      console.log(data)
			if (data.key == key) callback(data.data)
		})
	}
}

export const socket = new CustomSocket('ws://' + location.host + '/')
