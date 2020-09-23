<template>
	<div id="home_tab" class="main_tabcontent" ref="root">
		<h2 class="page_heading">{{ $t('globals.welcome') }}</h2>

		<section class="home_section" ref="notLogged" v-if="!isLoggedIn">
			<p id="home_not_logged_text">{{ $t('home.needTologin') }}</p>
			<!-- <button type="button" name="button" @click="openSettings">{{ $t('home.openSettings') }}</button> -->
			<router-link tag="button" name="button" :to="{ name: 'Settings' }">
				{{ $t('home.openSettings') }}
			</router-link>
		</section>

		<section v-if="playlists.length" class="home_section">
			<h3 class="section_heading">{{ $t('home.sections.popularPlaylists') }}</h3>
			<div class="release_grid">
				<div
					v-for="release in playlists"
					:key="release.id"
					class="release clickable"
					@click="playlistView"
					:data-id="release.id"
					tabindex="0"
				>
					<div class="cover_container">
						<img aria-hidden="true" class="rounded coverart" :src="release.picture_medium" />
						<button
							role="button"
							aria-label="download"
							@click.stop="addToQueue"
							:data-link="release.link"
							class="download_overlay"
							tabindex="0"
						>
							<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
						</button>
					</div>
					<p class="primary-text">{{ release.title }}</p>
					<p class="secondary-text">
						{{
							`${$t('globals.by', { artist: release.user.name })} - ${$tc(
								'globals.listTabs.trackN',
								release.nb_tracks
							)}`
						}}
					</p>
				</div>
			</div>
		</section>

		<section v-if="albums.length" class="home_section">
			<h3 class="section_heading">{{ $t('home.sections.popularAlbums') }}</h3>
			<div class="release_grid">
				<div
					v-for="release in albums"
					:key="release.id"
					class="release clickable"
					@click="albumView"
					:data-id="release.id"
					tabindex="0"
				>
					<div class="cover_container">
						<img aria-hidden="true" class="rounded coverart" :src="release.cover_medium" />
						<button
							role="button"
							aria-label="download"
							@click.stop="addToQueue"
							:data-link="release.link"
							class="download_overlay"
							tabindex="0"
						>
							<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
						</button>
					</div>
					<p class="primary-text">{{ release.title }}</p>
					<p class="secondary-text">{{ `${$t('globals.by', { artist: release.artist.name })}` }}</p>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

import { showView } from '@js/tabs'
import { sendAddToQueue } from '@/utils/downloads'
import { getHomeData } from '@/data/home'

export default {
	data() {
		return {
			playlists: [],
			albums: []
		}
	},
	async created() {
		const homeData = await getHomeData()

		this.initHome(homeData)
	},
	computed: {
		...mapGetters(['isLoggedIn']),
		needToWait() {
			return this.getHomeData.albums.data.length === 0 && this.getHomeData.playlists.data.length === 0
		}
	},
	methods: {
		artistView: showView.bind(null, 'artist'),
		albumView: showView.bind(null, 'album'),
		playlistView: showView.bind(null, 'playlist'),
		addToQueue(e) {
			sendAddToQueue(e.currentTarget.dataset.link)
		},
		initHome(data) {
			const {
				playlists: { data: playlistData },
				albums: { data: albumData }
			} = data

			this.playlists = playlistData
			this.albums = albumData
		}
	}
}
</script>

<style>
</style>
