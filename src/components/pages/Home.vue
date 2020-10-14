<template>
	<div id="home_tab">
		<h1 class="mb-8 text-5xl">{{ $t('globals.welcome') }}</h1>

		<section class="py-6 border-0 border-t border-solid border-grayscale-500" ref="notLogged" v-if="!isLoggedIn">
			<p id="home_not_logged_text" class="mb-4">{{ $t('home.needTologin') }}</p>
			<router-link tag="button" name="button" :to="{ name: 'Settings' }" class="btn btn-primary">
				{{ $t('home.openSettings') }}
			</router-link>
		</section>

		<section v-if="playlists.length" class="py-6 border-0 border-t border-solid border-grayscale-500">
			<h2 class="mb-6 text-3xl">{{ $t('home.sections.popularPlaylists') }}</h2>
			<div class="release_grid">
				<router-link
					tag="div"
					v-for="release in playlists"
					:key="release.id"
					class="release clickable"
					:to="{ name: 'Playlist', params: { id: release.id } }"
					@keyup.enter.native="$router.push({ name: 'Playlist', params: { id: release.id } })"
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
				</router-link>
			</div>
		</section>

		<section v-if="albums.length" class="py-6 border-0 border-t border-solid border-grayscale-500">
			<h2 class="mb-6 text-3xl">{{ $t('home.sections.popularAlbums') }}</h2>
			<div class="release_grid">
				<router-link
					tag="div"
					v-for="release in albums"
					:key="release.id"
					class="release clickable"
					:to="{ name: 'Album', params: { id: release.id } }"
					@keyup.enter.native="$router.push({ name: 'Album', params: { id: release.id } })"
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
				</router-link>
			</div>
		</section>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

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
		...mapGetters(['isLoggedIn'])
	},
	methods: {
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
