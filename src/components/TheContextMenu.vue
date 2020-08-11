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
import Downloads from '@/utils/downloads'
import downloadQualities from '@js/qualities'

export default {
	data() {
		return {
			menuOpen: false,
			xPos: 0,
			yPos: 0,
			deezerHref: '',
			generalHref: ''
		}
	},
	computed: {
		options() {
			// In the action property:
			// Use arrow functions to keep the Vue instance in 'this'
			// Use normal functions to keep the object instance in 'this'

			const options = [
				{
					label: this.$t('globals.cut'),
					show: true,
					action: () => {
						document.execCommand('Cut')
					}
				},
				{
					label: this.$t('globals.copy'),
					show: true,
					action: () => {
						document.execCommand('Copy')
					}
				},
				{
					label: this.$t('globals.copyLink'),
					show: false,
					action: () => {
						navigator.clipboard.writeText(this.generalHref).catch(err => {
							console.error('Link copying failed', err)
						})
					}
				},
				{
					label: this.$t('globals.copyDeezerLink'),
					show: false,
					action: () => {
						navigator.clipboard.writeText(this.deezerHref).catch(err => {
							console.error('Download link copying failed', err)
						})
					}
				},
				{
					label: this.$t('globals.paste'),
					show: true,
					action: () => {
						navigator.clipboard.readText().then(text => {
							document.execCommand('insertText', undefined, text)
						})
					}
				}
			]

			downloadQualities.forEach(quality => {
				options.push({
					label: `${this.$t('globals.download', [quality.label])}`,
					show: false,
					action: this.tryToDownloadTrack.bind(null, quality.value)
				})
			})

			return options
		},
		qualities() {
			return downloadQualities
		}
	},
	mounted() {
		document.body.addEventListener('contextmenu', this.showMenu)
		document.body.addEventListener('click', this.hideMenu)
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
				this.generalHref = elementClicked.href
				this.showCopyLinkOption()
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
				this.deezerHref = link
				this.showDeezerOptions(link)
			}

			this.menuOpen = true
		},
		hideMenu() {
			if (!this.menuOpen) return

			// Finish all operations before closing (may be not necessary)
			this.$nextTick().then(() => {
				this.menuOpen = false

				this.options[2].show = false
				this.options[3].show = false

				for (i = 5; i <= 10; i++) {
					this.options[i].show = false
				}
			})
		},
		positionMenu(newX, newY) {
			this.xPos = `${newX}px`
			this.yPos = `${newY}px`
		},
		showCopyLinkOption() {
			this.options[2].show = true
		},
		showDeezerOptions() {
			this.options[3].show = true

			for (i = 5; i <= 10; i++) {
				this.options[i].show = true
			}
		},
		tryToDownloadTrack(qualityValue) {
			Downloads.sendAddToQueue(this.deezerHref, qualityValue)
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

	&__text {
		text-transform: capitalize;
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