<template>
	<section>
		<BaseLoadingPlaceholder v-if="isLoading" />

		<template v-else>
			<div v-if="viewInfo.data.length === 0">
				<h1>{{ $t('search.noResultsTrack') }}</h1>
			</div>

			<table v-else class="table table--tracks">
				<thead v-if="wantHeaders">
					<tr class="capitalize">
						<th colspan="2">{{ $tc('globals.listTabs.title', 1) }}</th>
						<th>{{ $tc('globals.listTabs.artist', 1) }}</th>
						<th>{{ $tc('globals.listTabs.album', 1) }}</th>
						<th>
							<i class="material-icons">timer</i>
						</th>
						<th style="width: 3.5rem"></th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="track in viewInfo.data.slice(0, itemsToShow)" :key="track.trackLink">
						<td class="table__icon table__icon--big">
							<a
								href="#"
								@click="playPausePreview"
								class="rounded"
								:class="{ 'single-cover': !!track.trackPreview }"
								:data-preview="track.trackPreview"
							>
								<PreviewControls v-if="track.trackPreview" />

								<img class="rounded coverart" :src="track.albumPicture" />
							</a>
						</td>
						<td class="table__cell table__cell--large breakline">
							<div class="table__cell-content table__cell-content--vertical-center">
								<i v-if="track.isTrackExplicit" class="material-icons explicit-icon">explicit</i>
								{{ getTitle(track) }}
							</div>
						</td>
						<router-link
							tag="td"
							class="table__cell table__cell--medium table__cell--center breakline clickable"
							:to="{ name: 'Artist', params: { id: track.artistID } }"
						>
							{{ track.artistName }}
						</router-link>
						<router-link
							tag="td"
							class="table__cell table__cell--medium table__cell--center breakline clickable"
							:to="{ name: 'Album', params: { id: track.albumID } }"
						>
							{{ track.albumTitle }}
						</router-link>
						<td class="table__cell table__cell--small table__cell--center">
							{{ convertDuration(track.trackDuration) }}
						</td>
						<td
							class="table__cell--download table__cell--center clickable"
							@click.stop="$emit('add-to-queue', $event)"
							:data-link="track.trackLink"
							role="button"
							aria-label="download"
						>
							<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
						</td>
					</tr>
				</tbody>
			</table>
		</template>
	</section>
</template>

<script>
import BaseLoadingPlaceholder from '@components/globals/BaseLoadingPlaceholder.vue'
import PreviewControls from '@components/globals/PreviewControls.vue'

import EventBus from '@/utils/EventBus'
import { convertDuration } from '@/utils/utils'

export default {
	components: {
		BaseLoadingPlaceholder,
		PreviewControls
	},
	props: {
		viewInfo: {
			validator: function (value) {
				let isNull = Object.is(value, null)
				let isObject = Object.prototype.toString.call(value) === '[object Object]'

				return isNull || isObject
			},
			required: true
		},
		itemsToShow: {
			type: Number,
			required: false
		},
		wantHeaders: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	computed: {
		isLoading() {
			return !this.viewInfo || !this.viewInfo.hasLoaded
		}
	},
	methods: {
		convertDuration,
		playPausePreview(e) {
			EventBus.$emit('trackPreview:playPausePreview', e)
		},
		getTitle(track) {
			const hasTitleVersion = track.trackTitleVersion && track.trackTitle.indexOf(track.trackTitleVersion) === -1

			return `${track.trackTitle}${hasTitleVersion ? ` ${track.trackTitleVersion}` : ''}`
		}
	}
}
</script>