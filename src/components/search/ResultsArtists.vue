<template>
	<div id="artist_search" class="search_tabcontent">
		<BaseLoadingPlaceholder v-if="!results.artistTab.loaded"></BaseLoadingPlaceholder>
		<div v-else-if="results.artistTab.data.length == 0">
			<h1>{{ $t('search.noResultsArtist') }}</h1>
		</div>
		<div class="release_grid" v-if="results.artistTab.data.length > 0">
			<router-link
				tag="div"
				v-for="release in results.artistTab.data"
				class="release clickable"
				:key="release.id"
				:to="{ name: 'Artist', params: { id: release.id } }"
			>
				<div class="cover_container">
					<img aria-hidden="true" class="circle coverart" :src="release.picture_medium" />
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
				<p class="primary-text">{{ release.name }}</p>
				<p class="secondary-text">{{ $tc('globals.listTabs.releaseN', release.nb_album) }}</p>
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
