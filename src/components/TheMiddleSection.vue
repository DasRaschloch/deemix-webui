<template>
	<main id="main_content" aria-label="content">
		<TheContent />
		<!-- <BaseLoadingPlaceholder id="search_placeholder" text="Searching..." :hidden="true" /> -->
	</main>
</template>

<style lang="scss" scoped>
#main_content {
	background-color: var(--main-background);
	min-width: 10px;
	// margin-left: 48px; // $sidebar-width
	// width: calc(100% - #{$sidebar-width});
	// flex: 1;
	width: 100%;
	height: 100%;
}
</style>

<script>
import TheContent from '@components/TheContent.vue'
import BaseLoadingPlaceholder from '@components/BaseLoadingPlaceholder.vue'

export default {
	components: {
		TheContent,
		BaseLoadingPlaceholder
	}
}
</script>

<style>
</style>
