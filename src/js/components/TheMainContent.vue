<template>
	<main id="main_content">
		<TheMiddleSection />

		<div id="download_tab_container" class="tab_hidden">
			<div id="download_tab_drag_handler"></div>
			<i id="toggle_download_tab" class="material-icons download_bar_icon"></i>
			<div id="queue_buttons">
				<i id="open_downloads_folder" class="material-icons download_bar_icon hide">folder_open</i>
				<i id="clean_queue" class="material-icons download_bar_icon">clear_all</i>
				<i id="cancel_queue" class="material-icons download_bar_icon">delete_sweep</i>
			</div>
			<div id="download_list"></div>
		</div>
	</main>
</template>

<script>
import TheMiddleSection from '@components/TheMiddleSection.vue'

export default {
	components: {
		TheMiddleSection
	}
}
</script>

<style>
</style>