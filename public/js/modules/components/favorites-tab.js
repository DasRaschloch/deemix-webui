import { socket } from '../socket.js'
import { playlistView, artistView, albumView } from '../tabs.js'
import Downloads from '../downloads.js'
import QualityModal from '../quality-modal.js'
import TrackPreview from '../track-preview.js'
import Utils from '../utils.js'

const FavoritesTab = new Vue({
	data() {
		return {
			tracks: [],
			albums: [],
			artists: [],
			playlists: []
		}
	},
	methods: {
		playlistView,
		artistView,
		albumView,
		playPausePreview: TrackPreview.playPausePreview,
		previewMouseEnter: TrackPreview.previewMouseEnter,
		previewMouseLeave: TrackPreview.previewMouseLeave,
		convertDuration: Utils.convertDuration,
		addToQueue(e) {
			e.stopPropagation()
			Downloads.sendAddToQueue(e.currentTarget.dataset.link)
		},
		openQualityModal(e) {
			QualityModal.open(e.currentTarget.dataset.link)
		},
		initFavorites(data) {
			this.tracks = data.tracks
			this.albums = data.albums
			this.artists = data.artists
			this.playlists = data.playlists
			document.getElementById('favorites_playlist_tab').click()
		}
	},
	mounted() {
		socket.on('init_favorites', this.initFavorites)
	}
}).$mount('#favorites_tab')

export default FavoritesTab
