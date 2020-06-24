import Vue from 'vue'
import { socket } from '@/js/socket.js'
import { showView } from '@/js/tabs.js'
import Downloads from '@/js/downloads.js'
import QualityModal from '@/js/quality-modal.js'

const HomeTab = new Vue({
	data() {
		return {
			playlists: [],
			albums: []
		}
	},
	methods: {
		artistView: showView.bind(null, 'artist'),
		albumView: showView.bind(null, 'album'),
		playlistView: showView.bind(null, 'playlist'),
		openSettings() {
			document.getElementById('main_settings_tablink').click()
		},
		addToQueue(e) {
			Downloads.sendAddToQueue(e.currentTarget.dataset.link)
		},
		openQualityModal(e) {
			QualityModal.open(e.currentTarget.dataset.link)
		},
		initHome(data) {
			const {
				playlists: { data: playlistData },
				albums: { data: albumData }
			} = data

			this.playlists = playlistData
			this.albums = albumData
		}
	},
	mounted() {
		if (localStorage.getItem('arl')) {
			this.$refs.notLogged.classList.add('hide')
		}

		socket.on('init_home', this.initHome)
	}
}).$mount('#home_tab')

export default HomeTab
