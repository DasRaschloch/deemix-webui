<template>
	<div>
		<div class="app-container">
			<TheSidebar />

			<div class="content-container">
				<TheSearchBar />
				<TheContent />
			</div>

			<TheDownloadBar />
		</div>

		<BaseLoadingPlaceholder id="start_app_placeholder" text="Connecting to the server..." />

		<TheTrackPreview />
		<TheQualityModal />
		<!-- <ConfirmModal /> -->

		<TheContextMenu />
	</div>
</template>

<style>
.app-container {
	display: flex;
}

.content-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	/* margin-left: 48px; */
}
</style>

<script>
import TheDownloadBar from '@components/downloads/TheDownloadBar.vue'

import BaseLoadingPlaceholder from '@components/globals/BaseLoadingPlaceholder.vue'
import TheContextMenu from '@components/globals/TheContextMenu.vue'
import TheTrackPreview from '@components/globals/TheTrackPreview.vue'
import TheQualityModal from '@components/globals/TheQualityModal.vue'
import ConfirmModal from '@components/globals/ConfirmModal.vue'

import TheSidebar from '@components/TheSidebar.vue'
import TheSearchBar from '@components/TheSearchBar.vue'
import TheContent from '@components/TheContent.vue'

export default {
	components: {
		TheSidebar,
		TheSearchBar,
		TheDownloadBar,
		TheTrackPreview,
		TheQualityModal,
		BaseLoadingPlaceholder,
		TheContextMenu,
		TheContent,
		ConfirmModal
	}
}
</script>
