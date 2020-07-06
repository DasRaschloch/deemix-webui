<template>
	<div style="height: inherit;">
		<BaseLoadingPlaceholder id="start_app_placeholder" text="Connecting to the server..." />

		<TheSidebar />
		<TheMainContent />

		<TheTrackPreview />
		<TheQualityModal />
	</div>
</template>

<script>
import TheSidebar from '@components/TheSidebar.vue'
import TheMainContent from '@components/TheMainContent.vue'
import TheTrackPreview from '@components/TheTrackPreview.vue'
import TheQualityModal from '@components/TheQualityModal.vue'
import BaseLoadingPlaceholder from '@components/BaseLoadingPlaceholder.vue'

export default {
	components: {
		TheSidebar,
		TheMainContent,
		TheTrackPreview,
		TheQualityModal,
		BaseLoadingPlaceholder
	}
}
</script>

<style>
</style>