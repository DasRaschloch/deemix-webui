<template>
	<div id="track_search" class="search_tabcontent">
		<div v-if="results.data.length === 0">
			<h1>No Tracks found</h1>
		</div>
		<table v-else class="tracks_table">
			<tr>
				<th style="width: 48px;"></th>
				<th>Title</th>
				<th>Artists</th>
				<th>Album</th>
				<th>
					<i class="material-icons">timer</i>
				</th>
				<th style="width: 56px;"></th>
			</tr>
			<tr v-for="track in results.data" class="track_row">
				<td style="width: 48px; text-align: center;">
					<img
						class="rounded coverart"
						v-bind:src="'https://e-cdns-images.dzcdn.net/images/cover/'+track.ALB_PICTURE+'/32x32-000000-80-0-0.jpg'"
					/>
				</td>
				<td class="breakline">{{track.SNG_TITLE + (track.VERSION ? ' '+track.VERSION : '')}}</td>
				<td class="breakline">
					<span v-for="artist in track.ARTISTS">{{artist.ART_NAME}}</span>
				</td>
				<td class="breakline">{{track.ALB_TITLE}}</td>
				<td>{{convertDuration(track.DURATION)}}</td>
				<td
					role="button"
					aria-label="download"
					v-on:contextmenu="openQualityModal(event)"
					v-on:click="addToQueue(event)"
					v-bind:data-link="'https://www.deezer.com/track/'+track.SNG_ID"
					style="width: 56px; text-align: center;"
					class="clickable"
				>
					<i class="material-icons">get_app</i>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
module.exports = {
	data: () => ({
		type: 'TRACK',
		nb: 40,
		query: '',
		results: {
			data: [],
			next: 0,
			total: 0
		}
	}),
	methods: {
		addToQueue: function(e) {
			e.stopPropagation()
			sendAddToQueue(e.currentTarget.dataset.link)
		},
		openQualityModal: function(e) {
			e.preventDefault()
			openQualityModal(e.currentTarget.dataset.link)
		},
		handleMainSearch(result) {
			this.results = result.TRACK
			this.query = result.QUERY
		}
	},
	mounted() {
		socket.on('mainSearch', this.handleMainSearch)
	}
}
</script>

<style>
</style>