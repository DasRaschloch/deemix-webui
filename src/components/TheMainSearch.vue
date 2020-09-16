<template>
	<div id="search_tab" class="main_tabcontent" @click="handleSearchTabClick" ref="root">
		<div v-show="!showSearchTab">
			<h2>{{ $t('search.startSearching') }}</h2>
			<p>{{ $t('search.description') }}</p>
		</div>

		<div v-show="showSearchTab">
			<ul class="section-tabs">
				<li
					class="section-tabs__tab"
					v-for="tab in tabs"
					:key="tab.name"
					@click="currentTab = tab"
					:class="{ active: currentTab.name === tab.name }"
				>
					{{ tab.name }}
				</li>
			</ul>

			<component
				:is="currentTab.component"
				:results="results"
				@add-to-queue="addToQueue"
				@artist-view="artistView"
				@album-view="albumView"
				@playlist-view="playlistView"
				@change-search-tab="changeSearchTab"
			></component>
		</div>
	</div>
</template>

<script>
import BaseLoadingPlaceholder from '@components/BaseLoadingPlaceholder.vue'
import ResultsAll from '@components/search/ResultsAll.vue'
import ResultsAlbums from '@components/search/ResultsAlbums.vue'
import ResultsArtists from '@components/search/ResultsArtists.vue'
import ResultsPlaylists from '@components/search/ResultsPlaylists.vue'
import ResultsTracks from '@components/search/ResultsTracks.vue'

import { socket } from '@/utils/socket'
import { showView } from '@js/tabs.js'
import Downloads from '@/utils/downloads'
import Utils from '@/utils/utils'
import { changeTab } from '@js/tabs.js'
import EventBus from '@/utils/EventBus.js'

export default {
	components: {
		BaseLoadingPlaceholder
	},
	data() {
		const $t = this.$t.bind(this)
		const $tc = this.$tc.bind(this)

		return {
			currentTab: {
				name: '',
				component: {}
			},
			tabs: [
				{
					name: $t('globals.listTabs.all'),
					searchType: 'all',
					component: ResultsAll
				},
				{
					name: $tc('globals.listTabs.track', 2),
					searchType: 'track',
					component: ResultsTracks
				},
				{
					name: $tc('globals.listTabs.album', 2),
					searchType: 'album',
					component: ResultsAlbums
				},
				{
					name: $tc('globals.listTabs.artist', 2),
					searchType: 'artist',
					component: ResultsArtists
				},
				{
					name: $tc('globals.listTabs.playlist', 2),
					searchType: 'playlist',
					component: ResultsPlaylists
				}
			],
			results: {
				query: '',
				allTab: {
					ORDER: [],
					TOP_RESULT: [],
					ALBUM: {},
					ARTIST: {},
					TRACK: {},
					PLAYLIST: {}
				},
				trackTab: {
					data: [],
					next: 0,
					total: 0,
					loaded: false
				},
				albumTab: {
					data: [],
					next: 0,
					total: 0,
					loaded: false
				},
				artistTab: {
					data: [],
					next: 0,
					total: 0,
					loaded: false
				},
				playlistTab: {
					data: [],
					next: 0,
					total: 0,
					loaded: false
				}
			}
		}
	},
	computed: {
		showSearchTab() {
			return this.results.query !== ''
		}
	},
	props: {
		scrolledSearchType: {
			type: String,
			required: false
		}
	},
	created() {
		this.currentTab = this.tabs[0]
	},
	mounted() {
		EventBus.$on('mainSearch:checkLoadMoreContent', this.checkLoadMoreContent)

		this.$root.$on('mainSearch:showNewResults', this.showNewResults)
		socket.on('mainSearch', this.handleMainSearch)
		socket.on('search', this.handleSearch)
	},
	methods: {
		artistView: showView.bind(null, 'artist'),
		albumView: showView.bind(null, 'album'),
		playlistView: showView.bind(null, 'playlist'),
		playPausePreview(e) {
			EventBus.$emit('trackPreview:playPausePreview', e)
		},
		previewMouseEnter(e) {
			EventBus.$emit('trackPreview:previewMouseEnter', e)
		},
		previewMouseLeave(e) {
			EventBus.$emit('trackPreview:previewMouseLeave', e)
		},
		changeSearchTab(sectionName) {
			sectionName = sectionName.toLowerCase()

			let newTab = this.tabs.find(tab => {
				return tab.searchType === sectionName
			})

			if (!newTab) {
				console.error(`No tab ${sectionName} found`)
				return
			}

			this.currentTab = newTab
		},
		handleSearchTabClick(event) {
			const {
				target,
				target: { id }
			} = event
			let selectedTab = null

			switch (id) {
				case 'search_all_tab':
					selectedTab = 'main_search'
					break
				case 'search_track_tab':
					selectedTab = 'track_search'
					break
				case 'search_album_tab':
					selectedTab = 'album_search'
					break
				case 'search_artist_tab':
					selectedTab = 'artist_search'
					break
				case 'search_playlist_tab':
					selectedTab = 'playlist_search'
					break

				default:
					break
			}

			if (!selectedTab) return

			console.log('asfsdf')

			changeTab(target, 'search', selectedTab)
		},
		handleClickTopResult(event) {
			let topResultType = this.results.allTab.TOP_RESULT[0].type

			switch (topResultType) {
				case 'artist':
					this.artistView(event)
					break
				case 'album':
					this.albumView(event)
					break
				case 'playlist':
					this.playlistView(event)
					break

				default:
					break
			}
		},
		showNewResults(term, mainSelected) {
			console.log('show new results')
			let needToPerformNewSearch = term !== this.results.query || mainSelected == 'search_tab'

			if (needToPerformNewSearch) {
				// this.showSearchTab = false
				socket.emit('mainSearch', { term })

				// Showing loading placeholder
				this.$root.$emit('updateSearchLoadingState', true)
			} else {
				// this.showSearchTab = true
			}
		},
		checkLoadMoreContent(searchSelected) {
			if (this.results[searchSelected.split('_')[0] + 'Tab'].data.length !== 0) return

			this.search(searchSelected.split('_')[0])
		},
		addToQueue(e) {
			console.log('add to queue')
			Downloads.sendAddToQueue(e.currentTarget.dataset.link)
		},
		numberWithDots: Utils.numberWithDots,
		convertDuration: Utils.convertDuration,
		search(type) {
			console.log('search')
			socket.emit('search', {
				term: this.results.query,
				type: type,
				start: this.results[type + 'Tab'].next,
				nb: 30
			})
		},
		scrolledSearch(type) {
			let currentTab = type + 'Tab'

			if (this.results[currentTab].next < this.results[currentTab].total) {
				socket.emit('search', {
					term: this.results.query,
					type: type,
					start: this.results[currentTab].next,
					nb: 30
				})
			}
		},
		handleMainSearch(result) {
			console.log('handle main search', result)
			// Hiding loading placeholder
			this.$root.$emit('updateSearchLoadingState', false)

			let resetObj = { data: [], next: 0, total: 0, loaded: false }

			this.results.allTab = result
			this.results.trackTab = { ...resetObj }
			this.results.albumTab = { ...resetObj }
			this.results.artistTab = { ...resetObj }
			this.results.playlistTab = { ...resetObj }
			this.results.query = result.QUERY
		},
		handleSearch(result) {
			console.log('handle search', result)
			const { next: nextResult, total, type, data } = result

			let currentTab = type + 'Tab'
			let next = 0

			if (nextResult) {
				next = parseInt(nextResult.match(/index=(\d*)/)[1])
			} else {
				next = total
			}

			if (this.results[currentTab].total != total) {
				this.results[currentTab].total = total
			}

			if (this.results[currentTab].next != next) {
				this.results[currentTab].next = next
				this.results[currentTab].data = this.results[currentTab].data.concat(data)
			}

			this.results[currentTab].loaded = true
		}
	},
	watch: {
		scrolledSearchType(newType) {
			if (!newType) return

			this.scrolledSearch(newType)
		},
		currentTab(newTab) {
			this.search(newTab.searchType)
		}
	}
}
</script>

<style>
</style>
