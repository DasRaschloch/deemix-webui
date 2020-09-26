<template>
	<div id="search_tab" class="main_tabcontent" ref="root">
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

			<keep-alive>
				<component
					:is="currentTab.component"
					:results="results"
					@add-to-queue="addToQueue"
					@change-search-tab="changeSearchTab"
				></component>
			</keep-alive>
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
import { sendAddToQueue } from '@/utils/downloads'
import { numberWithDots, convertDuration } from '@/utils/utils'
import EventBus from '@/utils/EventBus'

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
		},
		loadedTabs() {
			const loaded = []

			for (const resultKey in this.results) {
				if (this.results.hasOwnProperty(resultKey)) {
					const result = this.results[resultKey]

					if (result.loaded) {
						loaded.push(resultKey.replace(/Tab/g, ''))
					}
				}
			}

			return loaded
		}
	},
	props: {
		performScrolledSearch: {
			type: Boolean,
			required: false
		}
	},
	created() {
		this.currentTab = this.tabs[0]
	},
	mounted() {
		EventBus.$on('mainSearch:checkLoadMoreContent', this.checkLoadMoreContent)
		this.$root.$on('mainSearch:showNewResults', this.checkIfShowNewResults)
		this.$root.$on('mainSearch:updateResults', this.checkIfUpdateResults)

		socket.on('mainSearch', this.handleMainSearch)
		socket.on('search', this.handleSearch)
	},
	methods: {
		changeSearchTab(sectionName) {
			sectionName = sectionName.toLowerCase()

			let newTab = this.tabs.find(tab => {
				return tab.searchType === sectionName
			})

			if (!newTab) {
				console.error(`No tab ${sectionName} found`)
				return
			}

			window.scrollTo(0, 0)
			this.currentTab = newTab
		},
		checkIfShowNewResults(term, mainSelected) {
			let needToPerformNewSearch = term !== this.results.query /* || mainSelected == 'search_tab' */

			if (needToPerformNewSearch) {
				this.showNewResults(term)
			}
		},
		checkIfUpdateResults(term) {
			let needToUpdateSearch = term === this.results.query && this.currentTab.searchType !== 'all'

			if (needToUpdateSearch) {
				let resetObj = { data: [], next: 0, total: 0, loaded: false }
				this.results[this.currentTab.searchType + 'Tab'] = { ...resetObj }
				this.search(this.currentTab.searchType)
			}
		},
		showNewResults(term) {
			socket.emit('mainSearch', { term })

			// Showing loading placeholder
			this.$root.$emit('updateSearchLoadingState', true)
			this.currentTab = this.tabs[0]
		},
		checkLoadMoreContent(searchSelected) {
			if (this.results[searchSelected.split('_')[0] + 'Tab'].data.length !== 0) return

			this.search(searchSelected.split('_')[0])
		},
		addToQueue(e) {
			sendAddToQueue(e.currentTarget.dataset.link)
		},
		numberWithDots,
		convertDuration,
		search(type) {
			socket.emit('search', {
				term: this.results.query,
				type,
				start: this.results[`${type}Tab`].next,
				nb: 30
			})
		},
		scrolledSearch() {
			if (this.currentTab.searchType === 'all') return

			let currentTab = `${this.currentTab.searchType}Tab`

			if (this.results[currentTab].next < this.results[currentTab].total) {
				this.search(this.currentTab.searchType)
			}
		},
		handleMainSearch(result) {
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
		},
		isTabLoaded(tab) {
			return this.loadedTabs.indexOf(tab.searchType) !== -1 || tab.searchType === 'all'
		}
	},
	watch: {
		performScrolledSearch(needToSearch) {
			if (!needToSearch) return

			this.scrolledSearch(needToSearch)
		},
		currentTab(newTab) {
			if (this.isTabLoaded(newTab)) return

			this.search(newTab.searchType)
		}
	}
}
</script>

<style>
</style>
