<template>
	<div id="search_tab" class="main_tabcontent">
		<div class="tab">
			<button
				class="search_tablinks selective"
				id="search_all_tab"
				onclick="changeTab(event, 'search', 'main_search')"
			>All</button>
			<button
				class="search_tablinks selective"
				id="search_track_tab"
				onclick="changeTab(event, 'search', 'track_search')"
			>Tracks</button>
			<button
				class="search_tablinks selective"
				id="search_album_tab"
				onclick="changeTab(event, 'search', 'album_search')"
			>Album</button>
			<button
				class="search_tablinks selective"
				id="search_artist_tab"
				onclick="changeTab(event, 'search', 'artist_search')"
			>Artist</button>
			<button
				class="search_tablinks selective"
				id="search_playlist_tab"
				onclick="changeTab(event, 'search', 'playlist_search')"
			>Playlist</button>
		</div>
		<div id="search_tab_content">
			<the-main-search></the-main-search>
			<the-track-search></the-track-search>
			<the-album-search></the-album-search>
			<the-artist-search></the-artist-search>
			<the-playlist-search></the-playlist-search>
		</div>
	</div>
</template>

<script>
const TheMainSearch = httpVueLoader('./search-tab/TheMainSearch.vue')
const TheTrackSearch = httpVueLoader('./search-tab/TheTrackSearch.vue')
const TheAlbumSearch = httpVueLoader('./search-tab/TheAlbumSearch.vue')
const TheArtistSearch = httpVueLoader('./search-tab/TheArtistSearch.vue')
const ThePlaylistSearch = httpVueLoader('./search-tab/ThePlaylistSearch.vue')

module.exports = {
	components: {
		TheMainSearch,
		TheTrackSearch,
		TheAlbumSearch,
		TheArtistSearch,
		ThePlaylistSearch
	}
}
</script>

<style>
</style>