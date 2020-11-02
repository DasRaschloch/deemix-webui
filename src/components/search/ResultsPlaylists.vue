<template>
	<section>
		<BaseLoadingPlaceholder v-if="isLoading" />

		<template v-else>
			<div v-if="viewInfo.data.length === 0">
				<h1>{{ $t('search.noResultsPlaylist') }}</h1>
			</div>
			<div class="release_grid" v-else>
				<router-link
					tag="div"
					v-for="playlist in viewInfo.data.slice(0, itemsToShow)"
					class="release clickable"
					:key="playlist.playlistID"
					:to="{ name: 'Playlist', params: { id: playlist.playlistID } }"
				>
					<div class="cover_container">
						<img aria-hidden="true" class="rounded coverart" :src="playlist.playlistPictureMedium" />
						<button
							role="button"
							aria-label="download"
							@click.stop="$emit('add-to-queue', $event)"
							:data-link="playlist.playlistLink"
							class="download_overlay"
							tabindex="0"
						>
							<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
						</button>
					</div>
					<p class="primary-text">{{ playlist.playlistTitle }}</p>
					<p class="secondary-text">
						{{
							`${$t('globals.by', { artist: playlist.artistName })} - ${$tc(
								'globals.listTabs.trackN',
								playlist.playlistTracksNumber
							)}`
						}}
					</p>
				</router-link>
			</div>
		</template>
	</section>
</template>

<script>
import BaseLoadingPlaceholder from '@components/globals/BaseLoadingPlaceholder.vue'

export default {
	components: {
		BaseLoadingPlaceholder
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
	}
}
</script>
