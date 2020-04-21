import { toast } from './toasts.js'
import { socket } from './socket.js'

// Globals
window.lastSettings = {}
window.lastCredentials = {}

export const SettingsTab = new Vue({
	data() {
		return {
			settings: { tags: {} },
			spotifyFeatures: {}
		}
	},
	methods: {
		copyARLtoClipboard() {
			let copyText = this.$refs.loginInput

			copyText.setAttribute('type', 'text')
			copyText.select()
			copyText.setSelectionRange(0, 99999)
			document.execCommand('copy')
			copyText.setAttribute('type', 'password')

			toast('ARL copied to clipboard', 'assignment')
		},
		saveSettings() {
			console.log(socket)

			lastSettings = { ...SettingsTab.settings }
			lastCredentials = { ...SettingsTab.spotifyFeatures }
			socket.emit('saveSettings', lastSettings, lastCredentials)
		},
		login() {
			let arl = this.$refs.loginInput.value
			if (arl != '' && arl != localStorage.getItem('arl')) {
				socket.emit('login', arl, true)
			}
		},
		logout() {
			socket.emit('logout')
		}
	}
}).$mount('#settings_tab')

socket.on('init_settings', function (settings, credentials) {
	loadSettings(settings, credentials)
	toast('Settings loaded!', 'settings')
})

socket.on('updateSettings', function (settings, credentials) {
	loadSettings(settings, credentials)
	toast('Settings updated!', 'settings')
})

function loadSettings(settings, spotifyCredentials) {
	lastSettings = { ...settings }
	lastCredentials = { ...spotifyCredentials }
	SettingsTab.settings = settings
	SettingsTab.spotifyFeatures = spotifyCredentials
}
