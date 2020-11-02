<template>
	<section>
		<BaseLoadingPlaceholder v-if="isLoading" />

		<template v-else>
			<div v-if="viewInfo.data.length === 0">
				<h1>{{ $t('search.noResultsArtist') }}</h1>
			</div>

			<div v-else class="release_grid">
				<router-link
					tag="div"
					v-for="release in viewInfo.data.slice(0, itemsToShow)"
					class="release clickable"
					:key="release.artistID"
					:to="{ name: 'Artist', params: { id: release.artistID } }"
				>
					<div class="cover_container">
						<img aria-hidden="true" class="circle coverart" :src="release.artistPictureMedium" />
						<button
							role="button"
							aria-label="download"
							@click.stop="$emit('add-to-queue', $event)"
							:data-link="release.artistLink"
							class="download_overlay"
							tabindex="0"
						>
							<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
						</button>
					</div>
					<p class="primary-text">{{ release.artistName }}</p>
					<p class="secondary-text">{{ $tc('globals.listTabs.releaseN', release.artistAlbumsNumber) }}</p>
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
