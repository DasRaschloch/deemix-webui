import Vue from 'vue'
import { socket } from '../socket.js'
import { showView } from '../tabs.js'
import Utils from '../utils.js'

const LinkAnalyzerTab = new Vue({
	data() {
		return {
			title: '',
			subtitle: '',
			image: '',
			data: {},
			type: '',
			link: '',
			id: '0',
			countries: []
		}
	},
	methods: {
		artistView: showView.bind(null, 'artist'),
		albumView: showView.bind(null, 'album'),
		convertDuration: Utils.convertDuration,
		reset() {
			this.title = 'Loading...'
			this.subtitle = ''
			this.image = ''
			this.data = {}
			this.type = ''
			this.link = ''
			this.countries = []
		},
		showTrack(data) {
			const {
				title,
				title_version,
				album: { cover_xl },
				link,
				available_countries,
				id
			} = data

			this.title = title + (title_version && title.indexOf(title_version) == -1 ? ' ' + title_version : '')
			this.image = cover_xl
			this.type = 'track'
			this.link = link
			this.id = id

			available_countries.forEach(cc => {
				let temp = []
				let chars = [...cc].map(c => c.charCodeAt() + 127397)
				temp.push(String.fromCodePoint(...chars))
				temp.push(Utils.COUNTRIES[cc])
				this.countries.push(temp)
			})

			this.data = data
		},
		showAlbum(data) {
			const { title, cover_xl, link, id } = data

			this.title = title
			this.image = cover_xl
			this.type = 'album'
			this.link = link
			this.data = data
			this.id = id
		},
		notSupported(){
			this.link = 'error'
		}
	},
	mounted() {
		socket.on('analyze_track', this.showTrack)
		socket.on('analyze_album', this.showAlbum)
		socket.on('analyze_notSupported', this.notSupported)
	}
}).$mount('#analyzer_tab')

export default LinkAnalyzerTab
