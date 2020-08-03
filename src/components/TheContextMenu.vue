<template>
	<div class="context-menu" v-show="menuOpen" ref="contextMenu" :style="{ top: yPos, left: xPos }">
		<button
			class="menu-option"
			v-for="option of options"
			:key="option.label"
			v-show="option.show"
			@click.prevent="option.action"
		>
			<span class="menu-option__text">{{ option.label }}</span>
		</button>
	</div>
</template>

<script>
export default {
	data: () => ({
		menuOpen: false,
		xPos: 0,
		yPos: 0,
		currentHref: '',
		options: [
			{
				label: 'Cut',
				show: true,
				// Use arrow functions to keep the Vue instance in 'this'
				// Use normal functions to keep the object instance in 'this'
				action: () => {
					document.execCommand('Cut')
				}
			},
			{
				label: 'Copy',
				show: true,
				action: () => {
					document.execCommand('Copy')
				}
			},
			{
				label: 'Copy Link',
				show: false,
				action: null
			},
			{
				label: 'Copy Deezer Link',
				show: false,
				action: null
			},
			{
				label: 'Paste',
				show: true,
				action: () => {
					navigator.clipboard.readText().then(text => {
						document.execCommand('insertText', undefined, text)
					})
				}
			}
		]
	}),
	mounted() {
		document.body.addEventListener('contextmenu', this.showMenu)

		document.body.addEventListener('click', () => {
			// Finish all operations before closing (may be not necessary)
			this.$nextTick().then(() => {
				this.menuOpen = false

				this.options[2].show = false
				this.options[3].show = false
			})
		})
	},
	methods: {
		showMenu(contextMenuEvent) {
			contextMenuEvent.preventDefault()

			const {
				pageX,
				pageY,
				path,
				path: [elementClicked]
			} = contextMenuEvent

			this.positionMenu(pageX, pageY)

			// Show 'Copy Link' option
			if (elementClicked.matches('a')) {
				this.showCopyLink(elementClicked.href)
			}

			let link = null

			for (let i = 0; i < path.length; i++) {
				if (path[i] == document) break

				if (path[i].matches('[data-link]')) {
					link = path[i].dataset.link
					break
				}
			}

			// Show 'Copy Deezer Link' option
			if (link) {
				this.showCopyDeezerLink(link)
			}

			this.menuOpen = true
		},
		positionMenu(newX, newY) {
			this.xPos = `${newX}px`
			this.yPos = `${newY}px`
		},
		showCopyLink(href) {
			this.options[2].show = true
			this.options[2].action = () => {
				navigator.clipboard.writeText(href).catch(err => {
					console.error('Link copying failed', err)
				})
			}
		},
		showCopyDeezerLink(link) {
			this.options[3].show = true
			this.options[3].action = () => {
				navigator.clipboard.writeText(link).catch(err => {
					console.error('Download link copying failed', err)
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.context-menu {
	position: absolute;
	top: 0;
	left: 0;
	min-width: 100px;
	background: var(--foreground-inverted);
	border-radius: 7px;
	box-shadow: 4px 10px 18px 0px hsla(0, 0%, 0%, 0.15);
	z-index: 10000;
}

.menu-option {
	display: flex;
	align-items: center;
	width: 100%;
	height: 40px;
	padding-left: 10px;
	padding-right: 10px;
	color: var(--foreground);
	cursor: pointer;

	&:first-child {
		border-radius: 7px 7px 0 0;
	}

	&:last-child {
		border-radius: 0 0 7px 7px;
	}

	&:hover {
		background: var(--table-highlight);
		filter: brightness(150%);
	}
}

// Resetting buttons only for this component (because the style is scoped)
button {
	color: var(--accent-text);
	color: unset;
	background-color: var(--accent-color);
	background-color: unset;
	min-width: unset;
	position: unset;
	border: unset;
	border-radius: unset;
	font-family: unset;
	font-weight: unset;
	font-size: unset;
	padding: unset;
	margin-right: unset;
	height: unset;
	text-transform: unset;
	cursor: unset;
	transition: unset;

	&:focus {
		outline: none;
	}

	&[disabled] {
		background-color: unset;
		color: unset;
		opacity: unset;
	}

	&.selective {
		background-color: unset;
		color: unset;

		&.active {
			background-color: unset;
			color: unset;
		}
	}

	&.with_icon {
		display: unset;
		align-items: unset;

		i {
			margin-left: unset;
		}
	}

	&:active {
		background-color: unset;
		transform: unset;
	}

	&:hover {
		background: unset;
		border: unset;
	}
}
</style>