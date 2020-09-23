<template>
	<div id="album_search" class="search_tabcontent">
		<BaseLoadingPlaceholder v-if="!results.albumTab.loaded" />
		<div v-else-if="results.albumTab.data.length == 0">
			<h1>{{ $t('search.noResultsAlbum') }}</h1>
		</div>
		<div class="release_grid" v-if="results.albumTab.data.length > 0">
			<div
				v-for="release in results.albumTab.data"
				class="release clickable"
				@click.stop="$emit('album-view', $event)"
				:data-id="release.id"
			>
				<div class="cover_container">
					<img aria-hidden="true" class="rounded coverart" :src="release.cover_medium" />
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
				<p class="primary-text inline-flex">
					<i v-if="release.explicit_lyrics" class="material-icons explicit_icon">explicit</i>
					{{ release.title }}
				</p>
				<p class="secondary-text">
					{{
						$t('globals.by', { artist: release.artist.name }) +
						' - ' +
						$tc('globals.listTabs.trackN', release.nb_tracks)
					}}
				</p>
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