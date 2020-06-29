<template>
	<div style="height: inherit;">
		<div id="start_app_placeholder" class="loading_placeholder">
			<span class="loading_placeholder__text">Connecting to the server...</span>
			<div class="lds-ring">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>

		<TheSidebar />
		<TheMainContent />

		<TheTrackPreview />

		<div id="modal_quality" class="smallmodal">
			<!-- Modal content -->
			<div class="smallmodal-content">
				<button class="quality-button" data-quality-value="9">Download FLAC</button><br />
				<button class="quality-button" data-quality-value="3">Download MP3 320kbps</button><br />
				<button class="quality-button" data-quality-value="1">Download MP3 128kbps</button><br />
				<button class="quality-button" data-quality-value="15">Download 360 Reality Audio [HQ]</button><br />
				<button class="quality-button" data-quality-value="14">Download 360 Reality Audio [MQ]</button><br />
				<button class="quality-button" data-quality-value="13">Download 360 Reality Audio [LQ]</button><br />
			</div>
		</div>
	</div>
</template>

<script>
import TheSidebar from '@components/TheSidebar.vue'
import TheMainContent from '@components/TheMainContent.vue'
import TheTrackPreview from '@components/TheTrackPreview.vue'

export default {
	components: {
		TheSidebar,
		TheMainContent,
		TheTrackPreview
	}
}
</script>

<style>
</style>