<template>
	<header id="search">
		<div class="search__icon">
			<i class="material-icons">search</i>
		</div>
		<input
			id="searchbar"
			autocomplete="off"
			type="search"
			name="searchbar"
			value=""
			:placeholder="$t('searchbar')"
			autofocus
			ref="searchbar"
			@keyup="handleSearchBarKeyup($event)"
		/>
		<!-- @keyup.enter.exact="onEnter"
			@keyup.ctrl.enter="onCTRLEnter" -->
	</header>
</template>

<script>
import { isValidURL } from '@/utils/utils'
import Downloads from '@/utils/downloads'

import EventBus from '@/utils/EventBus.js'
import { socket } from '@/utils/socket'

export default {
	data() {
		return {
			lastTextSearch: ''
		}
	},
	mounted() {
		document.addEventListener('keyup', keyEvent => {
			if (!(keyEvent.key == 'Backspace' && keyEvent.ctrlKey)) return

			this.$refs.searchbar.value = ''
			this.$refs.searchbar.focus()
		})
	},
	methods: {
		test() {
			console.log('test passato')
		},
		async handleSearchBarKeyup(keyEvent) {
			let isEnterPressed = keyEvent.keyCode === 13

			// If not enter do nothing
			if (!isEnterPressed) return

			let term = this.$refs.searchbar.value
			let isEmptySearch = term === ''

			// If empty do nothing
			if (isEmptySearch) return

			let isSearchingURL = isValidURL(term)
			let isCtrlPressed = keyEvent.ctrlKey
			let isShowingAnalyzer = this.$route.name === 'Link Analyzer'
			let isShowingSearch = this.$route.name === 'Search'
			let sameAsLastSearch = term === this.lastTextSearch

			if (isSearchingURL) {
				if (isCtrlPressed) {
					this.$root.$emit('QualityModal:open', term)
				} else {
					if (isShowingAnalyzer) {
						EventBus.$emit('linkAnalyzerTab:reset')
						socket.emit('analyzeLink', term)
					} else {
						// ? Open downloads tab ?
						Downloads.sendAddToQueue(term)
					}
				}
			} else {
				if (isShowingSearch && sameAsLastSearch) return

				if (!isShowingSearch) {
					await this.$router.push({
						name: 'Search'
					})
				}

				if (!sameAsLastSearch) {
					this.$root.$emit('updateSearchLoadingState', true)
					this.lastTextSearch = term
				}

				this.$root.$emit('mainSearch:showNewResults', term, window.main_selected)
			}
		}
	}
}
</script>

<style>
</style>