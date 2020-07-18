<template>
	<div id="analyzer_tab" class="main_tabcontent image_header">
		<h2 class="page_heading">Link Analyzer</h2>
		<div v-if="link == ''">
			<p>
				You can use this section to find out more information about the link you are trying to download<br />This is
				useful if you're trying to download some tracks that are not available in your country and want to know where
				they are available
			</p>
		</div>
		<div v-else-if="link == 'error'">
			<h2>This link is not supported</h2>
			<p>Seems like this link is not yet supported, try analyzing another one.</p>
		</div>
		<div v-else>
			<header
				class="inline-flex"
				:style="{
					'background-image':
						'linear-gradient(to bottom, transparent 0%, var(--main-background) 100%), url(\'' + image + '\')'
				}"
			>
				<div>
					<h1>{{ title }}</h1>
					<h2 v-if="type == 'track'">
						by <span class="clickable" @click="artistView" :data-id="data.artist.id">{{ data.artist.name }}</span> • in
						<span class="clickable" @click="albumView" :data-id="data.album.id">{{ data.album.title }}</span>
					</h2>
					<h2 v-else-if="type == 'album'">
						by <span class="clickable" @click="artistView" :data-id="data.artist.id">{{ data.artist.name }}</span> •
						{{ data.nb_tracks }} tracks
					</h2>
				</div>
				<div
					role="button"
					aria-label="download"
					@contextmenu.prevent="openQualityModal"
					@click.stop="addToQueue"
					:data-link="link"
					class="fab right"
				>
					<i class="material-icons">get_app</i>
				</div>
			</header>
			<table class="table">
				<tr v-if="data.id">
					<td>ID</td>
					<td>{{ data.id }}</td>
				</tr>
				<tr v-if="data.isrc">
					<td>ISRC</td>
					<td>{{ data.isrc }}</td>
				</tr>
				<tr v-if="data.upc">
					<td>UPC</td>
					<td>{{ data.upc }}</td>
				</tr>
				<tr v-if="data.duration">
					<td>Duration</td>
					<td>{{ convertDuration(data.duration) }}</td>
				</tr>
				<tr v-if="data.disk_number">
					<td>Disk Number</td>
					<td>{{ data.disk_number }}</td>
				</tr>
				<tr v-if="data.track_position">
					<td>Track Number</td>
					<td>{{ data.track_position }}</td>
				</tr>
				<tr v-if="data.release_date">
					<td>Release Date</td>
					<td>{{ data.release_date }}</td>
				</tr>
				<tr v-if="data.bpm">
					<td>BPM</td>
					<td>{{ data.bpm }}</td>
				</tr>
				<tr v-if="data.label">
					<td>Label</td>
					<td>{{ data.label }}</td>
				</tr>
				<tr v-if="data.record_type">
					<td>Record Type</td>
					<td>{{ data.record_type }}</td>
				</tr>
				<tr v-if="data.genres && data.genres.data.length">
					<td>Genres</td>
					<td>{{ data.genres.data.map(x => x.name).join('; ') }}</td>
				</tr>
			</table>

			<div v-if="type == 'album'">
				<button @click="albumView" :data-id="id">Tracklist</button>
			</div>
			<div v-if="countries.length">
				<p v-for="country in countries">{{ country[0] }} - {{ country[1] }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import { socket } from '@/utils/socket'
import { showView } from '@js/tabs.js'
import Utils from '@/utils/utils'
import EventBus from '@/utils/EventBus'

export default {
	name: 'the-link-analyzer-tab',
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
		notSupported() {
			this.link = 'error'
		}
	},
	mounted() {
		EventBus.$on('linkAnalyzerTab:reset', this.reset)

		socket.on('analyze_track', this.showTrack)
		socket.on('analyze_album', this.showAlbum)
		socket.on('analyze_notSupported', this.notSupported)
	}
}
</script>

<style>
</style>