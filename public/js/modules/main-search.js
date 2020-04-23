import { socket } from './socket.js'
import { artistView, albumView, playlistView } from './tabs.js'
import Downloads from './downloads.js'
import QualityModal from './quality-modal.js'

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
		artistView,
		albumView,
		playlistView,
		handleClickTopResult(event) {
			let topResultType = this.results.allTab.TOP_RESULT[0].type

			switch (topResultType) {
				case 'artist':
					artistView(event)
					break
				case 'album':
					albumView(event)
					break
				case 'playlist':
					playlistView(event)
					break

				default:
					break
			}
		},
		changeSearchTab(section) {
			if (section != 'TOP_RESULT') {
				document.getElementById(`search_${section.toLowerCase()}_tab`).click()
			}
		},
		addToQueue: function (e) {
			e.stopPropagation()
			Downloads.sendAddToQueue(e.currentTarget.dataset.link)
		},
		openQualityModal: function (e) {
			e.preventDefault()
			QualityModal.open(e.currentTarget.dataset.link)
		},
		numberWithDots(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
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
		search(type) {
			socket.emit('search', {
				term: this.results.query,
				type: type,
				start: this.results[type + 'Tab'].next,
				nb: 30
			})
		},
		scrolledSearch(type) {
			if (this.results[type + 'Tab'].next < this.results[type + 'Tab'].total) {
				socket.emit('search', {
					term: this.results.query,
					type: type,
					start: this.results[type + 'Tab'].next,
					nb: 30
				})
			}
		}
	},
	mounted() {
		console.log('main search mounted')
	}
}).$mount('#search_tab')

socket.on('mainSearch', result => {
	let resetObj = { data: [], next: 0, total: 0, loaded: false }
	MainSearch.results.allTab = result
	MainSearch.results.query = result.QUERY
	MainSearch.results.trackTab = { ...resetObj }
	MainSearch.results.albumTab = { ...resetObj }
	MainSearch.results.artistTab = { ...resetObj }
	MainSearch.results.playlistTab = { ...resetObj }
	document.getElementById('search_all_tab').click()
	document.getElementById('search_tab_content').style.display = 'block'
	document.getElementById('main_search_tablink').click()
})

socket.on('search', result => {
	let next = 0

	if (result.next) {
		next = parseInt(result.next.match(/index=(\d*)/)[1])
	} else {
		next = result.total
	}

	if (MainSearch.results[result.type + 'Tab'].total != result.total) {
		MainSearch.results[result.type + 'Tab'].total = result.total
	}

	if (MainSearch.results[result.type + 'Tab'].next != next) {
		MainSearch.results[result.type + 'Tab'].next = next
		MainSearch.results[result.type + 'Tab'].data = MainSearch.results[result.type + 'Tab'].data.concat(result.data)
	}
	MainSearch.results[result.type + 'Tab'].loaded = true
})

export default MainSearch
