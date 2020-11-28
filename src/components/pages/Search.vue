<template>
	<div id="search_tab">
		<div v-show="isQueryEmpty && !isSearching">
			<h2>{{ $t('search.startSearching') }}</h2>
			<p>{{ $t('search.description') }}</p>
		</div>

		<BaseLoadingPlaceholder text="Searching..." :hidden="!isSearching" />

		<div v-show="!isQueryEmpty && !isSearching">
			<BaseTabs>
				<BaseTab
					v-for="tab in tabs"
					:key="tab.name"
					@click="changeSearchTab(tab.searchType)"
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
import { computed, defineComponent, reactive, ref, toRefs, watch, watchEffect } from '@vue/composition-api'

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
import { useMainSearch } from '@/use/main-search'
import { useSearch } from '@/use/search'

const resetObj = { data: [], next: 0, total: 0, hasLoaded: false }

const lastTab = ref(null)

export default defineComponent({
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
	setup(props, ctx) {
		const state = reactive({
			currentTab: {
				name: '',
				searchType: '',
				component: {},
				viewInfo: '',
				formatFunc: () => {}
			},
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
			},
			tabs: [
				{
					name: ctx.root.$i18n.t('globals.listTabs.all'),
					searchType: 'all',
					component: ResultsAll,
					viewInfo: 'allTab'
				},
				{
					name: ctx.root.$i18n.tc('globals.listTabs.track', 2),
					searchType: 'track',
					component: ResultsTracks,
					viewInfo: 'trackTab',
					formatFunc: formatSingleTrack
				},
				{
					name: ctx.root.$i18n.tc('globals.listTabs.album', 2),
					searchType: 'album',
					component: ResultsAlbums,
					viewInfo: 'albumTab',
					formatFunc: formatAlbums
				},
				{
					name: ctx.root.$i18n.tc('globals.listTabs.artist', 2),
					searchType: 'artist',
					component: ResultsArtists,
					viewInfo: 'artistTab',
					formatFunc: formatArtist
				},
				{
					name: ctx.root.$i18n.tc('globals.listTabs.playlist', 2),
					searchType: 'playlist',
					component: ResultsPlaylists,
					viewInfo: 'playlistTab',
					formatFunc: formatPlaylist
				}
			]
		})
		const { searchResult, performMainSearch } = useMainSearch()
		const { result, performSearch } = useSearch()
		const isQueryEmpty = computed(() => state.results.query === '')
		const searchedTerm = computed(() => ctx.root.$route.query.term)
		const isSearching = ref(false)
		console.log('onSetup')

		/*
			Search cases:
				- same term
					- from search  (component is already rendered) -> do nothing
						- handled in TheSearchBar ✅
					- from another tab (component is not rendered yet) -> don't perform new search, show previous results (stored in the ref searchResult) and all tab
						- handling in beforeRouteEnter ✅, but need to know that we already have the values ❌
				- different term
					- from search (component is already rendered) -> show new results and keep the tab
						- handling in beforeRouteUpdate ❌, but need to keep the tab, therefore perform a Search or a Main Search according to last tab ❌
					- from another tab (component is not rendered yet) -> show new results and show all tab
						- handling in beforeRouteEnter ✅, no need to know that we already have the values ✅
		*/

		if (searchedTerm.value) {
			performMainSearch(searchedTerm.value)
			isSearching.value = true
		}

		// Main search watcher
		watch(searchResult, newValue => {
			// Hide loading placeholder
			isSearching.value = false

			state.results.query = newValue.QUERY

			state.results.allTab = newValue
			state.results.allTab.TRACK.hasLoaded = true
			state.results.allTab.ALBUM.hasLoaded = true
			state.results.allTab.ARTIST.hasLoaded = true
			state.results.allTab.PLAYLIST.hasLoaded = true

			// state.results.trackTab = { ...resetObj }
			// state.results.albumTab = { ...resetObj }
			// state.results.artistTab = { ...resetObj }
			// state.results.playlistTab = { ...resetObj }

			if (lastTab.value && lastTab.value.searchType !== 'all') {
				state.currentTab = lastTab.value

				performSearch({
					term: newValue.QUERY,
					type: state.currentTab.searchType
					// start: state.results[`${state.currentTab.searchType}Tab`].next
				})
			} else {
				state.currentTab = state.tabs.find(tab => tab.searchType === 'all')
			}
		})

		// Search watcher
		watch(result, newValue => {
			const { next: nextResult, total, type, data: newData } = newValue

			const currentTabKey = type + 'Tab'
			let next = total

			if (nextResult) {
				next = parseInt(nextResult.match(/index=(\d*)/)[1])
			} /* else {
				next = total
			} */

			if (state.results[currentTabKey].total !== total) {
				state.results[currentTabKey].total = total
			}

			if (state.results[currentTabKey].next !== next) {
				state.results[currentTabKey].next = next
				state.results[currentTabKey].data = state.results[currentTabKey].data.concat(newData)
			}

			state.results[currentTabKey].hasLoaded = true
		})

		state.currentTab = state.tabs.find(tab => tab.searchType === 'all')

		return {
			...toRefs(state),
			isSearching,
			isQueryEmpty,
			searchResult,
			performMainSearch,
			performSearch
		}
	},
	computed: {
		loadedTabs() {
			const tabsLoaded = []

			for (const resultKey in this.results) {
				if (this.results.hasOwnProperty(resultKey) && resultKey !== 'query') {
					const currentResult = this.results[resultKey]

					if (currentResult.hasLoaded) {
						tabsLoaded.push(resultKey.replace(/Tab/g, ''))
					}
				}
			}

			return tabsLoaded
		}
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
			lastTab.value = newTab
		},
		scrolledSearch() {
			if (this.currentTab.searchType === 'all') return

			const currentTabKey = `${this.currentTab.searchType}Tab`
			const needToPerformScrolledSearch = this.results[currentTabKey].next < this.results[currentTabKey].total

			if (needToPerformScrolledSearch) {
				this.performSearch({
					term: this.results.query,
					type: this.currentTab.searchType,
					start: this.results[`${this.currentTab.searchType}Tab`].next
				})
			}
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
			console.log('watch current tab')
			if (this.isTabLoaded(newTab)) return

			this.performSearch({
				term: this.results.query,
				type: newTab.searchType,
				start: this.results[`${newTab.searchType}Tab`].next
			})
		}
	}
	// beforeRouteUpdate(to, from, next) {
	// 	console.log('beforeRouteUpdate', from)

	// 	// this.performMainSearch(to.query.term)

	// 	// if (this.currentTab.searchType !== 'all') {
	// 	// 	this.performSearch({
	// 	// 		term: to.query.term,
	// 	// 		type: this.currentTab.searchType,
	// 	// 		start: this.results[`${this.currentTab.searchType}Tab`].next
	// 	// 	})
	// 	// }

	// 	next()
	// }
})
</script>

<style>
</style>
