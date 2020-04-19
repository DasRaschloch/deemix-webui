const SettingsTab = new Vue({
	el: '#settings_tab',
	data: {
		settings: { tags: {} },
		spotifyFeatures: {}
	},
	methods: {
		addListeners() {
			document.getElementById('settings_btn_save').addEventListener('click', saveSettings)
			document.getElementById('settings_btn_copyArl').addEventListener('click', copyARLtoClipboard)
			document.getElementById('settings_btn_logout').addEventListener('click', logout)
		}
	},
	mounted() {
		this.addListeners()
	}
})

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

function saveSettings() {
	lastSettings = { ...SettingsTab.settings }
	lastCredentials = { ...SettingsTab.spotifyFeatures }
	socket.emit('saveSettings', lastSettings, lastCredentials)
}

function copyARLtoClipboard() {
	$('#login_input_arl').attr('type', 'text')
	let copyText = document.querySelector('#login_input_arl')
	copyText.select()
	copyText.setSelectionRange(0, 99999)
	document.execCommand('copy')
	$('#login_input_arl').attr('type', 'password')
	toast('ARL copied to clipboard', 'assignment')
}

function logout() {
	socket.emit('logout')
}
