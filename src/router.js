import Vue from 'vue'
import VueRouter from 'vue-router'
import { socket } from '@/utils/socket'
import EventBus from '@/utils/EventBus'

import ArtistTab from '@components/ArtistTab.vue'
import TracklistTab from '@components/TracklistTab.vue'

import TheHomeTab from '@components/TheHomeTab.vue'
import TheChartsTab from '@components/TheChartsTab.vue'
import TheFavoritesTab from '@components/TheFavoritesTab.vue'
import TheErrorsTab from '@components/TheErrorsTab.vue'
import TheLinkAnalyzerTab from '@components/TheLinkAnalyzerTab.vue'
import TheAboutTab from '@components/TheAboutTab.vue'
import TheSettingsTab from '@components/TheSettingsTab.vue'
import TheMainSearch from '@components/TheMainSearch.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: TheHomeTab,
		meta: {
			notKeepAlive: true
		}
	},
	{
		path: '/tracklist/:type/:id',
		name: 'Tracklist',
		component: TracklistTab
	},
	{
		path: '/artist/:id',
		name: 'Artist',
		component: ArtistTab
	},
	{
		path: '/charts',
		name: 'Charts',
		component: TheChartsTab,
		meta: {
			notKeepAlive: true
		}
	},
	{
		path: '/favorites',
		name: 'Favorites',
		component: TheFavoritesTab,
		meta: {
			notKeepAlive: true
		}
	},
	{
		path: '/errors',
		name: 'Errors',
		component: TheErrorsTab
	},
	{
		path: '/link-analyzer',
		name: 'Link Analyzer',
		component: TheLinkAnalyzerTab
	},
	{
		path: '/about',
		name: 'About',
		component: TheAboutTab
	},
	{
		path: '/settings',
		name: 'Settings',
		component: TheSettingsTab
	},
	{
		path: '/search',
		name: 'Search',
		component: TheMainSearch
	},
	// 404 client side
	{
		path: '*',
		component: TheHomeTab
	}
]

const router = new VueRouter({
	mode: 'history',
	// linkActiveClass: 'open',
	routes,
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
})

router.beforeEach((to, from, next) => {
	console.log('js before each')
	let getTracklistParams = null

	switch (to.name) {
		case 'Artist':
			getTracklistParams = {
				type: 'artist',
				id: to.params.id
			}
			break
		case 'Tracklist':
			getTracklistParams = {
				type: to.params.type,
				id: to.params.id
			}
			break

		default:
			break
	}

	if (getTracklistParams) {
		socket.emit('getTracklist', getTracklistParams)
	}

	EventBus.$emit('trackPreview:stopStackedTabsPreview')

	next()
})

export default router
