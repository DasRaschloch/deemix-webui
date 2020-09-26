<template>
	<div id="album_search" class="search_tabcontent">
		<BaseLoadingPlaceholder v-if="!results.albumTab.loaded" />
		<div v-else-if="results.albumTab.data.length == 0">
			<h1>{{ $t('search.noResultsAlbum') }}</h1>
		</div>
		<div class="release_grid" v-if="results.albumTab.data.length > 0">
			<router-link
				tag="div"
				v-for="release in results.albumTab.data"
				:key="release.id"
				class="release clickable"
				:to="{ name: 'Album', params: { id: release.id } }"
			>
				<div class="cover_container">
					<img aria-hidden="true" class="rounded coverart" :src="release.cover_medium" />
					<button
						role="button"
						aria-label="download"
						@click.stop="$emit('add-to-queue', $event)"
						:data-link="release.link"
						class="download_overlay"
						tabindex="0"
					>
						<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
					</button>
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
			</router-link>
		</div>
	</div>
</template>

<script>
import BaseLoadingPlaceholder from '@components/globals/BaseLoadingPlaceholder.vue'

export default {
	props: ['results'],
	components: {
		BaseLoadingPlaceholder
	}
}
</script>
