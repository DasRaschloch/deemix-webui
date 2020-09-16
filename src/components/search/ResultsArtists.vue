<template>
	<div id="artist_search" class="search_tabcontent">
		<base-loading-placeholder v-if="!results.artistTab.loaded"></base-loading-placeholder>
		<div v-else-if="results.artistTab.data.length == 0">
			<h1>{{ $t('search.noResultsArtist') }}</h1>
		</div>
		<div class="release_grid" v-if="results.artistTab.data.length > 0">
			<div
				v-for="release in results.artistTab.data"
				class="release clickable"
				@click.stop="$emit('artist-view', $event)"
				:data-id="release.id"
			>
				<div class="cover_container">
					<img aria-hidden="true" class="circle coverart" :src="release.picture_medium" />
					<div
						role="button"
						aria-label="download"
						@click.stop="$emit('add-to-queue', $event)"
						:data-link="release.link"
						class="download_overlay"
					>
						<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
					</div>
				</div>
				<p class="primary-text">{{ release.name }}</p>
				<p class="secondary-text">{{ $tc('globals.listTabs.releaseN', release.nb_album) }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import BaseLoadingPlaceholder from '@components/BaseLoadingPlaceholder.vue'

export default {
	props: ['results'],
	components: {
		BaseLoadingPlaceholder
	}
}
</script>