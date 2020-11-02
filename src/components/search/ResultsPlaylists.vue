<template>
	<section>
		<BaseLoadingPlaceholder v-if="isLoading" />

		<template v-else>
			<div v-if="viewInfo.data.length === 0">
				<h1>{{ $t('search.noResultsPlaylist') }}</h1>
			</div>
			<div class="release_grid" v-else>
				<div class="w-40 release" v-for="playlist in viewInfo.data.slice(0, itemsToShow)" :key="playlist.playlistID">
					<router-link tag="div" class="cursor-pointer" :to="{ name: 'Playlist', params: { id: playlist.playlistID } }">
						<CoverContainer
							is-rounded
							:cover="playlist.playlistPictureMedium"
							:link="playlist.playlistLink"
							@click.stop="$emit('add-to-queue', $event)"
						/>

						<span class="mb-1 transition-colors duration-200 ease-in-out hover:text-primary">
							{{ playlist.playlistTitle }}
						</span>
					</router-link>

					<p class="mb-1 text-sm opacity-75">
						{{
							`${$t('globals.by', { artist: playlist.artistName })} - ${$tc(
								'globals.listTabs.trackN',
								playlist.playlistTracksNumber
							)}`
						}}
					</p>
				</div>
			</div>
		</template>
	</section>
</template>

<script>
import BaseLoadingPlaceholder from '@components/globals/BaseLoadingPlaceholder.vue'
import CoverContainer from '@components/globals/CoverContainer.vue'

export default {
	components: {
		BaseLoadingPlaceholder,
		CoverContainer
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
