<template>
	<main
		id="content"
		@scroll="$route.name === 'Search' ? handleContentScroll($event) : null"
		ref="content"
		aria-label="main content"
	>
		<div id="container">
			<BaseLoadingPlaceholder id="search_placeholder" text="Searching..." :hidden="!loading" />

			<keep-alive>
				<router-view
					v-if="!$route.meta.notKeepAlive"
					v-show="!loading"
					:key="$route.fullPath"
					:perform-scrolled-search="performScrolledSearch"
					exclude=""
				></router-view>
			</keep-alive>

			<router-view
				v-if="$route.meta.notKeepAlive"
				v-show="!loading"
				:key="$route.fullPath"
				:perform-scrolled-search="performScrolledSearch"
				exclude=""
			></router-view>
		</div>
	</main>
</template>

<style lang="scss">
#container {
	margin: 0 auto;
	max-width: 1280px;
	width: var(--container-width);
}

main {
	background-color: var(--main-background);
	padding-right: 5px;
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
import BaseLoadingPlaceholder from '@components/BaseLoadingPlaceholder.vue'

export default {
	components: {
		BaseLoadingPlaceholder
	},
	data: () => ({
		performScrolledSearch: false,
		loading: false
	}),
	mounted() {
		this.$root.$on('updateSearchLoadingState', loading => {
			this.loading = loading
		})

		this.$router.beforeEach((to, from, next) => {
			this.$refs.content.scrollTo(0, 0)
			next()
		})
	},
	methods: {
		handleContentScroll: debounce(async function () {
			if (this.$refs.content.scrollTop + this.$refs.content.clientHeight < this.$refs.content.scrollHeight) return
			this.performScrolledSearch = true

			await this.$nextTick()

			this.performScrolledSearch = false
		}, 100)
	}
}
</script>
