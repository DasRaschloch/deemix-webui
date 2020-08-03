<template>
	<div class="context-menu" v-show="contextMenuOpen" ref="contextMenu">
		<button class="menu-option" v-for="option of options" :key="option.label" @click.prevent="option.action">
			<span class="menu-option__text">{{ option.label }}</span>
		</button>
	</div>
</template>

<script>
export default {
	data: () => ({
		contextMenuOpen: false
	}),
	// Using computed properties because this data is not meant to be reactive
	// In this way it's cached
	// https://vuejs.org/v2/guide/computed.html
	computed: {
		options() {
			return [
				{
					label: 'Cut',
					// Use arrow functions to keep the Vue instance in 'this'
					// Use normal functions to keep the object instance in 'this'
					action: () => {
						document.execCommand('Cut')
					}
				},
				{
					label: 'Copy',
					action: () => {
						document.execCommand('Copy')
					}
				},
				{
					label: 'Paste',
					action: () => {
						navigator.clipboard.readText().then(text => {
							document.execCommand('insertText', undefined, text)
						})
					}
				}
			]
		}
	},
	mounted() {
		document.body.addEventListener('contextmenu', contextMenuEvent => {
			contextMenuEvent.preventDefault()
			let { pageX, pageY } = contextMenuEvent

			this.$refs.contextMenu.style.top = `${pageY}px`
			this.$refs.contextMenu.style.left = `${pageX}px`
			this.contextMenuOpen = true
		})

		document.body.addEventListener('click', () => {
			this.$nextTick().then(() => {
				this.contextMenuOpen = false
			})
		})
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
	height: 50px;
	padding-left: 10px;
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