<template>
	<div id="charts_tab" class="main_tabcontent" ref="root">
		<h2 class="page_heading">{{ $t('charts.title') }}</h2>
		<div v-if="country === ''" id="charts_selection">
			<div class="release_grid charts_grid">
				<template v-for="release in countries">
					<div
						role="button"
						:aria-label="release.title"
						v-if="release.title === 'Worldwide'"
						class="release clickable"
						@click="getTrackList"
						:data-title="release.title"
						:data-id="release.id"
						:key="release.id"
					>
						<img class="rounded coverart" :src="release.picture_medium" />
					</div>
				</template>

				<template v-for="release in countries">
					<div
						role="button"
						:aria-label="release.title"
						v-if="release.title !== 'Worldwide'"
						class="release clickable"
						@click="getTrackList"
						:data-title="release.title"
						:data-id="release.id"
						:key="release.id"
					>
						<img class="rounded coverart" :src="release.picture_medium" />
					</div>
				</template>
			</div>
		</div>
		<div v-else id="charts_table">
			<button class="btn btn-primary" @click="onChangeCountry">{{ $t('charts.changeCountry') }}</button>
			<button class="btn btn-primary" @click.stop="addToQueue" :data-link="'https://www.deezer.com/playlist/' + id">
				{{ $t('charts.download') }}
			</button>
			<table class="table table--charts">
				<tbody>
					<tr v-for="track in chart" class="track_row">
						<td class="top-tracks-position" :class="{ first: track.position === 1 }">
							{{ track.position }}
						</td>
						<td class="table__icon table__icon--big">
							<a
								href="#"
								@click="playPausePreview"
								class="rounded"
								:class="{ 'single-cover': track.preview }"
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
						<router-link
							tag="td"
							class="table__cell table__cell--medium table__cell--center breakline clickable"
							:to="{ name: 'Artist', params: { id: track.artist.id } }"
						>
							{{ track.artist.name }}
						</router-link>
						<router-link
							tag="td"
							class="table__cell--medium table__cell--center breakline clickable"
							:to="{ name: 'Album', params: { id: track.album.id } }"
						>
							{{ track.album.title }}
						</router-link>
						<td class="table__cell--small table__cell--center">
							{{ convertDuration(track.duration) }}
						</td>
						<td
							class="table__cell--download"
							@click.stop="addToQueue"
							:data-link="track.link"
							role="button"
							aria-label="download"
						>
							<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { socket } from '@/utils/socket'
import { sendAddToQueue } from '@/utils/downloads'
import { convertDuration } from '@/utils/utils'

import { getChartsData } from '@/data/charts'

import EventBus from '@/utils/EventBus'

export default {
	data() {
		return {
			country: '',
			id: 0,
			countries: [],
			chart: []
		}
	},
	async created() {
		socket.on('setChartTracks', this.setTracklist)
		this.$on('hook:destroyed', () => {
			socket.off('setChartTracks')
		})

		const chartsData = await getChartsData()

		this.initCharts(chartsData)
	},
	methods: {
		convertDuration,
		playPausePreview(e) {
			EventBus.$emit('trackPreview:playPausePreview', e)
		},
		previewMouseEnter(e) {
			EventBus.$emit('trackPreview:previewMouseEnter', e)
		},
		previewMouseLeave(e) {
			EventBus.$emit('trackPreview:previewMouseLeave', e)
		},
		addToQueue(e) {
			e.stopPropagation()
			sendAddToQueue(e.currentTarget.dataset.link)
		},
		getTrackList(event) {
			document.getElementById('content').scrollTo(0, 0)

			const {
				currentTarget: {
					dataset: { title }
				},
				currentTarget: {
					dataset: { id }
				}
			} = event

			this.country = title
			localStorage.setItem('chart', this.country)
			this.id = id
			socket.emit('getChartTracks', this.id)
		},
		setTracklist(data) {
			this.chart = data
		},
		onChangeCountry() {
			this.country = ''
			this.id = 0
		},
		initCharts(chartsData) {
			this.countries = chartsData
			this.country = localStorage.getItem('chart') || ''

			if (!this.country) return

			let i = 0
			for (; i < this.countries.length; i++) {
				if (this.countries[i].title == this.country) break
			}

			if (i !== this.countries.length) {
				this.id = this.countries[i].id
				socket.emit('getChartTracks', this.id)
			} else {
				this.country = ''
				localStorage.setItem('chart', this.country)
			}
		}
	}
}
</script>

<style>
</style>