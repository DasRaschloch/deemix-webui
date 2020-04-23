import { socket } from './socket.js'
import { toast } from './toasts.js'

let queueList = {}
let queue = []
let queueComplete = []

const downloadListEl = document.getElementById('download_list')

function linkListeners() {
	downloadListEl.addEventListener('click', handleListClick)
	document.getElementById('toggle_download_tab').addEventListener('click', toggleDownloadTab)

	// Queue buttons
	document.getElementById('clean_queue').addEventListener('click', () => {
		socket.emit('removeFinishedDownloads')
	})

	document.getElementById('cancel_queue').addEventListener('click', () => {
		socket.emit('cancelAllDownloads')
	})
}

function sendAddToQueue(url, bitrate = null) {
	if (url.indexOf(';') !== -1) {
		let urls = url.split(';')
		urls.forEach(url => {
			socket.emit('addToQueue', { url: url, bitrate: bitrate })
		})
	} else if (url != '') {
		socket.emit('addToQueue', { url: url, bitrate: bitrate })
	}
}

function addToQueue(queueItem, current = false) {
	queueList[queueItem.uuid] = queueItem
	if (queueItem.downloaded + queueItem.failed == queueItem.size) {
		queueComplete.push(queueItem.uuid)
	} else {
		queue.push(queueItem.uuid)
	}
	$(downloadListEl).append(
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
	if (queueItem.progress > 0 || current) {
		$('#bar_' + queueItem.uuid)
			.removeClass('indeterminate')
			.addClass('determinate')
	}
	$('#bar_' + queueItem.uuid).css('width', queueItem.progress + '%')
	if (queueItem.failed >= 1) {
		$('#download_' + queueItem.uuid + ' .download_info_status').append(
			`<span class="secondary-text inline-flex"><span class="download_slim_separator">(</span><span class="queue_failed">${queueItem.failed}</span><i class="material-icons">error_outline</i><span class="download_slim_separator">)</span></span>`
		)
	}
	if (queueItem.downloaded + queueItem.failed == queueItem.size) {
		let result_icon = $('#download_' + queueItem.uuid).find('.queue_icon')
		if (queueItem.failed == 0) {
			result_icon.text('done')
		} else if (queueItem.failed == queueItem.size) {
			result_icon.text('error')
		} else {
			result_icon.text('warning')
		}
	}
}

function initQueue(data) {
	if (data.queueComplete.length) {
		data.queueComplete.forEach(item => {
			addToQueue(data.queueList[item])
		})
	}
	if (data.currentItem) {
		addToQueue(data['queueList'][data.currentItem], true)
	}
	data.queue.forEach(item => {
		addToQueue(data.queueList[item])
	})
}

function startDownload(uuid) {
	$('#bar_' + uuid)
		.removeClass('indeterminate')
		.addClass('determinate')
}

socket.on('startDownload', startDownload)

function handleListClick(event) {
	if (!event.target.matches('.queue_icon[data-uuid]')) {
		return
	}

	let icon = event.target.innerText
	let uuid = $(event.target).data('uuid')

	switch (icon) {
		case 'remove':
			socket.emit('removeFromQueue', uuid)
			break
		default:
	}
}

// Show/Hide Download Tab
function toggleDownloadTab(ev) {
	ev.preventDefault()

	let isHidden = document.querySelector('#download_tab_container').classList.toggle('tab_hidden')

	localStorage.setItem('downloadTabOpen', !isHidden)
}

socket.on('init_downloadQueue', initQueue)
socket.on('addedToQueue', addToQueue)

function removeFromQueue(uuid) {
	let index = queue.indexOf(uuid)
	if (index > -1) {
		queue.splice(index, 1)
		$(`#download_${queueList[uuid].uuid}`).remove()
		delete queueList[uuid]
	}
}

// Needs:
// 1. socket
// 2. queue
// 3. queueList
socket.on('removedFromQueue', removeFromQueue)

// Needs:
// 1. socket
// 2. queue
// 3. queueList
// 4. queueComplete
// 5. toast
function finishDownload(uuid) {
	if (queue.indexOf(uuid) > -1) {
		toast(`${queueList[uuid].title} finished downloading.`, 'done')
		$('#bar_' + uuid).css('width', '100%')
		let result_icon = $('#download_' + uuid).find('.queue_icon')
		if (queueList[uuid].failed == 0) {
			result_icon.text('done')
		} else if (queueList[uuid].failed >= queueList[uuid].size) {
			result_icon.text('error')
		} else {
			result_icon.text('warning')
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

socket.on('finishDownload', finishDownload)

// Needs:
// 1. socket
// 2. queueComplete
// 3. queue
// 4. queueList

function removeAllDownloads(currentItem) {
	queueComplete = []
	if (currentItem == '') {
		queue = []
		queueList = {}
		$(downloadListEl).html('')
	} else {
		queue = [currentItem]
		let tempQueueItem = queueList[currentItem]
		queueList = {}
		queueList[currentItem] = tempQueueItem
		$('.download_object').each(function (index) {
			if ($(this).attr('id') != 'download_' + currentItem) $(this).remove()
		})
	}
}

socket.on('removedAllDownloads', removeAllDownloads)

// Needs:
// 1. socket
// 2. queueComplete
function removedFinishedDownloads() {
	queueComplete.forEach(item => {
		$('#download_' + item).remove()
	})
	queueComplete = []
}

socket.on('removedFinishedDownloads', removedFinishedDownloads)

// Needs:
// 1. socket
// 2. queue
// 3. queueList
function updateQueue(update) {
	if (update.uuid && queue.indexOf(update.uuid) > -1) {
		if (update.downloaded) {
			queueList[update.uuid].downloaded++
			$('#download_' + update.uuid + ' .queue_downloaded').text(
				queueList[update.uuid].downloaded + queueList[update.uuid].failed
			)
		}
		if (update.failed) {
			queueList[update.uuid].failed++
			$('#download_' + update.uuid + ' .queue_downloaded').text(
				queueList[update.uuid].downloaded + queueList[update.uuid].failed
			)
			if (queueList[update.uuid].failed == 1) {
				$('#download_' + update.uuid + ' .download_info_status').append(
					`<span class="secondary-text inline-flex"><span class="download_slim_separator">(</span><span class="queue_failed">1</span> <i class="material-icons">error_outline</i><span class="download_slim_separator">)</span></span>`
				)
			} else {
				$('#download_' + update.uuid + ' .queue_failed').text(queueList[update.uuid].failed)
			}
		}
		if (update.progress) {
			queueList[update.uuid].progress = update.progress
			$('#bar_' + update.uuid).css('width', update.progress + '%')
		}
	}
}

socket.on('updateQueue', updateQueue)

export default {
	linkListeners,
	sendAddToQueue,
	addToQueue
}
