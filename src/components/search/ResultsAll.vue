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
					@click="$emit('change-search-tab', section)"
					class="search_header"
					:class="{ top_result_header: section === 'TOP_RESULT' }"
				>
					{{ $tc(`globals.listTabs.${section.toLowerCase()}`, 2) }}
				</h2>
				<!-- Top result -->
				<router-link
					tag="div"
					v-if="section == 'TOP_RESULT'"
					class="top_result clickable"
					:to="{ name: upperCaseFirstLowerCaseRest(topResultType), params: { id: results.allTab.TOP_RESULT[0].id } }"
				>
					<div class="cover_container">
						<img
							aria-hidden="true"
							:src="results.allTab.TOP_RESULT[0].picture"
							:class="(results.allTab.TOP_RESULT[0].type == 'artist' ? 'circle' : 'rounded') + ' coverart'"
						/>
						<button
							role="button"
							aria-label="download"
							@click.stop="$emit('add-to-queue', $event)"
							:data-link="results.allTab.TOP_RESULT[0].link"
							class="download_overlay"
							tabindex="0"
						>
							<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
						</button>
					</div>
					<div class="info_box">
						<p class="primary-text">{{ results.allTab.TOP_RESULT[0].title }}</p>
						<p class="secondary-text">
							{{ fansNumber }}
						</p>
						<span class="tag">{{ $tc(`globals.listTabs.${results.allTab.TOP_RESULT[0].type}`, 1) }}</span>
					</div>
				</router-link>
				<div v-else-if="section == 'TRACK'">
					<table class="table table--tracks">
						<tbody>
							<tr v-for="track in results.allTab.TRACK.data.slice(0, 6)" :key="track.SNG_ID">
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
									<router-link
										tag="span"
										v-for="artist in track.ARTISTS"
										:key="artist.ART_ID"
										class="clickable"
										:to="{
											name: 'Artist',
											params: { id: artist.ART_ID }
										}"
									>
										{{ artist.ART_NAME }}
									</router-link>
								</td>
								<router-link
									tag="td"
									class="table__cell--medium table__cell--center breakline clickable"
									:to="{ name: 'Album', params: { id: track.ALB_ID } }"
								>
									{{ track.ALB_TITLE }}
								</router-link>
								<td class="table__cell table__cell--center">
									{{ convertDuration(track.DURATION) }}
								</td>
								<td
									class="table__cell--download table__cell--center clickable"
									@click.stop="$emit('add-to-queue', $event)"
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
					<router-link
						tag="div"
						v-for="release in results.allTab.ARTIST.data.slice(0, 10)"
						class="release clickable"
						:key="release.ART_ID"
						:to="{ name: 'Artist', params: { id: release.ART_ID } }"
					>
						<div class="cover_container">
							<img
								aria-hidden="true"
								class="circle coverart"
								:src="
									'https://e-cdns-images.dzcdn.net/images/artist/' + release.ART_PICTURE + '/156x156-000000-80-0-0.jpg'
								"
							/>
							<button
								role="button"
								aria-label="download"
								@click.stop="$emit('add-to-queue', $event)"
								:data-link="'https://deezer.com/artist/' + release.ART_ID"
								class="download_overlay"
								tabindex="0"
							>
								<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
							</button>
						</div>
						<p class="primary-text">{{ release.ART_NAME }}</p>
						<p class="secondary-text">{{ $t('search.fans', { n: $n(release.NB_FAN) }) }}</p>
					</router-link>
				</div>
				<div v-else-if="section == 'ALBUM'" class="release_grid firstrow_only">
					<router-link
						tag="div"
						v-for="release in results.allTab.ALBUM.data.slice(0, 10)"
						:key="release.ALB_ID"
						class="release clickable"
						:to="{ name: 'Album', params: { id: release.ALB_ID } }"
					>
						<div class="cover_container">
							<img
								aria-hidden="true"
								class="rounded coverart"
								:src="
									'https://e-cdns-images.dzcdn.net/images/cover/' + release.ALB_PICTURE + '/156x156-000000-80-0-0.jpg'
								"
							/>
							<button
								role="button"
								aria-label="download"
								@click.stop="$emit('add-to-queue', $event)"
								:data-link="'https://deezer.com/album/' + release.ALB_ID"
								class="download_overlay"
								tabindex="0"
							>
								<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
							</button>
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
					</router-link>
				</div>
				<div v-else-if="section == 'PLAYLIST'" class="release_grid firstrow_only">
					<router-link
						tag="div"
						v-for="release in results.allTab.PLAYLIST.data.slice(0, 10)"
						class="release clickable"
						:key="release.PLAYLIST_ID"
						:to="{ name: 'Playlist', params: { id: release.PLAYLIST_ID } }"
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
							<button
								role="button"
								aria-label="download"
								@click.stop="$emit('add-to-queue', $event)"
								:data-link="'https://deezer.com/playlist/' + release.PLAYLIST_ID"
								class="download_overlay"
								tabindex="0"
							>
								<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
							</button>
						</div>
						<p class="primary-text">{{ release.TITLE }}</p>
						<p class="secondary-text">{{ $tc('globals.listTabs.trackN', release.NB_SONG) }}</p>
					</router-link>
				</div>
			</section>
		</template>
		<div v-if="noResults">
			<h1>{{ $t('search.noResults') }}</h1>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.tag {
	background-color: var(--tag-background);
	border-radius: 2px;
	color: var(--tag-text);
	display: inline-block;
	font-size: 10px;
	padding: 3px 6px;
	text-transform: capitalize;
}
</style>

<script>
import { convertDuration } from '@/utils/utils'
import { upperCaseFirstLowerCaseRest } from '@/utils/texts'

export default {
	props: ['results'],
	computed: {
		topResultType() {
			return this.results.allTab.TOP_RESULT[0].type
		},
		noResults() {
			return this.results.allTab.ORDER.every(section =>
				section == 'TOP_RESULT'
					? this.results.allTab[section].length == 0
					: this.results.allTab[section].data.length == 0
			)
		},
		fansNumber() {
			let number

			try {
				number = this.$n(this.results.allTab.TOP_RESULT[0].nb_fan)
			} catch (error) {
				number = this.$n(this.results.allTab.TOP_RESULT[0].nb_fan, { locale: 'en' })
			}

			return this.results.allTab.TOP_RESULT[0].type == 'artist'
				? this.$t('search.fans', { n: number })
				: this.$t('globals.by', { artist: this.results.allTab.TOP_RESULT[0].artist }) +
						' - ' +
						this.$tc('globals.listTabs.trackN', this.results.allTab.TOP_RESULT[0].nb_song)
		}
	},
	methods: {
		convertDuration,
		upperCaseFirstLowerCaseRest
	}
}
</script>
