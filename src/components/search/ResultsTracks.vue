<template>
	<div id="track_search" class="search_tabcontent">
		<BaseLoadingPlaceholder v-if="!results.trackTab.loaded" />
		<div v-else-if="results.trackTab.data.length == 0">
			<h1>{{ $t('search.noResultsTrack') }}</h1>
		</div>
		<table class="table table--tracks" v-if="results.trackTab.data.length > 0">
			<thead>
				<tr>
					<th colspan="2">{{ $tc('globals.listTabs.title', 1) }}</th>
					<th>{{ $tc('globals.listTabs.artist', 1) }}</th>
					<th>{{ $tc('globals.listTabs.album', 1) }}</th>
					<th>
						<i class="material-icons"> timer </i>
					</th>
					<th style="width: 56px"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="track in results.trackTab.data">
					<td class="table__icon table__icon--big">
						<a
							href="#"
							@click="playPausePreview"
							:class="'rounded' + (track.preview ? ' single-cover' : '')"
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
					<td class="table__cell table__cell--large breakline">
						<div class="table__cell-content table__cell-content--vertical-center">
							<i v-if="track.explicit_lyrics" class="material-icons explicit_icon"> explicit </i>
							{{
								track.title +
								(track.title_version && track.title.indexOf(track.title_version) == -1 ? ' ' + track.title_version : '')
							}}
						</div>
					</td>
					<td
						class="table__cell table__cell--medium table__cell--center breakline clickable"
						@click.stop="artistView"
						:data-id="track.artist.id"
					>
						{{ track.artist.name }}
					</td>
					<td
						class="table__cell table__cell--medium table__cell--center breakline clickable"
						@click.stop="albumView"
						:data-id="track.album.id"
					>
						{{ track.album.title }}
					</td>
					<td class="table__cell table__cell--small table__cell--center">
						{{ convertDuration(track.duration) }}
					</td>
					<td
						class="table__cell--download table__cell--center clickable"
						@click.stop="$emit('add-to-queue', $event)"
						:data-link="track.link"
						role="button"
						aria-label="download"
					>
						<i class="material-icons" :title="$t('globals.download_hint')"> get_app </i>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import BaseLoadingPlaceholder from '@components/BaseLoadingPlaceholder.vue'

import EventBus from '@/utils/EventBus.js'
import { convertDuration } from '@/utils/utils'

export default {
	props: ['results'],
	components: {
		BaseLoadingPlaceholder
	},
	methods: {
		convertDuration,
		artistView(event) {
			this.$emit('artist-view', event)
		},
		albumView(event) {
			this.$emit('album-view', event)
		},
		playlistView(event) {
			this.$emit('playlist-view', event)
		},
		playPausePreview(e) {
			EventBus.$emit('trackPreview:playPausePreview', e)
		},
		previewMouseEnter(e) {
			EventBus.$emit('trackPreview:previewMouseEnter', e)
		},
		previewMouseLeave(e) {
			EventBus.$emit('trackPreview:previewMouseLeave', e)
		}
	}
}
</script>