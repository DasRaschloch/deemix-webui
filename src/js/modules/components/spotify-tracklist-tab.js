import _ from 'lodash'
import Vue from 'vue/dist/vue.esm'
import { socket } from '../socket.js'
import { albumView, artistView, spotifyTracklistResultView, spotifyPlaylistView } from '../tabs.js'
import Downloads from '../downloads.js'
import QualityModal from '../quality-modal.js'
import TrackPreview from '../track-preview.js'

const SpotifyTracklistTab = new Vue({
	data: () => ({
		title: '',
		metadata: '',
		release_date: '',
		label: '',
		explicit: false,
		image: '',
		type: '',
		link: '',
		head: null,
		body: [],
		includedPlaylists: [],
		showTracksInSinglePlaylistOnly: false,
		hideTrackIfNoPlaylistSelected: false,
		showTracksInMultiplePlaylistOnly: false

	}),
	methods: {
		artistView,
		albumView,
		spotifyPlaylistView,
		playPausePreview: TrackPreview.playPausePreview,
		reset() {
			this.title = 'Loading...'
			this.image = ''
			this.metadata = ''
			this.label = ''
			this.release_date = ''
			this.explicit = false
			this.type = ''
			this.head = []
			this.body = []
			this.includedPlaylists = []
			this.showTracksInSinglePlaylistOnly = false
			this.hideTrackIfNoPlaylistSelected = false
			this.showTracksInMultiplePlaylistOnly = false
		},
		addToQueue(e) {
			e.stopPropagation()
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
		convertDuration(duration) {
			//convert from seconds only to mm:ss format
			let mm, ss
			mm = Math.floor(duration / 60)
			ss = duration - mm * 60
			//add leading zero if ss < 0
			if (ss < 10) {
				ss = '0' + ss
			}
			return mm + ':' + ss
		},
		showAlbum(data) {
			this.type = 'Album'
			this.link = `https://www.deezer.com/album/${data.id}`
			this.title = data.title
			this.explicit = data.explicit_lyrics
			this.label = data.label
			this.metadata = `${data.artist.name} • ${data.tracks.length} songs`
			this.release_date = data.release_date.substring(0, 10)
			this.image = data.cover_xl
			this.head = [
				{ title: '<i class="material-icons">music_note</i>', width: '24px' },
				{ title: '#' },
				{ title: 'Song' },
				{ title: 'Artist' },
				{ title: '<i class="material-icons">timer</i>', width: '40px' }
			]
			if (_.isEmpty(data.tracks)) {
				console.log('show e lodash ok')

				this.body = null
			} else {
				this.body = data.tracks
			}
		},
		showPlaylist(data) {
			this.type = 'Playlist'
			this.link = `https://www.deezer.com/playlist/${data.id}`
			this.title = data.title
			this.image = data.picture_xl
			this.release_date = data.creation_date.substring(0, 10)
			this.metadata = `by ${data.creator.name} • ${data.tracks.length} songs`
			this.head = [
				{ title: '<i class="material-icons">music_note</i>', width: '24px' },
				{ title: '#' },
				{ title: 'Song' },
				{ title: 'Artist' },
				{ title: 'Album' },
				{ title: '<i class="material-icons">timer</i>', width: '40px' }
			]
			if (_.isEmpty(data.tracks)) {
				this.body = null
			} else {
				this.body = data.tracks
			}
		},
		showSpotifyPlaylist(data) {
			console.log(data)
			this.type = 'Spotify Playlist'
			this.link = data.uri
			this.title = `from ${data.name}`
			//this.title = `from ${data.name.split(";").forEach(function(e){return " • " + e})}`
			this.image = data.images.length
				? data.images[0].url
				: 'https://e-cdns-images.dzcdn.net/images/cover/d41d8cd98f00b204e9800998ecf8427e/1000x1000-000000-80-0-0.jpg'
			this.release_date = ''
			this.metadata = `by ${data.owner.display_name} • ${data.tracks.length} songs`
			this.head = [
				{ title: '<i class="material-icons">music_note</i>', width: '24px' },
				{ title: '#' },
				{ title: 'Song' },
				{ title: 'Artist' },
				{ title: 'Album' },
				{ title: 'Length <i class="material-icons">timer</i>', width: '40px' },
				{ title: 'Playlist <i class="material-icons">playlist_play</i>', width: '40px' }
			]
			if (_.isEmpty(data.tracks)) {
				this.body = null
			} else {
				this.body = data.tracks
			}

			if (_.isEmpty(data.includedPlaylists)) {
				this.includedPlaylists = null
			} else {
				// select all
				data.includedPlaylists.forEach(function(pl) {
													pl.selected = true
												})
				this.includedPlaylists = data.includedPlaylists
			}
            document.getElementById('spotify_result_tab').click()
            // // let map = new Map(data)
            // // console.log(map)


            // let tracks = []
            // for (obj in data) {
			// 	tracks.push(obj)
            //     //tracks.push(obj.track.name)
            // }
			// console.log(tracks)
			
            // if (_.isEmpty(data.tracks)){
			// 	this.body = null
            // } else {
			// 	this.body = data.tracks
            // }
            
			// if (_.isEmpty(data.tracks)) {
			// 	this.body = null
			// } else {
			// 	this.body = data.tracks
			// }
		},
		getPlaylistObj(playlistId) {
			
			for (k = 0; k < this.includedPlaylists.length; k++) {
				includedPlId = this.includedPlaylists[k].id
				if (includedPlId == playlistId) {
					return this.includedPlaylists[k]
				}
			}
			return null
		},
		trackInMoreThanOnePlaylist(track) {
			if(track.inPlaylists.length>1)
				return true
			else
				return false
			
		},
		trackInVisiblePlaylist(track) {
			//console.log(this.includedPlaylists[0].id)
			//console.log(track.inPlaylists[0])
			
			for (i = 0; i < track.inPlaylists.length; i++) {
				plId = track.inPlaylists[i]
				for (k = 0; k < this.includedPlaylists.length; k++) {
					includedPlId = this.includedPlaylists[k].id
					if (includedPlId == plId) {
						if (this.includedPlaylists[k].selected)
							return true
					}
				}
			}
			return false
			
			// warum auch immer, aber diese for-Schleife funktioniert nicht!
			// die properties werden nicht richtig abgerufen!
			// for (plId in track.inPlaylists) {
			// 	for (includedPlaylist in this.includedPlaylists) {
			// 		//console.log(includedPlaylist[includedPlaylist] + " = includedPlaylist.id")
			// 		//console.log(plId[plId] + " = plId")
			// 		if (includedPlaylist.id == plId) {
			// 			if (includedPlaylist.selected) {
			// 				return true
			// 			}
			// 		}
			// 	}
			// }
			// return false
		},
        getTracklistFromSpotifyPlaylists_done(data) {
            console.log(data)
            //deserialized = JSON.parse(data) // error
            //console.log(deserialized)

            // for (obj in data) {
            //     obj.id
            //     obj.name
            //     obj.duration_ms
            //     obj.playlists
            //     for (a in obj.artists) {
            //         a.name
            //     }
            // }

            // bodyData =

            this.spotifyTracks = data
            this.showSpotifyPlaylist(data)
		}
	},
	mounted() {
		// socket.on('show_album', this.showAlbum)
		// socket.on('show_playlist', this.showPlaylist)
        // socket.on('show_spotifyplaylist', this.showSpotifyPlaylist)
        socket.on('getTracklistFromSpotifyPlaylists_done', this.getTracklistFromSpotifyPlaylists_done)
	}
}).$mount('#spotifytracklist_tab')

export default SpotifyTracklistTab
