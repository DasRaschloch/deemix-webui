import $ from 'jquery'
import { socket } from '@/js/socket.js'
import { toast } from '@/js/toasts.js'
import EventBus from '@/js/EventBus'

/* ===== Locals ===== */

let queueList = {}
let queue = []
let queueComplete = []
let listEl

function init() {
	// Find download DOM elements
	listEl = document.getElementById('download_list')
}

function sendAddToQueue(url, bitrate = null) {
	if (url != '') {
		socket.emit('addToQueue', { url: url, bitrate: bitrate })
	}
}

function _addToQueue(queueItem, current = false) {
	queueList[queueItem.uuid] = queueItem
	if (queueItem.downloaded + queueItem.failed == queueItem.size) {
		if (queueComplete.indexOf(queueItem.uuid) == -1) queueComplete.push(queueItem.uuid)
	} else {
		if (queue.indexOf(queueItem.uuid) == -1) queue.push(queueItem.uuid)
	}
	let queueDOM = document.getElementById('download_' + queueItem.uuid)
	if (typeof queueDOM == 'undefined' || queueDOM == null) {
		$(listEl).append(
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
	}
	if (queueItem.progress > 0 || current) {
		$('#bar_' + queueItem.uuid)
			.removeClass('indeterminate')
			.addClass('determinate')
	}
	$('#bar_' + queueItem.uuid).css('width', queueItem.progress + '%')
	if (queueItem.failed >= 1 && $('#download_' + queueItem.uuid + ' .queue_failed').length == 0) {
		$('#download_' + queueItem.uuid + ' .download_info_status').append(
			`<span class="secondary-text inline-flex"><span class="download_slim_separator">(</span><span class="queue_failed_button inline-flex"><span class="queue_failed">${
				queueItem.failed
			}</span><i class="material-icons">error_outline</i></span><span class="download_slim_separator">)</span></span>`
		)
	}
	if (queueItem.downloaded + queueItem.failed == queueItem.size) {
		let result_icon = $('#download_' + queueItem.uuid).find('.queue_icon')
		if (queueItem.failed == 0) {
			result_icon.text('done')
		} else {
			let failed_button = $('#download_' + queueItem.uuid).find('.queue_failed_button')
			result_icon.addClass('clickable')
			failed_button.addClass('clickable')
			result_icon.bind('click', { item: queueItem }, showErrorsTab)
			failed_button.bind('click', { item: queueItem }, showErrorsTab)
			if (queueItem.failed >= queueItem.size) {
				result_icon.text('error')
			} else {
				result_icon.text('warning')
			}
		}
	}
	if (!queueItem.init) toast(`${queueItem.title} added to queue`, 'playlist_add_check')
}

// ? Temporary?
function showErrorsTab(clickEvent) {
	EventBus.$emit('showTabErrors', clickEvent.data.item, clickEvent.target)
}

function _initQueue(data) {
	const { queue, queueComplete, currentItem, queueList } = data

	if (queueComplete.length) {
		queueComplete.forEach(item => {
			queueList[item].init = true
			_addToQueue(queueList[item])
		})
	}

	if (currentItem) {
		queueList[currentItem].init = true
		_addToQueue(queueList[currentItem], true)
	}

	queue.forEach(item => {
		queueList[item].init = true
		_addToQueue(queueList[item])
	})
}

function _startDownload(uuid) {
	$('#bar_' + uuid)
		.removeClass('indeterminate')
		.addClass('determinate')
}

socket.on('startDownload', _startDownload)

socket.on('init_downloadQueue', _initQueue)
socket.on('addedToQueue', _addToQueue)

function _removeFromQueue(uuid) {
	let index = queue.indexOf(uuid)
	if (index > -1) {
		queue.splice(index, 1)
		$(`#download_${queueList[uuid].uuid}`).remove()
		delete queueList[uuid]
	}
}

socket.on('removedFromQueue', _removeFromQueue)

function _finishDownload(uuid) {
	if (queue.indexOf(uuid) > -1) {
		toast(`${queueList[uuid].title} finished downloading.`, 'done')
		$('#bar_' + uuid).css('width', '100%')
		let result_icon = $('#download_' + uuid).find('.queue_icon')
		if (queueList[uuid].failed == 0) {
			result_icon.text('done')
		} else {
			let failed_button = $('#download_' + uuid).find('.queue_failed_button')
			result_icon.addClass('clickable')
			failed_button.addClass('clickable')
			result_icon.bind('click', { item: queueList[uuid] }, showErrorsTab)
			failed_button.bind('click', { item: queueList[uuid] }, showErrorsTab)
			if (queueList[uuid].failed >= queueList[uuid].size) {
				result_icon.text('error')
			} else {
				result_icon.text('warning')
			}
		}

		let index = queue.indexOf(uuid)
		if (index > -1) {
			queue.splice(index, 1)
			queueComplete.push(uuid)
		}
		if (queue.length <= 0) {
			toast('All downloads completed!', 'done_all')
		}
	}
}

socket.on('finishDownload', _finishDownload)

function _removeAllDownloads(currentItem) {
	queueComplete = []
	if (currentItem == '') {
		queue = []
		queueList = {}
		$(listEl).html('')
	} else {
		queue = [currentItem]
		let tempQueueItem = queueList[currentItem]
		queueList = {}
		queueList[currentItem] = tempQueueItem
		$('.download_object').each(function(index) {
			if ($(this).attr('id') != 'download_' + currentItem) $(this).remove()
		})
	}
}

socket.on('removedAllDownloads', _removeAllDownloads)

function _removedFinishedDownloads() {
	queueComplete.forEach(item => {
		$('#download_' + item).remove()
	})
	queueComplete = []
}

socket.on('removedFinishedDownloads', _removedFinishedDownloads)

function _updateQueue(update) {
	// downloaded and failed default to false?
	const { uuid, downloaded, failed, progress } = update

	if (uuid && queue.indexOf(uuid) > -1) {
		if (downloaded) {
			queueList[uuid].downloaded++
			$('#download_' + uuid + ' .queue_downloaded').text(queueList[uuid].downloaded + queueList[uuid].failed)
		}
		if (failed) {
			queueList[uuid].failed++
			$('#download_' + uuid + ' .queue_downloaded').text(queueList[uuid].downloaded + queueList[uuid].failed)
			if (queueList[uuid].failed == 1 && $('#download_' + uuid + ' .queue_failed').length == 0) {
				$('#download_' + uuid + ' .download_info_status').append(
					`<span class="secondary-text inline-flex"><span class="download_slim_separator">(</span><span class="queue_failed_button inline-flex"><span class="queue_failed">1</span> <i class="material-icons">error_outline</i></span><span class="download_slim_separator">)</span></span>`
				)
			} else {
				$('#download_' + uuid + ' .queue_failed').text(queueList[uuid].failed)
			}
			queueList[uuid].errors.push({ message: update.error, data: update.data })
		}
		if (progress) {
			queueList[uuid].progress = progress
			$('#bar_' + uuid).css('width', progress + '%')
		}
	}
}

socket.on('updateQueue', _updateQueue)

export default {
	init,
	sendAddToQueue
}
