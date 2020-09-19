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
		<div id="download_list" @click="handleListClick" ref="list">
			<QueueItem v-for="item in queueList" :queue-item="item" :key="item.uuid" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
#download_tab_container {
	height: 100vh;
}
</style>

<script>
import $ from 'jquery'
import { socket } from '@/utils/socket'
import { toast } from '@/utils/toasts'
import { mapActions } from 'vuex'

import QueueItem from '@components/downloads/QueueItem.vue'

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
			console.log('this.handleListClick')
			const { target } = event

			if (!target.matches('.queue_icon[data-uuid]')) {
				return
			}

			let icon = target.innerText
			let uuid = $(target).data('uuid')

			switch (icon) {
				case 'remove':
					socket.emit('removeFromQueue', uuid)

					if ($(`#bar_${uuid}`).hasClass('indeterminate')) {
						$(`#download_${uuid}`).remove()
					} else {
						target.innerHTML = `<div class="circle-loader"></div>`
					}
					break
				default:
			}
		},
		initQueue(data) {
			console.log('this.initQueue')
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
			console.log('this.addToQueue')
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

			// * Here we have only objects
			this.$set(this.queueList, queueItem.uuid, queueItem)
			// this.queueList[queueItem.uuid] = queueItem

			// * Used when opening the app in another tab
			let itemIsAlreadyDownloaded = queueItem.downloaded + queueItem.failed == queueItem.size

			if (itemIsAlreadyDownloaded) {
				let itemIsNotInCompletedQueue = this.queueComplete.indexOf(queueItem.uuid) == -1

				if (itemIsNotInCompletedQueue) {
					// * Add it
					this.queueComplete.push(queueItem.uuid)
				}
			} else {
				let itemIsNotInQueue = this.queue.indexOf(queueItem.uuid) == -1

				if (itemIsNotInQueue) {
					this.queue.push(queueItem.uuid)
				}
			}

			let queueDOM = document.getElementById('download_' + queueItem.uuid)
			let noItemInQueueDOM = typeof queueDOM == 'undefined' || queueDOM == null

			if (noItemInQueueDOM) {
				this.appendItem(queueItem)
			}

			let needToStartDownload = queueItem.progress > 0 || current

			if (needToStartDownload) {
				this.startDownload(queueItem.uuid)
			}

			$('#bar_' + queueItem.uuid).css('width', queueItem.progress + '%')

			if (queueItem.failed >= 1 && $('#download_' + queueItem.uuid + ' .queue_failed').length == 0) {
				$('#download_' + queueItem.uuid + ' .download_info_status').append(
					`<span class="secondary-text inline-flex"><span class="download_slim_separator">(</span><span class="queue_failed_button inline-flex"><span class="queue_failed">${queueItem.failed}</span><i class="material-icons">error_outline</i></span><span class="download_slim_separator">)</span></span>`
				)
			}

			if (queueItem.downloaded + queueItem.failed == queueItem.size) {
				let resultIcon = $('#download_' + queueItem.uuid).find('.queue_icon')

				if (queueItem.failed == 0) {
					resultIcon.text('done')
				} else {
					let failedButton = $('#download_' + queueItem.uuid).find('.queue_failed_button')

					resultIcon.addClass('clickable')
					failedButton.addClass('clickable')

					resultIcon.bind('click', { item: queueItem }, this.showErrorsTab)
					failedButton.bind('click', { item: queueItem }, this.showErrorsTab)

					if (queueItem.failed >= queueItem.size) {
						resultIcon.text('error')
					} else {
						resultIcon.text('warning')
					}
				}
			}

			if (!queueItem.silent) {
				toast(this.$t('toasts.addedToQueue', { item: queueItem.title }), 'playlist_add_check')
			}
		},
		updateQueue(update) {
			// downloaded and failed default to false?
			const { uuid, downloaded, failed, progress, conversion, error, data, errid } = update
			console.log('this.updateQueue', !!this.queueList[uuid])

			if (uuid && this.queue.indexOf(uuid) > -1) {
				if (downloaded) {
					this.queueList[uuid].downloaded++

					$('#download_' + uuid + ' .queue_downloaded').text(
						this.queueList[uuid].downloaded + this.queueList[uuid].failed
					)
				}

				if (failed) {
					this.queueList[uuid].failed++

					$('#download_' + uuid + ' .queue_downloaded').text(
						this.queueList[uuid].downloaded + this.queueList[uuid].failed
					)

					if (this.queueList[uuid].failed == 1 && $('#download_' + uuid + ' .queue_failed').length == 0) {
						$('#download_' + uuid + ' .download_info_status').append(
							`<span class="secondary-text inline-flex"><span class="download_slim_separator">(</span><span class="queue_failed_button inline-flex"><span class="queue_failed">1</span> <i class="material-icons">error_outline</i></span><span class="download_slim_separator">)</span></span>`
						)
					} else {
						$('#download_' + uuid + ' .queue_failed').text(this.queueList[uuid].failed)
					}

					this.queueList[uuid].errors.push({ message: error, data: data, errid: errid })
				}

				if (progress) {
					this.queueList[uuid].progress = progress
					$('#bar_' + uuid).css('width', progress + '%')
				}

				if (conversion) {
					$('#bar_' + uuid).css('width', 100 - conversion + '%')
				}
			}
		},
		removeFromQueue(uuid) {
			console.log('this.removeFromQueue')
			let index = this.queue.indexOf(uuid)

			if (index > -1) {
				this.$delete(this.queue, index)

				$(`#download_${uuid}`).remove()

				this.$delete(this.queueList, uuid)
			}
		},
		removeAllDownloads(currentItem) {
			console.log('this.removeFromQueue')
			this.queueComplete = []

			let currentItemIsEmpty = currentItem === ''

			if (currentItemIsEmpty) {
				this.queue = []
				this.queueList = {}

				$(listEl).html('')
			} else {
				this.queue = [currentItem]

				let tempQueueItem = this.queueList[currentItem]

				this.queueList = {}
				this.queueList[currentItem] = tempQueueItem

				$('.download_object').each(function (index) {
					if ($(this).attr('id') != 'download_' + currentItem) {
						$(this).remove()
					}
				})
			}
		},
		removedFinishedDownloads() {
			console.log('this.removedFinishedDownloads')
			this.queueComplete.forEach(item => {
				$('#download_' + item).remove()
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
			console.log('this.cleanQueue')
			socket.emit('removeFinishedDownloads')
		},
		cancelQueue() {
			console.log('this.cancelQueue')
			socket.emit('cancelAllDownloads')
		},
		finishDownload(uuid) {
			console.log('this.finishDownload')

			let isInQueue = this.queue.indexOf(uuid) > -1

			if (!isInQueue) return

			const resultIcon = $('#download_' + uuid).find('.queue_icon')
			const noFailedDownloads = this.queueList[uuid].failed == 0

			toast(this.$t('toasts.finishDownload', { item: this.queueList[uuid].title }), 'done')

			$('#bar_' + uuid).css('width', '100%')

			if (noFailedDownloads) {
				resultIcon.text('done')
			} else {
				const failedButton = $('#download_' + uuid).find('.queue_failed_button')

				resultIcon.addClass('clickable')
				resultIcon.bind('click', { item: this.queueList[uuid] }, this.showErrorsTab)

				failedButton.addClass('clickable')
				failedButton.bind('click', { item: this.queueList[uuid] }, this.showErrorsTab)

				if (this.queueList[uuid].failed >= this.queueList[uuid].size) {
					resultIcon.text('error')
				} else {
					resultIcon.text('warning')
				}
			}

			let index = this.queue.indexOf(uuid)

			if (index > -1) {
				this.queue.splice(index, 1)
				this.queueComplete.push(uuid)
			}

			if (this.queue.length <= 0) {
				toast(this.$t('toasts.allDownloaded'), 'done_all')
			}
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
			console.log('this.startDownload')
			$('#bar_' + uuid)
				.removeClass('converting')
				.removeClass('indeterminate')
				.addClass('determinate')
		},
		startConversion(uuid) {
			console.log('this.startConversion')
			$('#bar_' + uuid)
				.addClass('converting')
				.removeClass('indeterminate')
				.addClass('determinate')
				.css('width', '100%')
		},
		appendItem(queueItem) {
			return
			console.log('this.appendItem')
			$(this.$refs.list).append(
				`<div class="download_object" id="download_${queueItem.uuid}" data-deezerid="${queueItem.id}">
						<div class="download_info">
							<img width="75px" class="rounded coverart" src="${queueItem.cover}" alt="Cover ${queueItem.title}"/>
							<div class="download_info_data">
								<span class="download_line">${queueItem.title}</span> <span class="download_slim_separator"> - </span>
								<span class="secondary-text">${queueItem.artist}</span>
							</div>
							<div class="download_info_status">
								<span class="download_line"><span class="queue_downloaded">${queueItem.downloaded + queueItem.failed}</span>/${
					queueItem.size
				}</span>
							</div>
						</div>
						<div class="download_bar">
							<div class="progress"><div id="bar_${queueItem.uuid}" class="indeterminate"></div></div>
							<i class="material-icons queue_icon" data-uuid="${queueItem.uuid}">remove</i>
						</div>
					</div>`
			)
		},
		async showErrorsTab(clickEvent) {
			await this.setErrors(clickEvent.data.item)

			this.$router.push({ name: 'Errors' })
		}
	}
}
</script>

