import { socket } from '@/utils/socket'

let settingsData = {}
let defaultSettingsData = {}
let spotifyCredentials = {}

let cached = false

export function getSettingsData() {
	if (cached) {
		return { settingsData, defaultSettingsData, spotifyCredentials }
	} else {
		socket.emit('get_settings_data')

		return new Promise((resolve, reject) => {
			socket.on('init_settings', (settings, credentials, defaults) => {
				settingsData = settings
				defaultSettingsData = defaults
				spotifyCredentials = credentials
				// cached = true

				socket.off('init_settings')
				resolve({ settingsData, defaultSettingsData, spotifyCredentials })
			})
		})
	}
}
