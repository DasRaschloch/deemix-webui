<template>
	<div id="artist_search" class="search_tabcontent">
		<div v-if="results.data.length == 0">
			<h1>No Artists found</h1>
		</div>
		<div v-else class="release_grid">
			<div v-for="release in results.data" class="release">
				<div class="cover_container">
					<img
						class="circle coverart"
						v-bind:src="'https://e-cdns-images.dzcdn.net/images/artist/' + release.ART_PICTURE + '/156x156-000000-80-0-0.jpg'"
					/>
					<div
						role="button"
						aria-label="download"
						v-on:contextmenu="openQualityModal(event)"
						v-on:click="addToQueue(event)"
						v-bind:data-link="'https://www.deezer.com/artist/'+release.ART_ID"
						class="download_overlay"
					>
						<i class="material-icons">get_app</i>
					</div>
				</div>
				<p class="primary-text">{{ release.ART_NAME }}</p>
				<p class="secondary-text">{{ numberWithDots(release.NB_FAN) + ' fans' }}</p>
			</div>
		</div>
	</div>
</template>

<script>
module.exports = {
	data: () => ({
		type: 'ARTIST',
		nb: 20,
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
			this.results = result.ARTIST
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