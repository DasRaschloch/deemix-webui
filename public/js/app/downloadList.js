// Show/Hide Download Tab
function toggleDownloadTab(ev) {
	ev.preventDefault()

	let isHidden = document.querySelector('#download_tab_container').classList.toggle('tab_hidden')

	localStorage.setItem('downloadTabOpen', !isHidden)
}

var queueList = {}
var queue = []
var queueComplete = []

socket.on('init_downloadQueue', function (data) {
	if (data.queueComplete.length) {
		data.queueComplete.forEach(item => {
			addToQueue(data.queueList[item])
		})
	}
	if (data.currentItem){
		addToQueue(data['queueList'][data.currentItem], true)
	}
	data.queue.forEach(item => {
		addToQueue(data.queueList[item])
	})
})

function addToQueue(queueItem, current=false){
	queueList[queueItem.uuid] = queueItem
	if (queueItem.downloaded + queueItem.failed == queueItem.size) queueComplete.push(queueItem.uuid)
	else queue.push(queueItem.uuid)
	$('#download_list').append(
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
			<i onclick="downloadAction(event)" class="material-icons queue_icon" data-uuid="${queueItem.uuid}">remove</i>
		</div>
	</div>`)
	if (queueItem.progress>0 || current){
		$('#bar_' + queueItem.uuid).removeClass('indeterminate').addClass('determinate')
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

socket.on('addedToQueue', function (queueItem) {
	addToQueue(queueItem)
})

function downloadAction(evt) {
	let icon = $(evt.currentTarget).text()
	let uuid = $(evt.currentTarget).data('uuid')
	switch (icon) {
		case 'remove':
			socket.emit('removeFromQueue', uuid)
			break
		default:
	}
}

socket.on('removedFromQueue', function (uuid) {
	let index = queue.indexOf(uuid)
	if (index > -1) {
		queue.splice(index, 1)
		$(`#download_${queueList[uuid].uuid}`).remove()
		delete queueList[uuid]
	}
})

socket.on('startDownload', function (uuid) {
	$('#bar_' + uuid)
		.removeClass('indeterminate')
		.addClass('determinate')
})

socket.on('finishDownload', function (uuid) {
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
})

socket.on('removedAllDownloads', function (currentItem) {
	queueComplete = []
	if (currentItem == '') {
		queue = []
		queueList = {}
		$('#download_list').html('')
	} else {
		queue = [currentItem]
		tempQueueItem = queueList[currentItem]
		queueList = {}
		queueList[currentItem] = tempQueueItem
		$('.download_object').each(function (index) {
			if ($(this).attr('id') != 'download_' + currentItem) $(this).remove()
		})
	}
})

socket.on('removedFinishedDownloads', function () {
	queueComplete.forEach(item => {
		$('#download_' + item).remove()
	})
	queueComplete = []
})

$('#clean_queue').on('click', function () {
	socket.emit('removeFinishedDownloads')
})

$('#cancel_queue').on('click', function () {
	socket.emit('cancelAllDownloads')
})

socket.on('updateQueue', function (update) {
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
})