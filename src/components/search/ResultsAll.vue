<template>
	<div id="main_search" class="search_tabcontent">
		<template v-for="section in results.allTab.ORDER">
			<section
				v-if="
					(section != 'TOP_RESULT' && results.allTab[section].data.length > 0) || results.allTab[section].length > 0
				"
				class="search_section"
			>
				<h2
					@click="changeSearchTab(section)"
					class="search_header"
					:class="{ top_result_header: section === 'TOP_RESULT' }"
				>
					{{ $tc(`globals.listTabs.${section.toLowerCase()}`, 2) }}
				</h2>
				<!-- Top result -->
				<div
					v-if="section == 'TOP_RESULT'"
					class="top_result clickable"
					@click="handleClickTopResult"
					:data-id="results.allTab.TOP_RESULT[0].id"
				>
					<div class="cover_container">
						<img
							aria-hidden="true"
							:src="results.allTab.TOP_RESULT[0].picture"
							:class="(results.allTab.TOP_RESULT[0].type == 'artist' ? 'circle' : 'rounded') + ' coverart'"
						/>
						<div
							role="button"
							aria-label="download"
							@click.stop="addToQueue"
							:data-link="results.allTab.TOP_RESULT[0].link"
							class="download_overlay"
						>
							<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
						</div>
					</div>
					<div class="info_box">
						<p class="primary-text">{{ results.allTab.TOP_RESULT[0].title }}</p>
						<p class="secondary-text">
							{{
								results.allTab.TOP_RESULT[0].type == 'artist'
									? $t('search.fans', { n: $n(results.allTab.TOP_RESULT[0].nb_fan) })
									: $t('globals.by', { artist: results.allTab.TOP_RESULT[0].artist }) +
									  ' - ' +
									  $tc('globals.listTabs.trackN', results.allTab.TOP_RESULT[0].nb_song)
							}}
						</p>
						<span class="tag">{{ $tc(`globals.listTabs.${results.allTab.TOP_RESULT[0].type}`, 1) }}</span>
					</div>
				</div>
				<div v-else-if="section == 'TRACK'">
					<table class="table table--tracks">
						<tbody>
							<tr v-for="track in results.allTab.TRACK.data.slice(0, 6)">
								<td class="table__icon" aria-hidden="true">
									<img
										class="rounded coverart"
										:src="
											'https://e-cdns-images.dzcdn.net/images/cover/' + track.ALB_PICTURE + '/32x32-000000-80-0-0.jpg'
										"
									/>
								</td>
								<td class="table__cell table__cell--large breakline">
									<div class="table__cell-content table__cell-content--vertical-center">
										<i v-if="track.EXPLICIT_LYRICS == 1" class="material-icons explicit_icon"> explicit </i>
										{{ track.SNG_TITLE + (track.VERSION ? ' ' + track.VERSION : '') }}
									</div>
								</td>
								<td class="table__cell table__cell--medium table__cell--center breakline">
									<span class="clickable" @click="artistView" :data-id="artist.ART_ID" v-for="artist in track.ARTISTS"
										>{{ artist.ART_NAME }}
									</span>
								</td>
								<td
									class="table__cell--medium table__cell--center breakline clickable"
									@click="albumView"
									:data-id="track.ALB_ID"
								>
									{{ track.ALB_TITLE }}
								</td>
								<td class="table__cell table__cell--center">
									{{ convertDuration(track.DURATION) }}
								</td>
								<td
									class="table__cell--download table__cell--center clickable"
									@click.stop="addToQueue"
									:data-link="'https://www.deezer.com/track/' + track.SNG_ID"
									role="button"
									aria-label="download"
								>
									<i class="material-icons" :title="$t('globals.download_hint')"> get_app </i>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div v-else-if="section == 'ARTIST'" class="release_grid firstrow_only">
					<div
						v-for="release in results.allTab.ARTIST.data.slice(0, 10)"
						class="release clickable"
						@click="artistView"
						:data-id="release.ART_ID"
					>
						<div class="cover_container">
							<img
								aria-hidden="true"
								class="circle coverart"
								:src="
									'https://e-cdns-images.dzcdn.net/images/artist/' + release.ART_PICTURE + '/156x156-000000-80-0-0.jpg'
								"
							/>
							<div
								role="button"
								aria-label="download"
								@click.stop="addToQueue"
								:data-link="'https://deezer.com/artist/' + release.ART_ID"
								class="download_overlay"
							>
								<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
							</div>
						</div>
						<p class="primary-text">{{ release.ART_NAME }}</p>
						<p class="secondary-text">{{ $t('search.fans', { n: $n(release.NB_FAN) }) }}</p>
					</div>
				</div>
				<div v-else-if="section == 'ALBUM'" class="release_grid firstrow_only">
					<div
						v-for="release in results.allTab.ALBUM.data.slice(0, 10)"
						class="release clickable"
						@click="albumView"
						:data-id="release.ALB_ID"
					>
						<div class="cover_container">
							<img
								aria-hidden="true"
								class="rounded coverart"
								:src="
									'https://e-cdns-images.dzcdn.net/images/cover/' + release.ALB_PICTURE + '/156x156-000000-80-0-0.jpg'
								"
							/>
							<div
								role="button"
								aria-label="download"
								@click.stop="addToQueue"
								:data-link="'https://deezer.com/album/' + release.ALB_ID"
								class="download_overlay"
							>
								<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
							</div>
						</div>
						<p class="primary-text inline-flex">
							<i
								v-if="[1, 4].indexOf(release.EXPLICIT_ALBUM_CONTENT.EXPLICIT_LYRICS_STATUS) != -1"
								class="material-icons explicit_icon"
								>explicit</i
							>
							{{ release.ALB_TITLE }}
						</p>
						<p class="secondary-text">
							{{ release.ART_NAME + ' - ' + $tc('globals.listTabs.trackN', release.NUMBER_TRACK) }}
						</p>
					</div>
				</div>
				<div v-else-if="section == 'PLAYLIST'" class="release_grid firstrow_only">
					<div
						v-for="release in results.allTab.PLAYLIST.data.slice(0, 10)"
						class="release clickable"
						@click="playlistView"
						:data-id="release.PLAYLIST_ID"
					>
						<div class="cover_container">
							<img
								aria-hidden="true"
								class="rounded coverart"
								:src="
									'https://e-cdns-images.dzcdn.net/images/' +
									release.PICTURE_TYPE +
									'/' +
									release.PLAYLIST_PICTURE +
									'/156x156-000000-80-0-0.jpg'
								"
							/>
							<div
								role="button"
								aria-label="download"
								@click.stop="addToQueue"
								:data-link="'https://deezer.com/playlist/' + release.PLAYLIST_ID"
								class="download_overlay"
							>
								<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
							</div>
						</div>
						<p class="primary-text">{{ release.TITLE }}</p>
						<p class="secondary-text">{{ $tc('globals.listTabs.trackN', release.NB_SONG) }}</p>
					</div>
				</div>
			</section>
		</template>
		<div v-if="test">
			<h1>{{ $t('search.noResults') }}</h1>
		</div>
	</div>
</template>
<script>
import { convertDuration } from '@/utils/utils'

export default {
	props: ['results'],
	computed: {
		test() {
			return this.results.allTab.ORDER.every(section =>
				section == 'TOP_RESULT'
					? this.results.allTab[section].length == 0
					: this.results.allTab[section].data.length == 0
			)
		}
	},
	mounted() {
		console.log(this.results)
	},
	methods: {
		convertDuration,
		artistView(event) {
			this.$emit('artistView', event)
		},
		albumView(event) {
			this.$emit('albumView', event)
		},
		playlistView(event) {
			this.$emit('playlistView', event)
		},
		handleClickTopResult(event) {
			let topResultType = this.results.allTab.TOP_RESULT[0].type

			switch (topResultType) {
				case 'artist':
					// this.artistView(event)
					this.$emit('artistView', event)
					break
				case 'album':
					// this.albumView(event)
					this.$emit('albumView', event)
					break
				case 'playlist':
					// this.playlistView(event)
					this.$emit('playlistView', event)
					break

				default:
					break
			}
		}
	}
}
</script>