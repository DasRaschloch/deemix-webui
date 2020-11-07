<template>
	<div>
		<h1 class="mb-8 text-5xl">
			{{ $t('favorites.title') }}
			<div
				@click="reloadTabs"
				class="inline-block clickable reload-button"
				ref="reloadButton"
				role="button"
				aria-label="reload"
			>
				<i class="material-icons">sync</i>
			</div>
		</h1>

		<ul class="section-tabs">
			<li
				class="section-tabs__tab favorites_tablinks"
				:class="{ active: activeTab === tab }"
				@click="activeTab = tab"
				v-for="tab in tabs"
				:key="tab"
			>
				{{ $tc(`globals.listTabs.${tab}`, 2) }}
			</li>
		</ul>

		<button class="btn btn-primary" v-if="!activeTabEmpty" style="margin-bottom: 2rem" @click="downloadAllOfType">
			{{ $t('globals.download', { thing: $tc(`globals.listTabs.${activeTab}N`, getTabLenght()) }) }}
		</button>

		<div class="favorites_tabcontent" :class="{ 'favorites_tabcontent--active': activeTab === 'playlist' }">
			<div v-if="playlists.length == 0">
				<h1>{{ $t('favorites.noPlaylists') }}</h1>
			</div>
			<div class="release-grid" v-if="playlists.length > 0 || spotifyPlaylists > 0">
				<div class="release" v-for="release in playlists" :key="release.id">
					<router-link tag="div" class="cursor-pointer" :to="{ name: 'Playlist', params: { id: release.id } }">
						<CoverContainer is-rounded :cover="release.picture_medium" :link="release.link" @click.stop="addToQueue" />
						<p class="primary-text">{{ release.title }}</p>
					</router-link>

					<p class="secondary-text">
						{{
							`${$t('globals.by', { artist: release.creator.name })} - ${$tc(
								'globals.listTabs.trackN',
								release.nb_tracks
							)}`
						}}
					</p>
				</div>

				<div class="release" v-for="release in spotifyPlaylists" :key="release.id">
					<router-link tag="div" class="cursor-pointer" :to="{ name: 'Spotify Playlist', params: { id: release.id } }">
						<CoverContainer is-rounded :cover="release.picture_medium" :link="release.link" @click.stop="addToQueue" />
						<p class="primary-text">{{ release.title }}</p>
					</router-link>

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
			<div class="release-grid" v-if="albums.length > 0">
				<router-link
					tag="div"
					class="release clickable"
					v-for="release in albums"
					:key="release.id"
					:to="{ name: 'Album', params: { id: release.id } }"
				>
					<CoverContainer is-rounded :cover="release.cover_medium" :link="release.link" @click.stop="addToQueue" />
					<p class="primary-text">{{ release.title }}</p>
					<p class="secondary-text">{{ `${$t('globals.by', { artist: release.artist.name })}` }}</p>
				</router-link>
			</div>
		</div>

		<div class="favorites_tabcontent" :class="{ 'favorites_tabcontent--active': activeTab === 'artist' }">
			<div v-if="artists.length == 0">
				<h1>{{ $t('favorites.noArtists') }}</h1>
			</div>
			<div class="release-grid" v-if="artists.length > 0">
				<router-link
					tag="div"
					class="release clickable"
					v-for="release in artists"
					:key="release.id"
					:to="{ name: 'Artist', params: { id: release.id } }"
				>
					<CoverContainer is-circle :cover="release.picture_medium" :link="release.link" @click.stop="addToQueue" />
					<p class="primary-text">{{ release.name }}</p>
				</router-link>
			</div>
		</div>

		<div class="favorites_tabcontent" :class="{ 'favorites_tabcontent--active': activeTab === 'track' }">
			<div v-if="tracks.length == 0">
				<h1>{{ $t('favorites.noTracks') }}</h1>
			</div>
			<table v-if="tracks.length > 0" class="table">
				<tr v-for="track in tracks" class="track_row">
					<td class="p-3 text-center cursor-default" :class="{ first: track.position === 1 }">
						{{ track.position }}
					</td>
					<td>
						<span
							class="relative inline-block rounded cursor-pointer"
							@click="playPausePreview"
							:data-preview="track.preview"
						>
							<PreviewControls v-if="track.preview" />
							<img class="rounded coverart" :src="track.album.cover_small" />
						</span>
					</td>
					<td class="table__cell--large">
						{{
							track.title +
							(track.title_version && track.title.indexOf(track.title_version) == -1 ? ' ' + track.title_version : '')
						}}
					</td>
					<router-link
						tag="td"
						class="table__cell table__cell--medium table__cell--center clickable"
						:to="{ name: 'Artist', params: { id: track.artist.id } }"
					>
						{{ track.artist.name }}
					</router-link>
					<router-link
						tag="td"
						class="table__cell--medium table__cell--center clickable"
						:to="{ name: 'Album', params: { id: track.album.id } }"
					>
						{{ track.album.title }}
					</router-link>
					<td class="table__cell--small">
						{{ convertDuration(track.duration) }}
					</td>
					<td
						class="cursor-pointer group"
						@click.stop="addToQueue"
						:data-link="track.link"
						role="button"
						aria-label="download"
					>
						<div class="table__cell-content table__cell-content--vertical-center">
							<i
								class="transition-colors duration-150 ease-in-out material-icons group-hover:text-primary"
								:title="$t('globals.download_hint')"
							>
								get_app
							</i>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.favorites_tabcontent {
	display: none;

	&--active {
		display: block;
	}
}

.reload-button {
	&.spin {
		i {
			animation: spin 500ms infinite ease-out reverse;
		}
	}
}
</style>

<script>
import { socket } from '@/utils/socket'
import { sendAddToQueue, aggregateDownloadLinks } from '@/utils/downloads'
import { convertDuration } from '@/utils/utils'
import { toast } from '@/utils/toasts'
import { getFavoritesData } from '@/data/favorites'

import EventBus from '@/utils/EventBus'
import PreviewControls from '@components/globals/PreviewControls.vue'
import CoverContainer from '@components/globals/CoverContainer.vue'

export default {
	components: {
		PreviewControls,
		CoverContainer
	},
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
	computed: {
		activeTabEmpty() {
			let toCheck = this.getActiveRelease()

			return toCheck.length === 0
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
		playPausePreview(e) {
			EventBus.$emit('trackPreview:playPausePreview', e)
		},
		convertDuration,
		downloadAllOfType() {
			try {
				let toDownload = this.getActiveRelease()

				if (this.activeTab === 'track') {
					let lovedTracks = this.getLovedTracksPlaylist()

					sendAddToQueue(lovedTracks.link)
				} else {
					sendAddToQueue(aggregateDownloadLinks(toDownload))
				}
			} catch (error) {
				console.error(error.message)
			}
		},
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
		},
		getActiveRelease(tab = this.activeTab) {
			let toDownload

			switch (tab) {
				case 'playlist':
					toDownload = this.playlists
					break
				case 'album':
					toDownload = this.albums
					break
				case 'artist':
					toDownload = this.artists
					break
				case 'track':
					toDownload = this.tracks
					break

				default:
					break
			}

			return toDownload
		},
		getTabLenght(tab = this.activeTab) {
			let total = this[`${tab}s`].length
			// TODO: Add Spotify playlists to downlaod queue as well
			//if (tab === "playlist") total += this.spotifyPlaylists.length
			return total
		},
		getLovedTracksPlaylist() {
			let lovedTracks = this.playlists.filter(playlist => {
				return playlist.is_loved_track
			})

			if (lovedTracks.length !== 0) {
				return lovedTracks[0]
			} else {
				throw new Error('No loved tracks playlist!')
			}
		}
	}
}
</script>
