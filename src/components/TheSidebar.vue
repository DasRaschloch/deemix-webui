<template>
	<aside
		id="sidebar"
		class="top-0 left-0 flex flex-col h-screen bg-panels-bg text-foreground"
		:class="{ 'w-12': isSlim }"
		:style="{ minWidth: isSlim ? null : '14rem' }"
		role="navigation"
		aria-label="sidebar"
	>
		<router-link
			tag="a"
			v-for="link in links"
			:key="link.name"
			class="relative flex items-center h-16 no-underline group main_tablinks hover:bg-background-main text-foreground"
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
			<span
				class="ml-5 overflow-hidden capitalize whitespace-no-wrap main-tablinks-text"
				:class="{ hidden: isSlim }"
				style="letter-spacing: 1.3px"
			>
				{{ $t(link.label) }}
			</span>
			<span
				v-if="link.name === 'about' && updateAvailable"
				id="update-notification"
				class="absolute w-3 h-3 bg-red-600 rounded-full"
			></span>
		</router-link>

		<span
			id="theme_selector"
			class="flex h-12 mt-5"
			role="link"
			aria-label="theme selector"
			:class="{ 'inline-grid gap-2': isSlim }"
		>
			<i class="p-2 text-3xl transition-all duration-500 cursor-default material-icons side_icon side_icon--theme">
				brush
			</i>
			<div
				id="theme_togglers"
				class="relative flex items-center w-full justify-evenly"
				:class="{ 'inline-grid gap-2': isSlim }"
			>
				<div
					v-for="theme of THEMES"
					:key="theme"
					class="w-6 h-6 border rounded-full cursor-pointer theme_toggler border-grayscale-500 gap"
					:class="[{ 'theme_toggler--active': currentTheme === theme }, `theme_toggler--${theme}`]"
					@click="currentTheme = theme"
				/>
			</div>
		</span>
	</aside>
</template>

<style lang="scss" scoped>
#update-notification {
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
import { computed, defineComponent, reactive, toRefs } from '@vue/composition-api'

import { links } from '@/data/sidebar'
import { socket } from '@/utils/socket'
import { useTheme } from '@/use/theme'

export default defineComponent({
	setup(props, ctx) {
		const state = reactive({
			activeTablink: 'home',
			updateAvailable: false,
			links
		})
		const { THEMES, currentTheme } = useTheme()

		/* === Add update notification near info === */
		socket.on('updateAvailable', () => {
			state.updateAvailable = true
		})

		ctx.root.$router.afterEach((to, from) => {
			const linkInSidebar = state.links.find(link => link.routerName === to.name)

			if (!linkInSidebar) return

			state.activeTablink = linkInSidebar.name
		})

		return {
			...toRefs(state),
			THEMES,
			currentTheme,
			isSlim: computed(() => ctx.root.$store.getters.getSlimSidebar)
		}
	}
})
</script>
