import { socket } from './socket.js'

export const MainSearch = new Vue({
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
		changeSearchTab(section) {
			if (section != 'TOP_RESULT') {
				document.getElementById(`search_${section.toLowerCase()}_tab`).click()
			}
		},
		addToQueue: function (e) {
			e.stopPropagation()
			sendAddToQueue(e.currentTarget.dataset.link)
		},
		openQualityModal: function (e) {
			e.preventDefault()
			openQualityModal(e.currentTarget.dataset.link)
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
		}
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
