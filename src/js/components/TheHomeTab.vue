<template>
	<div id="home_tab" class="main_tabcontent">
		<h2 class="page_heading">Welcome to deemix</h2>
		<section id="home_not_logged_in" class="home_section" ref="notLogged">
			<p id="home_not_logged_text">You need to log into your deezer account before you can start downloading.</p>
			<button type="button" name="button" @click="openSettings">Open Settings</button>
		</section>
		<section v-if="playlists.length" class="home_section">
			<h3 class="section_heading">Popular playlists</h3>
			<div class="release_grid">
				<div v-for="release in playlists" class="release clickable" @click="playlistView" :data-id="release.id">
					<div class="cover_container">
						<img aria-hidden="true" class="rounded coverart" :src="release.picture_medium" />
						<div
							role="button"
							aria-label="download"
							@contextmenu.prevent="openQualityModal"
							@click.stop="addToQueue"
							:data-link="release.link"
							class="download_overlay"
						>
							<i class="material-icons">get_app</i>
						</div>
					</div>
					<p class="primary-text">{{ release.title }}</p>
					<p class="secondary-text">{{ 'by ' + release.user.name + ' - ' + release.nb_tracks + ' tracks' }}</p>
				</div>
			</div>
		</section>
		<section v-if="albums.length" class="home_section">
			<h3 class="section_heading">Most streamed albums</h3>
			<div class="release_grid">
				<div v-for="release in albums" class="release clickable" @click="albumView" :data-id="release.id">
					<div class="cover_container">
						<img aria-hidden="true" class="rounded coverart" :src="release.cover_medium" />
						<div
							role="button"
							aria-label="download"
							@contextmenu.prevent="openQualityModal"
							@click.stop="addToQueue"
							:data-link="release.link"
							class="download_overlay"
						>
							<i class="material-icons">get_app</i>
						</div>
					</div>
					<p class="primary-text">{{ release.title }}</p>
					<p class="secondary-text">{{ 'by ' + release.artist.name }}</p>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { socket } from '@/js/socket.js'
import { showView } from '@/js/tabs.js'
import Downloads from '@/js/downloads.js'
import QualityModal from '@/js/quality-modal.js'

export default {
	name: 'the-home-tab',
	data() {
		return {
			playlists: [],
			albums: []
		}
	},
	methods: {
		artistView: showView.bind(null, 'artist'),
		albumView: showView.bind(null, 'album'),
		playlistView: showView.bind(null, 'playlist'),
		openSettings() {
			document.getElementById('main_settings_tablink').click()
		},
		addToQueue(e) {
			Downloads.sendAddToQueue(e.currentTarget.dataset.link)
		},
		openQualityModal(e) {
			QualityModal.open(e.currentTarget.dataset.link)
		},
		initHome(data) {
			const {
				playlists: { data: playlistData },
				albums: { data: albumData }
			} = data

			this.playlists = playlistData
			this.albums = albumData
		}
	},
	mounted() {
		if (localStorage.getItem('arl')) {
			this.$refs.notLogged.classList.add('hide')
		}

		socket.on('init_home', this.initHome)
	}
}
</script>

<style>
</style>