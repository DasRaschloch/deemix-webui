import Vue from 'vue'
import VueRouter from 'vue-router'
import { socket } from '@/utils/socket'

// Pages
import About from '@components/pages/About.vue'
import InfoArl from '@components/pages/InfoArl.vue'
import InfoSpotifyFeatures from '@components/pages/InfoSpotifyFeatures.vue'
import Artist from '@components/pages/Artist.vue'
import Charts from '@components/pages/Charts.vue'
import Errors from '@components/pages/Errors.vue'
import Favorites from '@components/pages/Favorites.vue'
import Home from '@components/pages/Home.vue'
import LinkAnalyzer from '@components/pages/LinkAnalyzer.vue'
import Search from '@components/pages/Search.vue'
import Settings from '@components/pages/Settings.vue'
import Tracklist from '@components/pages/Tracklist.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			notKeepAlive: true
		}
	},
	{
		path: '/tracklist/:type/:id',
		name: 'Tracklist',
		component: Tracklist
	},
	{
		path: '/artist/:id',
		name: 'Artist',
		component: Artist
	},
	{
		path: '/album/:id',
		name: 'Album',
		component: Tracklist
	},
	{
		path: '/playlist/:id',
		name: 'Playlist',
		component: Tracklist
	},
	{
		path: '/spotify-playlist/:id',
		name: 'Spotify Playlist',
		component: Tracklist
	},
	{
		path: '/charts',
		name: 'Charts',
		component: Charts,
		meta: {
			notKeepAlive: true
		}
	},
	{
		path: '/favorites',
		name: 'Favorites',
		component: Favorites,
		meta: {
			notKeepAlive: true
		}
	},
	{
		path: '/errors',
		name: 'Errors',
		component: Errors
	},
	{
		path: '/link-analyzer',
		name: 'Link Analyzer',
		component: LinkAnalyzer
	},
	{
		path: '/about',
		name: 'About',
		component: About
	},
	{
		path: '/info-arl',
		name: 'ARL',
		component: InfoArl
	},
	{
		path: '/info-spotify',
		name: 'Spotify Features',
		component: InfoSpotifyFeatures
	},
	{
		path: '/settings',
		name: 'Settings',
		component: Settings
	},
	{
		path: '/search',
		name: 'Search',
		component: Search
	},
	// 404 client side
	{
		path: '*',
		component: Home
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
		case 'Album':
			getTracklistParams = {
				type: 'album',
				id: to.params.id
			}
			break
		case 'Playlist':
			getTracklistParams = {
				type: 'playlist',
				id: to.params.id
			}
			break
		case 'Spotify Playlist':
			getTracklistParams = {
				type: 'spotifyplaylist',
				id: to.params.id
			}
			break

		default:
			break
	}

	if (getTracklistParams) {
		socket.emit('getTracklist', getTracklistParams)
	}

	next()
})

export default router
