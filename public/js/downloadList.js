var queueList = {}
var queue = []

socket.on("addedToQueue", function(queueItem){
	queueList[queueItem.uuid] = queueItem
	queue.push(queueItem.uuid)
	$("#download_list").append(
	`<div class="download_object" id="download_${queueItem.uuid}" data-deezerid="${queueItem.id}">
		<div class="download_info">
			<img width="75px" class="rounded coverart" src="${queueItem.cover}" alt="Cover ${queueItem.title}"/>
			<div class="download_info_data">
				<span class="download_line">${queueItem.title}</span> <span class="download_slim_separator"> - </span>
				<span class="secondary-text">${queueItem.artist}</span>
			</div>
			<div class="download_info_status">
				<span class="download_line"><span class="queue_downloaded">0</span>/${queueItem.size}</span>
			</div>
		</div>
		<div class="download_bar">
			<div class="progress"><div id="bar_${queueItem.uuid}" class="indeterminate"></div></div>
			<i onclick="downloadAction(event)" class="material-icons queue_icon" data-uuid="${queueItem.uuid}">remove</i>
		</div>
	</div>`)
})

function downloadAction(evt){
	let icon = $(evt.currentTarget).text()
	let uuid = $(evt.currentTarget).data("uuid")
	switch (icon) {
		case 'remove':
			socket.emit('removeFromQueue', uuid)
		break;
		default:
	}
}

socket.on("removedFromQueue", function(uuid){
	let index = queue.indexOf(uuid)
	if (index > -1){
		queue.splice(index, 1)
		$(`#download_${queueList[uuid].uuid}`).remove()
		delete queueList[uuid]
	}
})

socket.on("startDownload", function(uuid){
	$('#bar_' + uuid).removeClass('indeterminate').addClass('determinate')
})

socket.on("finishDownload", function(uuid){
	console.log(uuid+" finished downloading")
	toast(`${queueList[uuid].title} finished downloading.`)
	$('#bar_' + uuid).css('width', '100%')
})

socket.on("updateQueue", function(update){
	if (update.uuid && queue.indexOf(update.uuid) > -1){
		console.log(update)
		if (update.downloaded){
			queueList[update.uuid].downloaded++
			$("#download_"+update.uuid+" .queue_downloaded").text(queueList[update.uuid].downloaded)
		}
		if (update.failed){
			queueList[update.uuid].failed++
			if (queueList[update.uuid].failed == 1){
				$("#download_"+update.uuid+" .download_info_status").append(`<span class="secondary-text"><span class="download_slim_separator">(</span><span class="queue_failed">1</span> Failed<span class="download_slim_separator">)</span></span>`)
			}else{
				$("#download_"+update.uuid+" .queue_failed").text(queueList[update.uuid].failed)
			}
		}
		if (update.progress){
			queueList[update.uuid].progress = update.progress
			$('#bar_' + update.uuid).css('width', update.progress + '%')
		}
	}
})
