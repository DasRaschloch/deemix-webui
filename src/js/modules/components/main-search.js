import Vue from 'vue'
import { socket } from '../socket.js'
import { showView } from '../tabs.js'
import Downloads from '../downloads.js'
import QualityModal from '../quality-modal.js'
import TrackPreview from '../track-preview.js'
import Utils from '../utils.js'

const MainSearch = new Vue({
	data: {
		names: {
			TOP_RESULT: 'Top Result',
			TRACK: 'Tracks',
			ARTIST: 'Artists',
			ALBUM: 'Albums',
			PLAYLIST: 'Playlists'
		},
		results: {
			query: '',
			allTab: {
				ORDER: [],
				TOP_RESULT: [],
				ALBUM: {},
				ARTIST: {},
				TRACK: {},
				PLAYLIST: {}
			},
			trackTab: {
				data: [],
				next: 0,
				total: 0,
				loaded: false
			},
			albumTab: {
				data: [],
				next: 0,
				total: 0,
				loaded: false
			},
			artistTab: {
				data: [],
				next: 0,
				total: 0,
				loaded: false
			},
			playlistTab: {
				data: [],
				next: 0,
				total: 0,
				loaded: false
			}
		}
	},
	methods: {
		artistView: showView.bind(null, 'artist'),
		albumView: showView.bind(null, 'album'),
		playlistView: showView.bind(null, 'playlist'),
		playPausePreview: TrackPreview.playPausePreview,
		previewMouseEnter: TrackPreview.previewMouseEnter,
		previewMouseLeave: TrackPreview.previewMouseLeave,
		handleClickTopResult(event) {
			let topResultType = this.results.allTab.TOP_RESULT[0].type

			switch (topResultType) {
				case 'artist':
					this.artistView(event)
					break
				case 'album':
					this.albumView(event)
					break
				case 'playlist':
					this.playlistView(event)
					break

				default:
					break
			}
		},
		changeSearchTab(section) {
			if (section === 'TOP_RESULT') return

			let tabID

			// Using the switch beacuse it's tricky to find refernces of the belo IDs
			switch (section) {
				case 'TRACK':
					tabID = 'search_track_tab'
					break
				case 'ALBUM':
					tabID = 'search_album_tab'
					break
				case 'ARTIST':
					tabID = 'search_artist_tab'
					break
				case 'PLAYLIST':
					tabID = 'search_playlist_tab'
					break

				default:
					break
			}

			document.getElementById(tabID).click()
		},
		addToQueue(e) {
			Downloads.sendAddToQueue(e.currentTarget.dataset.link)
		},
		openQualityModal(e) {
			QualityModal.open(e.currentTarget.dataset.link)
		},
		numberWithDots: Utils.numberWithDots,
		convertDuration: Utils.convertDuration,
		search(type) {
			socket.emit('search', {
				term: this.results.query,
				type: type,
				start: this.results[type + 'Tab'].next,
				nb: 30
			})
		},
		scrolledSearch(type) {
			let currentTab = type + 'Tab'

			if (this.results[currentTab].next < this.results[currentTab].total) {
				socket.emit('search', {
					term: this.results.query,
					type: type,
					start: this.results[currentTab].next,
					nb: 30
				})
			}
		},
		handleMainSearch(result) {
			let resetObj = { data: [], next: 0, total: 0, loaded: false }

			this.results.allTab = result
			this.results.trackTab = { ...resetObj }
			this.results.albumTab = { ...resetObj }
			this.results.artistTab = { ...resetObj }
			this.results.playlistTab = { ...resetObj }

			if (this.results.query == '') document.getElementById('search_all_tab').click()

			this.results.query = result.QUERY
			document.getElementById('search_tab_content').style.display = 'block'
			document.getElementById('main_search_tablink').click()
		},
		handleSearch(result) {
			const { next: nextResult, total, type, data } = result

			let currentTab = type + 'Tab'
			let next = 0

			if (nextResult) {
				next = parseInt(nextResult.match(/index=(\d*)/)[1])
			} else {
				next = total
			}

			if (this.results[currentTab].total != total) {
				this.results[currentTab].total = total
			}

			if (this.results[currentTab].next != next) {
				this.results[currentTab].next = next
				this.results[currentTab].data = this.results[currentTab].data.concat(data)
			}

			this.results[currentTab].loaded = true
		}
	},
	mounted() {
		socket.on('mainSearch', this.handleMainSearch)
		socket.on('search', this.handleSearch)
	}
}).$mount('#search_tab')

export default MainSearch
