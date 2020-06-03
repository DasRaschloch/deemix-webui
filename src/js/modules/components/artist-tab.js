import { isEmpty, orderBy } from 'lodash-es'
import Vue from 'vue'
import { socket } from '../socket.js'
import Downloads from '../downloads.js'
import QualityModal from '../quality-modal.js'
import { showView } from '../tabs.js'

const ArtistTab = new Vue({
	data() {
		return {
			currentTab: '',
			sortKey: 'release_date',
			sortOrder: 'desc',
			title: '',
			image: '',
			type: '',
			link: '',
			head: null,
			body: null
		}
	},
	methods: {
		albumView: showView.bind(null, 'album'),
		reset() {
			this.title = 'Loading...'
			this.image = ''
			this.type = ''
			this.currentTab = ''
			this.sortKey = 'release_date'
			this.sortOrder = 'desc'
			this.link = ''
			this.head = []
			this.body = null
		},
		addToQueue(e) {
			e.stopPropagation()
			Downloads.sendAddToQueue(e.currentTarget.dataset.link)
		},
		openQualityModal(e) {
			QualityModal.open(e.currentTarget.dataset.link)
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
			let g1 = new Date()
			let g2 = new Date(date)
			g2.setDate(g2.getDate() + 3)
			g1.setHours(0, 0, 0, 0)

			return g1.getTime() <= g2.getTime()
		},
		showArtist(data) {
			const { name, picture_xl, id, releases } = data

			this.title = name
			this.image = picture_xl
			this.type = 'Artist'
			this.link = `https://www.deezer.com/artist/${id}`
			this.currentTab = Object.keys(releases)[0]
			this.sortKey = 'release_date'
			this.sortOrder = 'desc'
			this.head = [
				{ title: 'Title', sortKey: 'title' },
				{ title: 'Release Date', sortKey: 'release_date' },
				{ title: '', width: '32px' }
			]
			if (isEmpty(releases)) {
				this.body = null
			} else {
				this.body = releases
			}
		}
	},
	computed: {
		showTable() {
			if (this.body) return orderBy(this.body[this.currentTab], this.sortKey, this.sortOrder)
			else return []
		}
	},
	mounted() {
		socket.on('show_artist', this.showArtist)
	}
}).$mount('#artist_tab')

export default ArtistTab
