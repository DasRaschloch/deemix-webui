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

<style lang="scss">
$icon-dimension: 2rem;
$searchbar-height: 45px;

#search {
	background-color: var(--secondary-background);
	padding: 0 1em;
	display: flex;
	align-items: center;
	border: 1px solid transparent;
	transition: border 200ms ease-in-out;
	border-radius: 15px;
	margin: 10px 10px 20px 10px;

	&:focus-within {
		border: 1px solid var(--foreground);
	}

	.search__icon {
		width: $icon-dimension;
		height: $icon-dimension;

		i {
			font-size: $icon-dimension;
			color: var(--foreground);

			&::selection {
				background: none;
			}
		}
	}

	#searchbar {
		height: $searchbar-height;
		padding-left: 0.5em;
		border: 0px;
		border-radius: 0px;
		background-color: var(--secondary-background);
		color: var(--foreground);
		font-size: 1.2rem;
		font-family: 'Open Sans';
		font-weight: 300;
		margin-bottom: 0;

		&:focus {
			outline: none;
		}

		// Removing Chrome autofill color
		&:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus,
		&:-webkit-autofill:active {
			-webkit-box-shadow: 0 0 0 $searchbar-height var(--secondary-background) inset !important;
			box-shadow: 0 0 0 $searchbar-height var(--secondary-background) inset !important;
		}
	}
}
</style>

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


