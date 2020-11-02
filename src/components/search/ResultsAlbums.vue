<template>
	<section>
		<BaseLoadingPlaceholder v-if="isLoading" />

		<template v-else>
			<div v-if="viewInfo.data.length === 0">
				<h1>{{ $t('search.noResultsAlbum') }}</h1>
			</div>

			<div class="release_grid" v-else>
				<router-link
					tag="div"
					v-for="release in viewInfo.data.slice(0, itemsToShow)"
					:key="release.albumID"
					class="release clickable"
					:to="{ name: 'Album', params: { id: release.albumID } }"
				>
					<div class="cover_container">
						<img aria-hidden="true" class="rounded coverart" :src="release.albumCoverMedium" />
						<button
							role="button"
							aria-label="download"
							@click.stop="$emit('add-to-queue', $event)"
							:data-link="release.albumLink"
							class="download_overlay"
							tabindex="0"
						>
							<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
						</button>
					</div>
					<p class="primary-text flex items-center">
						<i v-if="release.isAlbumExplicit" class="material-icons explicit-icon">explicit</i>
						{{ release.albumTitle }}
					</p>
					<p class="secondary-text">
						{{
							$t('globals.by', { artist: release.artistName }) +
							' - ' +
							$tc('globals.listTabs.trackN', release.albumTracks)
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
	components: {
		BaseLoadingPlaceholder
	}
}
</script>
