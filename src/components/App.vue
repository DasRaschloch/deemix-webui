<template>
	<div>
		<TheSidebar />

		<div class="app-container">
			<div class="content-container">
				<TheSearchBar />
				<TheContent />
			</div>
			<TheDownloadTab class="downlaods" />
		</div>

		<BaseLoadingPlaceholder id="start_app_placeholder" text="Connecting to the server..." />

		<TheTrackPreview />
		<TheQualityModal />

		<TheContextMenu />
	</div>
</template>

<style lang="scss">
.app-container {
	display: flex;
}

.content-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-left: 48px;
}

.downlaods {
	flex-basis: 32px;
}
</style>

<script>
import TheSidebar from '@components/TheSidebar.vue'
import TheTrackPreview from '@components/TheTrackPreview.vue'
import TheQualityModal from '@components/TheQualityModal.vue'
import BaseLoadingPlaceholder from '@components/BaseLoadingPlaceholder.vue'
import TheContextMenu from '@components/TheContextMenu.vue'
import TheDownloadTab from '@components/TheDownloadTab.vue'
import TheSearchBar from '@components/TheSearchBar.vue'
import TheContent from '@components/TheContent.vue'

export default {
	components: {
		TheSidebar,
		TheSearchBar,
		TheDownloadTab,
		TheTrackPreview,
		TheQualityModal,
		BaseLoadingPlaceholder,
		TheContextMenu,
		TheContent
	}
}
</script>
