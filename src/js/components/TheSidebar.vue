<template>
	<aside id="sidebar" role="navigation">
		<span id="main_home_tablink" class="main_tablinks" role="link" aria-label="home">
			<i class="material-icons side_icon">home</i>
			<span class="main_tablinks_text">Home</span>
		</span>
		<span id="main_search_tablink" class="main_tablinks" role="link" aria-label="search">
			<i class="material-icons side_icon">search</i>
			<span class="main_tablinks_text">Search</span>
		</span>
		<span id="main_charts_tablink" class="main_tablinks" role="link" aria-label="charts">
			<i class="material-icons side_icon">bubble_chart</i>
			<span class="main_tablinks_text">Charts</span>
		</span>
		<span id="main_favorites_tablink" class="main_tablinks" role="link" aria-label="favorites">
			<i class="material-icons side_icon">album</i>
			<span class="main_tablinks_text">Favorites</span>
		</span>
		<span id="main_analyzer_tablink" class="main_tablinks" role="link" aria-label="link analyzer">
			<i class="material-icons side_icon">link</i>
			<span class="main_tablinks_text">Link Analyzer</span>
		</span>
		<span id="main_settings_tablink" class="main_tablinks" role="link" aria-label="settings">
			<i class="material-icons side_icon">settings</i>
			<span class="main_tablinks_text">Settings</span>
		</span>
		<span id="main_about_tablink" class="main_tablinks" role="link" aria-label="info">
			<i class="material-icons side_icon">info</i>
			<span class="main_tablinks_text">About</span>
		</span>
		<span id="theme_selector" class="main_tablinks" role="link" aria-label="theme selector">
			<i class="material-icons side_icon side_icon--theme">palette</i>
			<div id="theme_togglers">
				<div class="theme_toggler" data-theme-variant="purple"></div>
				<div class="theme_toggler" data-theme-variant="dark"></div>
				<div class="theme_toggler theme_toggler--active" data-theme-variant="light"></div>
			</div>
		</span>
	</aside>
</template>

<script>
export default {
	name: 'the-sidebar',
	// Without this empty data rollup watcher throws an error
	data() {
		return {}
	}
}
</script>

<style>
</style>