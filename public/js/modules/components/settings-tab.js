import { toast } from '../toasts.js'
import { socket } from '../socket.js'

const SettingsTab = new Vue({
	data() {
		return {
			settings: { tags: {} },
			lastSettings: {},
			lastCredentials: {},
			spotifyFeatures: {},
      defaultSettings: {}
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
			this.lastSettings = { ...SettingsTab.settings }
			this.lastCredentials = { ...SettingsTab.spotifyFeatures }
			socket.emit('saveSettings', this.lastSettings, this.lastCredentials)
		},
		loadSettings(settings, spotifyCredentials, defaults=null) {
      if (defaults) this.defaultSettings = { ...defaults }
			this.lastSettings = { ...settings }
			this.lastCredentials = { ...spotifyCredentials }
			this.settings = settings
			this.spotifyFeatures = spotifyCredentials
		},
		login() {
			let arl = this.$refs.loginInput.value
			if (arl != '' && arl != localStorage.getItem('arl')) {
				socket.emit('login', arl, true)
			}
		},
		logout() {
			socket.emit('logout')
		},
		initSettings(settings, credentials, defaults) {
			this.loadSettings(settings, credentials, defaults)
			toast('Settings loaded!', 'settings')
		},
		updateSettings(settings, credentials) {
			this.loadSettings(settings, credentials)
			toast('Settings updated!', 'settings')
		},
    resetSettings(){
      this.settings = { ...this.defaultSettings }
    }
	},
	mounted() {
		socket.on('init_settings', this.initSettings)
		socket.on('updateSettings', this.updateSettings)
	}
}).$mount('#settings_tab')

export default SettingsTab
