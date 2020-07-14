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
			placeholder="Search what you want (or just paste a link)"
			autofocus
			ref="searchbar"
			@keyup="handleSearchBarKeyup($event)"
		/>
	</header>
</template>

<script>
import { isValidURL } from '@/js/utils.js'
import Downloads from '@/js/downloads.js'

import EventBus from '@/js/EventBus.js'
import { socket } from '@/js/socket.js'

export default {
	methods: {
		handleSearchBarKeyup(keyEvent) {
			// Enter key
			if (keyEvent.keyCode !== 13) return

			let term = this.$refs.searchbar.value

			if (isValidURL(term)) {
				if (keyEvent.ctrlKey) {
					this.$root.$emit('QualityModal:open', term)
				} else {
					if (main_selected === 'analyzer_tab') {
						EventBus.$emit('linkAnalyzerTab:reset')
						socket.emit('analyzeLink', term)
					} else {
						Downloads.sendAddToQueue(term)
					}
				}
			} else {
				if (term === '') return

				this.$root.$emit('mainSearch:showNewResults', term, main_selected)
			}
		}
	}
}
</script>

<style>
</style>