import Vue from 'vue/dist/vue.esm'
import { socket } from '../socket.js'
import { artistView, albumView, playlistView } from '../tabs.js'
import Downloads from '../downloads.js'
import QualityModal from '../quality-modal.js'
import TrackPreview from '../track-preview.js'
import Utils from '../utils.js'

const HomeTab = new Vue({
	data() {
		return {
			playlists: []
		}
	},
	methods: {
		artistView,
		albumView,
		playlistView,
		openSettings(e){
			document.getElementById("main_settings_tablink").click()
		},
		addToQueue(e) {
			e.stopPropagation()
			Downloads.sendAddToQueue(e.currentTarget.dataset.link)
		},
		openQualityModal(e) {
			QualityModal.open(e.currentTarget.dataset.link)
		},
		initHome(data) {
			this.playlists = data.playlists.data
		}
	},
	mounted() {
		socket.on('init_home', this.initHome)
	}
}).$mount('#home_tab')

export default HomeTab
