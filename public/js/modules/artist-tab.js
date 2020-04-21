import { socket } from './socket.js'

export const ArtistTab = new Vue({
	el: '#artist_tab',
	data: {
		currentTab: '',
		sortKey: 'release_date',
		sortOrder: 'desc',
		title: '',
		image: '',
		type: '',
		link: '',
		head: null,
		body: null
	},
	methods: {
		addToQueue(e) {
			e.stopPropagation()
			sendAddToQueue(e.currentTarget.dataset.link)
		},
		openQualityModal(e) {
			e.preventDefault()
			openQualityModal(e.currentTarget.dataset.link)
		},
		moreInfo(url, e) {
			if (e) e.preventDefault()
			showTrackListSelective(url, true)
		},
		sortBy(key) {
			if (key == this.sortKey) {
				this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc'
			} else {
				this.sortKey = key
				this.sortOrder = 'asc'
			}
		},
		changeTab(tab) {
			this.currentTab = tab
		},
		checkNewRelease(date) {
			var g1 = new Date()
			var g2 = new Date(date)
			g2.setDate(g2.getDate() + 3)
			g1.setHours(0, 0, 0, 0)
			if (g1.getTime() <= g2.getTime()) {
				return true
			} else {
				return false
			}
		}
	},
	computed: {
		showTable() {
			if (this.body) return _.orderBy(this.body[this.currentTab], this.sortKey, this.sortOrder)
			else return []
		}
	}
})

export function resetArtistTab() {
	ArtistTab.title = 'Loading...'
	ArtistTab.image = ''
	ArtistTab.type = ''
	ArtistTab.currentTab = ''
	ArtistTab.sortKey = 'release_date'
	ArtistTab.sortOrder = 'desc'
	ArtistTab.link = ''
	ArtistTab.head = []
	ArtistTab.body = null
}

socket.on('show_artist', data => {
	ArtistTab.title = data.name
	ArtistTab.image = data.picture_xl
	ArtistTab.type = 'Artist'
	ArtistTab.link = `https://www.deezer.com/artist/${data.id}`
	ArtistTab.currentTab = Object.keys(data.releases)[0]
	ArtistTab.sortKey = 'release_date'
	ArtistTab.sortOrder = 'desc'
	ArtistTab.head = [
		{ title: 'Title', sortKey: 'title' },
		{ title: 'Release Date', sortKey: 'release_date' },
		{ title: '', width: '32px' }
	]
	if (_.isEmpty(data.releases)) {
		ArtistTab.body = null
	} else {
		ArtistTab.body = data.releases
	}
})
