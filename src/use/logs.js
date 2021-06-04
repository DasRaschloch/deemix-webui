import { ref } from '@vue/composition-api'
import { socket } from '@/utils/socket'

const messages = ref([])

socket.addEventListener('message', event => {
	const newMessage = JSON.parse(event.data)

	messages.value.push(Object.freeze(newMessage))
})

export const useLogs = () => {
	return messages
}
