<template>
	<!-- <section id="content" @scroll="handleContentScroll" ref="content"> -->
	<section id="content">
		<div id="container">
			<BaseLoadingPlaceholder id="search_placeholder" text="Searching..." :hidden="!loading" />
			<router-view></router-view>
		</div>
	</section>
</template>

<style lang="scss">
#container {
	margin: 0 auto;
	max-width: 1280px;
	width: var(--container-width);
}

#content {
	background-color: var(--main-background);
	width: 100%;
	height: calc(100vh - 93px);
	overflow-y: scroll;
	overflow-x: hidden;

	&::-webkit-scrollbar {
		width: 10px;
	}

	&::-webkit-scrollbar-track {
		background: var(--main-background);
	}

	&::-webkit-scrollbar-thumb {
		background: var(--main-scroll);
		border-radius: 4px;
		width: 6px;
		padding: 0px 2px;
	}
}
</style>

<script>
import { debounce } from '@/utils/utils'
import EventBus from '@/utils/EventBus.js'
import BaseLoadingPlaceholder from '@components/BaseLoadingPlaceholder.vue'

export default {
	components: {
		BaseLoadingPlaceholder
	},
	data: () => ({
		newScrolled: null,
		loading: false
	}),
	mounted() {
		this.$root.$on('updateSearchLoadingState', loading => {
			console.log({ loading })
			this.loading = loading
		})
	}
	// methods: {
	// 	handleContentScroll: debounce(async function () {
	// 		if (this.$refs.content.scrollTop + this.$refs.content.clientHeight < this.$refs.content.scrollHeight) return

	// 		if (
	// 			main_selected !== 'search_tab' ||
	// 			['track_search', 'album_search', 'artist_search', 'playlist_search'].indexOf(window.search_selected) === -1
	// 		) {
	// 			return
	// 		}

	// 		this.newScrolled = window.search_selected.split('_')[0]

	// 		await this.$nextTick()

	// 		this.newScrolled = null
	// 	}, 100)
	// }
}
</script>
