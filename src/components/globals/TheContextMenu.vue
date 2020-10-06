<template>
	<div class="context-menu" v-show="menuOpen" ref="contextMenu" :style="{ top: yPos, left: xPos }">
		<button
			class="menu-option"
			v-for="option of sortedOptions"
			:key="option.label"
			v-show="option.show"
			@click.prevent="option.action"
		>
			<span class="menu-option__text">{{ option.label }}</span>
		</button>
	</div>
</template>

<script>
import { sendAddToQueue } from '@/utils/downloads'
import { generatePath, copyToClipboard } from '@/utils/utils'
import { downloadQualities } from '@/data/qualities'

export default {
	data() {
		return {
			menuOpen: false,
			xPos: 0,
			yPos: 0,
			deezerHref: '',
			generalHref: '',
			imgSrc: ''
		}
	},
	computed: {
		options() {
			// In the action property:
			// Use arrow functions to keep the Vue instance in 'this'
			// Use normal functions to keep the object instance in 'this'
			const options = {
				cut: {
					label: this.$t('globals.cut'),
					show: false,
					position: 1,
					action: () => {
						document.execCommand('Cut')
					}
				},
				copy: {
					label: this.$t('globals.copy'),
					show: false,
					position: 2,
					action: () => {
						document.execCommand('Copy')
					}
				},
				copyLink: {
					label: this.$t('globals.copyLink'),
					show: false,
					position: 3,
					action: () => {
						copyToClipboard(this.generalHref)
					}
				},
				copyImageLink: {
					label: this.$t('globals.copyImageLink'),
					show: false,
					position: 4,
					action: () => {
						copyToClipboard(this.imgSrc)
					}
				},
				copyDeezerLink: {
					label: this.$t('globals.copyDeezerLink'),
					show: false,
					position: 5,
					action: () => {
						copyToClipboard(this.deezerHref)
					}
				},
				paste: {
					label: this.$t('globals.paste'),
					show: false,
					position: 6,
					action: () => {
						// Paste does not always work
						if (clipboard in navigator) {
							navigator.clipboard.readText().then(text => {
								document.execCommand('insertText', undefined, text)
							})
						} else {
							document.execCommand('paste')
						}
					}
				}
			}

			let nextValuePosition = Object.values(options).length + 1

			downloadQualities.forEach((quality, index) => {
				options[quality.objName] = {
					label: `${this.$t('globals.download', { thing: quality.label })}`,
					show: false,
					position: nextValuePosition + index,
					action: sendAddToQueue.bind(null, this.deezerHref, quality.value)
				}
			})

			return options
		},
		/**
		 * This computed property is used for rendering the options in the wanted order
		 * while keeping the options computed property an Object to make the properties
		 * accessible via property name (es this.options.copyLink)
		 *
		 * @return	{object[]}	Options in order according to position property
		 */
		sortedOptions() {
			return Object.values(this.options).sort((first, second) => {
				return first.position < second.position ? -1 : 1
			})
		}
	},
	mounted() {
		document.body.addEventListener('contextmenu', this.showMenu)
		document.body.addEventListener('click', this.hideMenu)
	},
	methods: {
		showMenu(contextMenuEvent) {
			const { pageX, pageY, target: elementClicked } = contextMenuEvent
			const path = generatePath(elementClicked)
			let deezerLink = null

			// Searching for the first element with a data-link attribute
			// let deezerLink = this.searchForDataLink(...)
			for (let i = 0; i < path.length; i++) {
				if (path[i] == document) break

				if (path[i].matches('[data-link]')) {
					deezerLink = path[i].dataset.link
					break
				}
			}

			const isLink = elementClicked.matches('a')
			const isImage = elementClicked.matches('img')
			const hasDeezerLink = !!deezerLink

			if (!isLink && !isImage && !hasDeezerLink) return

			contextMenuEvent.preventDefault()
			this.menuOpen = true
			this.positionMenu(pageX, pageY)

			if (isLink) {
				// Show 'Copy Link' option
				this.generalHref = elementClicked.href
				this.options.copyLink.show = true
			}

			if (isImage) {
				// Show 'Copy Image Link' option
				this.imgSrc = elementClicked.src
				this.options.copyImageLink.show = true
			}

			if (deezerLink) {
				// Show 'Copy Deezer Link' option
				this.deezerHref = deezerLink
				this.showDeezerOptions()
			}
		},
		hideMenu() {
			if (!this.menuOpen) return

			// Finish all operations before closing (may be not necessary)
			this.$nextTick()
				.then(() => {
					this.menuOpen = false

					this.options.copyLink.show = false
					this.options.copyDeezerLink.show = false
					this.options.copyImageLink.show = false

					downloadQualities.forEach(quality => {
						this.options[quality.objName].show = false
					})
				})
				.catch(err => {
					console.error(err)
				})
		},
		positionMenu(newX, newY) {
			this.xPos = `${newX}px`
			this.yPos = `${newY}px`

			this.$nextTick().then(() => {
				const { innerHeight, innerWidth } = window
				const menuXOffest = newX + this.$refs.contextMenu.getBoundingClientRect().width
				const menuYOffest = newY + this.$refs.contextMenu.getBoundingClientRect().height

				if (menuXOffest > innerWidth) {
					const difference = menuXOffest - innerWidth + 15
					this.xPos = `${newX - difference}px`
				}

				if (menuYOffest > innerHeight) {
					const difference = menuYOffest - innerHeight + 15
					this.yPos = `${newY - difference}px`
				}
			})
		},
		showDeezerOptions() {
			this.options.copyDeezerLink.show = true

			downloadQualities.forEach(quality => {
				this.options[quality.objName].show = true
			})
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
	border-radius: 7px;
	background: var(--foreground-inverted);
	box-shadow: 4px 10px 18px 0px hsla(0, 0%, 0%, 0.15);
	overflow: hidden;
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