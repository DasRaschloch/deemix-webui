<template>
	<div>
		<h1 class="mb-8 text-5xl">{{ $t('charts.title') }}</h1>

		<div v-if="country === ''">
			<div class="release-grid">
				<div
					v-for="release in countries"
					role="button"
					:aria-label="release.title"
					class="w-40 h-40 release clickable"
					@click="getTrackList"
					:data-title="release.title"
					:data-id="release.id"
					:key="release.id"
				>
					<img class="w-full rounded coverart" :src="release.picture_medium" />
				</div>
			</div>
		</div>

		<div v-else>
			<button class="btn btn-primary" @click="onChangeCountry">{{ $t('charts.changeCountry') }}</button>
			<button class="btn btn-primary" @click.stop="addToQueue" :data-link="'https://www.deezer.com/playlist/' + id">
				{{ $t('charts.download') }}
			</button>
			<table class="table table--charts">
				<tbody>
					<tr v-for="track in chart" class="track_row">
						<td class="p-3 text-center cursor-default" :class="{ first: track.position === 1 }">
							{{ track.position }}
						</td>
						<td class="table__icon table__icon--big">
							<span
								@click="playPausePreview"
								class="relative inline-block rounded cursor-pointer"
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
						<td class="table__cell--small table__cell--center">
							{{ convertDuration(track.duration) }}
						</td>
						<td
							class="cursor-pointer group"
							@click.stop="addToQueue"
							:data-link="track.link"
							role="button"
							aria-label="download"
						>
							<i
								class="transition-colors duration-150 ease-in-out material-icons group-hover:text-primary"
								:title="$t('globals.download_hint')"
							>
								get_app
							</i>
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

import PreviewControls from '@components/globals/PreviewControls.vue'
import { playPausePreview } from '@components/globals/TheTrackPreview.vue'

export default {
	components: {
		PreviewControls
	},
	data() {
		return {
			country: '',
			id: 0,
			countries: [],
			chart: []
		}
	},
	computed: {
		worldwideRelease() {
			let worldwideRelease = this.countries.filter(country => {
				return country.title === 'Worldwide'
			})

			return worldwideRelease[0]
		}
	},
	async created() {
		socket.on('setChartTracks', this.setTracklist)
		this.$on('hook:destroyed', () => {
			socket.off('setChartTracks')
		})

		let chartsData = await getChartsData()
		let worldwideChart

		chartsData = chartsData.filter(item => {
			if (item.title === 'Worldwide') {
				worldwideChart = item
			}

			return item.title !== 'Worldwide'
		})
		chartsData.unshift(worldwideChart)

		this.initCharts(chartsData)
	},
	methods: {
		convertDuration,
		playPausePreview,
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
