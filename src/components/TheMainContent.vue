<template>
	<main id="main_content">
		<TheMiddleSection />
		<TheDownloadTab />
	</main>
</template>

<script>
import TheMiddleSection from '@components/TheMiddleSection.vue'
import TheDownloadTab from '@components/TheDownloadTab.vue'

export default {
	components: {
		TheMiddleSection,
		TheDownloadTab
	}
}
</script>

<style>
</style>