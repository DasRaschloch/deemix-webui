<template>
	<div
		id="download_tab_container"
		class="tab_hidden"
		@transitionend="$refs.container.style.transition = ''"
		ref="container"
		:data-label="$t('downloads')"
	>
		<div id="download_tab_drag_handler" @mousedown.prevent="startDrag" ref="dragHandler"></div>
		<i
			id="toggle_download_tab"
			class="material-icons download_bar_icon"
			@click.prevent="toggleDownloadTab"
			ref="toggler"
			:title="$t('globals.toggle_download_tab_hint')"
		></i>
		<div id="queue_buttons">
			<i
				id="open_downloads_folder"
				v-if="clientMode"
				class="material-icons download_bar_icon"
				:title="$t('globals.open_downloads_folder')"
				@click="openDownloadsFolder"
			>
				folder_open
			</i>
			<i
				id="clean_queue"
				class="material-icons download_bar_icon"
				@click="cleanQueue"
				:title="$t('globals.clean_queue_hint')"
			>
				clear_all
			</i>
			<i
				id="cancel_queue"
				class="material-icons download_bar_icon"
				@click="cancelQueue"
				:title="$t('globals.cancel_queue_hint')"
			>
				delete_sweep
			</i>
		</div>
		<div id="download_list" ref="list">
			<QueueItem
				v-for="item in queueList"
				:queue-item="item"
				:key="item.uuid"
				@show-errors="showErrorsTab"
				@remove-item="onRemoveItem"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
#download_tab_container {
	height: 100vh;
}
</style>

<script>
import { mapActions } from 'vuex'
import QueueItem from '@components/downloads/QueueItem.vue'

import { socket } from '@/utils/socket'
import { toast } from '@/utils/toasts'

const tabMinWidth = 250
const tabMaxWidth = 500

export default {
	components: {
		QueueItem
	},
	data() {
		return {
			cachedTabWidth: parseInt(localStorage.getItem('downloadTabWidth')) || 300,
			queue: [],
			queueList: {},
			queueComplete: [],
			clientMode: window.clientMode
		}
	},
	mounted() {
		socket.on('startDownload', this.startDownload)
		socket.on('startConversion', this.startConversion)
		socket.on('init_downloadQueue', this.initQueue)
		socket.on('addedToQueue', this.addToQueue)
		socket.on('updateQueue', this.updateQueue)
		socket.on('removedFromQueue', this.removeFromQueue)
		socket.on('finishDownload', this.finishDownload)
		socket.on('removedAllDownloads', this.removeAllDownloads)
		socket.on('removedFinishedDownloads', this.removedFinishedDownloads)

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
		...mapActions(['setErrors']),
		onRemoveItem(uuid) {
			socket.emit('removeFromQueue', uuid)
		},
		setTabWidth(newWidth) {
			if (undefined === newWidth) {
				this.$refs.container.style.width = ''
				this.$refs.list.style.width = ''
			} else {
				this.$refs.container.style.width = newWidth + 'px'
				this.$refs.list.style.width = newWidth + 'px'
			}
		},
		initQueue(data) {
			const {
				queue: initQueue,
				queueComplete: initQueueComplete,
				currentItem,
				queueList: initQueueList,
				restored
			} = data

			if (initQueueComplete.length) {
				initQueueComplete.forEach(item => {
					initQueueList[item].silent = true
					this.addToQueue(initQueueList[item])
				})
			}

			if (currentItem) {
				initQueueList[currentItem].silent = true
				this.addToQueue(initQueueList[currentItem], true)
			}

			initQueue.forEach(item => {
				initQueueList[item].silent = true
				this.addToQueue(initQueueList[item])
			})

			if (restored) {
				toast(this.$t('toasts.queueRestored'), 'done', true, 'restoring_queue')
				socket.emit('queueRestored')
			}
		},
		addToQueue(queueItem, current = false) {
			if (Array.isArray(queueItem)) {
				if (queueItem.length > 1) {
					queueItem.forEach((item, i) => {
						item.silent = true
						this.addToQueue(item)
					})
					toast(this.$t('toasts.addedMoreToQueue', { n: queueItem.length }), 'playlist_add_check')
					return
				} else {
					queueItem = queueItem[0]
				}
			}

			// * Here we have only queueItem objects
			this.$set(queueItem, 'current', current)
			this.$set(this.queueList, queueItem.uuid, queueItem)

			// * Used when opening the app in another tab
			const itemIsAlreadyDownloaded = queueItem.downloaded + queueItem.failed == queueItem.size

			if (itemIsAlreadyDownloaded) {
				const itemIsNotInCompletedQueue = this.queueComplete.indexOf(queueItem.uuid) == -1

				this.$set(this.queueList[queueItem.uuid], 'status', 'download finished')

				if (itemIsNotInCompletedQueue) {
					// * Add it
					this.queueComplete.push(queueItem.uuid)
				}
			} else {
				const itemIsNotInQueue = this.queue.indexOf(queueItem.uuid) == -1

				if (itemIsNotInQueue) {
					this.queue.push(queueItem.uuid)
				}
			}

			const needToStartDownload = (queueItem.progress > 0 && queueItem.progress < 100) || current

			if (needToStartDownload) {
				this.startDownload(queueItem.uuid)
			}

			if (!queueItem.silent) {
				toast(this.$t('toasts.addedToQueue', { item: queueItem.title }), 'playlist_add_check')
			}
		},
		updateQueue(update) {
			// downloaded and failed default to false?
			const { uuid, downloaded, failed, progress, conversion, error, data, errid } = update

			if (uuid && this.queue.indexOf(uuid) > -1) {
				if (downloaded) {
					this.queueList[uuid].downloaded++
				}

				if (failed) {
					this.queueList[uuid].failed++
					this.queueList[uuid].errors.push({ message: error, data: data, errid: errid })
				}

				if (progress) {
					this.queueList[uuid].progress = progress
				}

				if (conversion) {
					this.queueList[uuid].conversion = conversion
				}
			}
		},
		removeFromQueue(uuid) {
			let index = this.queue.indexOf(uuid)

			if (index > -1) {
				this.$delete(this.queue, index)
				this.$delete(this.queueList, uuid)
			}
		},
		removeAllDownloads(currentItem) {
			this.queueComplete = []

			if (!currentItem) {
				this.queue = []
				this.queueList = {}
			} else {
				this.queue = [currentItem]

				let tempQueueItem = this.queueList[currentItem]

				this.queueList = {}
				this.queueList[currentItem] = tempQueueItem
			}
		},
		removedFinishedDownloads() {
			this.queueComplete.forEach(uuid => {
				this.$delete(this.queueList, uuid)
			})

			this.queueComplete = []
		},
		toggleDownloadTab(clickEvent) {
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
			// if (this.clientMode) {
			socket.emit('openDownloadsFolder')
			// }
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
		},
		startDownload(uuid) {
			this.$set(this.queueList[uuid], 'status', 'downloading')
		},
		finishDownload(uuid) {
			let isInQueue = this.queue.indexOf(uuid) > -1

			if (!isInQueue) return

			this.$set(this.queueList[uuid], 'status', 'download finished')
			toast(this.$t('toasts.finishDownload', { item: this.queueList[uuid].title }), 'done')

			let index = this.queue.indexOf(uuid)

			if (index > -1) {
				this.queue.splice(index, 1)
				this.queueComplete.push(uuid)
			}

			if (this.queue.length <= 0) {
				toast(this.$t('toasts.allDownloaded'), 'done_all')
			}
		},
		startConversion(uuid) {
			this.$set(this.queueList[uuid], 'status', 'converting')
			this.$set(this.queueList[uuid], 'conversion', 0)
		},
		async showErrorsTab(item) {
			await this.setErrors(item)

			this.$router.push({ name: 'Errors' })
		}
	}
}
</script>

