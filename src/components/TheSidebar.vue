<template>
	<aside
		id="sidebar"
		class="top-0 left-0 flex flex-col w-64 h-screen bg-panels-bg text-foreground"
		role="navigation"
		aria-label="sidebar"
	>
		<router-link
			tag="a"
			v-for="link in links"
			:key="link.id"
			class="relative flex items-center h-16 no-underline group main_tablinks hover:bg-background-main text-foreground"
			:id="link.id"
			:class="{ 'bg-background-main': activeTablink === link.name }"
			:aria-label="link.ariaLabel"
			:to="{ name: link.routerName }"
			@click.native="activeTablink = link.name"
		>
			<i
				class="p-2 text-3xl material-icons side_icon group-hover:text-primary"
				:class="{ 'text-primary': activeTablink === link.name }"
			>
				{{ link.icon }}
			</i>
			<span class="ml-5 overflow-hidden capitalize whitespace-no-wrap main_tablinks_text" style="letter-spacing: 1.3px">
				{{ $t(link.label) }}
			</span>
			<span
				v-if="link.name === 'about' && updateAvailable"
				id="update-notification"
				class="w-3 h-3 bg-red-600 rounded-full"
			></span>
		</router-link>

		<span class="flex h-12 mt-5" role="link" aria-label="theme selector">
			<i class="p-2 text-3xl transition-all duration-500 cursor-default material-icons side_icon side_icon--theme">
				brush
			</i>
			<div id="theme_togglers" class="relative flex items-center w-full justify-evenly">
				<div
					v-for="theme of themes"
					:key="theme"
					class="w-6 h-6 border rounded-full cursor-pointer theme_toggler border-grayscale-500"
					:class="[{ 'theme_toggler--active': activeTheme === theme }, `theme_toggler--${theme}`]"
					@click="changeTheme(theme)"
				></div>
			</div>
		</span>
		<div id="network-status" :class="{ online: appOnline, offline: !appOnline }">
			<i v-if="appOnline" class="material-icons">wifi</i>
			<i v-else class="material-icons">
				<!-- wifi_off icon not working, maybe need to include it? -->
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M24 .01c0-.01 0-.01 0 0L0 0v24h24V.01zM0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
					<path
						d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4c-1.29-1.29-2.84-2.13-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24C7.81 10.89 6.27 11.73 5 13v.01L6.99 15c1.36-1.36 3.14-2.04 4.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3c-1.65-1.66-4.34-1.66-6 0z"
					/>
				</svg>
			</i>
		</div>
	</aside>
</template>

<style lang="scss" scoped>
#network-status {
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	margin-top: auto;
	bottom: 0;
}

#network-status.online i.material-icons {
	color: hsl(150, 76%, 34%);
}

#network-status.offline i.material-icons svg {
	fill: red;
	width: 1em;
	height: 1em;
}

#update-notification {
	position: absolute;
	left: 30px;
	top: 12px;
}

.theme_toggler {
	transition: border 200ms ease-in-out;

	&--active {
		border-width: 3px;
	}

	&--light {
		background-color: #fff;
	}

	&--dark {
		background-color: hsl(0, 0%, 8%);
	}

	&--purple {
		background: hsl(261, 85%, 37%);
	}
}
</style>

<script>
import { socket } from '@/utils/socket'

export default {
	data() {
		return {
			appOnline: null,
			activeTheme: 'light',
			themes: ['purple', 'dark', 'light'],
			activeTablink: 'home',
			updateAvailable: false,
			links: [
				{
					id: 'main_home_tablink',
					name: 'home',
					ariaLabel: 'home',
					routerName: 'Home',
					icon: 'home',
					label: 'sidebar.home'
				},
				{
					id: 'main_search_tablink',
					name: 'search',
					ariaLabel: 'search',
					routerName: 'Search',
					icon: 'search',
					label: 'sidebar.search'
				},
				{
					id: 'main_charts_tablink',
					name: 'charts',
					ariaLabel: 'charts',
					routerName: 'Charts',
					icon: 'show_chart',
					label: 'sidebar.charts'
				},
				{
					id: 'main_favorites_tablink',
					name: 'favorites',
					ariaLabel: 'favorites',
					routerName: 'Favorites',
					icon: 'star',
					label: 'sidebar.favorites'
				},
				{
					id: 'main_analyzer_tablink',
					name: 'analyzer',
					ariaLabel: 'link analyzer',
					routerName: 'Link Analyzer',
					icon: 'link',
					label: 'sidebar.linkAnalyzer'
				},
				{
					id: 'main_settings_tablink',
					name: 'settings',
					ariaLabel: 'settings',
					routerName: 'Settings',
					icon: 'settings',
					label: 'sidebar.settings'
				},
				{
					id: 'main_about_tablink',
					name: 'about',
					ariaLabel: 'info',
					routerName: 'About',
					icon: 'info',
					label: 'sidebar.about'
				}
			]
		}
	},
	mounted() {
		/* === Online status handling === */
		this.appOnline = navigator.onLine

		window.addEventListener('online', () => {
			this.appOnline = true
		})

		window.addEventListener('offline', () => {
			this.appOnline = false
		})

		/* === Current theme handling === */
		this.activeTheme = localStorage.getItem('selectedTheme') || 'dark'

		this.$router.afterEach((to, from) => {
			const linkInSidebar = this.links.find(link => link.routerName === to.name)

			if (!linkInSidebar) return

			this.activeTablink = linkInSidebar.name
		})

		/* === Add update notification near info === */
		socket.on('updateAvailable', () => {
			this.updateAvailable = true
		})
	},
	methods: {
		changeTheme(newTheme) {
			if (newTheme === this.activeTheme) return

			this.activeTheme = newTheme
			document.documentElement.setAttribute('data-theme', newTheme)
			localStorage.setItem('selectedTheme', newTheme)

			// Animating everything to have a smoother theme switch
			const allElements = document.querySelectorAll('*')

			allElements.forEach(el => {
				el.classList.add('changing-theme')
			})

			document.documentElement.addEventListener('transitionend', function transitionHandler() {
				allElements.forEach(el => {
					el.classList.remove('changing-theme')
				})

				document.documentElement.removeEventListener('transitionend', transitionHandler)
			})
		}
	}
}
</script>
