<template>
	<div id="search_tab-2" class="main_tabcontentZZZ">
		<div class="tab">
			<button
				class="search_tablinks"
				id="search_all_tab-2"
				onclick="changeTab(event, 'search', 'main_search')"
			>All</button>
			<button
				class="search_tablinks"
				id="search_track_tab-2"
				onclick="changeTab(event, 'search', 'track_search')"
			>Tracks</button>
			<button
				class="search_tablinks"
				id="search_album_tab-2"
				onclick="changeTab(event, 'search', 'album_search')"
			>Album</button>
			<button
				class="search_tablinks"
				id="search_artist_tab-2"
				onclick="changeTab(event, 'search', 'artist_search')"
			>Artist</button>
			<button
				class="search_tablinks"
				id="search_playlist_tab-2"
				onclick="changeTab(event, 'search', 'playlist_search')"
			>Playlist</button>
		</div>
		<div id="search_tab_content">
			<the-main-search />
		</div>
	</div>
</template>

<script>
const TheMainSearch = httpVueLoader('./search-tab/TheMainSearch.vue')

module.exports = {
	components: {
		TheMainSearch
	}
}
</script>

<style>
</style>