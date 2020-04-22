import { socket } from './socket.js'
import { artistView, albumView } from './stacked-tabs.js'
import Downloads from './downloads.js'
import QualityModal from './quality-modal.js'

export const TracklistTab = new Vue({
	el: '#tracklist_tab',
	data: {
		title: '',
		metadata: '',
		release_date: '',
		label: '',
		explicit: false,
		image: '',
		type: '',
		link: '',
		head: null,
		body: []
	},
	methods: {
		artistView,
		albumView,
		addToQueue: function (e) {
			e.stopPropagation()
			Downloads.sendAddToQueue(e.currentTarget.dataset.link)
		},
		openQualityModal: function (e) {
			e.preventDefault()
			QualityModal.open(e.currentTarget.dataset.link)
		},
		toggleAll: function (e) {
			this.body.forEach(item => {
				if (item.type == 'track') {
					item.selected = e.currentTarget.checked
				}
			})
		},
		selectedLinks: function () {
			var selected = []
			if (this.body) {
				this.body.forEach(item => {
					if (item.type == 'track' && item.selected) selected.push(item.link)
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
		}
	},
	mounted() {
		console.log('tracklist tab mounted')
	}
})

export function resetTracklistTab() {
	TracklistTab.title = 'Loading...'
	TracklistTab.image = ''
	TracklistTab.metadata = ''
	TracklistTab.label = ''
	TracklistTab.release_date = ''
	TracklistTab.explicit = false
	TracklistTab.type = ''
	TracklistTab.head = []
	TracklistTab.body = []
}

socket.on('show_album', data => {
	TracklistTab.type = 'Album'
	TracklistTab.link = `https://www.deezer.com/album/${data.id}`
	TracklistTab.title = data.title
	TracklistTab.explicit = data.explicit_lyrics
	TracklistTab.label = data.label
	TracklistTab.metadata = `${data.artist.name} • ${data.tracks.length} songs`
	TracklistTab.release_date = data.release_date.substring(0, 10)
	TracklistTab.image = data.cover_xl
	TracklistTab.head = [
		{ title: '<i class="material-icons">music_note</i>', width: '24px' },
		{ title: '#' },
		{ title: 'Song' },
		{ title: 'Artist' },
		{ title: '<i class="material-icons">timer</i>', width: '40px' }
	]
	if (_.isEmpty(data.tracks)) {
		TracklistTab.body = null
	} else {
		TracklistTab.body = data.tracks
	}
})

socket.on('show_playlist', data => {
	TracklistTab.type = 'Playlist'
	TracklistTab.link = `https://www.deezer.com/playlist/${data.id}`
	TracklistTab.title = data.title
	TracklistTab.image = data.picture_xl
	TracklistTab.release_date = data.creation_date.substring(0, 10)
	TracklistTab.metadata = `by ${data.creator.name} • ${data.tracks.length} songs`
	TracklistTab.head = [
		{ title: '<i class="material-icons">music_note</i>', width: '24px' },
		{ title: '#' },
		{ title: 'Song' },
		{ title: 'Artist' },
		{ title: 'Album' },
		{ title: '<i class="material-icons">timer</i>', width: '40px' }
	]
	if (_.isEmpty(data.tracks)) {
		TracklistTab.body = null
	} else {
		TracklistTab.body = data.tracks
	}
})
