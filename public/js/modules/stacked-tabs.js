import { resetArtistTab } from './artist-tab.js'
import { resetTracklistTab } from './tracklist-tab.js'
import { socket } from './socket.js'

export function artistView(ev) {
	let id = ev.currentTarget.dataset.id
	resetArtistTab()
	socket.emit('getTracklist', { type: 'artist', id: id })
	showTab('artist', id)
}

export function albumView(ev) {
	let id = ev.currentTarget.dataset.id
	console.log('album view', id)
	resetTracklistTab()
	socket.emit('getTracklist', { type: 'album', id: id })
	showTab('album', id)
}

export function playlistView(ev) {
	let id = ev.currentTarget.dataset.id
	console.log('playlist view', id)
	resetTracklistTab()
	socket.emit('getTracklist', { type: 'playlist', id: id })
	showTab('playlist', id)
}
