import { isEmpty } from 'lodash-es'
import Vue from 'vue'
import { socket } from '../socket.js'
import { showView } from '../tabs.js'
import Downloads from '../downloads.js'
import QualityModal from '../quality-modal.js'
import TrackPreview from '../track-preview.js'
import Utils from '../utils.js'

const TracklistTab = new Vue({
	data: () => ({
		title: '',
		metadata: '',
		release_date: '',
		label: '',
		explicit: false,
		image: '',
		type: '',
		link: '',
		body: []
	}),
	methods: {
		artistView: showView.bind(null, 'artist'),
		albumView: showView.bind(null, 'album'),
		playPausePreview: TrackPreview.playPausePreview,
		reset() {
			this.title = 'Loading...'
			this.image = ''
			this.metadata = ''
			this.label = ''
			this.release_date = ''
			this.explicit = false
			this.type = ''
			this.body = []
		},
		addToQueue(e) {
			Downloads.sendAddToQueue(e.currentTarget.dataset.link)
		},
		openQualityModal(e) {
			QualityModal.open(e.currentTarget.dataset.link)
		},
		toggleAll(e) {
			this.body.forEach(item => {
				if (item.type == 'track') {
					item.selected = e.currentTarget.checked
				}
			})
		},
		selectedLinks() {
			var selected = []
			if (this.body) {
				this.body.forEach(item => {
					if (item.type == 'track' && item.selected)
						selected.push(this.type == 'Spotify Playlist' ? item.uri : item.link)
				})
			}
			return selected.join(';')
		},
		convertDuration: Utils.convertDuration,
		showAlbum(data) {
			const {
				id: albumID,
				title: albumTitle,
				explicit_lyrics,
				label: albumLabel,
				artist: { name: artistName },
				tracks: albumTracks,
				tracks: { length: numberOfTracks },
				release_date,
				cover_xl
			} = data

			this.type = 'Album'
			this.link = `https://www.deezer.com/album/${albumID}`
			this.title = albumTitle
			this.explicit = explicit_lyrics
			this.label = albumLabel
			this.metadata = `${artistName} • ${numberOfTracks} songs`
			this.release_date = release_date.substring(0, 10)
			this.image = cover_xl

			if (isEmpty(albumTracks)) {
				this.body = null
			} else {
				this.body = albumTracks
			}
		},
		showPlaylist(data) {
			const {
				id: playlistID,
				title: playlistTitle,
				picture_xl: playlistCover,
				creation_date,
				creator: { name: creatorName },
				tracks: playlistTracks,
				tracks: { length: numberOfTracks }
			} = data

			this.type = 'Playlist'
			this.link = `https://www.deezer.com/playlist/${playlistID}`
			this.title = playlistTitle
			this.image = playlistCover
			this.release_date = creation_date.substring(0, 10)
			this.metadata = `by ${creatorName} • ${numberOfTracks} songs`

			if (isEmpty(playlistTracks)) {
				this.body = null
			} else {
				this.body = playlistTracks
			}
		},
		showSpotifyPlaylist(data) {
			const {
				uri: playlistURI,
				name: playlistName,
				images,
				images: { length: numberOfImages },
				owner: { display_name: ownerName },
				tracks: playlistTracks,
				tracks: { length: numberOfTracks }
			} = data

			this.type = 'Spotify Playlist'
			this.link = playlistURI
			this.title = playlistName
			this.image = numberOfImages
				? images[0].url
				: 'https://e-cdns-images.dzcdn.net/images/cover/d41d8cd98f00b204e9800998ecf8427e/1000x1000-000000-80-0-0.jpg'
			this.release_date = ''
			this.metadata = `by ${ownerName} • ${numberOfTracks} songs`

			if (isEmpty(playlistTracks)) {
				this.body = null
			} else {
				this.body = playlistTracks
			}
		}
	},
	mounted() {
		socket.on('show_album', this.showAlbum)
		socket.on('show_playlist', this.showPlaylist)
		socket.on('show_spotifyplaylist', this.showSpotifyPlaylist)
	}
}).$mount('#tracklist_tab')

export default TracklistTab
