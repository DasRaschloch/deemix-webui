<template>
	<div
		id="download_tab_container"
		class="tab_hidden"
		@transitionend="$refs.container.style.transition = ''"
		ref="container"
	>
		<div id="download_tab_drag_handler" @mousedown.prevent="startDrag" ref="dragHandler"></div>
		<i
			id="toggle_download_tab"
			class="material-icons download_bar_icon"
			@click.prevent="toggleDownloadTab"
			ref="toggler"
		></i>
		<div id="queue_buttons">
			<i id="open_downloads_folder" class="material-icons download_bar_icon hide" @click="openDownloadsFolder">
				folder_open
			</i>
			<i id="clean_queue" class="material-icons download_bar_icon" @click="cleanQueue">clear_all</i>
			<i id="cancel_queue" class="material-icons download_bar_icon" @click="cancelQueue">delete_sweep</i>
		</div>
		<div id="download_list" @click="handleListClick" ref="list"></div>
	</div>
</template>

<script>
import { socket } from '@/js/socket.js'

const tabMinWidth = 250
const tabMaxWidth = 500

export default {
	data: () => ({
		cachedTabWidth: parseInt(localStorage.getItem('downloadTabWidth')) || 300
	}),
	mounted() {
		// Check if download tab has slim entries
		if ('true' === localStorage.getItem('slimDownloads')) {
			this.$refs.list.classList.add('slim')
		}

		if ('true' === localStorage.getItem('downloadTabOpen')) {
			this.$refs.container.classList.remove('tab_hidden')

			this.setTabWidth(this.cachedTabWidth)
		}

		document.addEventListener('mouseup', () => {
			document.removeEventListener('mousemove', this.handleDrag)
		})

		window.addEventListener('beforeunload', () => {
			localStorage.setItem('downloadTabWidth', this.cachedTabWidth)
		})
	},
	methods: {
		setTabWidth(newWidth) {
			if (undefined === newWidth) {
				this.$refs.container.style.width = ''
				this.$refs.list.style.width = ''
			} else {
				this.$refs.container.style.width = newWidth + 'px'
				this.$refs.list.style.width = newWidth + 'px'
			}
		},
		handleListClick(event) {
			const { target } = event

			if (!target.matches('.queue_icon[data-uuid]')) {
				return
			}

			let icon = target.innerText
			let uuid = $(target).data('uuid')

			switch (icon) {
				case 'remove':
					socket.emit('removeFromQueue', uuid)
					break
				default:
			}
		},
		toggleDownloadTab(clickEvent) {
			console.log('toggle')
			this.setTabWidth()

			this.$refs.container.style.transition = 'all 250ms ease-in-out'

			// Toggle returns a Boolean based on the action it performed
			let isHidden = this.$refs.container.classList.toggle('tab_hidden')

			if (!isHidden) {
				this.setTabWidth(this.cachedTabWidth)
			}

			localStorage.setItem('downloadTabOpen', !isHidden)
		},
		cleanQueue() {
			socket.emit('removeFinishedDownloads')
		},
		cancelQueue() {
			socket.emit('cancelAllDownloads')
		},
		openDownloadsFolder() {
			if (window.clientMode) {
				socket.emit('openDownloadsFolder')
			}
		},
		handleDrag(event) {
			let newWidth = window.innerWidth - event.pageX + 2

			if (newWidth < tabMinWidth) {
				newWidth = tabMinWidth
			} else if (newWidth > tabMaxWidth) {
				newWidth = tabMaxWidth
			}

			this.cachedTabWidth = newWidth
			this.setTabWidth(newWidth)
		},
		startDrag() {
			document.addEventListener('mousemove', this.handleDrag)
		}
	}
}
</script>

<style>
</style>