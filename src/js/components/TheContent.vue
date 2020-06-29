<template>
	<section id="content">
		<div id="container">
			<ArtistTab />
			<TheChartsTab />
			<TheFavoritesTab />
			<TheErrorsTab />
			<TheHomeTab />
			<TheLinkAnalyzerTab />
			<TheAboutTab />
			<TheSettingsTab />
			<TheMainSearch />
			<TracklistTab />
		</div>
	</section>
</template>

<script>
import ArtistTab from '@components/ArtistTab.vue'
import TracklistTab from '@components/TracklistTab.vue'

import TheChartsTab from '@components/TheChartsTab.vue'
import TheFavoritesTab from '@components/TheFavoritesTab.vue'
import TheErrorsTab from '@components/TheErrorsTab.vue'
import TheHomeTab from '@components/TheHomeTab.vue'
import TheLinkAnalyzerTab from '@components/TheLinkAnalyzerTab.vue'
import TheAboutTab from '@components/TheAboutTab.vue'
import TheSettingsTab from '@components/TheSettingsTab.vue'
import TheMainSearch from '@components/TheMainSearch.vue'

export default {
	components: {
		ArtistTab,
		TheChartsTab,
		TheFavoritesTab,
		TheErrorsTab,
		TheHomeTab,
		TheLinkAnalyzerTab,
		TheAboutTab,
		TheSettingsTab,
		TheMainSearch,
		TracklistTab
	}
}
</script>

<style>
</style>