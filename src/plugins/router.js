import Vue from 'vue'
import VueRouter from 'vue-router'
import { socket } from '@/utils/socket'
import EventBus from '@/utils/EventBus'

import TheHomeTab from '@components/TheHomeTab.vue'
import TracklistTab from '@components/TracklistTab.vue'
import ArtistTab from '@components/ArtistTab.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: TheHomeTab
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
	// 404 client side
	{
		path: '*',
		component: TracklistTab
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
	console.log('before route change', to)

	switch (to.name) {
		case 'Artist':
			socket.emit('getTracklist', {
				type: 'artist',
				id: to.params.id
			})
			break
		case 'Tracklist':
			socket.emit('getTracklist', {
				type: to.params.type,
				id: to.params.id
			})
			break

		default:
			break
	}

	EventBus.$emit('trackPreview:stopStackedTabsPreview')

	next()
})

export default router
