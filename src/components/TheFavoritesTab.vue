<template>
	<div id="favorites_tab" class="main_tabcontent">
		<h2 class="page_heading">
			{{ $t('favorites.title') }}
			<div
				@click="reloadTabs"
				class="clickable reload-button reload-button--inline"
				ref="reloadButton"
				role="button"
				aria-label="reload"
			>
				<i class="material-icons">sync</i>
			</div>
		</h2>
		<div class="section-tabs">
			<div
				class="section-tabs__tab favorites_tablinks"
				:class="{ active: activeTab === tab }"
				@click="activeTab = tab"
				v-for="tab in tabs"
				:key="tab"
			>
				{{ $tc(`globals.listTabs.${tab}`, 2) }}
			</div>
		</div>

		<div class="favorites_tabcontent" :class="{ 'favorites_tabcontent--active': activeTab === 'playlist' }">
			<div v-if="playlists.length == 0">
				<h1>{{ $t('favorites.noPlaylists') }}</h1>
			</div>
			<div class="release_grid" v-if="playlists.length > 0 || spotifyPlaylists > 0">
				<div v-for="release in playlists" class="release clickable" @click="playlistView" :data-id="release.id">
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
							`${$t('globals.by', { artist: release.creator.name })} - ${$tc(
								'globals.listTabs.trackN',
								release.nb_tracks
							)}`
						}}
					</p>
				</div>
				<div
					v-for="release in spotifyPlaylists"
					class="release clickable"
					@click="spotifyPlaylistView"
					:data-id="release.id"
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
							`${$t('globals.by', { artist: release.creator.name })} - ${$tc(
								'globals.listTabs.trackN',
								release.nb_tracks
							)}`
						}}
					</p>
				</div>
			</div>
		</div>

		<div class="favorites_tabcontent" :class="{ 'favorites_tabcontent--active': activeTab === 'album' }">
			<div v-if="albums.length == 0">
				<h1>{{ $t('favorites.noAlbums') }}</h1>
			</div>
			<div class="release_grid" v-if="albums.length > 0">
				<div v-for="release in albums" class="release clickable" @click="albumView" :data-id="release.id">
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
		</div>

		<div class="favorites_tabcontent" :class="{ 'favorites_tabcontent--active': activeTab === 'artist' }">
			<div v-if="artists.length == 0">
				<h1>{{ $t('favorites.noArtists') }}</h1>
			</div>
			<div class="release_grid" v-if="artists.length > 0">
				<div v-for="release in artists" class="release clickable" @click="artistView" :data-id="release.id">
					<div class="cover_container">
						<img aria-hidden="true" class="circle coverart" :src="release.picture_medium" />
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
					<p class="primary-text">{{ release.name }}</p>
				</div>
			</div>
		</div>

		<div class="favorites_tabcontent" :class="{ 'favorites_tabcontent--active': activeTab === 'track' }">
			<div v-if="tracks.length == 0">
				<h1>{{ $t('favorites.noTracks') }}</h1>
			</div>
			<table v-if="tracks.length > 0" class="table">
				<tr v-for="track in tracks" class="track_row">
					<td class="top-tracks-position" :class="{ first: track.position === 1 }">
						{{ track.position }}
					</td>
					<td>
						<a
							href="#"
							class="rounded"
							:class="{ 'single-cover': !!track.preview }"
							@click="playPausePreview"
							:data-preview="track.preview"
						>
							<i
								@mouseenter="previewMouseEnter"
								@mouseleave="previewMouseLeave"
								v-if="track.preview"
								class="material-icons preview_controls"
								:title="$t('globals.play_hint')"
							>
								play_arrow
							</i>
							<img class="rounded coverart" :src="track.album.cover_small" />
						</a>
					</td>
					<td class="table__cell--large breakline">
						{{
							track.title +
							(track.title_version && track.title.indexOf(track.title_version) == -1 ? ' ' + track.title_version : '')
						}}
					</td>
					<td
						class="table__cell--medium table__cell--center breakline clickable"
						@click="artistView"
						:data-id="track.artist.id"
					>
						{{ track.artist.name }}
					</td>
					<td
						class="table__cell--medium table__cell--center breakline clickable"
						@click="albumView"
						:data-id="track.album.id"
					>
						{{ track.album.title }}
					</td>
					<td class="table__cell--small">
						{{ convertDuration(track.duration) }}
					</td>
					<td
						class="table__cell--download clickable"
						@click.stop="addToQueue"
						:data-link="track.link"
						role="button"
						aria-label="download"
					>
						<div class="table__cell-content table__cell-content--vertical-center">
							<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<style lang="scss">
.favorites_tabcontent {
	display: none;

	&--active {
		display: block;
	}
}
</style>

<script>
import { showView } from '@js/tabs'

import { socket } from '@/utils/socket'
import { sendAddToQueue } from '@/utils/downloads'
import { convertDuration } from '@/utils/utils'
import { toast } from '@/utils/toasts'

import { getFavoritesData } from '@/data/favorites'

export default {
	data() {
		return {
			tracks: [],
			albums: [],
			artists: [],
			playlists: [],
			spotifyPlaylists: [],
			activeTab: 'playlist',
			tabs: ['playlist', 'album', 'artist', 'track']
		}
	},
	async created() {
		const favoritesData = await getFavoritesData()

		// TODO Change with isLoggedIn vuex getter
		if (Object.entries(favoritesData).length === 0) return

		this.setFavorites(favoritesData)
	},
	mounted() {
		socket.on('updated_userFavorites', this.updated_userFavorites)
		socket.on('updated_userSpotifyPlaylists', this.updated_userSpotifyPlaylists)
		socket.on('updated_userPlaylists', this.updated_userPlaylists)
		socket.on('updated_userAlbums', this.updated_userAlbums)
		socket.on('updated_userArtist', this.updated_userArtist)
		socket.on('updated_userTracks', this.updated_userTracks)

		this.$on('hook:destroyed', () => {
			socket.off('updated_userFavorites')
			socket.off('updated_userSpotifyPlaylists')
			socket.off('updated_userPlaylists')
			socket.off('updated_userAlbums')
			socket.off('updated_userArtist')
			socket.off('updated_userTracks')
		})
	},
	methods: {
		artistView: showView.bind(null, 'artist'),
		albumView: showView.bind(null, 'album'),
		playlistView: showView.bind(null, 'playlist'),
		spotifyPlaylistView: showView.bind(null, 'spotifyplaylist'),
		playPausePreview(e) {
			EventBus.$emit('trackPreview:playPausePreview', e)
		},
		previewMouseEnter(e) {
			EventBus.$emit('trackPreview:previewMouseEnter', e)
		},
		previewMouseLeave(e) {
			EventBus.$emit('trackPreview:previewMouseLeave', e)
		},
		convertDuration,
		addToQueue(e) {
			sendAddToQueue(e.currentTarget.dataset.link)
		},
		updated_userSpotifyPlaylists(data) {
			this.spotifyPlaylists = data
		},
		updated_userPlaylists(data) {
			this.playlists = data
		},
		updated_userAlbums(data) {
			this.albums = data
		},
		updated_userArtist(data) {
			this.artists = data
		},
		updated_userTracks(data) {
			this.tracks = data
		},
		reloadTabs() {
			this.$refs.reloadButton.classList.add('spin')

			socket.emit('update_userFavorites')

			if (localStorage.getItem('spotifyUser')) {
				socket.emit('update_userSpotifyPlaylists', localStorage.getItem('spotifyUser'))
			}
		},
		updated_userFavorites(data) {
			this.setFavorites(data)

			// Removing animation class only when the animation has completed an iteration
			// Prevents animation ugly stutter
			this.$refs.reloadButton.addEventListener(
				'animationiteration',
				() => {
					this.$refs.reloadButton.classList.remove('spin')
					toast(this.$t('toasts.refreshFavs'), 'done', true)
				},
				{ once: true }
			)
		},
		setFavorites(data) {
			const { tracks, albums, artists, playlists } = data

			this.tracks = tracks
			this.albums = albums
			this.artists = artists
			this.playlists = playlists
		}
	}
}
</script>
