import Vue from 'vue/dist/vue.esm'
import { socket } from '../socket.js'
import { playlistView, artistView, albumView, spotifyPlaylistView } from '../tabs.js'
import Downloads from '../downloads.js'
import QualityModal from '../quality-modal.js'
import TrackPreview from '../track-preview.js'
import Utils from '../utils.js'

const SpotifyTab = new Vue({
	data() {
		return {
			tracks: [],
			albums: [],
			artists: [],
			playlists: [],
			spotifyPlaylists: [],
			spotifyNativePlaylists: [],
			spotifyTracks: []
		}
	},
	methods: {
		playlistView,
		artistView,
		albumView,
		spotifyPlaylistView,
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
		updated_userSpotifyPlaylists(data){this.spotifyPlaylists = data},
		updated_userSpotifyNativePlaylists(data){this.spotifyNativePlaylists = data},
		initSpotify(data) {
            console.log(data)
			this.tracks = []
			this.albums = []
			this.artists = []
            this.playlists = []
			this.updated_userSpotifyNativePlaylists(data)
			this.spotifyTracks = []
			document.getElementById('spotify_playlist_tab').click()
		},
		selectedLinks() {
			var selected = []
			if (this.spotifyPlaylists) {
				this.spotifyPlaylists.forEach(item => {
					if (item.selected)
						selected.push(item.id)
				})
			}
			return selected.join(';')
		},
		selectedLinksNative() {
			var selected = []
			if (this.spotifyNativePlaylists) {
				this.spotifyNativePlaylists.forEach(item => {
					if (item.selected)
						selected.push(item.id)
				})
			}
			return selected.join(';')
		},
		comparePlaylists(e) {
			e.stopPropagation()
			//console.log(e) // e == MouseEvent 
			console.log(e.currentTarget.dataset.link)
			socket.emit('getTracklistFromSpotifyPlaylists', { playlists: e.currentTarget.dataset.link })
		},
		mergePlaylists(e) {
			e.stopPropagation()
			//console.log(e) // e == MouseEvent 
			console.log(e.currentTarget.dataset.link)
			socket.emit('mergeSpotifyPlaylists', { playlists: e.currentTarget.dataset.link })
		}
	},
	mounted() {
		socket.on('init_spotify', this.initSpotify)
	}
}).$mount('#spotify_tab')

export default SpotifyTab
