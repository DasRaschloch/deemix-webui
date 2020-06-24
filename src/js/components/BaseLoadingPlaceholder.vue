<template>
	<div class="loading_placeholder">
		<span class="loading_placeholder__text">Loading...</span>
		<div class="lds-ring">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'base-loading-placeholder',
	// Without this empty data rollup watcher throws an error
	data() {
		return {}
	}
}
</script>
<style>
</style>