<template>
	<div id="middle_section">
		<TheSearchBar />
		<TheContent />

		<div id="search_placeholder" class="loading_placeholder loading_placeholder--hidden">
			<span class="loading_placeholder__text">Searching...</span>
			<div class="lds-ring">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	</div>
</template>

<script>
import TheContent from '@components/TheContent.vue'
import TheSearchBar from '@components/TheSearchBar.vue'

export default {
	components: {
		TheContent,
		TheSearchBar
	}
}
</script>

<style>
</style>