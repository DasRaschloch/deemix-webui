<template>
	<div id="search_tab">
		<div v-show="!showSearchTab">
			<h2>{{ $t('search.startSearching') }}</h2>
			<p>{{ $t('search.description') }}</p>
		</div>

		<div v-show="showSearchTab">
			<BaseTabs>
				<BaseTab
					v-for="tab in tabs"
					:key="tab.name"
					@click="currentTab = tab"
					:class="{ active: currentTab.name === tab.name }"
				>
					{{ tab.name }}
				</BaseTab>
			</BaseTabs>

			<keep-alive>
				<component
					:is="currentTab.component"
					:viewInfo="getViewInfo()"
					want-headers
					@add-to-queue="addToQueue"
					@change-search-tab="changeSearchTab"
				></component>
			</keep-alive>
		</div>
	</div>
</template>

<script>
import BaseLoadingPlaceholder from '@components/globals/BaseLoadingPlaceholder.vue'
import ResultsAll from '@components/search/ResultsAll.vue'
import ResultsAlbums from '@components/search/ResultsAlbums.vue'
import ResultsArtists from '@components/search/ResultsArtists.vue'
import ResultsPlaylists from '@components/search/ResultsPlaylists.vue'
import ResultsTracks from '@components/search/ResultsTracks.vue'
import { BaseTabs, BaseTab } from '@components/globals/BaseTabs'

import { socket } from '@/utils/socket'
import { sendAddToQueue } from '@/utils/downloads'
import { numberWithDots, convertDuration } from '@/utils/utils'

import { formatSingleTrack, formatAlbums, formatArtist, formatPlaylist } from '@/data/search'
import { standardizeData } from '@/data/standardize'

const resetObj = { data: [], next: 0, total: 0, hasLoaded: false }

export default {
	components: {
		BaseLoadingPlaceholder,
		BaseTabs,
		BaseTab
	},
	props: {
		performScrolledSearch: {
			type: Boolean,
			required: false
		}
	},
	data() {
		const $t = this.$t.bind(this)
		const $tc = this.$tc.bind(this)

		return {
			currentTab: {
				name: '',
				searchType: '',
				component: {},
				viewInfo: '',
				formatFunc: () => {}
			},
			tabs: [
				{
					name: $t('globals.listTabs.all'),
					searchType: 'all',
					component: ResultsAll,
					viewInfo: 'allTab'
				},
				{
					name: $tc('globals.listTabs.track', 2),
					searchType: 'track',
					component: ResultsTracks,
					viewInfo: 'trackTab',
					formatFunc: formatSingleTrack
				},
				{
					name: $tc('globals.listTabs.album', 2),
					searchType: 'album',
					component: ResultsAlbums,
					viewInfo: 'albumTab',
					formatFunc: formatAlbums
				},
				{
					name: $tc('globals.listTabs.artist', 2),
					searchType: 'artist',
					component: ResultsArtists,
					viewInfo: 'artistTab',
					formatFunc: formatArtist
				},
				{
					name: $tc('globals.listTabs.playlist', 2),
					searchType: 'playlist',
					component: ResultsPlaylists,
					viewInfo: 'playlistTab',
					formatFunc: formatPlaylist
				}
			],
			results: {
				query: '',
				allTab: {
					ORDER: [],
					TOP_RESULT: [],
					ALBUM: {
						hasLoaded: false
					},
					ARTIST: {
						hasLoaded: false
					},
					TRACK: {
						hasLoaded: false
					},
					PLAYLIST: {
						hasLoaded: false
					}
				},
				trackTab: { ...resetObj },
				albumTab: { ...resetObj },
				artistTab: { ...resetObj },
				playlistTab: { ...resetObj }
			}
		}
	},
	computed: {
		showSearchTab() {
			return this.results.query !== ''
		},
		loadedTabs() {
			const tabsLoaded = []

			for (const resultKey in this.results) {
				if (this.results.hasOwnProperty(resultKey)) {
					const currentResult = this.results[resultKey]

					if (currentResult.hasLoaded) {
						tabsLoaded.push(resultKey.replace(/Tab/g, ''))
					}
				}
			}

			return tabsLoaded
		}
	},
	created() {
		this.currentTab = this.tabs[0]
	},
	mounted() {
		this.$root.$on('mainSearch:showNewResults', this.checkIfPerformNewMainSearch)
		this.$root.$on('mainSearch:updateResults', this.checkIfUpdateResults)

		socket.on('mainSearch', this.saveMainSearchResult)
		socket.on('search', this.handleSearch)
	},
	methods: {
		numberWithDots,
		convertDuration,
		addToQueue(e) {
			sendAddToQueue(e.currentTarget.dataset.link)
		},
		getViewInfo() {
			if (this.currentTab.searchType === 'all') {
				return this.results.allTab
			}

			return standardizeData(this.results[this.currentTab.viewInfo], this.currentTab.formatFunc)
		},
		changeSearchTab(tabName) {
			tabName = tabName.toLowerCase()

			const newTab = this.tabs.find(tab => {
				return tab.searchType === tabName
			})

			if (!newTab) {
				console.error(`No tab ${tabName} found`)
				return
			}

			window.scrollTo(0, 0)
			this.currentTab = newTab
		},
		checkIfPerformNewMainSearch(searchTerm) {
			let needToPerformNewMainSearch = searchTerm !== this.results.query

			if (needToPerformNewMainSearch) {
				this.performNewMainSearch(searchTerm)
			}
		},
		performNewMainSearch(term) {
			socket.emit('mainSearch', { term })

			// Showing loading placeholder
			this.$root.$emit('updateSearchLoadingState', true)
			this.currentTab = this.tabs[0]
		},
		// ! Updates search only if the search term is the same as before AND we're not in the ALL tab. Wtf
		checkIfUpdateResults(term) {
			let needToUpdateSearch = term === this.results.query && this.currentTab.searchType !== 'all'

			if (needToUpdateSearch) {
				this.results[this.currentTab.searchType + 'Tab'] = { ...resetObj }
				this.search(this.currentTab.searchType)
			}
		},
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

			const currentTabKey = `${this.currentTab.searchType}Tab`
			const needToPerformScrolledSearch = this.results[currentTabKey].next < this.results[currentTabKey].total

			if (needToPerformScrolledSearch) {
				this.search(this.currentTab.searchType)
			}
		},
		saveMainSearchResult(searchResult) {
			// Hide loading placeholder
			this.$root.$emit('updateSearchLoadingState', false)

			this.results.query = searchResult.QUERY

			this.results.allTab = searchResult
			this.results.allTab.TRACK.hasLoaded = true
			this.results.allTab.ALBUM.hasLoaded = true
			this.results.allTab.ARTIST.hasLoaded = true
			this.results.allTab.PLAYLIST.hasLoaded = true

			this.results.trackTab = { ...resetObj }
			this.results.albumTab = { ...resetObj }
			this.results.artistTab = { ...resetObj }
			this.results.playlistTab = { ...resetObj }
		},
		handleSearch(result) {
			const { next: nextResult, total, type, data: newData } = result

			const currentTabKey = type + 'Tab'
			let next = 0

			if (nextResult) {
				next = parseInt(nextResult.match(/index=(\d*)/)[1])
			} else {
				next = total
			}

			if (this.results[currentTabKey].total !== total) {
				this.results[currentTabKey].total = total
			}

			if (this.results[currentTabKey].next !== next) {
				this.results[currentTabKey].next = next
				this.results[currentTabKey].data = this.results[currentTabKey].data.concat(newData)
			}

			this.results[currentTabKey].hasLoaded = true
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
