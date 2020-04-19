export const MainSearch = new Vue({
	el: '#search_tab',
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
			if (section != 'TOP_RESULT') clickElement('search_' + section.toLowerCase() + '_tab')
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
})