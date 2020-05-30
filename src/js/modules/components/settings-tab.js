import Vue from 'vue'
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
		spotifyUser: '',
		slimDownloads: false,
		previewVolume: window.vol,
		accountNum: 0,
		accounts: []
	}),
	computed: {
		changeSlimDownloads: {
			get() {
				return this.slimDownloads
			},
			set(wantSlimDownloads) {
				this.slimDownloads = wantSlimDownloads
				document.getElementById('download_list').classList.toggle('slim', wantSlimDownloads)
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
		updateMaxVolume(){
			localStorage.setItem('previewVolume', this.previewVolume.preview_max_volume)
		},
		saveSettings() {
			this.lastSettings = { ...this.settings }
			this.lastCredentials = { ...this.spotifyFeatures }
			let changed = false
			if (this.lastUser != this.spotifyUser) {
				// force cloning without linking
				this.lastUser = (' ' + this.spotifyUser).slice(1)
				localStorage.setItem('spotifyUser', this.lastUser)
				changed = true
			}

			socket.emit('saveSettings', this.lastSettings, this.lastCredentials, changed ? this.lastUser : false)
		},
		loadSettings(settings, spotifyCredentials, defaults = null) {
			if (defaults) {
				this.defaultSettings = { ...defaults }
			}

			this.lastSettings = { ...settings }
			this.lastCredentials = { ...spotifyCredentials }
			this.settings = settings
			this.spotifyFeatures = spotifyCredentials
		},
		login() {
			let arl = this.$refs.loginInput.value
			if (arl != '' && arl != localStorage.getItem('arl')) {
				socket.emit('login', arl, true, this.accountNum)
			}
		},
		changeAccount(){
			socket.emit('changeAccount', this.accountNum)
		},
		accountChanged(user, accountNum){
			this.$refs.username.innerText = user.name
			this.$refs.userpicture.src = `https://e-cdns-images.dzcdn.net/images/user/${user.picture}/125x125-000000-80-0-0.jpg`
			this.accountNum = accountNum
			localStorage.setItem('accountNum', this.accountNum)
		},
		initAccounts(accounts){
			this.accounts = accounts;
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
		this.$refs.loggedInInfo.classList.add('hide')

		if (localStorage.getItem('arl')) {
			this.$refs.loginInput.value = localStorage.getItem('arl')
		}
		if (localStorage.getItem('accountNum')) {
			this.accountNum = localStorage.getItem('accountNum')
		}

		let spotifyUser = localStorage.getItem('spotifyUser')

		if (spotifyUser) {
			this.lastUser = spotifyUser
			this.spotifyUser = spotifyUser
			socket.emit('update_userSpotifyPlaylists', spotifyUser)
		}

		this.changeSlimDownloads = 'true' === localStorage.getItem('slimDownloads')

		let volume = parseInt(localStorage.getItem('previewVolume'))
		if (isNaN(volume)){
			volume = 80
			localStorage.setItem('previewVolume', volume)
		}
		window.vol.preview_max_volume = volume


		socket.on('init_settings', this.initSettings)
		socket.on('updateSettings', this.updateSettings)
		socket.on('accountChanged', this.accountChanged)
		socket.on('familyAccounts', this.initAccounts)
	}
}).$mount('#settings_tab')

export default SettingsTab
