import { toast } from '../toasts.js'
import { socket } from '../socket.js'

const SettingsTab = new Vue({
	data: () => ({
		settings: { tags: {} },
		lastSettings: {},
		spotifyFeatures: {},
		lastCredentials: {},
		defaultSettings: {},
		lastUser: '',
		spotifyUser: ''
	}),
	computed: {
		darkMode: {
			get() {
				return 'true' === localStorage.getItem('darkMode')
			},
			set(wantDarkMode) {
				document.documentElement.setAttribute('data-theme', wantDarkMode ? 'dark' : 'default')
				localStorage.setItem('darkMode', wantDarkMode)
			}
		},
		slimDownloads: {
			get() {
				return 'true' === localStorage.getItem('slimDownloads')
			},
			set(wantSlimDownloads) {
				if (wantSlimDownloads)
					document.getElementById("download_list").classList.add("slim")
				else
					document.getElementById("download_list").classList.remove("slim")
				localStorage.setItem('slimDownloads', wantSlimDownloads)
			}
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
			let changed = false
			if (this.lastUser != this.spotifyUser){
				// force cloning without linking
				this.lastUser = (' ' + this.spotifyUser).slice(1)
				localStorage.setItem('spotifyUser', this.lastUser)
				changed = true
			}
			socket.emit('saveSettings', this.lastSettings, this.lastCredentials, changed ? this.lastUser : false)
		},
		loadSettings(settings, spotifyCredentials, defaults = null) {
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
		resetSettings() {
			this.settings = { ...this.defaultSettings }
		}
	},
	mounted() {
		socket.on('init_settings', this.initSettings)
		socket.on('updateSettings', this.updateSettings)
		let spotyUser = localStorage.getItem('spotifyUser')
		if (spotyUser){
			this.lastUser = spotyUser
			this.spotifyUser = spotyUser
		}
	}
}).$mount('#settings_tab')

export default SettingsTab
