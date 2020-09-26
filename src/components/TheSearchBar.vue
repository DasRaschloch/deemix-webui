<template>
	<header id="search" aria-label="searchbar">
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
import { sendAddToQueue } from '@/utils/downloads'
import EventBus from '@/utils/EventBus'
import { socket } from '@/utils/socket'

export default {
	data() {
		return {
			lastTextSearch: ''
		}
	},
	created() {
		const focusSearchBar = keyEvent => {
			if (keyEvent.keyCode === 70 && keyEvent.ctrlKey) {
				keyEvent.preventDefault()
				this.$refs.searchbar.focus()
			}
		}

		const deleteSearchBarContent = keyEvent => {
			if (!(keyEvent.key == 'Backspace' && keyEvent.ctrlKey && keyEvent.shiftKey)) return

			this.$refs.searchbar.value = ''
			this.$refs.searchbar.focus()
		}

		document.addEventListener('keydown', focusSearchBar)
		document.addEventListener('keyup', deleteSearchBarContent)

		this.$on('hook:destroyed', () => {
			document.removeEventListener('keydown', focusSearchBar)
			document.removeEventListener('keyup', deleteSearchBarContent)
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
						// EventBus.$emit('linkAnalyzerTab:reset')
						socket.emit('analyzeLink', term)
					} else {
						// ? Open downloads tab ?
						sendAddToQueue(term)
					}
				}
			} else {
				if (isShowingSearch && sameAsLastSearch) {
					this.$root.$emit('mainSearch:updateResults', term)
					return
				}

				if (!isShowingSearch) {
					await this.$router.push({
						name: 'Search'
					})
				}

				if (!sameAsLastSearch) {
					this.$root.$emit('updateSearchLoadingState', true)
					this.lastTextSearch = term
				}

				this.$root.$emit('mainSearch:showNewResults', term)
			}
		}
	}
}
</script>

<style>
</style>
